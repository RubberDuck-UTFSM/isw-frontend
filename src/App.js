import React from 'react';
import { Component } from 'react'
import Administracion from './views/Administracion';
import Pacientes from './views/Pacientes';
import Personal from './views/Personal';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useParams
} from "react-router-dom"


class App extends Component {
  constructor(props) {
    super(props);
  }

  render(){
  return (
    <React.Fragment>
      <Router>
      <a id="arriba"></a>
        <div className=" container-fluid " >
        
          <div className="row  bg-light" >
            <div className="container" style={{padding:"0px"}}>
              <div className="navbar-light bg-light ">
                <nav className="navbar navbar-expand-lg "> 
                  <a className="navbar-brand correccionTitulo" href="/"><i className="fas fa-laptop-medical icono" style={{color:"#007bff"}}></i>Health<b>Management</b></a>
                  <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                  </button>
                  <div  data-target="#navbarSupportedContent" className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto " >
                    </ul>
                    <form className="form-inline my-2 my-lg-0" style={{marginRight:"14px"}}>
                      <Link to="/"><button className="btn btn-info my-2 my-sm-0 btn-rounded" type="submit"><i className="fas icono fa-hospital-symbol"></i> Administración</button></Link>
                    </form>
                    <form className="form-inline my-2 my-lg-0" style={{marginRight:"14px"}}>
                      <Link to="/pacientes"><button className="btn btn-primary my-2 my-sm-0 btn-rounded" type="submit"><i className="fas icono fa-user"></i> Pacientes</button></Link>
                    </form>
                    <form className="form-inline my-2 my-lg-0">
                      <Link to="/personal"><button className="btn btn-secondary my-2 my-sm-0 btn-rounded" type="submit"><i className="fas icono fa-user-nurse"></i> Personal</button></Link>
                    </form>
                  </div>
                </nav>
              </div>
            </div>
          </div> 
        </div>
        
        <div >
          <Switch>
            <Route path="/pacientes">
              <Pacientes/>
            </Route>
            <Route path="/personal">
            <Personal/>
            </Route>
            <Route path="/">
              <Administracion/>
            </Route>
          </Switch>
        </div>

      </Router>
    </React.Fragment>
  );
}
}
export default App;
