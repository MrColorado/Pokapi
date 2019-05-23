import * as bodyParser from 'body-parser';
import * as express from 'express';
import { useExpressServer } from 'routing-controllers';
import { PokemonSpeciesController } from '../controller/PokemonSpeciesController';
import { TypeController } from '../controller/TypeController';
import createTypeormConnection from './createTypeormConnection';

export let connection;

export default async function createApp() {
  const app = express();
  useExpressServer(app, {
    controllers: [
      PokemonSpeciesController,
      TypeController,
    ],
  });
  app.use(bodyParser.json());

  connection = await createTypeormConnection();

  return app;
}
