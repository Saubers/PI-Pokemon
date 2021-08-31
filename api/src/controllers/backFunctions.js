const axios = require('axios');
const { Pokemon, Type } = require('../db');
const { getPokemonByName } = require('../controllers/routeFunctions')


async function getApiInfo(_req, _res, next) {
    try {
      const API_Answer = await axios.get(
        "https://pokeapi.co/api/v2/pokemon?limit=40"
      );
      const API_Pokemons = [];
      for await (const element of API_Answer.data.results) {
        const r = await axios.get(element.url);
        const apiInfo = r.data;
  
        const pokemon = {
          id: apiInfo.id,
          name: apiInfo.name,
          image: apiInfo.sprites.other["official-artwork"].front_default,
          healthpoints: apiInfo.stats[0].base_stat,
          attack: apiInfo.stats[1].base_stat,
          defense: apiInfo.stats[2].base_stat,
          speed: apiInfo.stats[5].base_stat,
          height: apiInfo.height,
          weight: apiInfo.weight,
          types: apiInfo.types.map((el) => ({
            name: el.type.name,
            image: `https://typedex.app/types/${el.type.name}.png`,
          })),
        };
        API_Pokemons.push(pokemon);
      }
      return API_Pokemons;
    } catch {
      (err) => {
        console.log("An error has been detected at requestPokemons.");
        next(err);
      };
    }
  }

function getDBPokemons(req, res, next) {
    return Pokemon.findAll({
      include: {
        model: Type,
        attributes: {
          include: ["name"],
          exclude: ["createdAt", "updatedAt"],
        },
        through: { attributes: [] },
      },
    })
      .then((pkmList) => {
        return pkmList;
      })
      .catch((err) => {
        console.log("An error has been detected at getAllPokemons.");
        next(err);
      });
  }

  async function allPokemons(req, res, next){
      if (!req.query.name) {
    const pokemonDB = await getDBPokemons();
    const pokemonApi = await getApiInfo();
    const answer = pokemonApi.concat(pokemonDB);
    res.send(answer);
  } else {
    getPokemonByName(req, res, next);
  };
}


module.exports ={ 
    getApiInfo,
    getDBPokemons,
    allPokemons
}