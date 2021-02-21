import { Router } from 'express';
import authController from '../../controllers/authController';
import movieController from '../../controllers/movieController';
import uploads from '../../config/configMulter';

const movieRoutes = Router();

movieRoutes.get('/', authController.isLoggedIn, authController.isAdmin, movieController.getAll);

movieRoutes.get('/:id', authController.isLoggedIn, authController.hasSignature, movieController.getMovie);

movieRoutes.post('/', authController.isLoggedIn, authController.isAdmin, uploads.local.single('moviePicture'), movieController.createMovie);

movieRoutes.put('/:id', authController.isLoggedIn, authController.isAdmin, uploads.local.single('moviePicture'), movieController.updateMovie);

movieRoutes.delete('/:id', authController.isLoggedIn, authController.isAdmin, movieController.deleteMovie);

movieRoutes.get('/picture/:id', authController.isLoggedIn, movieController.getPicture);

movieRoutes.get('/play/:id', movieController.playMovie);

movieRoutes.get('/search/:search', authController.isLoggedIn, movieController.search);

movieRoutes.post('/s3', authController.isLoggedIn, authController.isAdmin, uploads.S3.single('movie'), movieController.uploadMovie);

movieRoutes.put('/s3/:id', authController.isLoggedIn, authController.isAdmin, uploads.S3.single('movie'), movieController.uploadMovie);

export default movieRoutes;