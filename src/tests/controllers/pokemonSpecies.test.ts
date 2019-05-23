import * as chai from 'chai';
import chaiHttp = require('chai-http');
import { app, pokemonSpecies } from '../setups';
import { it, describe } from 'mocha';

chai.use(chaiHttp);

const expect = chai.expect;

describe('PokemonSpeciesController GET', () => {
  it('Should respond with 200', async () => {
    const res = await chai.request(app).get('/pokemons');
    expect(res).to.have.status(200);
  });

  it('Should return existing types', async () => {
    const res = await chai.request(app).get('/pokemons');
    expect(res).to.be.json;
    expect(res.body).to.have.length.above(0);
    expect(res.body).to.have.length(pokemonSpecies.length);
    const dbIds = pokemonSpecies.map(list => list.id);
    const responseIds = res.body.map(list => list.id);
    expect(responseIds).to.have.members(dbIds);
  });
});
