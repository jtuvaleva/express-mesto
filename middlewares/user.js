module.exports = {
  saveUser(req, res, next) {
    req.user = {
      _id: '60c3df30fece95246b313636',
    };
    next();
  },
};
