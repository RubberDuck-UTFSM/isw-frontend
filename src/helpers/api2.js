import axios from 'axios';

const endpoints = {
    // development: 'http://chile-2.herokuapp.com',
    development: 'https://ms-paciente.herokuapp.com',
};

export const api2 = axios.create({
    baseURL: endpoints['development'],
    timeout: 20000,
});
