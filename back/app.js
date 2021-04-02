const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config();

const { sequelize } = require('./models');

const postRouter = require('./routes/post');
const postsRouter = require('./routes/posts');

const app = express();

app.set('port', process.env.PORT || 80);

const whiteList = ['http://localhost:8080'];

app.use(
  cors({
    origin: whiteList,
  }),
);

app.use(express.json());

sequelize
  .sync()
  .then(() => {
    console.log('db 연결 성공');
  })
  .catch((error) => {
    console.error(error);
  });

app.get('/', (req, res) => {
  res.send('Hello AnimalPhy!');
});

app.use('/post', postRouter);

app.use('/posts', postsRouter);

module.exports = app;
