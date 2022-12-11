const router = require('express').Router()
const UserRouter = require('./UserRouter')
const PokemonRouter = require('./PokemonRouter')
const TrainerRouter = require('./TrainerRouter')
const TeamRouter = require('./TeamRouter')

router.use('/users', UserRouter)
router.use('/pokemon', PokemonRouter)
router.use('/trainers', TrainerRouter)
router.use('/teams', TeamRouter)

module.exports = router
