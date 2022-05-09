import { Server } from 'http';

/* eslint-disable no-console */
export function pipeOrPort(address: string | any) :string {
  return typeof address === 'string' ? `pipe ${address}` : `port ${address.port}`;
}

export function onError(error: NodeJS.ErrnoException, server: Server) :never {
  if (error.syscall !== 'listen') throw error;
  if (server.address() === null) {
    console.log('Another instance of the server is already running.');
    process.exit(1);
  }
  const bind = pipeOrPort(server.address);
  switch (error.code) {
    case 'EACESS':
      console.error(`${bind} requires elevated privileges`);
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

export function onListening(server: Server) {
  const bind = pipeOrPort(server.address());
  console.log(`Listening on ${bind}`);
}
