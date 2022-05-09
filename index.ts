import express, { Express, json } from 'express';
import helmet from 'helmet';
import routes from './presentation/routes/Routes';

const app: Express = express();
app.use(helmet());
app.use(json());
app.use(routes);

export default app;
