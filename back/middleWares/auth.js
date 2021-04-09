const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

dotenv.config();

function getToken(authorization) {
  return authorization.split(' ')[1];
}

function authenticateJWT(request, response, next) {
  const token = getToken(request.headers.authorization);

  if (!token) {
    return response.status(401).send('로그인이 필요합니다.');
  }

  if (token) {
    const jwtOptions = {
      algorithms: 'HS256',
    };

    jwt.verify(token, process.env.JWT_SECRET_KEY, jwtOptions, (error, user) => {
      if (error) {
        return response.status(403).send('잘못된 접근입니다.');
      }
      request.user = user;
      next();
    });
  } else {
    response.status(403);
  }
}

module.exports = {
  authenticateJWT,
};
