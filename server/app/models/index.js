import dbConfig from "../config/db.config";
import Sequelize from "sequelize";
import TutorialModel from "./tutorial.model.js";

/**
 * sequelize 세팅
 */
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle,
  },
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.tutorials = TutorialModel(sequelize, Sequelize);

module.exports = db;
