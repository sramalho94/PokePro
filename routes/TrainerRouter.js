const router = require('express').Router()
const controller = require('../controllers/TrainerController')
middleware = require('../middleware')

// Get All Trainers
router.get('/', controller.GetAllTrainers)

// Get Trainer By ID
router.get('/id/:id', controller.GetTrainerById)

// Create A New Trainer
router.post(
  '/new_trainer',
  middleware.stripToken,
  middleware.verifyToken,
  controller.CreateTrainer
)

// Update A Trainer
router.put(
  '/:trainer_id',
  middleware.stripToken,
  middleware.verifyToken,
  controller.UpdateTrainer
)

// Delete A Trainer
router.delete(
  '/:trainer_id',
  middleware.stripToken,
  middleware.verifyToken,
  controller.DeleteTrainer
)

module.exports = router
