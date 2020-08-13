import { api3 } from '../helpers';

function obtenerTodo() {
    return api3.get('/personal/all/');
}

function ingresar(data) {
    return api3.post('/personal/save/', data);
}

function cambiar(data) {
    return api3.post('/personal/update/', data);
}

function eliminar(id) {
    return api3.get('/personal/delete/' + id);
}

function obtenerId(id) {
    return api3.get('/personal/find/' + id);
}

const personalService = {
    obtenerTodo,
    cambiar,
    ingresar,
    eliminar,
    obtenerId
};

export default personalService;
