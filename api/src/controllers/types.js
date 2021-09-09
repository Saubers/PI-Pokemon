const { Pokemon, Type } = require("../db");
const { default: axios } = require("axios");


async function getTypes(req, res, next) {
  const typesApi = await axios.get("https://pokeapi.co/api/v2/type?limit=18");
  try {
  const types = typesApi.data.results
  return types;
} catch {
  (err) => {
    console.log("An error has been detected at requestAllTypes.");
    next(err);
  };
}
}

  async function dbTypes(req, res, next) {
    const answer = await Type.findAll({
      attributes: {
        include: ["name", "image"],
        exclude: ["createdAt", "updatedAt"],
      },
    });
    try {
      res.send(answer);
    } catch {
      (err) => {
        console.log("An error has been detected at dbTypes.");
        next(err);
      };
    }
  }
  


  async function updateTypes(req, res, next) {
    try {
      const types = await getTypes();
      for await (const element of types) {
        await Type.create({
          name: element.name,
          image: `https://typedex.app/types/${element.name}.png`,
        });
      }
      console.log("Types updated succesfully.");
    } catch {
      (err) => {
        console.log("An error has been detected at updateTypes.");
        next(err);
      };
    }
  }


  module.exports = {
 getTypes,
 dbTypes,
 updateTypes
} 