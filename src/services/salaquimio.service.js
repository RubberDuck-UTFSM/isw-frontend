import { api } from '../helpers';

function getAll() {
    return api.get(`/salaquimios/`);
}

function getById(data) {
    return api.post(`/salaquimios/`, data);
}

function getByState(data) {
    return api.post(`/salaquimios/`, data);
}

function update(id, data) {
    return api.put(`/salaquimios/` + id, data);
}

function create(data) {
    return api.post(`/salaquimios/`, data);
}

function borrar(id) {
    return api.delete(`/salaquimios/` + id);
}

const salaquimioService = {
    getAll,
    getById,
    getByState,
    update,
    create,
    borrar
};

export default salaquimioService;
