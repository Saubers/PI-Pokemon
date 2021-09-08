/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Pokemon, conn } = require('../../src/db.js');

const agent = session(app);
const pokemon = {
  name: 'Pikachu',
};

describe('Pokemon routes', () => {
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));
  beforeEach(() => Pokemon.sync({ force: true })
    .then(() => Pokemon.create(pokemon)));
  describe('GET /pokemons', () => {
    it('should res 200', (done) => {
      agent.get('/pokemons').expect(200)
      done();
    });
    it('should return 40 pokemons', (done) => {
      agent.get('/pokemons')
      .then(res => expect(res.body.API_Pokemons.length).to.be.equal(40))
      done();
    })
    it('should search by name', (done) => {
      agent.get('/pokemons?name=bulbasaur')
      .then(res => expect(res.body.name).to.be.equal('bulbasaur'))
      done();
    })
    it('should search by id', () => {
      agent.get('/pokemons/1').then((res) => {
        expect(res.body)
      })
    })
  });

  describe('POST /pokemons', () => {
    it('should create a new pokemon', () => {
      agent.post('/pokemons')
      .send({
        "name": "carlitos",
        "image": "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQneX2OwCcPMNd7RkjJtUGnZRJrAR9ciOoFrw&usqp=CAU",
        "healthpoints": 3,
        "attack": 3,
        "defense": 3,
        "speed": 3,
        "height": 3,
        "weight": 10,
        "types": [
            {"name":"poison"},
            {"name": "bug"}
        ]
      })
      .then(res => {
        expect(res.body.name).to.be.equal('carlitos')
      });
    });
  });

  describe('GET /aafaxsad', () => {
    it('should return an error at invalid route', () => {
      agent.get('/aafaxsad').then(res => {
        expect(res.body).to.be.equal("Cannot be Found!")
      })
    })
  })

  describe('GET /types', () => {
    it('should return 18 types', () =>{
      agent.get('/types').then(res => {
        expect(res.body.length).to.be.equal(18)
      })
    })
  })
});
