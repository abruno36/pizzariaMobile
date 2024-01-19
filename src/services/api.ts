import axios from 'axios';
import { API_URL } from '../../.env.json';

const api = axios.create({
  baseURL: API_URL  //baseURL - HEROKU
  //baseURL: 'http://172.19.112.1:3333', //baseURL - localhost
})

export { api };