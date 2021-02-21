import {Router} from 'express';

import authRoutes from './apiRoutes/authRoutes';
import categoryRoutes from './apiRoutes/categoryRoutes';
import classificationRoutes from './apiRoutes/classificationRoutes';
import movieRoutes from './apiRoutes/movieRoutes';
import paymentRoutes from './apiRoutes/paymentRoutes';

const routes = Router();

//routes.use('/comment', user);

//routes.use('/customer', customerRoutes);

//routes.use('/item', user);

routes.use('/payment', paymentRoutes);

routes.use('/classification', classificationRoutes);

routes.use('/category', categoryRoutes);

routes.use('/movie', movieRoutes);

routes.use('/auth', authRoutes);

export default routes;