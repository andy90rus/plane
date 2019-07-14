import {Service} from 'typedi';

export interface IConfig {
    port: number
    address: string
    database: IDbConfig
}

export interface IDbConfig {
    url: string;
    host: string;
    user: string;
    password: string;
}

@Service()
export class Config implements  IConfig {
    public readonly port: number;
    public readonly address: string;
    public readonly database: IDbConfig;
    constructor() {
        const data: IConfig = require('../configs/' + (process.env.NODE_ENV || 'dev') + '.config.json');
        this.port = data.port;
        this.database = data.database;
    }

}