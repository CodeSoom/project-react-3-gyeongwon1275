const { Sequelize } = require('sequelize');

const User = require('./user');
const Post = require('./post');
const Comment = require('./comment');
const Image = require('./image');

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const db = {};

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config,
);

db.User = User;
db.Post = Post;
db.Comment = Comment;
db.Image = Image;

Object.values(db).forEach((model) => {
  model.init(sequelize);
});

Object.keys(db).forEach((model) => {
  if (db[model].associate) {
    db[model].associate(db);
  }
});

db.sequelize = sequelize;

module.exports = db;
