const constants = require('../helpers/constants');
const jwt = require('jsonwebtoken');
const express = require('express');
const router = express.Router();
const userQueries = require('../mongo/queries/userQueries');

router.post('/register', async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!validateInput(username) || !validateInput(password))
      throw constants.errorCodes.badInput;
    const registered = await userQueries.addUser(username, password);
    if (registered) res.json({ success: true, message: 'registered!' });
    else throw constants.errorCodes.alreadyExists;
  } catch (error) {
    next(error);
  }
});

router.post('/login', async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!validateInput(username) || !validateInput(password))
      throw constants.errorCodes.badInput;
    const user = await userQueries.compare(username, password);
    res.cookie("token", generateAccessToken(username), {
        maxAge: 1000*60*60,
    });
    res.json({ user });
  } catch (error) {
    console.log(error);
    next(error);
  }
});

function validateInput(input) {
  if (!input) return false;
  if (input === '') return false;
  return true;
}

function generateAccessToken(user) {
  return jwt.sign({ user }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: '600s',
  });
}

module.exports = router;
