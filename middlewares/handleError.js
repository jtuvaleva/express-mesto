const { isCelebrateError } = require('celebrate');

module.exports = (err, req, res, next) => {
  let { statusCode = 500, message } = err;

  if (isCelebrateError(err)) {
    const errorBody = err.details.get('body');
    const { details: [errorDetails] } = errorBody;
    message = errorDetails.message;
    statusCode = 400;
  }

  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'На сервере произошла ошибка.'
        : message,
    });

  next();
};
