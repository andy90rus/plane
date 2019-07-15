import 'reflect-metadata';
import express = require('express');
import {useExpressServer} from 'routing-controllers';
import DataBaseService from './dataBase.service';
import {PlanesController} from './controllers/planes.controller';
import {Config} from './config';
import {ChairsController} from './controllers/chairs.controller';

class App {
    constructor(
        private _dataBaseService: DataBaseService,
        public app: express.Application = express()
    ) {
        this._dataBaseService.connection.then(conn => conn.synchronize());
        useExpressServer(app, {
            routePrefix: '/api',
            cors: {exposedHeaders: ['Content-Disposition']},
            controllers: [
                PlanesController,
                ChairsController
            ]
        })
    }
}
const config = new Config();
const dataBaseService = new DataBaseService(config);
// noinspection UnnecessaryLocalVariableJS
const app = new App(dataBaseService).app;
export default app;