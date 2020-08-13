import React, { Component } from 'react';
import './Pacientes.css';
import fondo from './fondopacientes.jpg';
import pacienteService from '../services/paciente.service';


class Todos extends Component {
	constructor() {
		super();
		this.state = {
			filtro: "Mostrar todos",
			listaPacientes:[],
			selectedValue: "seleccionar"
		};
		this.handleChange = this.handleChange.bind(this);
	}
	
	obtenerPacientes() {
		pacienteService.obtenerTodo().then((response) => {
			this.setState({
			  listaPacientes: response.status === 200 ? response.data.sort((a,b) => (a.id > b.id) ? 1 : ((b.id> a.id) ? -1 : 0)) : [],
			});
		});
	}

	obtenerPacientesEstado(estado) {
		pacienteService.obtenerTodo().then((response) => {
			this.setState({
			  listaPacientes: response.status === 200 ? response.data.filter(data => data.estado == estado).sort((a,b) => (a.id > b.id) ? 1 : ((b.id> a.id) ? -1 : 0)) : [],
			});
		});
	}

	obtenerPacientesDiagnostico(diagnostico) {
		pacienteService.obtenerTodo().then((response) => {
			this.setState({
			  listaPacientes: response.status === 200 ? response.data.filter(data => data.diagnostico == diagnostico).sort((a,b) => (a.id > b.id) ? 1 : ((b.id> a.id) ? -1 : 0)) : [],
			});
		});
	}
	

	handleChange(e) {
		if (e.target.id === "filtro") {
			this.setState({ filtro: e.target.value, selectedValue: "seleccionar" });
			if (e.target.value === "Mostrar todos") {
				this.obtenerPacientes()
			}
			else {this.setState({ listaPacientes: [] })}
		}
		else if (e.target.id === "seleccion2") {
			this.setState({ selectedValue: e.target.value });
			this.obtenerPacientesEstado(parseInt(e.target.value));
		}
		else if (e.target.id === "seleccion3") {
			this.setState({ selectedValue: e.target.value });
			this.obtenerPacientesDiagnostico(parseInt(e.target.value));
		}
	}

	componentDidMount(){
		this.obtenerPacientes();
	}

	render() {
		return (
			<div>
				<h4 className="display-4 correccionCelular">Pacientes del Sistema</h4>
				<hr></hr>
				<form >
					<div className="form-row">
						<div className="col">
							<label className="my-1 mr-2" htmlFor="inlineFormCustomSelectPref">Filtrar por</label>
							<select className="custom-select my-1 mr-sm-2" onChange={this.handleChange} id="filtro">
								<option selected>Mostrar todos</option>
								<option >Estado</option>
								<option >Diagnóstico</option>
							</select>
						</div>
						<div className="col">
							<label className="my-1 mr-2" htmlFor="inlineFormCustomSelectPref">Seleccionar</label>
							{this.state.filtro === "Mostrar todos" ?
								<select className="custom-select my-1 mr-sm-2" id="seleccion1" disabled>
								</select> :
								(this.state.filtro === "Estado" ?
									<select value={this.state.selectedValue} className="custom-select my-1 mr-sm-2" id="seleccion2" onChange={this.handleChange}>
										<option selected value="seleccionar">Seleccionar...</option>
										<option value="0">No se encuentra en el hospital</option>
										<option value="1">En espera</option>
										<option value="2">En quimioterapia</option>
										<option value="3">En pabellón </option>
										<option value="4">En recuperación </option>
									</select>
									:
									<select value={this.state.selectedValue} className="custom-select my-1 mr-sm-2" id="seleccion3" onChange={this.handleChange}>
										<option selected value="seleccionar">Seleccionar...</option>
										<option value="0">Requiere Quimioterapia</option>
										<option value="1">Requiere Pabellón</option>
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
							<th scope="col">RUT</th>
							<th scope="col">Apellido</th>
							<th scope="col">Nombre</th>
							<th scope="col">Estado</th>
							<th scope="col">Diagnóstico</th>
						</tr>
					</thead>
					<tbody>
						{
							this.state.listaPacientes.map(paciente => (
								<tr>
									<td>{paciente.id}</td>
									<td>{paciente.rut}</td>
									<td>{paciente.apellido}</td>
									<td>{paciente.nombre}</td>
									<td>{paciente.estado}</td>
									<td>{paciente.diagnostico}</td>
								</tr>)
							)
						}
					</tbody>
				</table>
			</div>
		)
	}
}

class IngresarNuevo extends Component {
	constructor() {
		super();
		this.state = {
			mes: "seleccionar",
			dias: [],
			id: "",
			rut: "",
			nombre: "",
			apellido: "",
			direccion: "",
			telefono: "",
			dia: "seleccionar",
			anio: "seleccionar",
			antecedentes_medicos: "",
			diagnostico: "seleccionar",
			programa_salud: "",
			estado: "seleccionar",
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleChangeData = this.handleChangeData.bind(this);
		this.handleClick = this.handleClick.bind(this);
		this.comprobar = this.comprobar.bind(this);
	}
	handleChange(e) {
		if (e.target.value === "01" || e.target.value === "03" || e.target.value === "05" || e.target.value === "07"
			|| e.target.value === "08" || e.target.value === "10" || e.target.value === "12") {
			this.setState({ mes: e.target.value, dias: Array.from(new Array(31), (x, i) => i + 1) });
		}
		else if (e.target.value === "04" || e.target.value === "06" || e.target.value === "09" || e.target.value === "11") {
			this.setState({ mes: e.target.value, dias: Array.from(new Array(30), (x, i) => i + 1) });
		}
		else if (e.target.value === "02") {
			this.setState({ mes: e.target.value, dias: Array.from(new Array(28), (x, i) => i + 1) });
		}
		else {
			this.setState({ mes: e.target.value, dias: [] });
		}
	}

	handleChangeData(e){
		if (e.target.id === "inputRut") {
			this.setState({ rut: e.target.value });
		}
		else if (e.target.id === "inputNombres") {
			this.setState({ nombre: e.target.value });
		}
		else if (e.target.id === "inputApellidos") {
			this.setState({ apellido: e.target.value });
		}
		else if (e.target.id === "inputDia") {
			this.setState({ dia: e.target.value });
		}
		else if (e.target.id === "inputAnio") {
			this.setState({ anio: e.target.value });
		}
		else if (e.target.id === "inputDireccion") {
			this.setState({ direccion: e.target.value });
		}
		else if (e.target.id === "inputTelefono") {
			this.setState({ telefono: e.target.value });
		}
		else if (e.target.id === "inputAntecedentes") {
			this.setState({ antecedentes_medicos: e.target.value });
		}
		else if (e.target.id === "inputSalud") {
			this.setState({ programa_salud: e.target.value });
		}
		else if (e.target.id === "inputEstado") {
			this.setState({ estado: e.target.value });
		}
		else if (e.target.id === "inputDiagnostico") {
			this.setState({ diagnostico: e.target.value });
		}
	}

	comprobar(){
		var respuesta = true;
		if(this.state.rut==="" || this.state.nombre==="" || this.state.apellido==="" || this.state.programa_salud==="" || 
		   this.state.direccion==="" || this.state.telefono==="" || this.state.antecedentes_medicos==="" || 
		   this.state.mes==="seleccionar" || this.state.dia==="seleccionar" || this.state.anio==="seleccionar" ||
		   this.state.estado==="seleccionar" || this.state.diagnostico==="seleccionar"){
			alert("Debe rellenar todos los campos del formulario.");
			respuesta = false;
		}
		if(this.state.rut.match(/^[^0]\d{6,7}-\d$/) == null && this.state.rut != ""){
			alert("Debe ingresar un rut válido, sin puntos y con guión.")
			respuesta = false;
		}
		if(this.state.telefono.match(/^\d{8,9}$/) == null && this.state.telefono != ""){
			alert("Debe ingresar un teléfono válido.")
			respuesta = false;
		}
		return respuesta;
	}

	handleClick(){
		if(this.comprobar()){
			const diaFixed = (this.state.dia.toString().length < 2) ? '0' + this.state.dia.toString():this.state.dia.toString();
			const data = {
				rut: this.state.rut, 
				nombre: this.state.nombre,
				apellido: this.state.apellido,
				direccion: this.state.direccion,
				telefono: this.state.telefono,
				antecedentes_medicos: this.state.antecedentes_medicos,
				diagnostico: this.state.diagnostico,
				programa_salud: this.state.programa_salud,
				estado: this.state.estado,
				fecha_nacimiento: diaFixed+'/'+this.state.mes+'/'+this.state.anio, 
				formato_fecha : "dd/MM/yyyy"
			};
			pacienteService.ingresar(data).then((response) => {
				if (response.status === 200){
					if(response.data === "Paciente ya se encuentra en el sistema"){
						alert("Paciente con ese rut ya se encuentra en el sistema.");
						this.setState({
							rut: "",
						});

					}
				}
				else{
					alert("Paciente ingresado exitosamente.");
					this.setState({
						mes: "seleccionar",
						dias: [],
						id: "",
						rut: "",
						nombre: "",
						apellido: "",
						direccion: "",
						telefono: "",
						dia: "seleccionar",
						anio: "seleccionar",
						antecedentes_medicos: "",
						diagnostico: "seleccionar",
						programa_salud: "",
						estado: "seleccionar",
					});
				}
			});
		}
	}

	render() {
		var listaDias = this.state.dias.map((x) => {
			return (
				<option>{x}</option>
			)
		});
		var anios = Array.from(new Array(101), (x, i) => i + 1920);
		var listaAnios = anios.reverse().map((x) => {
			return (
				<option>{x}</option>
			)
		});
		return (
			<>
				<h4 className="display-4 correccionCelular">Ingresar un nuevo paciente</h4>
				<hr></hr>
				<form>
					<div className="form-row">
						<div className="form-group col-md-4">
							<label for="inputRut">RUT</label>
							<input maxLength="10" placeholder="11111111-1" value={this.state.rut} onChange={this.handleChangeData} type="text" className="form-control" id="inputRut"></input>
						</div>
						<div className="form-group col-md-4">
							<label for="inputNombres">Nombres</label>
							<input maxLength="50" value={this.state.nombre} onChange={this.handleChangeData} type="text" className="form-control" id="inputNombres"></input>
						</div>
						<div className="form-group col-md-4">
							<label for="inputApellidos">Apellidos</label>
							<input maxLength="50" value={this.state.apellido} onChange={this.handleChangeData} type="text" className="form-control" id="inputApellidos"></input>
						</div>
					</div>
					<div className="form-row">
						<div className="form-group col-md-5">
							<label for="inputEmail4">Fecha de Nacimiento</label>
							<div className="form-row">
								<div className="form-group col-md-6">
									<select value={this.state.mes} id="inputMes" onChange={this.handleChange} className="form-control">
										<option selected value="seleccionar">Mes...</option>
										<option value="01">Enero</option>
										<option value="02">Febrero</option>
										<option value="03">Marzo</option>
										<option value="04">Abril</option>
										<option value="05">Mayo</option>
										<option value="06">Junio</option>
										<option value="07">Julio</option>
										<option value="08">Agosto</option>
										<option value="09">Septiembre</option>
										<option value="10">Octubre</option>
										<option value="11">Noviembre</option>
										<option value="12">Diciembre</option>
									</select>
								</div>
								<div className="form-group col-md-3">
									<select value={this.state.dia}  onChange={this.handleChangeData} id="inputDia" className="form-control">
										<option value="seleccionar" selected>Día...</option>
										{listaDias}
									</select>
								</div>
								<div className="form-group col-md-3">
									<select value={this.state.anio}  onChange={this.handleChangeData} id="inputAnio" className="form-control">
										<option value="seleccionar" selected>Año...</option>
										{listaAnios}
									</select>
								</div>
							</div>
						</div>
						<div className="form-group col-md-7">
							<label for="inputDireccion">Dirección</label>
							<input maxLength="250" value={this.state.direccion}  onChange={this.handleChangeData} type="text" className="form-control" id="inputDireccion"></input>
						</div>
					</div>
					<div className="form-row">
						<div className="form-group col-md-4">
							<label for="inputTelefono">Teléfono</label>
							<input maxLength="9" placeholder="999999999" value={this.state.telefono}  onChange={this.handleChangeData} type="text" className="form-control" id="inputTelefono"></input>
						</div>
						<div className="form-group col-md-8">
							<label for="inputAntecedentes">Antecedentes Médicos</label>
							<input maxLength="500" value={this.state.antecedentes_medicos} onChange={this.handleChangeData} type="text" className="form-control" id="inputAntecedentes"></input>
						</div>
					</div>
					<div className="form-row">
						<div className="form-group col-md-4">
							<label for="inputSalud">Programa de Salud</label>
							<input maxLength="15" value={this.state.programa_salud}  onChange={this.handleChangeData} type="text" className="form-control" id="inputSalud"></input>
						</div>
						<div className="form-group col-md-4">
							<label className="my-1 mr-2" htmlFor="inlineFormCustomSelectPref">Estado</label>
							<select value={this.state.estado}  onChange={this.handleChangeData} id="inputEstado" className="form-control">
								<option selected value="seleccionar">Seleccionar...</option>
								<option value="0">No se encuentra en el hospital</option>
								<option value="1">En espera</option>
							</select>
						</div>
						<div className="form-group col-md-4">
							<label className="my-1 mr-2" htmlFor="inlineFormCustomSelectPref">Diagnóstico</label>
							<select value={this.state.diagnostico} onChange={this.handleChangeData} id="inputDiagnostico" className="form-control">
								<option selected value="seleccionar">Seleccionar...</option>
								<option value="0">Requiere Quimioterapia</option>
								<option value="1">Requiere Pabellón</option>
							</select>
						</div>
					</div>
					<button type="button" onClick={this.handleClick} className="btn btn-primary btn-rounded"><i class="fas fa-user-plus icono"></i> Ingresar Paciente</button>
				</form>
			</>
		)
	}
}

class BuscarPaciente extends Component {
	constructor() {
		super();
		this.state = {
			id: "",
			rut: "",
			nombre: "",
			apellido: "",
			direccion: "",
			telefono: "",
			fecha_nacimiento: "",
			antecedentes_medicos: "",
			estado: "",
			fecha_ingreso: "",
			diagnostico: "",
			programa_salud: ""
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
		if(this.state.id === ""){
			alert("Debe ingresar una ID.");
		}
		else if( !isNaN(parseInt(this.state.id))){
			pacienteService.obtenerId(parseInt(this.state.id)).then((response) => {
				if (response.data.res != null){
					this.setState({
						rut: response.data.res.rut,
						nombre: response.data.res.nombre,
						apellido: response.data.res.apellido,
						direccion: response.data.res.direccion,
						telefono: response.data.res.telefono,
						fecha_nacimiento: response.data.res.fecha_nacimiento,
						antecedentes_medicos: response.data.res.antecedentes_medicos,
						estado: response.data.res.estado,
						fecha_ingreso: response.data.res.fecha_ingreso,
						diagnostico: response.data.res.diagnostico,
						programa_salud: response.data.res.programa_salud
					});
				}
				else{
					alert("No existe un paciente con ese ID.");
					this.setState({
						rut: "",
						nombre: "",
						apellido: "",
						direccion: "",
						telefono: "",
						fecha_nacimiento: "",
						antecedentes_medicos: "",
						estado: "",
						fecha_ingreso: "",
						diagnostico: "",
						programa_salud: "",
						id: ""
					});
				};
			});
		}
		else{
			alert("ID inválida, debe ser un número.");
			this.setState({
				id: "",
				rut: "",
				nombre: "",
				apellido: "",
				direccion: "",
				telefono: "",
				fecha_nacimiento: "",
				antecedentes_medicos: "",
				estado: "",
				fecha_ingreso: "",
				diagnostico: "",
				programa_salud: ""
			});
		}
	}
	render() {
		return (
			<>
				<h4 className="display-4 correccionCelular">Buscar datos de un paciente</h4>
				<hr></hr>
				<form style={{ marginTop: "30px" }}>
					<div className="form-row">
						<div className="col-auto">
							<div className="form-group row">
								<label for="colFormLabel" className="col-auto col-form-label">Ingrese ID del paciente</label>
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
							<label for="inputRut">RUT</label>
							<input type="text" disabled value={this.state.rut} className="form-control" ></input>
						</div>
						<div className="form-group col-md-4">
							<label for="inputNombres">Nombres</label>
							<input type="text" disabled value={this.state.nombre} className="form-control"></input>
						</div>
						<div className="form-group col-md-4">
							<label for="inputApellidos">Apellidos</label>
							<input type="text" disabled value={this.state.apellido} className="form-control"></input>
						</div>
					</div>
					<div className="form-row">
						<div className="form-group col-md-3">
							<label for="inputEmail4">Fecha de Nacimiento</label>
							<input type="text" disabled value={this.state.fecha_nacimiento} className="form-control"></input>
						</div>
						<div className="form-group col-md-3">
							<label for="inputEmail4">Fecha de Ingreso</label>
							<input type="text" disabled value={this.state.fecha_ingreso} className="form-control"></input>
						</div>
						<div className="form-group col-md-6">
							<label for="inputDireccion">Dirección</label>
							<input type="text" disabled value={this.state.direccion} className="form-control"></input>
						</div>
					</div>
					<div className="form-row">
						<div className="form-group col-md-4">
							<label for="inputTelefono">Teléfono</label>
							<input type="text" disabled value={this.state.telefono} className="form-control"></input>
						</div>
						<div className="form-group col-md-8">
							<label for="inputAntecedentes">Antecedentes Médicos</label>
							<input type="text" className="form-control" disabled value={this.state.antecedentes_medicos}></input>
						</div>
					</div>
					<div className="form-row">
						<div className="form-group col-md-4">
							<label for="inputSalud">Programa de Salud</label>
							<input type="text" disabled value={this.state.programa_salud} className="form-control"></input>
						</div>
						<div className="form-group col-md-4">
							<label className="my-1 mr-2" htmlFor="inlineFormCustomSelectPref">Estado</label>
							<input type="text" disabled value={this.state.estado} className="form-control"></input>
						</div>
						<div className="form-group col-md-4">
							<label className="my-1 mr-2" htmlFor="inlineFormCustomSelectPref">Diagnóstico</label>
							<input type="text" disabled value={this.state.diagnostico} className="form-control"></input>
						</div>
					</div>
				</form>
			</>
		)
	}
}

class ActualizarPaciente extends Component {
	constructor() {
		super();
		this.state = {
			dias: Array.from(new Array(31), (x, i) => i + 1), 
			estado: "",
			id: "",
			rut: "",
			nombre: "",
			apellido: "",
			direccion: "",
			telefono: "",
			dia: "",
			mes: "0",
			anio: "",
			antecedentes_medicos: "",
			diagnostico: "",
			programa_salud: "",
			fecha_nacimiento: "",
			desactivar : true, 
			desactivarEstado : false
		};
		this.handleChange = this.handleChange.bind(this);
		this.handleChangeDate = this.handleChangeDate.bind(this);
		this.handleChangeInput = this.handleChangeInput.bind(this);
		this.handleClickBuscar = this.handleClickBuscar.bind(this);
		this.handleClickActualizar = this.handleClickActualizar.bind(this);
		this.handleClickEliminar = this.handleClickEliminar.bind(this);
		this.comprobar = this.comprobar.bind(this);
	}

	handleChange(e) {
		this.setState({
			id: e.target.value,
			dias: Array.from(new Array(31), (x, i) => i + 1), 
			estado: "",
			rut: "",
			nombre: "",
			apellido: "",
			direccion: "",
			telefono: "",
			dia: "",
			mes: "0",
			anio: "",
			antecedentes_medicos: "",
			diagnostico: "",
			programa_salud: "",
			fecha_nacimiento: "",
			desactivar : true, 
			desactivarEstado : false

		});
	}

	handleChangeDate(e) {
		if (e.target.value === "01" || e.target.value === "03" || e.target.value === "05" || e.target.value === "07"
			|| e.target.value === "08" || e.target.value === "10" || e.target.value === "12") {
			this.setState({ mes: e.target.value, dias: Array.from(new Array(31), (x, i) => i + 1) });
		}
		else if (e.target.value === "04" || e.target.value === "06" || e.target.value === "09" || e.target.value === "11") {
			this.setState({ mes: e.target.value, dias: Array.from(new Array(30), (x, i) => i + 1) });
		}
		else if (e.target.value === "02") {
			this.setState({ mes: e.target.value, dias: Array.from(new Array(28), (x, i) => i + 1) });
		}
		else {
			this.setState({ mes: e.target.value, dias: [] });
		}
	}

	handleChangeInput(e) {
		if (e.target.id === "inputRut") {
			this.setState({ rut: e.target.value });
		}
		else if (e.target.id === "inputNombres") {
			this.setState({ nombre: e.target.value });
		}
		else if (e.target.id === "inputApellidos") {
			this.setState({ apellido: e.target.value });
		}
		else if (e.target.id === "inputDia") {
			this.setState({ dia: e.target.value });
		}
		else if (e.target.id === "inputAnio") {
			this.setState({ anio: e.target.value });
		}
		else if (e.target.id === "inputDireccion") {
			this.setState({ direccion: e.target.value });
		}
		else if (e.target.id === "inputTelefono") {
			this.setState({ telefono: e.target.value });
		}
		else if (e.target.id === "inputAntecedentes") {
			this.setState({ antecedentes_medicos: e.target.value });
		}
		else if (e.target.id === "inputSalud") {
			this.setState({ programa_salud: e.target.value });
		}
		else if (e.target.id === "inputDiagnostico") {
			this.setState({ diagnostico: e.target.value });
		}
		else if (e.target.id === "inputEstado") {
			this.setState({ estado: e.target.value });
		}
	}

	handleClickBuscar() {
		if(this.state.id === ""){
			alert("Debe ingresar una ID.");
		}
		else if( !isNaN(parseInt(this.state.id))){
			pacienteService.obtenerId(parseInt(this.state.id)).then((response) => {
				if (response.data.res != null){
					this.setState({
						rut: response.data.res.rut,
						nombre: response.data.res.nombre,
						apellido: response.data.res.apellido,
						direccion: response.data.res.direccion,
						telefono: response.data.res.telefono,
						fecha_nacimiento: response.data.res.fecha_nacimiento,
						antecedentes_medicos: response.data.res.antecedentes_medicos,
						estado: response.data.res.estado,
						fecha_ingreso: response.data.res.fecha_ingreso,
						diagnostico: response.data.res.diagnostico,
						programa_salud: response.data.res.programa_salud,
						desactivar: false,
						anio: response.data.res.fecha_nacimiento.slice(0,4),
						mes: response.data.res.fecha_nacimiento.slice(5,7),
						dia: response.data.res.fecha_nacimiento.slice(8,10),
						desactivarEstado: (response.data.res.estado == 2 || response.data.res.estado == 3 || response.data.res.estado == 4) ? true : false
					});
				}
				else{
					alert("No existe un paciente con ese ID.");
					this.setState({
						id:"",
						rut: "",
						nombre: "",
						apellido: "",
						direccion: "",
						telefono: "",
						fecha_nacimiento: "",
						antecedentes_medicos: "",
						estado: "",
						fecha_ingreso: "",
						diagnostico: "",
						programa_salud: "",
						desactivar: true, 
						estado: "",
						desactivarEstado: false,
						anio:"",
						mes:"",
						día:""
					});
				};
			});
		}
		else{
			alert("ID inválida, debe ser un número.");
			this.setState({
				id: "",
				rut: "",
				nombre: "",
				apellido: "",
				direccion: "",
				telefono: "",
				fecha_nacimiento: "",
				antecedentes_medicos: "",
				estado: "",
				fecha_ingreso: "",
				diagnostico: "",
				programa_salud: "",
				desactivar: true, 
				estado: "",
				desactivarEstado: false,
				anio:"",
				mes:"",
				día:""
			});
		}
	}

	comprobar(){
		var respuesta = true;
		if(this.state.rut==="" || this.state.nombre==="" || this.state.apellido==="" || this.state.programa_salud==="" || 
		   this.state.direccion==="" || this.state.telefono==="" || this.state.antecedentes_medicos==="" || 
		   this.state.mes==="seleccionar" || this.state.dia==="seleccionar" || this.state.anio==="seleccionar" ||
		   this.state.estado==="seleccionar" || this.state.diagnostico==="seleccionar"){
			alert("Debe rellenar todos los campos del formulario.");
			respuesta = false;
		}
		if(this.state.rut.match(/^[^0]\d{6,7}-\d$/) == null && this.state.rut != ""){
			alert("Debe ingresar un rut válido, sin puntos y con guión.")
			respuesta = false;
		}
		if(this.state.telefono.match(/^\d{8,9}$/) == null && this.state.telefono != ""){
			alert("Debe ingresar un teléfono válido.")
			respuesta = false;
		}
		return respuesta;
	}

	handleClickActualizar() {
		if(this.comprobar()){
			const diaFixed = (this.state.dia.toString().length < 2) ? '0' + this.state.dia.toString():this.state.dia.toString();
			const data = {
				rut: this.state.rut, 
				nombre: this.state.nombre,
				apellido: this.state.apellido,
				direccion: this.state.direccion,
				telefono: this.state.telefono,
				antecedentes_medicos: this.state.antecedentes_medicos,
				diagnostico: this.state.diagnostico,
				programa_salud: this.state.programa_salud,
				fecha_nacimiento: diaFixed+'/'+this.state.mes+'/'+this.state.anio, 
				formato_fecha : "dd/MM/yyyy",
			};
			const id = this.state.id;
			const estado = this.state.estado;
			pacienteService.actualizarDatos(data, parseInt(this.state.id)).then((response) => {
				console.log(response.data);
				if (response.data === "Paciente inexistente"){
					alert("Paciente con ese rut ya se encuentra en el sistema.");
					this.setState({
						rut: "",
					});
				}
				else{
					pacienteService.actualizarEstado(parseInt(id), parseInt(estado));
					alert("Paciente actualizado exitosamente.");
					this.setState({
						mes: "0",
						dias: Array.from(new Array(31), (x, i) => i + 1),
						id: "",
						rut: "",
						nombre: "",
						apellido: "",
						direccion: "",
						telefono: "",
						dia: "",
						anio: "",
						antecedentes_medicos: "",
						diagnostico: "",
						programa_salud: "",
						desactivar: true, 
						estado:"",
						desactivarEstado: false
					});
				}	
			});
		}
	}

	handleClickEliminar() {
		pacienteService.eliminar(parseInt(this.state.id));
		alert("Paciente eliminado exitosamente.");
		this.setState({
			mes: "",
			dias: Array.from(new Array(31), (x, i) => i + 1),
			id: "",
			rut: "",
			nombre: "",
			apellido: "",
			direccion: "",
			telefono: "",
			dia: "",
			anio: "",
			antecedentes_medicos: "",
			diagnostico: "",
			programa_salud: "",
			desactivar: true, 
			estado: "", 
			desactivarEstado: false
		});
	}

	render() {
		var listaDias = this.state.dias.map((x, index) => {
			return (
				<option>{x}</option>
			)
		});
		var anios = Array.from(new Array(101), (x, i) => i + 1920);
		var listaAnios = anios.reverse().map((x, index) => {
			return (
				<option>{x}</option>
			)
		});
		return (
			<>
				<h4 className="display-4 correccionCelular">Actualizar datos de un paciente</h4>
				<hr></hr>
				<form style={{ marginTop: "30px" }}>
					<div className="form-row">
						<div className="col-auto">
							<div className="form-group row">
								<label for="colFormLabel" className="col-auto col-form-label">Ingrese ID del paciente</label>
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
							<label for="inputRut">RUT</label>
							<input type="text" maxLength="10" onChange={this.handleChangeInput} value={this.state.rut} className="form-control" id="inputRut"></input>
						</div>
						<div className="form-group col-md-4">
							<label for="inputNombres">Nombres</label>
							<input type="text" maxLength="50" onChange={this.handleChangeInput} value={this.state.nombre} className="form-control" id="inputNombres"></input>
						</div>
						<div className="form-group col-md-4">
							<label for="inputApellidos">Apellidos</label>
							<input type="text" maxLength="50" onChange={this.handleChangeInput} value={this.state.apellido}  className="form-control" id="inputApellidos"></input>
						</div>
					</div>
					<div className="form-row">
						<div className="form-group col-md-5">
							<label for="inputEmail4">Fecha de Nacimiento</label>
							<div className="form-row">
								<div className="form-group col-md-6">
									<select id="inputMes" value={this.state.mes} onChange={this.handleChangeDate} className="form-control">
										<option selected value="seleccionar">Mes...</option>
										<option value="01">Enero</option>
										<option value="02">Febrero</option>
										<option value="03">Marzo</option>
										<option value="04">Abril</option>
										<option value="05">Mayo</option>
										<option value="06">Junio</option>
										<option value="07">Julio</option>
										<option value="08">Agosto</option>
										<option value="09">Septiembre</option>
										<option value="10">Octubre</option>
										<option value="11">Noviembre</option>
										<option value="12">Diciembre</option>
									</select>
								</div>
								<div className="form-group col-md-3">
									<select id="inputDia" onChange={this.handleChangeInput} value={this.state.dia} className="form-control">
										<option selected>Día...</option>
										{listaDias}
									</select>
								</div>
								<div className="form-group col-md-3">
									<select id="inputAnio" onChange={this.handleChangeInput} value={this.state.anio}  className="form-control">
										<option selected>Año...</option>
										{listaAnios}
									</select>
								</div>
							</div>
						</div>
						<div className="form-group col-md-7">
							<label for="inputDireccion">Dirección</label>
							<input type="text" maxLength="250" onChange={this.handleChangeInput} value={this.state.direccion} placeholder={this.state.direccion} className="form-control" id="inputDireccion"></input>
						</div>
					</div>
					<div className="form-row">
						<div className="form-group col-md-4">
							<label for="inputTelefono">Teléfono</label>
							<input type="text" maxLength="9" onChange={this.handleChangeInput} value={this.state.telefono} placeholder={this.state.telefono} className="form-control" id="inputTelefono"></input>
						</div>
						<div className="form-group col-md-8">
							<label for="inputAntecedentes">Antecedentes Médicos</label>
							<input type="text" maxLength="500" onChange={this.handleChangeInput} value={this.state.antecedentes_medicos} placeholder={this.state.antecedentes_medicos} className="form-control" id="inputAntecedentes"></input>
						</div>
					</div>
					<div className="form-row">
						<div className="form-group col-md-4">
							<label for="inputSalud">Programa de Salud</label>
							<input type="text" maxLength="15" onChange={this.handleChangeInput} value={this.state.programa_salud} placeholder={this.state.programa_salud} className="form-control" id="inputSalud"></input>
						</div>
						<div className="form-group col-md-4">
							<label className="my-1 mr-2" htmlFor="inlineFormCustomSelectPref">Estado</label>
							<select disabled={this.state.desactivarEstado} value={this.state.estado}  onChange={this.handleChangeInput} id="inputEstado" className="form-control">
								<option selected value="seleccionar">Seleccionar...</option>
								<option value="0">No se encuentra en el hospital</option>
								<option value="1">En espera</option>
							</select>
						</div>
						<div className="form-group col-md-4">
							<label className="my-1 mr-2" htmlFor="inlineFormCustomSelectPref">Diagnóstico</label>
							<select onChange={this.handleChangeInput} id="inputDiagnostico" value={this.state.diagnostico}  className="form-control">
								<option selected value="seleccionar">Seleccionar...</option>
								<option value="0">Requiere Quimioterapia</option>
								<option value="1">Requiere Pabellón</option>
							</select>
						</div>
					</div>
					<button type="button" onClick={this.handleClickActualizar} disabled={this.state.desactivar} className="btn btn-primary btn-rounded"><i class="fas fa-user-edit icono"></i> Actualizar Paciente</button>
					<button type="button" onClick={this.handleClickEliminar} disabled={this.state.desactivar} className="btn btn-secondary btn-rounded" style={{ marginLeft: "15px" }}><i className="fas fa-user-times icono"></i> Eliminar Paciente</button>
				</form>
			</>
		)
	}
}

export default class Pacientes extends Component {
	constructor(){
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
							<h1 className="display-3"><i className="fas icono fa-file-medical-alt"></i>  Gestión de<strong>  Pacientes</strong></h1>
						</div>
					</div>
				</div>
				<div className="tab-content " style={{ marginTop: "1px" }}>
					<div className="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
						<div className="container">
							<div className="row">
								<div className="col-lg-2 ">
									<div className="nav flex-column nav-pills nav-material2 stiky-list" id="v-pills-tab" role="tablist" aria-orientation="vertical">
										<a onClick={this.handleClick} className="link-material nav-link active" id="v-pills-home-tab" data-toggle="pill" href="#v-pills-home" role="tab" aria-controls="v-pills-home" aria-selected="true">Ver todos los pacientes</a>
										<a className="link-material nav-link" id="v-pills-profile-tab" data-toggle="pill" href="#v-pills-profile" role="tab" aria-controls="v-pills-profile" aria-selected="false">Ingresar nuevo paciente</a>
										<a className="link-material nav-link" id="v-pills-messages-tab" data-toggle="pill" href="#v-pills-messages" role="tab" aria-controls="v-pills-messages" aria-selected="false">Buscar datos de un paciente</a>
										<a className="link-material nav-link" id="v-pills-settings-tab" data-toggle="pill" href="#v-pills-settings" role="tab" aria-controls="v-pills-settings" aria-selected="false">Modificar datos de un paciente</a>
									</div>
								</div>
								<div className="col-lg-10" style={{ paddingTop: "30px", paddingBottom: "30px" }}>
									<div className="tab-content" id="v-pills-tabContent">
										<div className="tab-pane fade show active" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab">
											<Todos/>
										</div>
										<div className="tab-pane fade" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-home-tab">
											<IngresarNuevo/>
										</div>
										<div className="tab-pane fade" id="v-pills-messages" role="tabpanel" aria-labelledby="v-pills-messages-tab">
											<BuscarPaciente />
										</div>
										<div className="tab-pane fade" id="v-pills-settings" role="tabpanel" aria-labelledby="v-pills-settings-tab">
											<ActualizarPaciente/>
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