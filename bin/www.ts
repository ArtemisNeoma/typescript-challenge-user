import { config } from 'dotenv';
import { onListening, onError } from '../util/serverInfo';
import app from '../index';

config({ path: './config/config.env' });
const port = process.env.PORT || 3000;

app.listen(port, () => {})
  .on('error', (error: NodeJS.ErrnoException) => onError(error, port))
  .on('listening', () => onListening(port));
