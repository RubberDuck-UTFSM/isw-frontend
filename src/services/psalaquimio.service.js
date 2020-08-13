import { api } from '../helpers';

function getAll() {
    return api.get(`/psalaquimios/`);
}

function getById(data) {
    return api.post(`/psalaquimios/`, data);
}

function getByState(data) {
    return api.post(`/psalaquimios/`, data);
}

function update(data) {
    return api.put(`/psalaquimios/`, data);
}

function create(data) {
    return api.post(`/psalaquimios/`, data);
}

const psalaquimioService = {
    getAll,
    getById,
    getByState,
    update,
    create,
};

export default psalaquimioService;
