/* eslint-disable no-console */
import { config } from 'dotenv';
import { createServer } from 'http';
import app from '../index';

config({ path: './config/config.env' });
const port = process.env.PORT || 3000;
app.set('port', port);
const server = createServer(app);

function pipeOrPort(address: string | any) :string {
  return typeof address === 'string' ? `pipe ${address}` : `port ${address.port}`;
}

function onError(error: NodeJS.ErrnoException) :never {
  if (error.syscall !== 'listen') throw error;

  const bind = pipeOrPort(server.address);
  switch (error.code) {
    case 'EACESS':
      console.log(`${bind} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.log(`${bind} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

function onListening() {
  const bind = pipeOrPort(server.address());
  console.log(`Listening on ${bind}`);
}

server.listen(port);

server.on('error', onError);
server.on('listening', onListening);
