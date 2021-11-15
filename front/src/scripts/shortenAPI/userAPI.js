import { MD5 } from 'crypto-js';
import { displayUser } from '../dom/login';

const axios = require('axios');
const baseURL = 'http://localHost:3000';

export async function requestRegister(username, password) {
  try {
    password = MD5(username + password).toString();
    const res = await axios.post(`${baseURL}/user/register`, {
      username,
      password,
    });
    displayUser(username);
    if (res.data.success) return true;
    else return res.message;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function requestLogin(username, password) {
  try {
    password = MD5(username + password).toString();
    const res = await axios.post(`${baseURL}/user/login`, {
      username,
      password,
    });
    console.log(res);
    displayUser(username);
    // token = res.data.token;
    return res.data.user;
  } catch (error) {
    return false;
  }
}

export async function cookieLogin() {
    try {
      const res = await axios.get(`${baseURL}/user/login`);
      return res.data.user.user;
    } catch (error) {
      return false;
    }
  }

export async function requestLogout(){
  try {
    await axios.get(`${baseURL}/user/logout`);
    show
  } catch (error) {
    return false;
  }
}