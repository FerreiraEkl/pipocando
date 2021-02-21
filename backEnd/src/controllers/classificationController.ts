import { Request, Response } from "express";
import Classification from "../schemas/tableSchemas/classificationSchema";

class ClassificationController {
    public async getAllClassification(req: Request, res: Response): Promise<Response> {
        return await Classification.findAll({
            attributes: [
                'classificationName',
                'id'
            ]
        }).then(categories => {
            return res.status(200).json(JSON.stringify(categories));
        }).catch(err => {
            console.log(err);
            return res.status(400).json({ message: err.message });
        });
    }

    public async createClassification(req: Request, res: Response): Promise<Response> {
        return await Classification.create({
            classificationName: req.body.ClassificationName,
            classificationPicture:''
        }).then(category => {
            return res.status(200).json(JSON.stringify(category));
        }).catch(err => {
            console.log(err);
            return res.status(400).json({ message: err.message });
        })
    }
}

export default new ClassificationController()