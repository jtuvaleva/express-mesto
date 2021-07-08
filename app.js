const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');

const handleError = require('./middlewares/handleError');
const auth = require('./middlewares/auth');
const { createUser, login } = require('./controllers/users');
const { validateSignUp, validateSignIn } = require('./middlewares/validation');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const NotFoundError = require('./errors/not-found-err');
const { serverUrl, dbName, mongoParams } = require('./utils/constants');

const app = express();
app.use(helmet());
app.use(cookieParser());

const { PORT = 3000 } = process.env;

const connectDB = async () => {
  try {
    await mongoose.connect(`mongodb://${serverUrl}/${dbName}`, mongoParams);
    console.log('База данных MongoDB подключена');
  } catch (err) {
    console.log('Проблемы с подключением к MongoDB', err);
    process.exit(1);
  }
};

connectDB();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(requestLogger);

app.post('/signin', validateSignIn, login);
app.post('/signup', validateSignUp, createUser);

app.use(auth);

app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.use(errorLogger);

app.use('*', () => {
  throw new NotFoundError('Неверный роутер, страница не найдена');
});

app.use(handleError);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
