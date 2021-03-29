module.exports = {
  development: {
    username: 'beastmaster',
    password: process.env.DB_PASSWORD,
    database: 'animalphy',
    host: '127.0.0.1',
    dialect: 'mysql',
  },
  test: {
    username: 'beastmaster',
    password: process.env.DB_PASSWORD,
    database: 'animalphy',
    host: '127.0.0.1',
    dialect: 'mysql',
  },
  production: {
    username: 'beastmaster',
    password: process.env.DB_PASSWORD,
    database: 'animalphy',
    host: '127.0.0.1',
    dialect: 'mysql',
  },
};
