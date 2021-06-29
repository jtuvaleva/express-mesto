const router = require('express').Router();

const {
  getUsers, getUser, getCurrentUser, updateProfile, updateAvatar,
} = require('../controllers/users');
const { validateUpdateAvatarEntry, validateUpdateProfileEntry } = require('../middlewares/validation');

router.get('/me', getCurrentUser);

router.get('/:id', getUser);

router.get('/', getUsers);

router.patch('/me', validateUpdateProfileEntry, updateProfile);

router.patch('/me/avatar', validateUpdateAvatarEntry, updateAvatar);

module.exports = router;
