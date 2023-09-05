'use strict';
const bcrypt = require('bcrypt')
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  users.init({
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      get(){
        const value = this.getDataValue('username')
        return value.toUpperCase();
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      set(value){
        const salt = bcrypt.genSaltSync(12);
        const hash = bcrypt.hashSync(value, salt)
        this.setDataValue('password', hash);
      }
    }
  }, {
    sequelize,
    modelName: 'users',
  });
  return users;
};