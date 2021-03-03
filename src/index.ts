import 'reflect-metadata';
import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import config from './config';
import helmet from 'helmet';
import passport from 'passport'
import passportMiddleware from './middlewares/passport';
import { createConnection } from 'typeorm';
import { errorHandler, errorHandler404 } from './middlewares/error';
import indexRoutes from './api/routes/index.routes';

const app = express();
const PORT = config.PORT || 3000;

//middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
app.use(passport.initialize());
passport.use(passportMiddleware);

//routes
app.use(indexRoutes);

//error middlewares
app.use(errorHandler404);
app.use(errorHandler);

const startApp = async () => {
    await createConnection();
    app.listen(PORT, () => {
        console.log(`Connected on http://localhost:${PORT}`);
    });
}
startApp();