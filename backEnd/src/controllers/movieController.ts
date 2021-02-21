import { Request, Response } from "express";
import fs from 'fs'
import path from 'path'

import S3 from '../config/configS3'
import Category from "../schemas/tableSchemas/categorySchema";
import Movie from "../schemas/tableSchemas/movieSchema";
import { Op } from 'sequelize';
import { IUser } from "../schemas/interfaces/IUser";

class MovieController {

    public async search(req: Request, res: Response): Promise<Response> {
        return await Movie.findAll({
            attributes: [
                "id",
                "movieTitle",
                "moviePicture"
            ],
            where: {
                movieTitle: { [Op.like]: `%${req.params.search}%` }
            }
        }).then(movies => {
            return res.status(200).json(JSON.stringify(movies));
        }).catch(err => {
            return res.status(404).json({ success: false, message: err.message });
        });
    }

    public async getAll(req: Request, res: Response): Promise<Response> {
        return await Movie.findAll({
            attributes: [
                "id",
                "movieTitle",
                "movieYear",
                "createdAt"
            ],
            include: [
                {
                    association: Movie.associations.creator,
                    attributes: [
                        'userFirstName'
                    ]
                },
                {
                    association: Movie.associations.classification,
                    attributes: [
                        'classificationName'
                    ]
                },
                {
                    association: Movie.associations.category,
                    attributes: [
                        'categoryName'
                    ]
                }
            ]
        }).then(movies => {
            return res.status(200).json(JSON.stringify(movies));
        }).catch(err => {
            return res.status(404).json({ success: false, message: err.message });
        });
    }

    public async createMovie(req: Request, res: Response): Promise<Response> {
        var user = <IUser>JSON.parse(JSON.stringify(req.user));

        if (req.file)
            req.body.moviePicture = req.file.filename;

        req.body.creatorId = user.id;

        return await Movie.create(req.body).then(movie => {

            Category.update({ id: req.body.CategoryId }, { where: { id: req.body.CategoryId } });

            return res.status(200).json({ success: true, movieId: movie.id })
        }).catch(err => {
            return res.status(400).json({ success: false, message: err.message });
        });
    }

    public async getMovie(req: Request, res: Response): Promise<Response> {
        return await Movie.findOne({
            where: {
                id: req.params.id
            }
        }).then(movie => {
            return res.status(200).json(JSON.stringify(movie));
        }).catch(err => {
            return res.status(404).json({ success: false, message: err.message });
        });
    }

    public async updateMovie(req: Request, res: Response): Promise<Response> {
        return await Movie.findOne({
            where: {
                id: req.params.id
            }
        }).then(movie => {
            if (!movie)
                return res.status(400).json({ success: false, message: "Movie not found" });

            if (req.file) {
                if (movie.moviePicture)
                    fs.unlink('./src/data/pictures/' + movie.moviePicture, function (err) {
                        if (err)
                            console.log(err.message, `Necessário deletar ${movie.moviePicture} manualmente`);
                        else
                            console.log('Arquivo deletado!');
                    });

                req.body.moviePicture = req.file.filename;
            }
            else {
                console.log('not have a new picture');
            }

            if (req.body.moviePicture == 'null')
                req.body.moviePicture = movie.moviePicture;

            if (req.body.movieLocation == 'null')
                req.body.movieLocation = movie.movieLocation;

            return Movie.update(req.body, {
                where: {
                    id: req.params.id
                }
            }).then(movie => {
                Category.update({ id: req.body.CategoryId }, { where: { id: req.body.CategoryId } });
                return res.status(200).json({ success: true })
            }).catch(err => {
                return res.status(400).json({ success: false, message: err.message });
            });
        }).catch(err => {
            return res.status(400).json({ success: false, message: err.message })
        });

    }

    public async deleteMovie(req: Request, res: Response): Promise<Response> {
        return await Movie.findOne({
            where: {
                id: req.params.id
            }
        }).then(async movie => {
            if (!movie)
                return res.status(400).json({ success: false, message: "Movie not found" });

            if (movie.moviePicture) {
                await fs.unlink('./src/data/pictures/' + movie.moviePicture, function (err) {
                    if (err)
                        console.log(err.message, `Necessário deletar ${movie.moviePicture} manualmente`);
                });
            }

            if (movie.movieLocation) {
                if (process.env.SMODE == 'DEV') {
                    await fs.unlink('./src/data/movies/' + movie.movieLocation, function (err) {
                        if (err)
                            console.log(err.message, `Necessário deletar ${movie.movieLocation} manualmente`);
                    });
                }

                else {
                    await S3.deleteObject({
                        Bucket: 'yourvideotape2',
                        Key: `Movies/${movie.movieLocation}`
                    }).promise().catch(err => {
                        console.log(err.message, `Necessário deletar ${movie.movieLocation} manualmente`);
                    });
                }

            }

            return await Movie.destroy({ where: { id: req.params.id } }).then(() => {
                return res.status(200).json({ success: true });
            });

        }).catch(err => {
            return res.status(400).json({ success: false, message: err.message })
        });
    }

    public async playMovie(req: Request, res: Response) {

        /*const movieName = req.params.id;

        S3.headObject({
            Bucket: 'yourvideotape2',
            Key: `Movies/${movieName}`
        }, (err: any, data: any) => {

            if (err) {
                console.error(err);
                return res.status(404).end('<h1>Movie Not found</h1>');
            }

            // Variáveis necessárias para montar o chunk header corretamente
            const { range } = req.headers;
            const size = data.ContentLength;
            const start = Number((range || '').replace(/bytes=/, '').split('-')[0]);
            const end = size - 1;
            const chunkSize = 6000000;//(end - start) + 1;

            // Definindo headers de chunk
            res.set({
                'Content-Range': `bytes ${start}-${end}/${size}`,
                'Accept-Ranges': 'bytes',
                'Content-Length': chunkSize,
                'Content-Type': data.ContentType
            });

            // É importante usar status 206 - Partial Content para o streaming funcionar
            res.status(206);

            // Utilizando ReadStream do Node.js
            // Ele vai ler um arquivo e enviá-lo em partes via stream.pipe()                       
            const stream = S3.getObject({
                Bucket: 'yourvideotape2',
                Key: `Movies/${movieName}`
            }).createReadStream();

            stream.pipe(res);

            stream.on('error', (streamErr) => res.end(streamErr));

            console.log(data);
        });
*/

        // para stream local usar codigo abaixo funciona perfeitamente

        const movieFile = `./src/data/movies/${req.params.id}`;

        fs.stat(movieFile, (err, stats) => {
            if (err) {
                console.log(err);
                return res.status(404).end('<h1>Movie Not found</h1>');
            }

            // Variáveis necessárias para montar o chunk header corretamente
            const { range } = req.headers;
            const { size } = stats;
            const start = Number((range || '').replace(/bytes=/, '').split('-')[0]);
            const end = size - 1;
            const chunkSize = 6000000;//(end - start) + 1;

            // Definindo headers de chunk
            res.set({
                'Content-Range': `bytes ${start}-${end}/${size}`,
                'Accept-Ranges': 'bytes',
                'Content-Length': chunkSize,
                'Content-Type': 'video/x-matroska'
            });

            // É importante usar status 206 - Partial Content para o streaming funcionar
            res.status(206);
            // Utilizando ReadStream do Node.js
            // Ele vai ler um arquivo e enviá-lo em partes via stream.pipe()
            const stream = fs.createReadStream(movieFile, { start, end });
            stream.on('open', () => stream.pipe(res));
            stream.on('error', (streamErr) => res.end(streamErr));
        });

    }

    public async getPicture(req: Request, res: Response): Promise<Response | void> {
        var file = '';
        try {
            file = path.resolve(__dirname, '../data', 'public', 'pictures', req.params.id);
            return res.status(200).sendFile(file);
        }
        catch {
            file = path.resolve(__dirname, '../data', 'public', 'pictures', 'notFound.png');
            return res.status(200).sendFile(file);
        }
    }

    public async uploadMovie(req: Request, res: Response): Promise<Response> {
        try {
            if (req.file) {
                if (req.params.id) {
                    await Movie.findOne({ where: { id: req.params.id } }).then(movie => {
                        if (movie && movie.movieLocation && movie.movieLocation != 'null' && movie.movieLocation != null) {
                            S3.deleteObject({
                                Bucket: 'yourvideotape2',
                                Key: `Movies/${movie.movieLocation}`
                            }).promise().catch(err => {
                                console.log(err);
                                console.log(err.message, `Necessário deletar ${movie.movieLocation} manualmente`);
                            });
                        }
                    });
                }
                return res.status(200).json({ fileName: req.file.originalname, fileType: req.file.mimetype });
            }
            return res.status(200).json({ fileName: null, fileType: null });

        } catch (error) {
            console.log(error);
            return res.status(400).json(JSON.stringify(error.message));
        }
    }

    public async getMoviesWithoutMovie() {
        Movie.findAll({
            where: {
                movieLocation: 'null'
            }
        }).then(movies => {
            console.log(JSON.parse(JSON.stringify(movies)));
            /* Movie.update({
                 movieLocation:'6cbfab6fd127056dfd8f1f52e2d6f45e-Cinquenta Tons de Cinza - Sem Censura (2015) 1080p Dublado - Alan_680.mp4'
             },{
                 where:{
                     id:107
                 }
             })*/
        })
    }

    public async getUploadedNoMovie() {
        S3.listObjectsV2({
            Bucket: 'yourvideotape2',
            Prefix: 'Movies/',
        }, (err, data) => {
            if (err)
                console.log(err);
            if (data) {
                for (const file of data.Contents ? data.Contents : []) {
                    Movie.findOne({
                        where: {
                            movieLocation: file.Key?.replace('Movies/', '')
                        }
                    }).then(movie => {
                        if (!movie && file.Key && file.Key != 'Movies/') {
                            console.log(file.Key, 'not found');
                            /*S3.deleteObject({
                                  Bucket: 'yourvideotape2',
                                  Key: file.Key
                              }).promise().catch(err => {
                                  console.log(err);
                              });
                              */
                        }
                    }).catch(err => {
                        console.log(err);
                    })
                }
            }
        });
    }
}

export default new MovieController()