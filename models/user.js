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
    static associate({AadharCardDetails}) {
      // define association here
      this.belongsTo(AadharCardDetails, { foreignKey: 'aadharId' })
    }
  }
  User.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    fullname: DataTypes.STRING,
    countryCode: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};