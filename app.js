const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { checkRoute, checkRequest } = require('./middlewares/errors');
const { saveUser } = require('./middlewares/user');

const app = express();
const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(saveUser);

app.use('/users', require('./routes/users'));
app.use('/cards', require('./routes/cards'));

app.use(checkRequest);
app.use(checkRoute);

app.listen(PORT);
