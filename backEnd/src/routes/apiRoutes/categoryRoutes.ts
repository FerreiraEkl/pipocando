import { Router } from 'express';
import authController from '../../controllers/authController';
import categoryController from '../../controllers/categoryController';

const categoryRoutes = Router();



categoryRoutes.get('/movies', authController.isLoggedIn, categoryController.getAllWithMovies);

categoryRoutes.get('/', authController.isLoggedIn, categoryController.getAllCategory);

categoryRoutes.post('/', authController.isLoggedIn, authController.isAdmin, categoryController.createCategory);


export default categoryRoutes;