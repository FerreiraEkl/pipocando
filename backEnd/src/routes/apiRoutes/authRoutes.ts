import { IUser } from '../../schemas/interfaces/IUser';
import { Router } from 'express';
import authController from '../../controllers/authController';

const authRoutes = Router();

authRoutes.get('/', authController.isLoggedIn, authController.authenticate);

authRoutes.get('/mail', authController.isLoggedIn, authController.hasValidEmail, authController.authenticate);

authRoutes.get('/admin', authController.isLoggedIn, authController.isAdmin, authController.authenticate);

authRoutes.get('/signature', authController.isLoggedIn, authController.hasSignature, authController.authenticate);

authRoutes.post('/mailConfirmation', authController.confirmMail);

authRoutes.post('/login', authController.login);

authRoutes.get('/logout', authController.logout);

authRoutes.post('/register', authController.register);

authRoutes.post('/recover', authController.recoverPassword);

authRoutes.post('/setPassword', authController.setNewPassword);

export default authRoutes;