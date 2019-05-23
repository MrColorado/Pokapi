import 'reflect-metadata';
import { createConnection } from 'typeorm';
import * as bodyParser from 'body-parser';
import { createExpressServer } from 'routing-controllers';
import {
  PokemonSpeciesController,
} from './controller/PokemonSpeciesController';
import { TypeController } from './controller/TypeController';
import * as express from 'express';
const sentry = require('@sentry/node');

sentry.init({ dsn: 'https://8e20f4e44b6c42b8a7aa604610f504b4@sentry.io/1466540' });

createConnection().then(async (connection) => {

  // create express app
  const app = createExpressServer({
    controllers: [PokemonSpeciesController, TypeController],
  });

  app.use(sentry.Handlers.requestHandler() as express.RequestHandler);
  app.get('/', (req, res) => {
    throw new Error('Broke!');
  });
  app.use(sentry.Handlers.errorHandler() as express.ErrorRequestHandler);

  app.use((err, req, res, next) => {
    // The error id is attached to `res.sentry` to be returned
    // and optionally displayed to the user for support.
    res.statusCode = 500;
    res.end(`${res.sentry}\n`);
  });

  app.use(bodyParser.json());

  // start express server
  app.listen(process.env.PORT || 3000);

  console.log(`Express server has started on port 3000.
Open http://localhost:3000/users to see results`);

}).catch(error => console.log(error));
