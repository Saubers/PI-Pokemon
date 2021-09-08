const { Router } = require('express');
const { allPokemons, addPokemon, getById} = require('../controllers/backFunctions')
const { dbTypes, updateTypes } = require('../controllers/types')

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
updateTypes()
router.get('/pokemons', allPokemons)
router.use('/pokemons/:id', getById)
router.use('/types', dbTypes )
router.post('/pokemons', addPokemon)



module.exports = router;
