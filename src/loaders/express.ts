import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import passport from 'passport';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import passportMiddleware from '../middlewares/passport';
import { errorHandler, errorHandler404 } from '../middlewares/error';
import indexRoutes from '../routes/index.routes';
import { swaggerOptions } from '../helpers/swaggerOptions';

const swaggerDocs = swaggerJsDoc(swaggerOptions);

export default (app: express.Application) => {
    //middlewares
    app.use(cors());
    app.use(morgan('dev'));
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    app.use(helmet());
    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
    app.use(passport.initialize());
    passport.use(passportMiddleware);

    //routes
    app.use(indexRoutes);

    //error middlewares
    app.use(errorHandler404);
    app.use(errorHandler);
};