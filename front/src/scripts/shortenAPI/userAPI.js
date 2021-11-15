import { errorCodes } from '../../../../api/helpers/constants';
import { MD5 } from 'crypto-js';

const axios = require('axios');
const baseURL = 'http://localHost:3000';

export async function requestRegister(username, password) {
  try {
    password = MD5(username + password).toString();
    const res = await axios.post(`${baseURL}/user/register`, {
      username,
      password,
    });
    console.log(res);
    if (res.data.success) return true;
    else return res.message;
  } catch (error) {
    console.log(error);
    return errorCodes.alreadyExists;
  }
}

export async function requestLogin(username, password) {
  try {
    password = MD5(username + password).toString();
    const res = await axios.post(`${baseURL}/user/login`, {
      username,
      password,
    });
    // token = res.data.token;
    return res.data.user;
  } catch (error) {
    return errorCodes.alreadyExists;
  }
}
