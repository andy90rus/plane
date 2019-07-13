import {Service} from 'typedi';

export interface IConfig {
    port: number
    address: string
    dataBase: IDbConfig
}

export interface IDbConfig {
    url: string;
    user: string;
    password: string;
}

@Service()
export class Config implements  IConfig {
    public readonly port: number;
    public readonly address: string;
    public readonly dataBase: IDbConfig;
    constructor() {
        const data: IConfig = require('../configs/config.json');
        this.port = data.port;
        this.dataBase = data.dataBase;
    }

}