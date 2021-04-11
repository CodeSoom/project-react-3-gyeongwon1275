const express = require('express');
const bcrypt = require('bcrypt');

const router = express.Router();

const passport = require('passport');

const jwt = require('jsonwebtoken');

const { User } = require('../models');

const { authenticateJWT } = require('../middleWares/auth');


router.post('/signup', async (request, response, next) => {
  const { userId: user_id, password, userName: name, email, phone } = request.body;

  try {
    const isUserExisted = await User.findOne({ where: { user_id } });

    if (isUserExisted) {
      return res.status(403).send('이미 가입된 아이디 입니다!');
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await User.create({
      user_id,
      password: hashedPassword,
      name,
      email,
      phone,
    });

    response.status(201).send('ok');
  } catch (error) {
    console.error(error);
    next(error);
  }
});

router.post('/login', (request, response, next) => {
  passport.authenticate('localLogin', (error, user, info) => {
    if (error) {
      console.error(error);
      return next(error);
    }

    if (info) {
      return response.status(401).send(info.reason);
    }

    return request.login(user, { session: false }, async (loginError) => {
      if (loginError) {
        console.error(loginError);
        return next(loginError);
      }

      const { id } = user;

      const accessToken = jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
        algorithm: 'HS256',
      });

      return response.status(200).json({ accessToken });
    });
  })(request, response, next);
});

router.get('/', authenticateJWT, async (request, response, next) => {
  try {
    const user = await User.findOne({
      where: { id: request.user.id },
      attributes: {
        include: ['id', 'name'],
      },
    });

    if (user) {
      const { id, name } = user;
      return response.status(200).json({ id, name });
    } else {
      return response.status(404).send('존재하지 않는 회원입니다!');
    }

  } catch (error) {
    console.error(error);
    next(error);
  }

});

module.exports = router;