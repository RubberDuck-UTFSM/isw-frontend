import axios from 'axios';

const endpoints = {
    // development: 'http://chile-2.herokuapp.com',
    development: 'https://feusam-api.herokuapp.com/api',
};

export const api = axios.create({
    baseURL: endpoints['development'],
    timeout: 20000,
});
