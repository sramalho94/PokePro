'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Trainer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Trainer.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
      },
      image: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'Trainer',
      tableName: 'trainers'
    }
  )
  return Trainer
}
