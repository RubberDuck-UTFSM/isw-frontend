import React, { Component } from "react";
import MaterialTable from "material-table";
import medpquimioService from "../services/medpquimio.service";
import pquimioService from "../services/pquimio.service";
import medicoService from "../services/medico.service";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import {
  Row,
  Container,
  Col,
  Card,
  CardBody,
  Form,
  FormGroup,
  FormInput,
} from "shards-react";

class MEDPquimioList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      medpquimios: [],
      medicos: [],
      show: false,
      show2: false,
      id: 0,
      id_pquimio: 0,
      id_medico: 0
    };
    this.borrarMEDPquimio = this.borrarMEDPquimio.bind(this);
  }

  obtenerMedicos() {
    medicoService.obtenerTodo().then((response) => {
      this.setState({
        medicos: response.status === 200 ? response.data.filter((data) => data.activo == false).filter((data) => data.especialidad == "2") : [],
      });
    });
  }

  obtenerMEDPquimio() {
    medpquimioService.getAll().then((response) => {
      this.setState({
        medpquimios: response.status === 200 ? response.data : [],
      });
    });
  }

  crearMEDPquimio(data) {
    medpquimioService.create(data).then((response) => {
      this.obtenerMEDPquimio();
    });
  }

  borrarMEDPquimio(data) {
    medpquimioService.borrar(data).then((response) => {
      this.obtenerMEDPquimio();
      this.cambiarEstado(this.state.id_pquimio, "Disponible")
      this.setState({ show2: false });
    });
  }

  editarMEDPquimio(id, data) {
    medpquimioService.update(id, data).then((response) => {
      this.obtenerMEDPquimio();
      this.setState({ show: false });
    });
  }

  editarPquimio(id, data) {
    pquimioService.update(id, data).then((response) => {
      this.obtenerMedicos()
    });
  }

  cambiarEstado(id, estado){
    pquimioService.getById(id).then((response) => {
        response.data.estado = estado
        this.editarPquimio(id, response.data) 
        this.setState({ show: false });
      });
  }

  cambiarMEstado(id, estado){
    medicoService.obtenerId(id).then((response) => {
        response.data.activo = estado
        medicoService.cambiar(response.data)
        if (estado == false){
            this.borrarMEDPquimio(this.state.id);
        }
      });
  }

  obtenerMEstado(id, data){
    medicoService.obtenerId(id).then((response) => {
        if (response.data.activo == false && response.data.especialidad == "2") {
            this.crearMEDPquimio(data);
            this.cambiarEstado(data.id_pquimio, "Ocupado");
            this.cambiarMEstado(data.id_medico, true);
            alert("El personal fue asignado exitosamente")
        }
        else {
            alert("El medico esta ocupado o no es del area de quimioterapia")
        }
      });
  }

  componentDidMount() {
    this.obtenerMedicos();
    this.obtenerMEDPquimio();
  }

  render() {
    const { id_pquimio, id_medico } = this.state;

    const handleClose = () => this.setState({ show: false });

    const handleSave = () =>
      this.editarMEDPquimio(this.state.id, {
        id_pquimio: this.state.id_pquimio,
        id_medico: this.state.id_medico
      });

    const handleClose2 = () => this.setState({ show2: false });

    const handleDelete = () => {
        this.cambiarMEstado(this.state.id_medico, false);
    };

    return (
      <Container fluid className="main-content-container px-4">
        {/* Page Header */}
        <Row noGutters className="page-header py-4"></Row>
        <>
          {/* Muro de Berlin*/}
          <Modal show={this.state.show} onHide={handleClose}>
            <Modal.Header closeButton>
              <Modal.Title>Editar</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Row>
                {/* Editor */}
                <Col lg="9" md="12">
                  <Card small className="mb-3">
                    <CardBody>
                      <Form className="add-new-post">
                        <FormGroup>
                          <label>Id pquimio</label>
                          <FormInput
                            value={id_pquimio}
                            onChange={(event) =>
                              this.setState({ id_pquimio: event.target.value })
                            }
                            size="lg"
                            className="mb-3"
                            placeholder="Ingrese id de pquimio"
                          />
                        </FormGroup>
                        <FormGroup>
                          <label>Id medico</label>
                          <FormInput
                            value={id_medico}
                            onChange={(event) =>
                              this.setState({ id_medico: event.target.value })
                            }
                            size="lg"
                            className="mb-3"
                            placeholder="Ingrese id de medico"
                          />
                        </FormGroup>
                      </Form>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Cancelar
              </Button>
              <Button variant="primary" onClick={handleSave}>
                Guardar
              </Button>
            </Modal.Footer>
          </Modal>
          {/* Muro de Berlin*/}
          <Modal show={this.state.show2} onHide={handleClose2}>
            <Modal.Header closeButton>
              <Modal.Title>Borrar</Modal.Title>
            </Modal.Header>
            <Modal.Body>¿Estas seguro?</Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={handleClose}>
                Cancelar
              </Button>
              <Button variant="primary" onClick={handleDelete}>
                Confirmar
              </Button>
            </Modal.Footer>
          </Modal>
        </>
        <Container fluid className="main-content-container px-4">
          {/* Page Header */}
          <Row noGutters className="page-header py-4"></Row>
          <Row>
            {this.state.medicos.map((PEQ, index) => {
              return (
                <Col lg="2" key={PEQ.id}>
                  <Card small className="card-post mb-4">
                    <CardBody>
                      <p className="card-text text-muted">{PEQ.id}</p>
                      <p className="card-text text-muted">{PEQ.persona.nombre}</p>
                      <p className="card-text text-muted">{PEQ.persona.apellido}</p>
                      <p className="card-text text-muted">{PEQ.activo}</p>
                    </CardBody>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </Container>
        <div style={{ maxWidth: "100%" }}>
          <MaterialTable
            actions={[
              {
                icon: "edit",
                tooltip: "Editar",
                onClick: (event, rowData) => {
                  this.setState({ id: rowData.id });
                  this.setState({ id_pquimio: rowData.id_pquimio });
                  this.setState({ id_medico: rowData.id_medico });
                  this.setState({ show: true });
                },
              },
              {
                icon: "delete",
                tooltip: "Borrar",
                onClick: (event, rowData) => {
                    this.setState({ id: rowData.id });
                    this.setState({ id_pquimio: rowData.id_pquimio });
                    this.setState({ id_medico: rowData.id_medico });

                  this.setState({ show2: true });
                },
              },
            ]}
            columns={[
              { title: "Id pquimio", field: "id_pquimio" },
              { title: "Id medico", field: "id_medico" }
            ]}
            data={this.state.medpquimios}
            title="Personal asignado a medico"
            options={{
              filtering: true,
            }}
            editable={{
              onRowAdd: (newData) =>
              new Promise((resolve) => {
                  setTimeout(() => {
                      resolve();
                      this.obtenerMEstado(newData.id_medico, newData);
                  }, 600);
                }),
            }}
          />
        </div>
      </Container>
    );
  }
}

export default MEDPquimioList;
