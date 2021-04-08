const express = require('express');
const bcrypt = require('bcrypt');

const router = express.Router();

const { User } = require('../models');


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

module.exports = router;