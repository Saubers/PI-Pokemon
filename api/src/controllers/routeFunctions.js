const { Pokemon, Types } = require("../db");
const { default: axios } = require("axios");
const { v4: uuidv4 } = require("uuid");

const getTypes = async (_req, res) => {
    const typesApi = await axios.get(
      `https://pokeapi.co/api/v2/type`
    );
    const types = await typesApi.data.results?.map((el) => el.name);
    const accesTypes = await types?.map((el) => el);
    console.log(accesTypes);
    accesTypes?.forEach((el) => {
      Types?.findOrCreate({
        where: { name: el },
      });
    });
    const allTypes = await Types?.findAll();
    const everyType = await accesTypes?.concat(allTypes);
    res.send(everyType);
  };

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

  async function addPokemon(req, res, next) {
    const {
      name,
      image,
      healthpoints,
      attack,
      defense,
      speed,
      height,
      weight,
      types,
    } = req.body;
    try {
      const newPokemon = await Pokemon.create({
        id: uuidv4(),
        name,
        image,
        healthpoints,
        attack,
        defense,
        speed,
        height,
        weight,
      });
      const solvedTypes = types || types?.map((type) => type.name);
      await newPokemon.addTypes(solvedTypes);
      res.send(newPokemon);
    } catch (err) {
      {
        console.log("An error has been detected at getPokemonById.");
        next(err);
      }
    }
  }
  

  module.exports = {
 getTypes,
 getById,
 getPokemonByName,
 addPokemon 
} 