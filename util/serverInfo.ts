/* eslint-disable no-console */
export function onError(error: NodeJS.ErrnoException, port: string | number) :never {
  if (error.syscall !== 'listen') throw error;
  switch (error.code) {
    case 'EACESS':
      console.error(`${port} requires elevated privileges`);
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.log(`${port} is already in use`);
      process.exit(1);
      break;
    default:
      throw error;
  }
}

export function onListening(port: string | number) {
  console.log(`Listening on ${port}`);
}
