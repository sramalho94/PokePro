const { Team, Pokemon, Trainer } = require('../models')
const pokemon = require('../models/pokemon')

const GetAllTeamsByPokemon = async (req, res) => {
  try {
    const teams = await Pokemon.findAll({
      include: [
        {
          model: Trainer,
          as: 'trainer_id',
          through: { attributes: [] }
        }
      ]
    })
    res.send(teams)
  } catch (error) {
    throw error
  }
}

const GetAllTeamsByTrainer = async (req, res) => {
  try {
    const teams = await Trainer.findAll({
      include: [
        {
          model: Pokemon,
          as: 'pokemon_team',
          through: { attributes: [] }
        }
      ]
    })
    res.send(teams)
  } catch (error) {
    throw error
  }
}

const GetTeamsByTrainer = async (req, res) => {
  try {
    const { trainer_id } = req.params
    const team = await Trainer.findByPk(trainer_id, {
      include: [
        {
          model: Pokemon,
          as: 'pokemon_team',
          through: { attributes: [] }
        }
      ]
    })
    res.send(team)
  } catch (error) {
    res.status(500).send(error).message
  }
}

const CreateTeam = async (req, res) => {
  try {
    let trainer_id = parseInt(req.params.trainer_id)
    let teamBody = {
      trainer_id,
      ...req.body
    }
    const createdTeam = await Team.create(teamBody)
    res.send(createdTeam)
  } catch (error) {
    throw error
  }
}

const DeleteTeam = async (req, res) => {
  try {
    const { trainer_id, pokemon_id } = req.params
    await Team.destroy({
      where: {
        trainer_id: parseInt(trainer_id),
        pokemon_id: parseInt(pokemon_id)
      },
      returning: true
    })
    res.send({
      message: `Deleted team with pokemon_id of ${pokemon_id} and trainer of ${trainer_id}`
    })
  } catch (error) {
    throw error
  }
}

module.exports = {
  GetAllTeamsByPokemon,
  GetAllTeamsByTrainer,
  GetTeamsByTrainer,
  CreateTeam,
  DeleteTeam
}
