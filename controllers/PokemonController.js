const { Pokemon } = require('../models')

const GetAllPokemon = async (req, res) => {
  try {
    const pokemon = await Pokemon.findAll({})
    res.send(pokemon)
  } catch (error) {
    throw error
  }
}

const GetPokemonById = async (req, res) => {
  try {
    const pokemon = await Pokemon.findByPk(req.params.id)
    res.send(pokemon)
  } catch (error) {
    throw error
  }
}

const GetPokemonByTypes = async (req, res) => {
  try {
    const { pokemon_type } = req.params
    const pokemon = await Pokemon.findAll()
    if (pokemon) {
      let found_pokemon = []
      pokemon.map((poke) => {
        let types = poke.types
        if (types.includes(pokemon_type)) {
          found_pokemon.push(poke)
          console.log(found_pokemon)
        }
      })
      return res.status(200).json({ found_pokemon })
    }
  } catch (error) {
    return res.status(500).send(error.message)
  }
}

const CreatePokemon = async (req, res) => {
  try {
    let PokemonBody = req.body
    const createdPokemon = await Pokemon.create(PokemonBody)
    res.send(createdPokemon)
  } catch (error) {
    throw error
  }
}

const UpdatePokemon = async (req, res) => {
  try {
    let pokemonId = parseInt(req.params.pokemon_id)

    let updatedPokemon = await Pokemon.update(req.body, {
      where: { id: pokemonId },
      returning: true
    })
    res.send(updatedPokemon)
  } catch (error) {
    throw error
  }
}

const DeletePokemon = async (req, res) => {
  try {
    let pokemonId = parseInt(req.params.pokemon_id)
    await Pokemon.destroy({ where: { id: pokemonId } })
    res.send({ message: `Delete pokemon with an id of ${pokemonId}` })
  } catch (error) {
    throw error
  }
}

module.exports = {
  GetAllPokemon,
  GetPokemonById,
  GetPokemonByTypes,
  CreatePokemon,
  UpdatePokemon,
  DeletePokemon
}
