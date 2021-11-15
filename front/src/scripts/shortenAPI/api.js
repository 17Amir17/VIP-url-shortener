import axios from 'axios';

const baseURL = 'http://localHost:3000/';
// const baseURL = 'https://vryshort.herokuapp.com/';
export async function postURL(body) {
  return axios.post(`${baseURL}api/shorten`, body);
}

export async function getStats(code) {
  return axios.get(`${baseURL}api/statistics/${code}`);
}

export async function deleteURL(id) {
  return axios.delete(`${baseURL}api/delete/${id}`);
}
