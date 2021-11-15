const express = require('express');
const crypto = require('crypto');
const router = express.Router();
const db = require('../database/database');
const constants = require('../helpers/constants');
const { formatedTimestamp } = require('../helpers/timestamp');

const myDomain = constants.domain;
//When API gets /info path send username
router.post('/shorten', (request, response, next) => {
  try {
    const url = request.body.url;
    let customShortURL = request.body.short;
    //Shortening logic...
    if (!customShortURL) customShortURL = generateRandomID();
    customShortURL = myDomain + customShortURL;
    //Add to databse
    const date = formatedTimestamp();
    const req = db.addNewUrl(customShortURL, url, date);
    req.then(
      () => {
        response.json({ url: customShortURL });
      },
      (err) => {
        throwCallbackError(err, next);
      }
    );
  } catch (error) {
    throwCallbackError(error, next);
  }
});

router.get('/statistics/:code', (req, res, next) => {
  try {
    const code = req.params.code;
    const shortUrl = constants.domain + code;
    db.getDataFromShortURL(shortUrl).then(
      (data) => {
        res.json(data);
      },
      (err) => {
        next(err);
      }
    );
  } catch (error) {
    throwCallbackError(error);
  }
});

router.delete('/delete/:id', (req, res, next) => {
  try {
    const id = req.params.id;
    db.deleteData(id).then(
      (data) => {
        res.json(data);
      },
      (err) => {
        next(err);
      }
    );
  } catch (error) {
    throwCallbackError(error);
  }
});

//Throw callback error so it can be caught by express
function throwCallbackError(error, next) {
  try {
    throw new Error(error);
  } catch (err) {
    next(err);
  }
}

function generateRandomID() {
  //Generate random new ID
  return crypto.randomBytes(5).toString('hex');
}
module.exports = router;
