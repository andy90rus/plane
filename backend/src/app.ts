import 'reflect-metadata';
import express = require('express');
import {useExpressServer} from 'routing-controllers';
import DataBaseService from './dataBase.service';
import {PlanesController} from './controllers/planes.controller';


class App {
    private dataBaseService: DataBaseService;
    constructor(
        public app: express.Application = express()
    ) {
        this.dataBaseService = new DataBaseService();
        this.dataBaseService.connection.then(conn => conn.synchronize());
        useExpressServer(app, {
            routePrefix: '/api',
            cors: {exposedHeaders: ['Content-Disposition']},
            controllers: [
                PlanesController
            ]
        })
    }
}

const app = new App().app;
export default app;