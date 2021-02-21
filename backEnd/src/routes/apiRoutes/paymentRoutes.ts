import { Router } from 'express';
import authController from '../../controllers/authController';
import paymentController from '../../controllers/paymentController';

const paymentRoutes = Router();

paymentRoutes.post('/', authController.isLoggedIn, paymentController.makeSignature);

paymentRoutes.get('/', authController.isLoggedIn, paymentController.checkSignatures);

paymentRoutes.post('/log', authController.isLoggedIn, (req, res) => {
    console.log('params pagseguro',req.params);
    console.log('body pagseguro',req.body);
    console.log('query pagseguro',req.query);
});

export default paymentRoutes;