const router = require('express').Router();
const {
  getCards, createCard, deleteCard, likeCard, dislikeCard,
} = require('../controllers/cards');
const { checkPermission } = require('../middlewares/permission');
const { validateCardEntry } = require('../middlewares/validation');

router.get('/', getCards);

router.post('/', validateCardEntry, createCard);

router.delete('/:cardId', checkPermission, deleteCard);

router.put('/:cardId/likes', likeCard);

router.delete('/:cardId/likes', dislikeCard);

module.exports = router;
