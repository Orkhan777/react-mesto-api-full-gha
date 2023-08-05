const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const ErrorAuth = require('../errors/ErrorAuth');
const ErrorNotFound = require('../errors/ErrorNotFound');
const ErrorBadRequest = require('../errors/ErrorBadRequest');
const ErrorConflict = require('../errors/ErrorConflict');

const { JWT_SECRET = 'test-secret' } = process.env;

const login = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .orFail(() => next(
      new ErrorAuth('Пользователя с таким email или паролем не существует'),
    ))
    .then((user) => {
      bcrypt.compare(password, user.password).then((isValidUser) => {
        if (isValidUser) {
          const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
            expiresIn: '7d',
          });
          res
            .status(200)
            .cookie('jwt', token, {
              maxAge: 3600000 * 24 * 7,
              sameSite: 'None',
              secure: true,
              httpOnly: true,
            })
            .send(user);
        } else {
          next();
        }
      });
    })
    .catch(next);
};

const createUser = (req, res, next) => {
  const {
    name, about, avatar, email, password,
  } = req.body;

  User.findOne({ email });

  bcrypt
    .hash(password, 10)
    .then((hash) => User.create({
      email,
      password: hash,
      name,
      about,
      avatar,
    }))
    .then((user) => {
      res.status(201).send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new ErrorBadRequest('Введены некоректные данные'));
      } else if (err.code === 11000) {
        next(
          new ErrorConflict('Пользователь с таким email уже зарегистрирован'),
        );
      } else {
        next(err);
      }
    });
};

const getAuthUser = (req, res, next) => {
  const id = req.user._id;
  User.findById(id)
    .orFail(() => next(new ErrorNotFound('Пользователя с указанным id не существует')))
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new ErrorBadRequest('Введены некоректные данные'));
      } else {
        next(err);
      }
    });
};

const getLogout = (req, res, next) => {
  res
    .status(202)
    .clearCookie('jwt', {
      sameSite: 'None',
      secure: true,
      httpOnly: true,
    })
    .send('cookie cleared');
  next();
};

const getUsers = (req, res, next) => {
  User.find({})
    .orFail(() => next(new ErrorNotFound('Пользователя с указанным id не существует')))
    .then((users) => {
      res.send(users);
    })
    .catch(next);
};

const getUser = (req, res, next) => {
  const { id } = req.params;
  User.findById(id)
    .orFail(() => next(new ErrorNotFound('Пользователя с указанным id не существует')))
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new ErrorBadRequest('Пользователя с указанным id не существует'));
      } else {
        next(err);
      }
    });
};

const updateUser = (req, res, next) => {
  const id = req.user._id;
  const { name, about } = req.body;
  User.findByIdAndUpdate(
    id,
    { name, about },
    { new: true, runValidators: true },
  )
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(ErrorBadRequest('Введены некорректные данные'));
      } else {
        next(err);
      }
    });
};

const updateAvatar = (req, res, next) => {
  const id = req.user._id;
  const { avatar } = req.body;
  User.findByIdAndUpdate(id, { avatar }, { new: true })
    .orFail(() => next(new ErrorNotFound('Ошибка валидации')))
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(ErrorBadRequest('Введены некорректные данные'));
      } else {
        next(err);
      }
    });
};

module.exports = {
  createUser,
  getUsers,
  getAuthUser,
  getUser,
  updateUser,
  updateAvatar,
  login,
  getLogout,
};
