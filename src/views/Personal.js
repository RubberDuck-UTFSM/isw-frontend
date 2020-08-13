import React, { Component } from 'react';
import './Personal.css';
import fondo from './fondopersonal.jpg';
import pacienteService from '../services/paciente.service';
import personaService from '../services/persona.service';
import personalService from '../services/personal.service';
import medicoService from '../services/medico.service';

class Todos extends Component {
	constructor() {
		super();
		this.state = {
			filtro: "Mostrar todos",
			listaPersonal: [],
			selectedValue: "seleccionar"
		};
		this.handleChange = this.handleChange.bind(this);
	}

	obtenerPersonal() {
		personaService.obtenerTodo().then((response) => {
			this.setState({
				listaPersonal: response.status === 200 ? response.data.sort((a, b) => (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0)) : [],
			});
		});
	}

	obtenerPersonalTipo(tipo) {
		personaService.obtenerTodo().then((response) => {
			if(tipo==="medico"){
				this.setState({
					listaPersonal: response.status === 200 ? response.data.filter(data => data.personal == null).sort((a, b) => (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0)) : [],
				});
			}
			else{
				this.setState({
					listaPersonal: response.status === 200 ? response.data.filter(data => data.medico == null).sort((a, b) => (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0)) : [],
				});
			}
		});
	}

	obtenerPersonalActivo(activo) {
		personaService.obtenerTodo().then((response) => {
			if(activo==="activo"){
				this.setState({
					listaPersonal: response.status === 200 ? response.data.filter(data => (data.personal == null? data.medico.activo:data.personal.activo) == true).sort((a, b) => (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0)) : [],
				});
			}
			else{
				this.setState({
					listaPersonal: response.status === 200 ? response.data.filter(data => (data.personal == null? data.medico.activo:data.personal.activo) == false).sort((a, b) => (a.id > b.id) ? 1 : ((b.id > a.id) ? -1 : 0)) : [],
				});
			}
		});
	}


	handleChange(e) {
		if (e.target.id === "filtro") {
			this.setState({ filtro: e.target.value, selectedValue: "seleccionar" });
			if (e.target.value === "Mostrar todos") {
				this.obtenerPersonal()
			}
			else { this.setState({ listaPersonal: [] }) }
		}
		else if (e.target.id === "seleccion2") {
			this.setState({ selectedValue: e.target.value });
			this.obtenerPersonalTipo(e.target.value);
		}
		else if (e.target.id === "seleccion3") {
			this.setState({ selectedValue: e.target.value });
			this.obtenerPersonalActivo(e.target.value);
		}
	}

	componentDidMount() {
		this.obtenerPersonal();
	}

	render() {
		return (
			<div>
				<h4 className="display-4 correccionCelular">Personal Médico del Sistema</h4>
				<hr></hr>
				<form >
					<div className="form-row">
						<div className="col">
							<label className="my-1 mr-2" htmlFor="inlineFormCustomSelectPref">Filtrar por</label>
							<select className="custom-select my-1 mr-sm-2" onChange={this.handleChange} id="filtro">
								<option selected>Mostrar todos</option>
								<option >Tipo</option>
								<option >Actividad</option>
							</select>
						</div>
						<div className="col">
							<label className="my-1 mr-2" htmlFor="inlineFormCustomSelectPref">Seleccionar</label>
							{this.state.filtro === "Mostrar todos" ?
								<select className="custom-select my-1 mr-sm-2" id="seleccion1" disabled>
								</select> :
								(this.state.filtro === "Tipo" ?
									<select value={this.state.selectedValue} className="custom-select my-1 mr-sm-2" id="seleccion2" onChange={this.handleChange}>
										<option selected value="seleccionar">Seleccionar...</option>
										<option value="medico">Médico</option>
										<option value="personal">Personal Médico</option>
									</select>
									:
									<select value={this.state.selectedValue} className="custom-select my-1 mr-sm-2" id="seleccion3" onChange={this.handleChange}>
										<option selected value="seleccionar">Seleccionar...</option>
										<option value="inactivo">Inactivo</option>
										<option value="activo">Activo</option>
									</select>
								)
							}
						</div>
					</div>
				</form>
				<br></br>
				<table className="table">
					<thead>
						<tr>
							<th scope="col">ID</th>
							<th scope="col">Apellido</th>
							<th scope="col">Nombre</th>
							<th scope="col">Tipo</th>
							<th scope="col">ID Tipo</th>
							<th scope="col">Activo</th>
						</tr>
					</thead>
					<tbody>
						{
							this.state.listaPersonal.map(personal => (
								<tr>
									<td>{personal.id}</td>
									<td>{personal.apellido}</td>
									<td>{personal.nombre}</td>
									<td>{(personal.personal == null)? "Médico" : "Personal Médico"}</td>
									<td>{(personal.personal == null)? personal.medico.id: personal.personal.id}</td>
									<td>{(personal.personal == null)? (personal.medico.activo)? "Activo":"Inactivo" : (personal.personal.activo)? "Activo":"Inactivo"}</td>
								</tr>)
							)
						}
					</tbody>
				</table>
			</div>
		)
	}
}

class IngresarNuevoPersonal extends Component {
	constructor() {
		super();
		this.state = {
			nombre: "",
			apellido: "",
			direccion: "",
			telefono: "",
			permisos: "",
			especialidad: "",
			cargo: "",
			tipo: "",
			desactivarMed: true,
			desactivarPer: true,
			medPer: ""
		};
		this.handleChangeData = this.handleChangeData.bind(this);
		this.handleClick = this.handleClick.bind(this);
	}

	handleChangeData(e) {
		if (e.target.id === "inputMedPers") {
			this.setState({ medPer: e.target.value });
			if (e.target.value === 'medico') {
				this.setState({ desactivarMed: false, desactivarPer: true });
			}
			else if (e.target.value === 'personal') {
				this.setState({ desactivarMed: true, desactivarPer: false });
			}
			else {
				this.setState({ desactivarMed: true, desactivarPer: true });
			}
		}
		else if (e.target.id === "inputNombres") {
			this.setState({ nombre: e.target.value });
		}
		else if (e.target.id === "inputApellidos") {
			this.setState({ apellido: e.target.value });
		}
		else if (e.target.id === "inputDireccion") {
			this.setState({ direccion: e.target.value });
		}
		else if (e.target.id === "inputTelefono") {
			this.setState({ telefono: e.target.value });
		}
		else if (e.target.id === "inputPermisos") {
			this.setState({ permisos: e.target.value });
		}
		else if (e.target.id === "inputEspecialidad") {
			this.setState({ especialidad: e.target.value });
		}
		else if (e.target.id === "inputCargo") {
			this.setState({ cargo: e.target.value });
		}
		else if (e.target.id === "inputTipo") {
			this.setState({ tipo: e.target.value });
		}
	}

	handleClick(e) {
		const dataPersona = {
			nombre: this.state.nombre,
			apellido: this.state.apellido,
			direccion: this.state.direccion,
			telefono: this.state.telefono,
		}
		const permisos = this.state.permisos;
		const especialidad = this.state.especialidad;
		const cargo = this.state.cargo;
		const tipo = this.state.tipo;
		if(this.state.medPer === 'medico'){
			personaService.ingresar(dataPersona).then((response)=>{
				const dataMedico = {
					permisos: permisos,
					activo: false,
					especialidad: especialidad,
					persona_id: response.data.id.toString() 
				};
				medicoService.ingresar(dataMedico);
				
			});
		}
		else{
			personaService.ingresar(dataPersona).then((response)=>{
				const dataPersonal = {
					permisos: permisos,
					activo: false,
					cargo: cargo,
					tipo: tipo,
					persona_id: response.data.id.toString() 
				};
				personalService.ingresar(dataPersonal);
			});
		}
		alert("Personal médico ingresado exitosamente.");
		this.setState({
			nombre: "",
			apellido: "",
			direccion: "",
			telefono: "",
			permisos: "",
			especialidad: "",
			cargo: "",
			tipo: "",
			desactivarMed: true,
			desactivarPer: true,
			medPer: ""
		});
	}

	render() {
		return (
			<>
				<h4 className="display-4 correccionCelular">Ingresar nuevo personal médico</h4>
				<hr></hr>
				<form style={{ marginTop: "30px" }}>
					<div className="form-row">
						<div className="col-auto">
							<div className="form-group row">
								<label for="colFormLabel" className="col-auto col-form-label">Escoja tipo de personal a ingresar</label>
								<div className="col-auto">
									<select value={this.state.medPer} id="inputMedPers" onChange={this.handleChangeData} className="form-control">
										<option selected value="seleccionar">Seleccionar...</option>
										<option value="medico">Médico</option>
										<option value="personal">Personal</option>
									</select>
								</div>
							</div>
						</div>
					</div>
				</form>
				<hr></hr>
				<form>
					<div className="form-row">
						<div className="form-group col-md-4">
							<label for="inputNombres">Nombres</label>
							<input value={this.state.nombre} onChange={this.handleChangeData} type="text" className="form-control" id="inputNombres"></input>
						</div>
						<div className="form-group col-md-4">
							<label for="inputApellidos">Apellidos</label>
							<input value={this.state.apellido} onChange={this.handleChangeData} type="text" className="form-control" id="inputApellidos"></input>
						</div>
						<div className="form-group col-md-4">
							<label for="inputTelefono">Teléfono</label>
							<input value={this.state.telefono} onChange={this.handleChangeData} type="text" className="form-control" id="inputTelefono"></input>
						</div>
					</div>
					<div className="form-row">
						<div className="form-group col-md-8">
							<label for="inputDireccion">Dirección</label>
							<input value={this.state.direccion} onChange={this.handleChangeData} type="text" className="form-control" id="inputDireccion"></input>
						</div>
						<div className="form-group col-md-4">
							<label for="inputPermisos">Permisos</label>
							<input value={this.state.permisos} onChange={this.handleChangeData} type="text" className="form-control" id="inputPermisos"></input>
						</div>
					</div>
					<div className="form-row">
						<div className="form-group col-md-4">
							<label className="my-1 mr-2" htmlFor="inlineFormCustomSelectPref">Especialidad</label>
							<select disabled={this.state.desactivarMed} value={this.state.especialidad} onChange={this.handleChangeData} id="inputEspecialidad" className="form-control">
								<option selected value="seleccionar">Seleccionar...</option>
								<option value="2">Quimioterapia</option>
								<option value="3">Pabellón</option>
								<option value="4">Recuperación</option>
							</select>
						</div>
						<div className="form-group col-md-4">
							<label for="inputCargo">Cargo</label>
							<input disabled={this.state.desactivarPer} value={this.state.cargo} onChange={this.handleChangeData} type="text" className="form-control" id="inputCargo"></input>
						</div>
						<div className="form-group col-md-4">
							<label className="my-1 mr-2" htmlFor="inlineFormCustomSelectPref">Tipo</label>
							<select disabled={this.state.desactivarPer} value={this.state.tipo} onChange={this.handleChangeData} id="inputTipo" className="form-control">
								<option selected value="seleccionar">Seleccionar...</option>
								<option value="2">Quimioterapia</option>
								<option value="3">Pabellón</option>
								<option value="4">Recuperación</option>
							</select>
						</div>
					</div>
					<button type="button" disabled={this.state.desactivarMed && this.state.desactivarPer} onClick={this.handleClick} className="btn btn-primary btn-rounded"><i class="fas fa-user-plus icono"></i> Ingresar Personal</button>
				</form>
			</>
		)
	}
}

class BuscarPersonal extends Component {
	constructor() {
		super();
		this.state = {
			id: "",
			nombre: "",
			apellido: "",
			direccion: "",
			telefono: "",
			permisos: "",
			activo: "",
			especialidad: "",
			cargo: "",
			tipo: "",
		};

		this.handleChange = this.handleChange.bind(this);
		this.handleClick = this.handleClick.bind(this);
	}
	handleChange(e) {
		this.setState({
			id: e.target.value,
		});
	}
	handleClick() {
		personaService.obtenerId(parseInt(this.state.id)).then((response) => {
			if (response.data != 1) {
				if(response.data.medico != null){
					this.setState({
						nombre: response.data.nombre,
						apellido: response.data.apellido,
						direccion: response.data.direccion,
						telefono: response.data.telefono,
						permisos: response.data.medico.permisos,
						activo: (response.data.medico.activo===false)? "No": "Sí",
						especialidad: (response.data.medico.especialidad === "2")? "Quimioterapia": (response.data.medico.especialidad === "3")? "Pabellón" : "Recuperación",
						cargo: "----",
						tipo: "----",
					});
				}
				else if(response.data.personal != null){
					this.setState({
						nombre: response.data.nombre,
						apellido: response.data.apellido,
						direccion: response.data.direccion,
						telefono: response.data.telefono,
						permisos: response.data.personal.permisos,
						activo: (response.data.personal.activo===false)? "No": "Sí",
						especialidad: "----",
						cargo: response.data.personal.cargo,
						tipo: (response.data.personal.tipo === "2")? "Quimioterapia": (response.data.personal.tipo === "3")? "Pabellón" : "Recuperación",
					});
				}
				else {
					alert("No existe personal con ese ID.");
					this.setState({
						id: "",
						nombre: "",
						apellido: "",
						direccion: "",
						telefono: "",
						permisos: "",
						activo: "",
						especialidad: "",
						cargo: "",
						tipo: "",
					});
				};
			}
		});
	}
	render() {
		return (
			<>
				<h4 className="display-4 correccionCelular">Buscar datos de personal médico</h4>
				<hr></hr>
				<form style={{ marginTop: "30px" }}>
					<div className="form-row">
						<div className="col-auto">
							<div className="form-group row">
								<label for="colFormLabel" className="col-auto col-form-label">Ingrese ID del personal médico</label>
								<div className="col-auto">
									<input type="text" value={this.state.id} onChange={this.handleChange} className="form-control" id="inputID"></input>
								</div>
							</div>
						</div>
						<div className="col-auto">
							<button type="button" onClick={this.handleClick} className="btn btn-primary btn-rounded"><i className="far fa-paper-plane icono"></i>Buscar</button>
						</div>
					</div>
				</form>
				<hr></hr>
				<form>
					<div className="form-row">
						<div className="form-group col-md-4">
							<label for="inputNombres">Nombres</label>
							<input disabled value={this.state.nombre} type="text" className="form-control" id="inputNombres"></input>
						</div>
						<div className="form-group col-md-4">
							<label for="inputApellidos">Apellidos</label>
							<input disabled value={this.state.apellido} type="text" className="form-control" id="inputApellidos"></input>
						</div>
						<div className="form-group col-md-4">
							<label for="inputTelefono">Teléfono</label>
							<input disabled value={this.state.telefono} type="text" className="form-control" id="inputTelefono"></input>
						</div>
					</div>
					<div className="form-row">
						<div className="form-group col-md-6">
							<label for="inputDireccion">Dirección</label>
							<input disabled value={this.state.direccion} type="text" className="form-control" id="inputDireccion"></input>
						</div>
						<div className="form-group col-md-3">
							<label for="inputPermisos">Permisos</label>
							<input disabled value={this.state.permisos} type="text" className="form-control" id="inputPermisos"></input>
						</div>
						<div className="form-group col-md-3">
							<label for="inputActivo">Activo</label>
							<input disabled value={this.state.activo} type="text" className="form-control" id="inputActivo"></input>
						</div>
					</div>
					<div className="form-row">
						<div className="form-group col-md-4">
							<label for="inputEspecialidad">Especialidad</label>
							<input disabled value={this.state.especialidad} type="text" className="form-control" id="inputEspecialidad"></input>
						</div>
						<div className="form-group col-md-4">
							<label for="inputCargo">Cargo</label>
							<input disabled value={this.state.cargo} type="text" className="form-control" id="inputCargo"></input>
						</div>
						<div className="form-group col-md-4">
							<label className="my-1 mr-2" htmlFor="inlineFormCustomSelectPref">Tipo</label>
							<input disabled value={this.state.tipo} type="text" className="form-control" id="inputTipo"></input>
						</div>
					</div>
				</form>
			</>
		)
	}
}

class ActualizarPersonal extends Component {
	constructor() {
		super();
		this.state = {
			medPer:"",
			id: "",
			nombre: "",
			apellido: "",
			direccion: "",
			telefono: "",
			permisos: "",
			activo: "",
			especialidad: "",
			cargo: "",
			tipo: "",
			desactivar: true,
			desactivarMed: true,
			desactivarPer: true,
			id_personal: ""
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleChangeData = this.handleChangeData.bind(this);
		this.handleClickBuscar = this.handleClickBuscar.bind(this);
		this.handleClickActualizar = this.handleClickActualizar.bind(this);
		this.handleClickEliminar = this.handleClickEliminar.bind(this);
	}

	handleChange(e) {
		this.setState({
			id: e.target.value,
		});
	}

	handleChangeData(e) {
		if (e.target.id === "inputNombres") {
			this.setState({ nombre: e.target.value });
		}
		else if (e.target.id === "inputApellidos") {
			this.setState({ apellido: e.target.value });
		}
		else if (e.target.id === "inputDireccion") {
			this.setState({ direccion: e.target.value });
		}
		else if (e.target.id === "inputTelefono") {
			this.setState({ telefono: e.target.value });
		}
		else if (e.target.id === "inputPermisos") {
			this.setState({ permisos: e.target.value });
		}
		else if (e.target.id === "inputEspecialidad") {
			this.setState({ especialidad: e.target.value });
		}
		else if (e.target.id === "inputCargo") {
			this.setState({ cargo: e.target.value });
		}
		else if (e.target.id === "inputTipo") {
			this.setState({ tipo: e.target.value });
		}
	}

	handleClickBuscar() {
		personaService.obtenerId(parseInt(this.state.id)).then((response) => {
			if (response.data != 1) {
				if(response.data.medico != null){
					this.setState({
						nombre: response.data.nombre,
						apellido: response.data.apellido,
						direccion: response.data.direccion,
						telefono: response.data.telefono,
						permisos: response.data.medico.permisos,
						activo: response.data.medico.activo,
						especialidad: response.data.medico.especialidad,
						cargo: "----",
						tipo: "----",
						medPer:"medico",
						desactivar: false,
						desactivarMed: false,
						desactivarPer: true,
						id_personal : response.data.medico.id
					});
				}
				else if(response.data.personal != null){
					this.setState({
						nombre: response.data.nombre,
						apellido: response.data.apellido,
						direccion: response.data.direccion,
						telefono: response.data.telefono,
						permisos: response.data.personal.permisos,
						activo: response.data.personal.activo,
						especialidad: "----",
						cargo: response.data.personal.cargo,
						tipo: response.data.personal.tipo,
						medPer:"personal",
						desactivar: false,
						desactivarMed: true,
						desactivarPer: false,
						id_personal : response.data.personal.id
					});
				}
				else {
					alert("No existe personal con ese ID.");
					this.setState({
						id: "",
						nombre: "",
						apellido: "",
						direccion: "",
						telefono: "",
						permisos: "",
						activo: "",
						especialidad: "",
						cargo: "",
						tipo: "",
						desactivar: true,
						desactivarMed: true,
						desactivarPer: true,
						medPer:"",
						id_personal : ""
					});
				};
			}
		});
	}

	handleClickActualizar() {		
		const dataPersona = {
			id: parseInt(this.state.id),
			nombre: this.state.nombre,
			apellido: this.state.apellido,
			direccion: this.state.direccion,
			telefono: this.state.telefono
		}
		const permisos = this.state.permisos;
		const especialidad = this.state.especialidad;
		const cargo = this.state.cargo;
		const tipo = this.state.tipo;
		const activo = this.state.activo;
		const id_personal = parseInt(this.state.id_personal);
		if(this.state.medPer === 'medico'){
			personaService.ingresar(dataPersona).then((response)=>{
				const dataMedico = {
					id: id_personal,
					permisos: permisos,
					activo: activo,
					especialidad: especialidad,
				};
				medicoService.cambiar(dataMedico);	
			});
		}
		else{
			personaService.ingresar(dataPersona).then((response)=>{
				const dataPersonal = {
					id: id_personal, 
					permisos: permisos,
					activo: activo,
					cargo: cargo,
					tipo: tipo, 
				};
				personalService.cambiar(dataPersonal);
			});
		}
		alert("Personal médico ingresado exitosamente.");
		this.setState({
			medPer:"",
			id: "",
			nombre: "",
			apellido: "",
			direccion: "",
			telefono: "",
			permisos: "",
			activo: "",
			especialidad: "",
			cargo: "",
			tipo: "",
			desactivar: true,
			desactivarMed: true,
			desactivarPer: true,
			id_personal: ""
		});
	}

	handleClickEliminar() {
		const id_personal = this.state.id_personal;
		if(this.state.medPer === 'medico'){
			medicoService.eliminar(id_personal);
		}
		else{
			personalService.eliminar(id_personal);
		}
		alert("Personal médico ha sido eliminado exitosamente.");
		this.setState({
			medPer:"",
			id: "",
			nombre: "",
			apellido: "",
			direccion: "",
			telefono: "",
			permisos: "",
			activo: "",
			especialidad: "",
			cargo: "",
			tipo: "",
			desactivar: true,
			desactivarMed: true,
			desactivarPer: true,
			id_personal: ""
		});
	}

	render() {
		return (
			<>
				<h4 className="display-4 correccionCelular">Actualizar datos de personal médico</h4>
				<hr></hr>
				<form style={{ marginTop: "30px" }}>
					<div className="form-row">
						<div className="col-auto">
							<div className="form-group row">
								<label for="colFormLabel" className="col-auto col-form-label">Ingrese ID del personal médico</label>
								<div className="col-auto">
									<input type="text" value={this.state.id} onChange={this.handleChange} className="form-control" id="inputID"></input>
								</div>
							</div>
						</div>
						<div className="col-auto">
							<button type="button" onClick={this.handleClickBuscar} className="btn btn-primary btn-rounded"><i className="far fa-paper-plane icono"></i>Buscar</button>
						</div>
					</div>
				</form>
				<hr></hr>
				<form>
					<div className="form-row">
						<div className="form-group col-md-4">
							<label for="inputNombres">Nombres</label>
							<input value={this.state.nombre} onChange={this.handleChangeData} type="text" className="form-control" id="inputNombres"></input>
						</div>
						<div className="form-group col-md-4">
							<label for="inputApellidos">Apellidos</label>
							<input value={this.state.apellido} onChange={this.handleChangeData} type="text" className="form-control" id="inputApellidos"></input>
						</div>
						<div className="form-group col-md-4">
							<label for="inputTelefono">Teléfono</label>
							<input value={this.state.telefono} onChange={this.handleChangeData} type="text" className="form-control" id="inputTelefono"></input>
						</div>
					</div>
					<div className="form-row">
						<div className="form-group col-md-8">
							<label for="inputDireccion">Dirección</label>
							<input value={this.state.direccion} onChange={this.handleChangeData} type="text" className="form-control" id="inputDireccion"></input>
						</div>
						<div className="form-group col-md-4">
							<label for="inputPermisos">Permisos</label>
							<input value={this.state.permisos} onChange={this.handleChangeData} type="text" className="form-control" id="inputPermisos"></input>
						</div>
					</div>
					<div className="form-row">
						<div className="form-group col-md-4">
							<label className="my-1 mr-2" htmlFor="inlineFormCustomSelectPref">Especialidad</label>
							<select disabled={this.state.desactivarMed} value={this.state.especialidad} onChange={this.handleChangeData} id="inputEspecialidad" className="form-control">
								<option selected value="seleccionar">Seleccionar...</option>
								<option value="2">Quimioterapia</option>
								<option value="3">Pabellón</option>
								<option value="4">Recuperación</option>
							</select>
						</div>
						<div className="form-group col-md-4">
							<label for="inputCargo">Cargo</label>
							<input disabled={this.state.desactivarPer} value={this.state.cargo} onChange={this.handleChangeData} type="text" className="form-control" id="inputCargo"></input>
						</div>
						<div className="form-group col-md-4">
							<label className="my-1 mr-2" htmlFor="inlineFormCustomSelectPref">Tipo</label>
							<select disabled={this.state.desactivarPer} value={this.state.tipo} onChange={this.handleChangeData} id="inputTipo" className="form-control">
								<option selected value="seleccionar">Seleccionar...</option>
								<option value="2">Quimioterapia</option>
								<option value="3">Pabellón</option>
								<option value="4">Recuperación</option>
							</select>
						</div>
					</div>
					<button type="button" onClick={this.handleClickActualizar} disabled={this.state.desactivar} className="btn btn-primary btn-rounded"><i class="fas fa-user-edit icono"></i> Actualizar Personal</button>
					<button type="button" onClick={this.handleClickEliminar} disabled={this.state.desactivar} className="btn btn-secondary btn-rounded" style={{ marginLeft: "15px" }}><i className="fas fa-user-times icono"></i> Eliminar Personal</button>
				</form>
			</>
		)
	}
}


export default class Personal extends Component {
	constructor() {
		super();
		this.handleClick = this.handleClick.bind(this);
	}

	handleClick(e) {
		window.location.reload();
	}

	render() {
		return (
			<section className="material">
				<div className="jumbotron-fluid paral " style={{ backgroundImage: 'url(' + fondo + ')' }} >
					<div className="overlay ">
						<div className="container">
							<h1 className="display-3"><i className="fas fa-user-md icono"></i>  Gestión de<strong>  Personal</strong></h1>
						</div>
					</div>
				</div>
				<div className="tab-content " style={{ marginTop: "1px" }}>
					<div className="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
						<div className="container">
							<div className="row">
								<div className="col-lg-2 ">
									<div className="nav flex-column nav-pills nav-material2 stiky-list" id="v-pills-tab" role="tablist" aria-orientation="vertical">
										<a onClick={this.handleClick} className="link-material nav-link active" id="v-pills-home-tab" data-toggle="pill" href="#v-pills-home" role="tab" aria-controls="v-pills-home" aria-selected="true">Ver todo el personal</a>
										<a className="link-material nav-link" id="v-pills-profile-tab" data-toggle="pill" href="#v-pills-profile" role="tab" aria-controls="v-pills-profile" aria-selected="false">Ingresar nuevo personal</a>
										<a className="link-material nav-link" id="v-pills-messages-tab" data-toggle="pill" href="#v-pills-messages" role="tab" aria-controls="v-pills-messages" aria-selected="false">Buscar datos de personal</a>
										<a className="link-material nav-link" id="v-pills-settings-tab" data-toggle="pill" href="#v-pills-settings" role="tab" aria-controls="v-pills-settings" aria-selected="false">Modificar datos de personal</a>
									</div>
								</div>
								<div className="col-lg-10" style={{ paddingTop: "30px", paddingBottom: "30px" }}>
									<div className="tab-content" id="v-pills-tabContent">
										<div className="tab-pane fade show active" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab">
											<Todos />
										</div>
										<div className="tab-pane fade" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-home-tab">
											<IngresarNuevoPersonal />
										</div>
										<div className="tab-pane fade" id="v-pills-messages" role="tabpanel" aria-labelledby="v-pills-messages-tab">
											<BuscarPersonal />
										</div>
										<div className="tab-pane fade" id="v-pills-settings" role="tabpanel" aria-labelledby="v-pills-settings-tab">
											<ActualizarPersonal />
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

			</section>
		)
	}

}