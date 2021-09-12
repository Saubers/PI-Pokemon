const axios = require('axios');
const { Pokemon, Type } = require('../db');
const {updateTypes} = require('./types')
const { v4: uuidv4 } = require("uuid");

async function getPokemonByName(req, res, next) {
  const { name } = req.query;
  const pkm = await Pokemon.findOne({
    where: {
      name: name,
    },
    include: {
      model: Type,
      attributes: {
        include: ["name"],
        exclude: ["createdAt", "updatedAt"],
      },
      through: { attributes: [] },
    },
  });
  if (pkm === null) {
    try {
      const answer = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${name}`
      );
      const response = answer.data;
      const pokemon = {
        id: response.id,
        name: response.name,
        image: response.sprites.other["official-artwork"].front_default,
        healthpoints: response.stats[0].base_stat,
        attack: response.stats[1].base_stat,
        defense: response.stats[2].base_stat,
        speed: response.stats[5].base_stat,
        height: response.height,
        weight: response.weight,
        createdInDB: response.createdInDB,
        types: response.types.map((el) => ({
          name: el.type.name,
          image: `https://typedex.app/types/${el.type.name}.png`,
        })),
      };
      res.send(pokemon);
    } catch {
      (err) => {
        console.log("An error has been detected at getPokemonByName.");
        next(err);
      };
    }
  } else {
    res.send(pkm);
  }
}

async function getApiInfo(_req, _res, next) {
    try {
      const APIanswer = await axios.get(
        "https://pokeapi.co/api/v2/pokemon?limit=40"
      );
      const APIpokemons = [];
      for await (const element of APIanswer.data.results) {
        const response = await axios.get(element.url);
        const apiInfo = response.data;
  
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
          createdInDB: apiInfo.createdInDB,
          types: apiInfo.types.map((el) => ({
            name: el.type.name,
            image: `https://typedex.app/types/${el.type.name}.png`,
          })),
        };
        APIpokemons.push(pokemon);
      }
      return APIpokemons;
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


async function getById(req, res, next) {
  const id = req.params.id;
  if (id.length > 10) {
    Pokemon.findOne({
      where: {
        id: id,
      },
      include: {
        model: Type,
        attributes: {
          include: ["name"],
          exclude: ["createdAt", "updatedAt"],
        },
        through: { attributes: [] },
      },
    })
      .then((pkm) => {
        res.send(pkm);
      })
      .catch((err) => {
        console.log("An error has been detected at getPokemonById.");
        next(err);
      });
  } else {
    try {
      const answer = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const response = answer.data;
      const pokemon = {
        id: response.id,
        name: response.name,
        image: response.sprites.other["official-artwork"].front_default,
        healthpoints: response.stats[0].base_stat,
        attack: response.stats[1].base_stat,
        defense: response.stats[2].base_stat,
        speed: response.stats[5].base_stat,
        height: response.height,
        weight: response.weight,
        createdInDB: response.createdInDB,
        types: response.types.map((el) => ({
          name: el.type.name,
          image: `https://typedex.app/types/${el.type.name}.png`,
        })),
      };
      res.send(pokemon);
    } catch {
      (err) => {
        console.log("An error has been detected at getPokemonById.");
        next(err);
      };
    }
  }
}

async function addPokemon(req, res, next) {
  await updateTypes();
  const {
    name,
    image,
    healthpoints,
    attack,
    defense,
    speed,
    height,
    weight,
    createdInDB,
    types,
  } = req.body;
  try {
    const newPokemon = await Pokemon?.create({
      id: uuidv4(),
      name,
      image,
      healthpoints,
      attack,
      defense,
      speed,
      height,
      weight,
      createdInDB
    });
    const solvedTypes = types?.map((type) => type.name);
    await newPokemon.addTypes(solvedTypes);
    res.send(newPokemon);
  } catch (err) {
    {
      console.log("An error has been detected at getPokemonById.");
      next(err);
    }
  }
}


module.exports ={ 
    getApiInfo,
    getDBPokemons,
    allPokemons,
    addPokemon,
    getById,
}