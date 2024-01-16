import axios from 'axios';
import { parseCookies } from 'nookies';

const api = axios.create({
  baseURL: 'https://pizzaria-b0dd0ae2bdee.herokuapp.com',  //baseURL - HEROKU
  //baseURL: 'http://172.19.112.1:3333', //baseURL - localhost
})

export { api };