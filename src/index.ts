import 'reflect-metadata';
import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import loaders from './loaders';
import config from './config';

const app = express();

const startApp = async () => {
    try {
        await loaders(app);
        app.listen(config.PORT, () => {
            console.log(`Connected on http://localhost:${config.PORT}`);
        });
    } catch (err) {
        console.log(`Server error: ${err.message}`);
    }
}
startApp();

export default app;