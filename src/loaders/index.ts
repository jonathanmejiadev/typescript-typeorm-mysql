import expressLoader from './express';
import express from 'express';
import { typeormMysqlConnection } from "./typeorm";

export default async (app: express.Application) => {
    try {
        expressLoader(app);
        //db connection
        await typeormMysqlConnection();
        console.log(`Connected to MySQL database`);
    } catch (err) {
        console.log(`Loaders error: ${err.message}`);
    };

};
