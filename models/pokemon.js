'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Pokemon extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Pokemon.init(
    {
      name: {
        unique: true,
        allowNull: false,
        type: DataTypes.STRING
      },
      image: DataTypes.STRING,
      types: DataTypes.ARRAY
    },
    {
      sequelize,
      modelName: 'Pokemon'
    }
  )
  return Pokemon
}