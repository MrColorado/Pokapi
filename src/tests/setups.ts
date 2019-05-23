import createApp from '../utils/createApp';
import createTypeormConnection from '../utils/createTypeormConnection';
import loadFixtures from './utils/loadFixtures';
import { getRepository } from 'typeorm';
import { PokemonSpecies } from '../entities/PokemonSpecies';
import { Type } from '../entities/Type';
import { beforeEach, before, after } from 'mocha';

export let app;

export let pokemonSpecies: PokemonSpecies[];
export let types: Type[];

before(async () => {
  try {
    app = await createApp();
    this.connection = await createTypeormConnection();
    await loadFixtures(
        'Types.yml',
    );
    await loadFixtures(
        'PokemonSpecies.yml',
    );
  } catch (err) {
    console.error(err);
  }
});

beforeEach(fillDb);

async function fillDb() {
  pokemonSpecies = await getRepository(PokemonSpecies).find(
      { relations: ['primaryType', 'secondaryType'] });
  types = await getRepository(Type).find();
}

async function clearDb() {
  await getRepository(PokemonSpecies).delete({});
  await getRepository(Type).delete({});
}

after(async () => {
  await clearDb();
});
