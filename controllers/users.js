const User = require('../models/user');

const errCode = 400;
const errCodeNotFound = 404;
const errCodeDefault = 500;

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch(() => res.status(errCodeDefault).send({ message: 'На сервере произошла ошибка' }));
};

module.exports.getUser = (req, res) => {
  User.findById(req.params.id)
    .orFail(new Error('UserNotFound'))
    .then((user) => {
      res.send({ data: user });
    })
    .catch((err) => {
      if (err.message === 'UserNotFound') {
        res.status(errCodeNotFound).send({ message: 'Запрашиваемый пользователь не найден' });
      } else if (err.name === 'CastError') {
        res.status(errCode).send({ message: 'Невалидный id' });
      } else {
        res.status(errCodeDefault).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(errCode).send({ message: 'Неверные данные' });
      } else {
        res.status(errCodeDefault).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

module.exports.updateProfile = (req, res) => {
  const { name, about } = req.body;
  const filteredBody = {};

  if (name) {
    filteredBody.name = name;
  }

  if (about) {
    filteredBody.about = about;
  }

  User.findByIdAndUpdate(
    req.user._id,
    { $set: filteredBody },
    {
      new: true,
      runValidators: true,
    },
  )
    .orFail(new Error('UserNotFound'))
    .then((user) => {
      res.send({ user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(errCode).send({ message: 'Переданы некорректные данные при обновлении профиля' });
      } else if (err.name === 'CastError') {
        res.status(errCode).send({ message: 'Невалидный id пользователя' });
      } else if (err.message === 'UserNotFound') {
        res.status(errCodeNotFound).send({ message: 'Пользователь с указанным _id не найден' });
      } else {
        res.status(errCodeDefault).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

module.exports.updateAvatar = (req, res) => {
  const { avatar } = req.body;

  User.findByIdAndUpdate(
    req.user._id,
    { $set: { avatar } },
    {
      new: true,
      runValidators: true,
    },
  )
    .orFail(new Error('UserNotFound'))
    .then((user) => {
      res.send({ user });
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(errCode).send({ message: 'Переданы некорректные данные при обновлении аватара' });
      } else if (err.name === 'CastError') {
        res.status(errCode).send({ message: 'Невалидный id пользователя' });
      } else if (err.message === 'UserNotFound') {
        res.status(errCodeNotFound).send({ message: 'Пользователь с указанным _id не найден' });
      } else {
        res.status(errCodeDefault).send({ message: 'На сервере произошла ошибка' });
      }
    });
};
