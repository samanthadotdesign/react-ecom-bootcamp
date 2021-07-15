import { Sequelize } from 'sequelize';
import url from 'url';
import allConfig from '../config/config.js';

import itemModel from './item.mjs';
import orderModel from './order.mjs';

const env = process.env.NODE_ENV || 'development';

const config = allConfig[env];

const db = {};

let sequelize;

if (env === 'production') {
  // break apart the Heroku database url and rebuild the configs we need

  const { DATABASE_URL } = process.env;
  const dbUrl = url.parse(DATABASE_URL);
  const username = dbUrl.auth.substr(0, dbUrl.auth.indexOf(':'));
  const password = dbUrl.auth.substr(dbUrl.auth.indexOf(':') + 1, dbUrl.auth.length);
  const dbName = dbUrl.path.slice(1);

  const host = dbUrl.hostname;
  const { port } = dbUrl;

  config.host = host;
  config.port = port;

  sequelize = new Sequelize(dbName, username, password, config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

db.Item = itemModel(sequelize, Sequelize.DataTypes);
db.Order = orderModel(sequelize, Sequelize.DataTypes);

// One to many relationship
// One order has many items
db.Item.belongsTo(db.Order);
db.Order.hasMany(db.Item);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
