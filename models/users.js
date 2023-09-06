'use strict';
const bcrypt = require('bcrypt')
const zlib = require('zlib')
const {
  Model
} = require('sequelize');
const { buffer } = require('stream/consumers');
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
    toJSON(){
      return {...this.get(), id : undefined}
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
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        set(value){
          const compressed = zlib.deflateSync(value).toString('base64');
          this.setDataValue('email', compressed);
        },
        get(){
          const value = this.getDataValue('email');
          const uncompressed = zlib.inflateSync(Buffer.from(value, 'base64'));
          return uncompressed.toString()
        }
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false
    },
    aboutUser : {
      type: DataTypes.VIRTUAL,
      get(){
        return `Hi i am ${this.username}, I am working as a ${this.role}`
      }
    }
  }, {
    sequelize,
    modelName: 'users',
  });
  return users;
};