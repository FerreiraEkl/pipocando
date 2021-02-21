import { Request, Response } from "express";
import Category from "../schemas/tableSchemas/categorySchema";

class CategoryController {
    public async getAllCategory(req: Request, res: Response): Promise<Response> {
        return await Category.findAll({
            attributes: [
                'categoryName',
                'id'
            ]
        }).then(categories => {
            return res.status(200).json(JSON.stringify(categories));
        }).catch(err => {
            console.log(err);
            return res.status(400).json({ message: err.message });
        });
    }

    public async getAllWithMovies(req: Request, res: Response): Promise<Response> {
        return await Category.findAll({
            attributes: [
                'categoryName',
                'id'
            ],
            include: {
                association: Category.associations.movies,
                attributes: [
                    'id',
                    'movieTitle',
                    'moviePicture'
                ]
            }
        }).then(categories => {
            return res.status(200).json(JSON.stringify(categories));
        }).catch(err => {
            console.log(err);
            return res.status(400).json({ message: err.message });
        });
    }

    public async createCategory(req: Request, res: Response): Promise<Response> {
        return await Category.create(
            {
                categoryName: req.body.categoryName
            }
        ).then(category => {
            return res.status(200).json(JSON.stringify(category));
        }).catch(err => {
            console.log(err);
            return res.status(400).json({ message: err.message });
        })
    }
}

export default new CategoryController()