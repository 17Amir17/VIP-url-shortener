const constants = require('../helpers/constants');
const express = require('express');
const app = require('../app');
const router = express.Router();
const db = require('../database/database');

router.get('/:code', (req, res, next) => {
  const code = req.params.code;
  const url = constants.domain + code;
  db.getDataFromShortURL(url).then(
    (data) => {
      if (data.url) {
        res.redirect(301, data.url);
        db.editData(data);
      } else next(new Error(constants.errorCodes.urlNotFound));
    },
    (err) => {
      next(new err());
    }
  );
});

module.exports = router;
