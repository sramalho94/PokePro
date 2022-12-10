const router = require('express').Router()
const UserRouter = require('./UserRouter')
const PokemonRouter = require('./PokemonRouter')
const TrainerRouter = require('./TrainerRouter')

router.use('/users', UserRouter)
router.use('/pokemon', PokemonRouter)
router.use('/trainers', TrainerRouter)

module.exports = router
