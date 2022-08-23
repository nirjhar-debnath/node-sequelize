'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class AadharCardDetails extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({User}) {
      // define association here
      this.hasOne(User, { foreignKey: 'aadharId' })
    }
  }
  AadharCardDetails.init({
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true
    },
    aadharNumber: DataTypes.STRING,
    name: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'AadharCardDetails',
  });
  return AadharCardDetails;
};