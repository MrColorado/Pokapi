import * as chai from 'chai';
import chaiHttp = require('chai-http');
import { app, types } from '../setups';
import { it, describe } from 'mocha';
import { myFunc, myComplexFunc } from '../../functions';

chai.use(chaiHttp);

const expect = chai.expect;

describe('TypeController GET', () => {
  it('Should respond with 200', async () => {
    const res = await chai.request(app).get('/types');
    expect(res).to.have.status(200);
  });

  it('Should return existing types', async () => {
    const res = await chai.request(app).get('/types');
    expect(res).to.be.json;
    expect(res.body).to.have.length.above(0);
    expect(res.body).to.have.length(types.length);
    const dbIds = types.map(list => list.name);
    const responseIds = res.body.map(list => list.name);
    expect(responseIds).to.have.members(dbIds);
  });
});

describe('Totaly useless tests', () => {
  it('Shoud add two numbers', () => expect(myFunc(2, 3)).to.eq(5));

  it('Should return itself', () => expect(myComplexFunc(10)).to.eq(10));
});
