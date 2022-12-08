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
      Trainer.belongsToMany(models.Pokemon, {
        as: 'trainer_team',
        through: models.Team,
        foreignKey: 'trainer_id'
      })
    }
  }
  Trainer.init(
    {
      name: {
        allowNull: false,
        unique: true,
        type: DataTypes.STRING
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
