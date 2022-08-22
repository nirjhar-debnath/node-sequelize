'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  User.init({
    fullname: {
      type: DataTypes.STRING,
      allowNull: false
    },
    countryCode: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    aadharId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
  }, {
    sequelize,
    tableName: 'user',
    modelName: 'User',
  });
  return User;
};