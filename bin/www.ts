/* eslint-disable no-console */
import { config } from 'dotenv';
import { createServer } from 'http';
import { onListening, onError } from '../util/serverInfo';
import app from '../index';

config({ path: './config/config.env' });
const port = process.env.PORT || 3000;
app.set('port', port);
const server = createServer(app);

server.listen(port);
console.log(server.address());
server.on('error', (error) => onError(error, server));
server.on('listening', () => onListening(server));
