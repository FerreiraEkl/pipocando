import { Router } from 'express';
import authController from '../../controllers/authController';
import classificationController from '../../controllers/classificationController';

const classificationRoutes = Router();

classificationRoutes.get('/', authController.isLoggedIn, classificationController.getAllClassification);

classificationRoutes.post('/',authController.isLoggedIn, authController.isAdmin, classificationController.createClassification);

export default classificationRoutes;