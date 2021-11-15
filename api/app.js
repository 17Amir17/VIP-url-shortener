require('dotenv').config();
const express = require('express');
const path = require('path');
const cors = require('cors');
const cookieParser = require("cookie-parser");
const mongo = require('./mongo/mongoClient')
const errorHandler = require('./middleware/errorHandler');
const redirector = require('./routers/redirector');
const apiHandler = require('./routers/api');
const userHandler = require('./routers/userRouter')
const auth = require('./middleware/auth');
const app = express();

mongo.init(); 
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use('', express.static('./api/dist'));

app.use('/api', auth ,apiHandler);
app.use('/', redirector);
app.use('/user', userHandler)

app.get('/', (req, res) => {
  res.sendFile(path.resolve(__dirname, './dist/index.html'));
});

app.use(errorHandler);
module.exports = app;
