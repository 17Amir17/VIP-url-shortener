require('dotenv').config();
const request = require('request');
const constants = require('../helpers/constants');
const errorCodes = constants.errorCodes;
const { formatedTimestamp, clickDateToOBJ } = require('../helpers/timestamp');

class DataBase {
  static #superSecretApiKey = process.env.API_KEY;
  static #headers = {
    'cache-control': 'no-cache',
    'x-apikey': this.#superSecretApiKey,
    'content-type': 'application/json',
  };
  static #baseURL = process.env.REST;

  static getUrls = () => {
    const options = {
      method: 'GET',
      url: DataBase.#baseURL,
      headers: DataBase.#headers,
    };
    return new Promise((resolve, reject) => {
      request(options, function (error, response, body) {
        if (error) reject(error);
        else resolve(JSON.parse(body));
      });
    });
  };

  static addNewUrl = (short, url, date) => {
    // Sends post request to restdb
    const options = {
      method: 'POST',
      url: this.#baseURL,
      headers: this.#headers,
      body: { shortened: short, url, click: 0, date },
      json: true,
    };

    return new Promise((resolve, reject) => {
      request(options, (error, response, body) => {
        if (error) reject(error);
        if (body.status === 400) {
          if (body.list[0].message[0] === 'Already exists')
            reject(errorCodes.urlAlreadyExists);
          else reject('Something went wrong on post');
        } else resolve();
      });
    });
  };

  static async getDataFromShortURL(url) {
    const data = await DataBase.getUrls();
    for (const row of data) {
      if (row.shortened === url) {
        //For some reason the db api I use decided to change the name of my clicks variable to click
        //And also if clicks is 0 it doesnt send the data
        //For this reason a deleted the click from my object
        if (!row.clicks) row.clicks = 0;
        delete row.click;
        return row;
      }
    }
    return false;
  }

  static editData(data) {
    // Put request to increment click count, set new last clicked, and append click date count
    const clicks = (data.clicks || 0) + 1;
    const lastClicked = formatedTimestamp();
    let clickDates = JSON.parse(data.clickDates || '{}');
    clickDates = JSON.stringify(clickDateToOBJ(clickDates));
    const options = {
      method: 'PUT',
      url: `${DataBase.#baseURL}/${data._id}`,
      headers: DataBase.#headers,
      body: { clicks, lastClicked, clickDates },
      json: true,
    };
    request(options, function (error, response, body) {
      if (error) throw new Error(error);
    });
  }

  static deleteData(id) {
    //Delete data by id
    const options = {
      method: 'DELETE',
      url: `${DataBase.#baseURL}/${id}`,
      headers: DataBase.#headers,
    };

    return new Promise((res, rej) => {
      request(options, function (error, response, body) {
        if (error) rej(new Error(error));
        res(body);
      });
    });
  }
}

module.exports = DataBase;
