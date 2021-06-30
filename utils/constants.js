const serverUrl = 'localhost:27017';
const dbName = 'mestodb';
const mongoParams = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
};

module.exports = {
  serverUrl,
  dbName,
  mongoParams,
};
