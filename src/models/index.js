'use strict';

require('dotenv').config();
const { Sequelize, DataTypes } = require('sequelize');
const customersSchema = require('./customers.schema');

//'postgres://localhost:5432/api-app
//will use a ternary here to set up sqlite for testing
const DATABASE_URL = process.env.NODE_ENV === 'test'
  ? 'sqlite::memory'
  : process.env.DATABASE_URL;




// INSTANTIATE OUR SEQUELIZE CONNECTION TO OUR DATABASE

const sequelizeDatabase = new Sequelize(DATABASE_URL, {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnautorized: false,
    },
  },
});

// CREATE A CUSTOMER MODEL WITH OUR SCHEMA
const CustomerModel = customersSchema(sequelizeDatabase, DataTypes);

module.exports = {
  sequelizeDatabase,
  CustomerModel,
};
