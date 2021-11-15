require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const errorHandler = require('./middleware/errorHandler');
const redirector = require('./routers/redirector');
const apiHandler = require('./routers/api');
const app = express();

app.use(cors());
app.use(express.json());
app.use('', express.static('./api/dist'));

app.use('/api', apiHandler);
app.use('/', redirector);

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, './dist/index.html'));
});

app.use(errorHandler);
module.exports = app;
