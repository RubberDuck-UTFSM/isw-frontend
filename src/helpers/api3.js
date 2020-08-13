import axios from 'axios';

const endpoints = {
    // development: 'http://chile-2.herokuapp.com',
    development: 'https://vienesas-san-jorge.herokuapp.com',
};

export const api3 = axios.create({
    baseURL: endpoints['development'],
    timeout: 20000,
});
