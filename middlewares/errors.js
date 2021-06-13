module.exports = {
  checkRoute(req, res, next) {
    res.status(404).send({ message: 'Неверный роутер' });
    next();
  },
  checkRequest(err, req, res, end) {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
      res.status(400).send({ message: 'Неверные данные' });
    }
    end();
  },
};
