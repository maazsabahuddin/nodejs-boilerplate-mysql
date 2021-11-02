"use strict";

const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(__filename);
const config = require("../config");
const db = {};

let sequelize = new Sequelize(config.database, config.username, config.password, {
  host: 'localhost',
  logging: function () {},
  dialect: 'mysql'
});

fs.readdirSync(__dirname)
  .filter((file) => {
    return file.indexOf(".") !== 0 && file !== basename && file.slice(-3) === ".js";
  })
  .forEach((file) => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;


// const config = require("../config");
// const Sequelize = require("sequelize");
// const sequelize = new Sequelize(config.database, config.username, config.password, {
//     host: 'localhost',
//     dialect: 'mysql',
//     logging: function () {},
//     pool: {
//         max: 5,
//         min: 0,
//         idle: 10000
//     }
// });
// // const sequelize = new Sequelize('database', config.username, config.password, {
// //     dialect: 'mysql'
// //   })

// module.exports = sequelize;