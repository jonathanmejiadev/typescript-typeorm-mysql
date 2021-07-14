import 'reflect-metadata';
import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import { createConnection } from 'typeorm';
import morgan from 'morgan';
import helmet from 'helmet';
import passport from 'passport';
import swaggerJsDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';
import config from './config';
import passportMiddleware from './middlewares/passport';
import { errorHandler, errorHandler404 } from './middlewares/error';
import indexRoutes from './routes/index.routes';
import { swaggerOptions } from './helpers/swaggerOptions';

const app = express();
const PORT = config.PORT || 3000;

const swaggerDocs = swaggerJsDoc(swaggerOptions);

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

const startApp = async () => {
    try {
        await createConnection();
        console.log(`Connected to MySQL database`);
        app.listen(PORT, () => {
            console.log(`Connected on http://localhost:${PORT}`);
        });
    } catch (err) {
        console.log(`Connection error ${err.message}`);
    }
}
startApp();

export default app;