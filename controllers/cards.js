const Cards = require('../models/card');

const errCode = 400;
const errCodeNotFound = 404;
const errCodeDefault = 500;

module.exports.getCards = (req, res) => {
  Cards.find({})
    .then((cards) => res.send(cards))
    .catch(() => res.status(errCodeDefault).send({ message: 'На сервере произошла ошибка' }));
};

module.exports.createCard = (req, res) => {
  const { name, link } = req.body;
  const { _id } = req.user;
  Cards.create({ name, link, owner: _id })
    .then((card) => res.send({ card }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        res.status(errCode).send({ message: 'Переданы некорректные данные при создании карточки' });
      } else {
        res.status(errCodeDefault).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

module.exports.deleteCard = (req, res) => {
  Cards.findByIdAndDelete(req.params.cardId)
    .orFail(new Error('CardNotFound'))
    .then((card) => {
      res.send({ card });
    })
    .catch((err) => {
      if (err.message === 'CardNotFound') {
        res.status(errCodeNotFound).send({ message: 'Карточка с указанным _id не найдена' });
      } else if (err.name === 'CastError') {
        res.status(errCode).send({ message: 'Невалидный id' });
      } else {
        res.status(errCodeDefault).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

module.exports.likeCard = (req, res) => {
  Cards.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },
  )
    .orFail(new Error('CardNotFound'))
    .then((card) => {
      res.send({ card });
    })
    .catch((err) => {
      if (err.message === 'CardNotFound') {
        res.status(errCodeNotFound).send({ message: 'Карточка с указанным _id не найдена' });
      } else if (err.name === 'CastError') {
        res.status(errCode).send({ message: 'Невалидный id' });
      } else {
        res.status(errCodeDefault).send({ message: 'На сервере произошла ошибка' });
      }
    });
};

module.exports.dislikeCard = (req, res) => {
  Cards.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    {
      new: true,
      runValidators: true,
    },
  )
    .orFail(new Error('CardNotFound'))
    .then((card) => {
      res.send({ card });
    })
    .catch((err) => {
      if (err.message === 'CardNotFound') {
        res.status(errCodeNotFound).send({ message: 'Карточка с указанным _id не найдена' });
      } else if (err.name === 'CastError') {
        res.status(errCode).send({ message: 'Невалидный id' });
      } else {
        res.status(errCodeDefault).send({ message: 'На сервере произошла ошибка' });
      }
    });
};
