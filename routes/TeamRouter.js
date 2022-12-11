const router = require('express').Router()
const controller = require('../controllers/TeamController')

// Get All Teams By Pokemon
router.get(
  '/bypoke',
  middleware.stripToken,
  middleware.verifyToken,
  controller.GetAllTeamsByPokemon
)

// Get All Teams By Trainer
router.get(
  '/bytrainer',
  middleware.stripToken,
  middleware.verifyToken,
  controller.GetAllTeamsByTrainer
)
// Get Team By Trainer
router.get(
  '/trainer/:trainer_id',
  middleware.stripToken,
  middleware.verifyToken,
  controller.GetTeamsByTrainer
)

// Create A New Team
router.post(
  '/new_team/:trainer_id',
  middleware.stripToken,
  middleware.verifyToken,
  controller.CreateTeam
)

// Delete A Team
router.delete(
  '/trainer/:trainer_id/pokemon/:pokemon_id',
  middleware.stripToken,
  middleware.verifyToken,
  controller.DeleteTeam
)

module.exports = router
