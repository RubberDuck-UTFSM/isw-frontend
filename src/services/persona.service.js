import { api3 } from '../helpers';

function obtenerTodo() {
    return api3.get('/persona/all/');
}

function ingresar(data) {
    return api3.post('/persona/save/', data);
}

function cambiar(data) {
    return api3.post('/persona/save/', data);
}

function eliminar(id) {
    return api3.get('/persona/delete/' + id);
}

function obtenerId(id) {
    return api3.get('/persona/find/' + id);
}

const personaService = {
    obtenerTodo,
    ingresar,
    eliminar,
    obtenerId
};

export default personaService;
