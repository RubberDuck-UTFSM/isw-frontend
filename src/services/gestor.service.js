import { api3 } from '../helpers';

function obtenerTodo() {
    return api3.get('/gestor/all/');
}

function ingresar(data) {
    return api3.post('/gestor/save/', data);
}

function cambiar(data) {
    return api3.post('/gestor/update/', data);
}

function eliminar(id) {
    return api3.get('/gestor/delete/' + id);
}

function obtenerId(id) {
    return api3.get('/gestor/find/' + id);
}

const gestorService = {
    obtenerTodo,
    cambiar,
    ingresar,
    eliminar,
    obtenerId
};

export default gestorService;
