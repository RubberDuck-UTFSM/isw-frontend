import { api } from '../helpers';

function getAll() {
    return api.get(`/pquimios/`);
}

function getById(data) {
    return api.get(`/pquimios/` + data);
}

function getByState(data) {
    return api.get(`/pquimios/filter?estado=` + data.estado);
}

function update(id, data) {
    return api.put(`/pquimios/` + id, data);
}

function create(data) {
    return api.post(`/pquimios/`, data);
}

function borrar(id) {
    return api.delete(`/pquimios/` + id);
}

const pquimioService = {
    getAll,
    getById,
    getByState,
    update,
    create,
    borrar
};

export default pquimioService;
