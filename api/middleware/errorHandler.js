const path = require('path');
const constants = require('../helpers/constants');
const errorCodes = constants.errorCodes;

function errorHandler(err, request, response, next) {
  console.log(err.message);
  switch (err.message) {
    case errorCodes.urlAlreadyExists:
      // If url already exists send 409 confilct
      response.status(409).json({ message: errorCodes.urlAlreadyExists });
      break;
    case errorCodes.urlNotFound:
      // When url is not found send 404 page
      response
        .status(404)
        .sendFile(path.resolve(__dirname, '../dist/404.html'));
      break;
    case errorCodes.badInput:
      response.status(400).json({message: errorCodes.badInput});
      break;
    case errorCodes.alreadyExists:
      response.statis(403).json({message: errorCodes.alreadyExists});
      break;
    default:
      console.log('Internal Error: ', err.message);
      response
        .status(500)
        .json({ message: 'An internal server error has occured' });
  }
}

module.exports = errorHandler;
