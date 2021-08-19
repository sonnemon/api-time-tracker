import express from 'express';
import 'express-async-errors';
import { json } from 'body-parser';
import { errorHandler } from './middlewares/error-handler';

import { openProjectRouter } from './routes/open';
import { closeProjectRouter } from './routes/close';
import { listProjectRouter } from './routes/list';
import { oneProjectRouter } from './routes/one';

import { NotFoundError } from './errors/not-found-error';

const app = express();
app.set('trust proxy', true);
app.use(json());

app.use(openProjectRouter);
app.use(closeProjectRouter);
app.use(listProjectRouter);
app.use(oneProjectRouter);

app.all('*', async () => {
  throw new NotFoundError();
});

app.use(errorHandler);

export { app };
