import React, { Component } from 'react';
import './Administracion.css';
import ScrollToTop from "react-scroll-up";
import PquimioList from './PquimioList';
import SalaquimioList from './SalaquimioList';
import SillonquimioList from './SillonquimioList';
import PACSillonquimioList from './PACSillonquimioList';
import MEDPquimioList from './MEDPquimioList';


import fondo from './fondomaterial.jpg';
//target="_blank" rel="noopener noreferrer" Para abrir link de manera segura en nueva pestaña
//lead


const dataDigital = {
	descripcion: "Nam eget purus nec est consectetur vehicula. Nullam ultrices nisl risus, in viverra libero egestas sit amet. Etiam porttitor dolor non eros pulvinar malesuada. Vestibulum sit amet est mollis nulla tempus aliquet. Praesent luctus hendrerit arcu non laoreet. Morbi consequat placerat magna, ac ornare odio sagittis sed. Donec vitae ullamcorper purus. Vivamus non metus ac justo porta volutpat.",
	lista_material: [
		[
			{
				titulo_subseccion: "Título Sección 1",
				numero: 1,
			} ,
			{
				tipo: "presentacion",
				titulo: "Presentación Sesión 1",
				url_presentacion: "https://docs.google.com/presentation/d/e/2PACX-1vRbv-mC5vfe3HlNgt7VfRkxUaCHSNeIDppO2Gm-nNqahn0-19OLbUaNZcuIB5BbOFrM2_7gWjkf2WG7/embed?start=false&loop=false&delayms=3000"
			},
			{
				tipo: "ejercicio",
				titulo: "Ejercicio 1",
				url_ejercicio: "http://progra.usm.cl/apunte/ejercicios/1/saludo.html"
			},
			{
				tipo: "ejercicio",
				titulo: "Ejercicio 2",
				url_ejercicio: "https://stackoverflow.com/questions/31712808/how-to-force-javascript-to-deep-copy-a-string"
			},
			{
				tipo: "video",
				titulo: "Video sobre algo",
				url_video: "https://www.youtube.com/watch?v=6djggrlkHY8"
			}
		],
		[
			{
				titulo_subseccion: "Título Sección 2",
				numero: 2
			},
			{
				tipo: "presentacion",
				titulo: "Presentación Sesión 2",
				url_presentacion:"https://docs.google.com/presentation/d/e/2PACX-1vQmd9ccIvLLrAKufpz6GcVE2cn1YlejwiAXh9Jz3yDw33zufAtiMrw4n6LnbeXOl9fLKtRG59yBXVB9/embed?start=false&loop=false&delayms=3000"
			},
			{
				tipo: "archivo",
				titulo: "Archivo de algo",
				url_archivo: "http://progra.usm.cl/apunte/ejercicios/1/saludo.html"
			},
			{
				tipo: "sitio",
				titulo: "Un sitio de interés",
				url_sitio: "https://dog.ceo/dog-api/"
			},
		],
	]
};


class Importante extends Component{
	render(){
		return(
			<div className={"bs-callout shadow-sm sinmargen bs-callout-warning "+this.props.color}>
				<h5>{this.props.titulo}</h5>
				<p>{this.props.contenido}</p>
			</div>
		)
	}
}

class Recomendacion extends Component{
	render(){
		return(
			<div style={{marginBottom:"35px"}}>
			<hr></hr>
			<h2 style={{marginTop:"25px",marginBottom:"15px"}}>{this.props.titulo}</h2>
			<p>{this.props.contenido}</p>		
			</div>
		)
	}
}

const dataRecomendaciones = {
	descripcion : "Nam eget purus nec est consectetur vehicula. Nullam ultrices nisl risus, in viverra libero egestas sit amet. Etiam porttitor dolor non eros pulvinar malesuada. Vestibulum sit amet est mollis nulla tempus aliquet. Praesent luctus hendrerit arcu non laoreet. Morbi consequat placerat magna, ac ornare odio sagittis sed. Donec vitae ullamcorper purus. Vivamus non metus ac justo porta volutpat.",
	imagen: "https://sloanreview.mit.edu/wp-content/uploads/2018/10/MAG-Ransbotham-Ratings-Recommendations-1200.jpg",
	color: "warning",
	lista_recomendaciones: [
		{
			titulo: "Recomendación 1",
			descripcion: "Quis quam ut magna consequat faucibus. Pellentesque eget nisi a mi suscipit tincidunt. Ut tempus dictum risus. Pellentesque viverra sagittis quam at mattis. Suspendisse potenti. Aliquam sit amet gravida nibh, facilisis gravida odio. Phasellus auctor velit at lacus blandit, commodo iaculis justo viverra. Etiam vitae est arcu. Mauris vel congue dolor. Aliquam eget mi mi. Fusce quam tortor, commodo ac dui quis, bibendum viverra erat. Maecenas mattis lectus enim, quis tincidunt dui molestie euismod. Curabitur et diam tristique, accumsan nunc eu, hendrerit tellus.",
			observacion: "Quis quam ut magna consequat faucibus. Pellentesque eget nisi a mi suscipit tincidunt. Ut tempus dictum risus. Pellentesque viverra sagittis quam at mattis."
		} ,
		{
			titulo: "Recomendación 2",
			descripcion: "Quis quam ut magna consequat faucibus. Pellentesque eget nisi a mi suscipit tincidunt. Ut tempus dictum risus. Pellentesque viverra sagittis quam at mattis. Suspendisse potenti. Aliquam sit amet gravida nibh, facilisis gravida odio. Phasellus auctor velit at lacus blandit, commodo iaculis justo viverra. Etiam vitae est arcu. Mauris vel congue dolor. Aliquam eget mi mi. Fusce quam tortor, commodo ac dui quis, bibendum viverra erat. Maecenas mattis lectus enim, quis tincidunt dui molestie euismod. Curabitur et diam tristique, accumsan nunc eu, hendrerit tellus.",
			observacion: "Quis quam ut magna consequat faucibus. Pellentesque eget nisi a mi suscipit tincidunt. Ut tempus dictum risus. Pellentesque viverra sagittis quam at mattis."
		} ,
		{
			titulo: "Recomendación 3",
			descripcion: "Quis quam ut magna consequat faucibus. Pellentesque eget nisi a mi suscipit tincidunt. Ut tempus dictum risus. Pellentesque viverra sagittis quam at mattis. Suspendisse potenti. Aliquam sit amet gravida nibh, facilisis gravida odio. Phasellus auctor velit at lacus blandit, commodo iaculis justo viverra. Etiam vitae est arcu. Mauris vel congue dolor. Aliquam eget mi mi. Fusce quam tortor, commodo ac dui quis, bibendum viverra erat. Maecenas mattis lectus enim, quis tincidunt dui molestie euismod. Curabitur et diam tristique, accumsan nunc eu, hendrerit tellus.",
			observacion: null
		}
	]
};

class Boton extends Component{
    render(){
        return(
            <div className="container-fluid" style={{paddingBottom:"100px",paddingTop:"90px",backgroundColor:"#e9ecef"}}>                        
                <div className="container ">
                    <h2 className="display-4" style={{fontSize:"3rem"}}>Administración de <strong>{this.props.nombre}</strong></h2>
                    <hr></hr>
                    <div className="row informacion1">
                        <div className="d-none d-lg-block col-md-3  imagen-robot" style={{paddingLeft:"55px"}}>
                            <i className={this.props.icono +" fa-9x"}></i>
                        </div>
                        <div className="col-md-9">
                            <div className="container ">
                                <h2 className="display-4" style={{fontSize:"2.2rem"}}>Sistema de Administración de {this.props.nombre}</h2>
                                <p>Administración y asignación de personal y pacientes.</p>
                                <div style={{marginTop:"0px"}}>
                                    <a href={this.props.enlace}><button type="button" className="btn btn-info text-white">Ir al sistema <i className="fas fa-chevron-right icono"></i> </button></a>
                                </div>
                            </div>
                        </div>
                    </div>  
                </div>
            </div>
        )
    }
}

class Recomendaciones extends Component{
	render(){
		const recomendaciones = dataRecomendaciones.lista_recomendaciones.map((x,index) => {
			if(x.observacion == null){
				return(
					<Recomendacion key={index} titulo={x.titulo} contenido={x.descripcion}/>
				);
			}
			else{
				return(
					<div key={index}>
						<Recomendacion  titulo={x.titulo} contenido={x.descripcion}/>
						<Importante color={dataRecomendaciones.color} titulo="Importante" contenido={x.observacion}/>
					</div>
				);
			}
        });
		return(
			<div>
				<h1 className="display-4 correccionCelular">Recomendaciones</h1>
				<hr></hr>
				<div className="row" style={{marginTop:"30px"}}>
					<div className="col-lg-3 text-center d-none d-lg-block">
						<img width="140" height="140" alt="" className="rounded-circle imagen-circular" src={dataRecomendaciones.imagen}></img>
					</div>
					<div className="col-lg-9"> 
						<p className="lead" style={{fontSize:"1.1rem"}}>{dataRecomendaciones.descripcion}</p>
					</div>
				</div>
				{recomendaciones}
				<div className="d-none d-lg-block "></div>
				<div className="d-none d-lg-block ">
					<ScrollToTop showUnder={360} style={{bottom: "90px"}}>
						<span style={{color:"rgba(0,0,0,.5)"}} ><i className="fas fa-chevron-up fa-2x"></i></span>
					</ScrollToTop>
				</div>
			</div>
		)
	}
}

class Actividad extends Component{
	render(){
		return(
			<div style={{marginBottom:"30px"}}>
				<div className="shadow-sm mb-3 rounded bg-light">
					<div className="card-body" >
						<h4 className="card-title"><i className="fas icono fa-gamepad"></i> {this.props.titulo}</h4>
						<hr></hr>
						<div >
							<div className="row card-text">
								<div className="col-lg-3 " align="center">
								<img alt="" className="rounded-circle imagen-circular" src={this.props.imagen} alt="Generic placeholder image" width="140" height="140"/>
								</div>
								<div className="col"><p>{this.props.definicion}</p></div>
							</div>	
						</div>
					</div>
				</div>
			</div>	
		)
	}
}

const dataActividades = {
	descripcion: "Nam eget purus nec est consectetur vehicula. Nullam ultrices nisl risus, in viverra libero egestas sit amet. Etiam porttitor dolor non eros pulvinar malesuada. Vestibulum sit amet est mollis nulla tempus aliquet. Praesent luctus hendrerit arcu non laoreet. Morbi consequat placerat magna, ac ornare odio sagittis sed. Donec vitae ullamcorper purus. Vivamus non metus ac justo porta volutpat.",
	lista_actividades: [
		{
			titulo: "Actividad 1",
			descripcion: "Nam eget purus nec est consectetur vehicula. Nullam ultrices nisl risus, in viverra libero egestas sit amet. Etiam porttitor dolor non eros pulvinar malesuada. Vestibulum sit amet est mollis nulla tempus aliquet. Praesent luctus hendrerit arcu non laoreet. Morbi consequat placerat magna, ac ornare odio sagittis sed. Donec vitae ullamcorper purus. Vivamus non metus ac justo porta volutpat.								",
			imagen: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAA1BMVEWIiIhYZW6zAAAASElEQVR4nO3BgQAAAADDoPlTX+AIVQEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADwDcaiAAFXD1ujAAAAAElFTkSuQmCC"
		} ,
		{
			titulo: "Actividad 2",
			descripcion: "Nam eget purus nec est consectetur vehicula. Nullam ultrices nisl risus, in viverra libero egestas sit amet. Etiam porttitor dolor non eros pulvinar malesuada. Vestibulum sit amet est mollis nulla tempus aliquet. Praesent luctus hendrerit arcu non laoreet. Morbi consequat placerat magna, ac ornare odio sagittis sed. Donec vitae ullamcorper purus. Vivamus non metus ac justo porta volutpat.								",
			imagen: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAA1BMVEWIiIhYZW6zAAAASElEQVR4nO3BgQAAAADDoPlTX+AIVQEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADwDcaiAAFXD1ujAAAAAElFTkSuQmCC"
		} ,
		{
			titulo: "Actividad 3",
			descripcion: "Nam eget purus nec est consectetur vehicula. Nullam ultrices nisl risus, in viverra libero egestas sit amet. Etiam porttitor dolor non eros pulvinar malesuada. Vestibulum sit amet est mollis nulla tempus aliquet. Praesent luctus hendrerit arcu non laoreet. Morbi consequat placerat magna, ac ornare odio sagittis sed. Donec vitae ullamcorper purus. Vivamus non metus ac justo porta volutpat.								",
			imagen: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAA1BMVEWIiIhYZW6zAAAASElEQVR4nO3BgQAAAADDoPlTX+AIVQEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADwDcaiAAFXD1ujAAAAAElFTkSuQmCC"
		} ,
		{
			titulo: "Actividad 4",
			descripcion: "Nam eget purus nec est consectetur vehicula. Nullam ultrices nisl risus, in viverra libero egestas sit amet. Etiam porttitor dolor non eros pulvinar malesuada. Vestibulum sit amet est mollis nulla tempus aliquet. Praesent luctus hendrerit arcu non laoreet. Morbi consequat placerat magna, ac ornare odio sagittis sed. Donec vitae ullamcorper purus. Vivamus non metus ac justo porta volutpat.								",
			imagen: "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAOEAAADhCAMAAAAJbSJIAAAAA1BMVEWIiIhYZW6zAAAASElEQVR4nO3BgQAAAADDoPlTX+AIVQEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAADwDcaiAAFXD1ujAAAAAElFTkSuQmCC"
		} ,
	]
};

class Actividades extends Component{
	render(){
		const actividades = dataActividades.lista_actividades.map((x,index) => {
				return(
					<Actividad key={index} titulo={x.titulo} definicion={x.descripcion} imagen={x.imagen}/>
				);
        });
		return(
			<div>
				<h1 className="display-4 correccionCelular">Actividades de Recreación</h1>
				<hr></hr>
				<p style={{marginBottom:"30px"}}>{dataActividades.descripcion}</p>
				{actividades}
				<div className="d-none d-lg-block ">
					<ScrollToTop showUnder={360} style={{bottom: "90px"}}>
						<span style={{color:"rgba(0, 0, 0, 0.5)"}} ><i className="fas fa-chevron-up fa-2x"></i></span>
					</ScrollToTop>
				</div>
			</div>
		)
	}
}

const dataMaterial = {
	descripcion:"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean finibus purus velit, sed suscipit neque maximus eget. Sed malesuada tempor tellus ut pretium. Etiam lorem ante, convallis in est eget, tempor molestie felis. Maecenas vitae risus vestibulum, rhoncus velit at, tincidunt diam. Suspendisse auctor eget sapien nec convallis. Aliquam erat volutpat.",
	url_imagen:"./fondomaterial.jpg", 
};


export default class Material extends Component{
    constructor(){
        super();
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(e) {
        window.location.reload();
    }
    
    render(){
        return(
        	<section className="material">
				<div className="jumbotron-fluid paral " style={{backgroundImage:'url('+fondo+')'}} >
					<div className="overlay ">
						<div className="container">
						<h1 className="display-3"><i class="fas fa-notes-medical icono"></i>  Administración de <strong> Salas y Pabellones</strong></h1>
						</div>
					</div>
				</div>
				<ul className="nav nav-material nav-pills nav-fill mb-3 bg-light" >
                    <li className="nav-item niveles">
                        <a className="nav-link rounded-0 text-white bg-info"id="pills-home-tab" data-toggle="pill" href="#pills-home" role="tab" aria-controls="pills-home" aria-selected="false">
                        Pabellones
                        </a>
                    </li>
                    <li className="nav-item niveles">
                        <a className="nav-link rounded-0 text-white bg-info active" id="pills-profile-tab" data-toggle="pill" href="#pills-profile" role="tab" aria-controls="pills-profile" aria-selected="true">
                       Salas de Quimioterapia
                        </a>
                    </li>
                    <li className="nav-item niveles">
                        <a className="nav-link rounded-0 text-white bg-info " id="pills-contact-tab" data-toggle="pill" href="#pills-contact" role="tab" aria-controls="pills-contact" aria-selected="false">
                        Salas de Recuperación
                        </a>
                    </li>
                </ul>
				<div className="tab-content " style={{marginTop: "0px"}}>
                    <div className="tab-pane fade" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
                    <Boton nombre="Pabellones" icono="fas fa-x-ray" enlace="https://front-pabellones.herokuapp.com" />	
					</div>
					<div className="tab-pane fade show active" id="pills-profile" role="tabpanel" aria-labelledby="pills-contact-tab">
						<div className="container">
								<div className="row">
									<div className="col-lg-2 ">
										<div className="nav flex-column nav-pills nav-material2 stiky-list" id="v-pills-tab2" role="tablist" aria-orientation="vertical">
											<a onClick={this.handleClick} className="link-material nav-link show active" id="v-pills-home-tab" data-toggle="pill" href="#v-pills-home2" role="tab" aria-controls="v-pills-home" aria-selected="true">Asignar Paciente</a>
                                            <a className="link-material nav-link" id="v-pills-settings-tab" data-toggle="pill" href="#v-pills-settings2" role="tab" aria-controls="v-pills-settings" aria-selected="false">Agregar Personal</a>
                                            <a className="link-material nav-link" id="v-pills-profile-tab" data-toggle="pill" href="#v-pills-profile2" role="tab" aria-controls="v-pills-profile" aria-selected="false">Ver Personal</a>
											<a className="link-material nav-link" id="v-pills-messages-tab" data-toggle="pill" href="#v-pills-messages2" role="tab" aria-controls="v-pills-messages" aria-selected="false">Ver Salas</a>
                                            <a className="link-material nav-link" id="v-pills-sillones-tab" data-toggle="pill" href="#v-pills-sillones2" role="tab" aria-controls="v-pills-sillones" aria-selected="false">Ver Sillones</a>
                                            {/*
                                            <a className="link-material nav-link" id="v-pills-salasform-tab" data-toggle="pill" href="#v-pills-salasform2" role="tab" aria-controls="v-pills-salasform" aria-selected="false">Agregar Sala</a>
                                            <a className="link-material nav-link" id="v-pills-sillonform-tab" data-toggle="pill" href="#v-pills-sillonform2" role="tab" aria-controls="v-pills-sillonform" aria-selected="false">Agregar Sillon</a>
                                            */}
                                            </div>
									</div>
									<div className="col-lg-10" style={{paddingTop:"30px",paddingBottom:"30px"}}>
										<div className="tab-content" id="v-pills-tabContent">
											<div className="tab-pane fade show active" id="v-pills-home2" role="tabpanel" aria-labelledby="v-pills-home-tab">
                                                <PACSillonquimioList/>
											</div>
											<div className="tab-pane fade" id="v-pills-settings2" role="tabpanel" aria-labelledby="v-pills-settings-tab">
												<MEDPquimioList/>
											</div>
											<div className="tab-pane fade" id="v-pills-profile2" role="tabpanel" aria-labelledby="v-pills-home-tab">
                                                <PquimioList/>
											</div>
											<div className="tab-pane fade" id="v-pills-messages2" role="tabpanel" aria-labelledby="v-pills-messages-tab">
												<SalaquimioList/>
											</div>
                                            <div className="tab-pane fade" id="v-pills-sillones2" role="tabpanel" aria-labelledby="v-pills-sillones-tab">
												<SillonquimioList/>
											</div>
                                            {/*
                                            <div className="tab-pane fade" id="v-pills-salasform2" role="tabpanel" aria-labelledby="v-pills-salasform-tab">
												<SalaquimioForm/>
											</div>
                                            <div className="tab-pane fade" id="v-pills-sillonform2" role="tabpanel" aria-labelledby="v-pills-sillonform-tab">
												<SillonquimioForm/>
                                            </div>
                                            */}
										</div>
									</div>
								</div>
							</div>	
						</div>
                    <div className="tab-pane fade" id="pills-contact" role="tabpanel" aria-labelledby="pills-contact-tab">
                    <Boton nombre="Salas de Recuperación" icono="fas fa-procedures" enlace="https://sector-recuperaciones.herokuapp.com" />
                    </div>
                </div> 	
			
        	</section>
        )
    }

}