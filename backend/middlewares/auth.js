const jwt = require('jsonwebtoken');
const ErrorAuth = require('../errors/ErrorAuth'); // 401

const { JWT_SECRET = 'test-secret' } = process.env;

const auth = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;
  try {
    payload = jwt.verify(token, JWT_SECRET);
  } catch (err) {
    next(
      new ErrorAuth(
        'Доступ к запрашиваемому ресурсу закрыт. Требуется аутентификация.',
      ),
    );
  }
  req.user = payload;
  next();
};

module.exports = {
  auth,
};
