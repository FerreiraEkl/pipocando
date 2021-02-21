import dotenv from 'dotenv';
dotenv.config();

import Express from 'express'
import cors from 'cors'
import routes from './routes/routes';
import { configModels } from './schemas/relationshipSchema';
import passport from 'passport';
import path from 'path';
import movieController from './controllers/movieController';

class App {
    public express: Express.Application

    constructor() {
        this.express = Express();

        // movieController.getUploadedNoMovie();
        this.middlewares();
        this.database();
        this.routes();
    }

    private middlewares(): void {

        this.express.use(cors({
            "origin": "*",
            "methods": "GET,HEAD,PUT,PATCH,POST,DELETE"
          }));

        this.express.use(passport.initialize());

        this.express.use(Express.json());

        //app.use(bodyParser.urlencoded({ extended: true }));

        //app.use(bodyParser.json());
    }

    private database(): void {
        configModels.START();
    }

    private routes(): void {
        this.express.use('/', Express.static(__dirname + '/public'));
        this.express.use('/picture', Express.static(__dirname + '/data/public/pictures'));
        this.express.use("/api", routes);
        this.express.get("/*", (req, res) => {
            res.sendFile(path.join(__dirname, 'public', 'index.html'))
        });
    }
}

export default new App().express