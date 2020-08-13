import { api } from '../helpers';

function getAll() {
    return api.get(`/medpquimios/`);
}

function getById(data) {
    return api.get(`/medpquimios/` + data);
}

function getByState(data) {
    return api.get(`/medpquimios/filter?estado=` + data.estado);
}

function update(id, data) {
    return api.put(`/medpquimios/` + id, data);
}

function create(data) {
    return api.post(`/medpquimios/`, data);
}

function borrar(id) {
    return api.delete(`/medpquimios/` + id);
}

const medpquimioService = {
    getAll,
    getById,
    getByState,
    update,
    create,
    borrar
};

export default medpquimioService;
