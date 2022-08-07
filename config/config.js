require("dotenv").config();
const parseDbUrl = require("parse-database-url");

const {
  DB_DIALECT,
  DB_HOST,
  DB_NAME,
  DB_PASSWORD,
  DB_USER,
  CLEARDB_DATABASE_URL,
} = process.env;

const prodDBDetails = parseDbUrl(CLEARDB_DATABASE_URL);

const config = {
  development: {
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    host: DB_HOST,
    dialect: DB_DIALECT,
  },
  test: {
    username: DB_USER,
    password: DB_PASSWORD,
    database: DB_NAME,
    host: DB_HOST,
    dialect: DB_DIALECT,
  },
  production: {
    username: prodDBDetails.user,
    password: prodDBDetails.password,
    database: prodDBDetails.database,
    host: prodDBDetails.host,
    dialect: prodDBDetails.driver,
  },
};

module.exports = config;
