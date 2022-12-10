const router = require('express').Router()
const controller = require('../controllers/PokemonController')
const middleware = require('../middleware')

// Get All Pokemon
router.get('/', controller.GetAllPokemon)

// Get Pokemon By ID
router.get('/id/:id', controller.GetPokemonById)

// Get Pokemon By Types
router.get('/types/:pokemon_type', controller.GetPokemonByTypes)

// Create A New Pokemon
router.post(
  '/new_pokemon',
  middleware.stripToken,
  middleware.verifyToken,
  controller.CreatePokemon
)

// Update A Pokemon
router.put(
  '/:pokemon_id',
  middleware.stripToken,
  middleware.verifyToken,
  controller.UpdatePokemon
)

// Delete A Pokemon
router.delete(
  '/:pokemon_id',
  middleware.stripToken,
  middleware.verifyToken,
  controller.DeletePokemon
)

module.exports = router
