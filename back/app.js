const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const cors = require('cors');
const passport = require('passport');

const { sequelize } = require('./models');

const postRouter = require('./routes/post');
const postsRouter = require('./routes/posts');
const imagesRouter = require('./routes/images');
const userRouter = require('./routes/user')
const nonMemberRouter = require('./routes/nonMember')

const passportConfig = require('./passport');

const app = express();

app.set('port', process.env.PORT || 80);

const whiteList = ['http://localhost:8080', 'http://animalphy-gyeongwon.s3-website.ap-northeast-2.amazonaws.com'];

app.use(
  cors({
    origin: whiteList,
  }),
);

app.use(express.json());

passportConfig();
app.use(passport.initialize());

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

app.use('/user', userRouter);

app.use('/non-member', nonMemberRouter);

app.use('/post', postRouter);

app.use('/images', imagesRouter);

app.use('/posts', postsRouter);

module.exports = app;
