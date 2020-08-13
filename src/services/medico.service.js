import { api3 } from '../helpers';

function obtenerTodo() {
    return api3.get('/medico/all/');
}

function ingresar(data) {
    return api3.post('/medico/save/', data);
}

function cambiar(data) {
    return api3.post('/medico/update/', data);
}

function eliminar(id) {
    return api3.get('/medico/delete/' + id);
}

function obtenerId(id) {
    return api3.get('/medico/find/' + id);
}

const medicoService = {
    obtenerTodo,
    cambiar,
    ingresar,
    eliminar,
    obtenerId
};

export default medicoService;
