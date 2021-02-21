import { Router } from 'express';
import authController from '../../controllers/authController';
import paymentController from '../../controllers/paymentController';

const movieRequestRoutes = Router();

movieRequestRoutes.get('/', authController.isLoggedIn, paymentController.checkSignatures);

movieRequestRoutes.post('/', authController.isLoggedIn, paymentController.makeSignature);




export default movieRequestRoutes;