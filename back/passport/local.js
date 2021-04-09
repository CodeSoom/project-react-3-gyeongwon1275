const passport = require('passport');
const { Strategy: LocalStrategy } = require('passport-local');
const bcrypt = require('bcrypt');

const { User } = require('../models');

const passportConfig = { usernameField: 'userId', passwordField: 'password' };

const localLoginVerify = async (userId, password, done) => {
  try {
    const user = await User.findOne({
      where: { user_id: userId },
    });

    if (!user) {
      return done(null, false, { reason: '존재하지 않는 아이디입니다!' });
    }

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (isValidPassword) {
      return done(null, user);
    }

    return done(null, false, { reason: '비밀번호가 일치하지 않습니다!' });
  } catch (error) {
    console.error(error);
    return done(error);
  }
};

const setLocalLogin = () => {
  passport.use(
    'localLogin',
    new LocalStrategy(passportConfig, localLoginVerify),
  );
};

module.exports = { setLocalLogin };
