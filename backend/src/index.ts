import * as http from 'http';
import app from './app';
import {Container} from 'typedi';
import {Config} from './config';

const server = http.createServer(app);
const config = Container.get(Config);

server.listen(config.port);
server.on('listening', () => {
    const address = server.address();
    const bind = (typeof address === 'string') ? `pipe ${address}` : `port ${address.port}`;
    console.info(`Listening on ${bind}`);
});