import { api } from '../helpers';

function getAll() {
    return api.get(`/pacsillonquimios/`);
}

function getById(data) {
    return api.post(`/pacsillonquimios/`, data);
}

function update(id, data) {
    return api.put(`/pacsillonquimios/` + id, data);
}

function create(data) {
    return api.post(`/pacsillonquimios/`, data);
}

function borrar(id) {
    return api.delete(`/pacsillonquimios/` + id);
}

function getFilteredByKey(array, key, value) {
    return array.filter(function(e) {
      return e[key] == value;
    });
  }

const pacsillonquimioService = {
    getAll,
    getById,
    update,
    create,
    borrar,
    getFilteredByKey
};

export default pacsillonquimioService;
