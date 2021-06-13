const mongoose = require('mongoose');
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
  const userId = mongoose.Types.ObjectId(req.params.id.toString());
  User.findById(userId)
    .then((user) => {
      if (user) {
        res.send({ data: user });
      } else {
        res.status(errCodeNotFound).send({ message: 'Запрашиваемый пользователь не найден' });
      }
    })
    .catch(() => res.status(errCodeDefault).send({ message: 'На сервере произошла ошибка' }));
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
    .then((user) => {
      if (user) {
        res.send({ user });
      } else {
        res.status(errCodeNotFound).send({ message: 'Пользователь с указанным _id не найден' });
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(errCode).send({ message: 'Переданы некорректные данные при обновлении профиля' });
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
    .then((user) => {
      if (user) {
        res.send({ user });
      } else {
        res.status(errCodeNotFound).send({ message: 'Пользователь с указанным _id не найден' });
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(errCode).send({ message: 'Переданы некорректные данные при обновлении аватара' });
      } else {
        res.status(errCodeDefault).send({ message: 'На сервере произошла ошибка' });
      }
    });
};
