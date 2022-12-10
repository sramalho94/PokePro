const router = require('express').Router()
const UserRouter = require('./UserRouter')
const PokemonRouter = require('./PokemonRouter')

router.use('/users', UserRouter)
router.use('/pokemon', PokemonRouter)
module.exports = router
