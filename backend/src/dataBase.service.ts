import {createConnection, Connection} from 'typeorm';
import {Service} from 'typedi';
import {Config} from './config';

@Service()
class DataBaseService {
    public readonly connection: Promise<Connection>;
    constructor(private config: Config) {
        console.log('DB_CONNECT:', config);

        this.connection = createConnection({
            type: "mysql",
            host: config.database.host,
            port: 3306,
            username: "root",
            password: "pass",
            database: "planes",
            extra: {insecureAuth: true},
            synchronize: true, //turn off this option on production!!!
            dropSchema: false,
            migrationsRun: false,
            logging: true,
            entities: [
                "out/models/**/*.js"
            ],
            migrations: [
                "out/migration/**/*.js"
            ],
            subscribers: [
                "out/subscriber/**/*.js"
            ],
            cli: {
                "entitiesDir": "src/models",
                "migrationsDir": "src/migration",
                "subscribersDir": "src/subscriber"
            }
        });
    }
}

export default DataBaseService;