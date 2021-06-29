const CastError = require('../errors/cast-err');
const ForbiddenError = require('../errors/forbidden-err');
const NotFoundError = require('../errors/not-found-err');
const Cards = require('../models/card');

module.exports = {
  checkPermission(req, res, next) {
    Cards.findById(req.params.cardId)
      .orFail(new NotFoundError('Карточка с указанным _id не найдена'))
      .then((card) => {
        if (!card.owner.equals(req.user._id)) {
          throw new ForbiddenError('Нет прав на удаление');
        } else {
          next();
        }
      })
      .catch((err) => {
        if (err.name === 'CastError') {
          next(new CastError('Невалидный id'));
        } else {
          next(err);
        }
      });
  },
};
