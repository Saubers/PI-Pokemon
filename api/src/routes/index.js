const { Router } = require('express');
const { getTypes, getById } = require('../controllers/routeFunctions');
const { allPokemons} = require('../controllers/backFunctions')
const { addPokemon } = require('../controllers/routeFunctions')

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get('/pokemons', allPokemons)
router.use('/pokemons/:id', getById)
router.use('/types', getTypes )
router.post('/pokemons', addPokemon)



module.exports = router;
