const { Trainer } = require('../models')

// Get All Trainers
const GetAllTrainers = async (req, res) => {
  try {
    const trainers = await Trainer.findAll({})
    res.send(trainers)
  } catch (error) {
    throw error
  }
}

// Get Trainer By ID
const GetTrainerById = async (req, res) => {
  try {
    const trainer = await Trainer.findByPk(req.params.id)
    res.send(trainer)
  } catch (error) {
    throw error
  }
}

// Create A Trainer
const CreateTrainer = async (req, res) => {
  try {
    let TrainerBody = req.body
    const createdTrainer = await Trainer.create(TrainerBody)
    res.send(createdTrainer)
  } catch (error) {
    throw error
  }
}

// Update A Trainer
const UpdateTrainer = async (req, res) => {
  try {
    let trainerId = parseInt(req.params.trainer_id)

    let updatedTrainer = await Trainer.update(req.body, {
      where: { id: trainerId },
      returning: true
    })
    res.send(updatedTrainer)
  } catch (error) {
    throw error
  }
}

// Delete A Trainer
const DeleteTrainer = async (req, res) => {
  try {
    let trainerId = parseInt(req.params.trainer_id)
    await Trainer.destroy({ where: { id: trainerId } })
    res.send({ message: `Deleted trainer with an id of ${trainerId}` })
  } catch (error) {
    throw error
  }
}

module.exports = {
  GetAllTrainers,
  GetTrainerById,
  CreateTrainer,
  UpdateTrainer,
  DeleteTrainer
}
