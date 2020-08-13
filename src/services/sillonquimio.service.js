import { api } from '../helpers';

function getAll() {
    return api.get(`/sillonquimios/`);
}

function getById(data) {
    return api.get(`/sillonquimios/` + data);
}

function getByState(data) {
    return api.post(`/sillonquimios/`, data);
}

function update(id, data) {
    return api.put(`/sillonquimios/` + id, data);
}

function create(data) {
    return api.post(`/sillonquimios/`, data);
}

function borrar(id) {
    return api.delete(`/sillonquimios/` + id);
}

const sillonquimioService = {
    getAll,
    getById,
    getByState,
    update,
    create,
    borrar
};

export default sillonquimioService;
