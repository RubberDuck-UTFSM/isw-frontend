import React, { Component } from "react";
import pacsillonquimioService from "../services/pacsillonquimio.service";
import pacienteService from "../services/paciente.service";
import sillonquimioService from "../services/sillonquimio.service";
import MaterialTable from "material-table";
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

class PACSillonquimioList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pacsillonquimios: [],
      pacientes: [],
      sillon: [],
      show: false,
      show2: false,
      id: 0,
      id_paciente: 0,
      id_sillonquimio: 0,
      fecha: "",
    };

    this.borrarPACSillonquimio = this.borrarPACSillonquimio.bind(this);
  }

  obtenerPacientes() {
    pacienteService.obtenerTodo().then((response) => {
      this.setState({
        pacientes: response.status === 200 ? response.data : [],
      });
    });
  }

  actualizarEPaciente(id, estado) {
    pacienteService.actualizarEstado(id, estado).then((response) => {
      this.obtenerPacientes();
    });
  }

  obtenerPACSillonquimio() {
    pacsillonquimioService.getAll().then((response) => {
      this.setState({
        pacsillonquimios: response.status === 200 ? response.data : [],
      });
    });
  }

  crearPACSillonquimio(data) {
    pacsillonquimioService.create(data).then((response) => {
      this.obtenerPACSillonquimio();
    });
  }

  borrarPACSillonquimio(data) {
    pacsillonquimioService.borrar(data).then((response) => {
      this.obtenerPACSillonquimio();
      this.setState({ show2: false });
    });
  }

  editarPACSillonquimio(id, data) {
    pacsillonquimioService.update(id, data).then((response) => {
      this.obtenerPACSillonquimio();
      this.setState({ show: false });
    });
  }

  obtenerSillonquimioID(id) {
    sillonquimioService.getById(id).then((response) => {
      this.setState({
        sillon: response.status === 200 ? response.data : [],
      });
    });
  }

  editarSillonquimio(id, data) {
    sillonquimioService.update(id, data);
  }

  cambiarEstado(id, estado) {
    sillonquimioService.getById(id).then((response) => {
      response.data.estado = estado;
      this.editarSillonquimio(id, response.data);
    });
  }

  liberarSillon(data) {
    sillonquimioService.getById(data.id_sillonquimio).then((response) => {
      if (response.data.estado == "Ocupado") {
        this.setState({ id: data.id });
        this.actualizarEPaciente(data.id_paciente, 4);
        this.cambiarEstado(data.id_sillonquimio, "Disponible");
        this.editarSillonquimio(data.id_sillonquimio, response.data);
        alert("Fue liberado exitosamente")
      } else {
        alert("El sillon ya esta liberado");
      }
    });
  }

  componentDidMount() {
    this.obtenerPacientes();
    this.obtenerPACSillonquimio();
  }

  render() {
    const {
      pacsillonquimios,
      pacientes,
      id,
      id_paciente,
      id_sillonquimio,
      fecha,
    } = this.state;

    var PEQS = pacientes
      .filter((data) => data.estado == 1)
      .filter((data) => data.diagnostico == 0);
    const handleClose = () => this.setState({ show: false });

    const handleSave = () =>
      this.editarPACSillonquimio(this.state.id, {
        id_sillonquimio: this.state.id_sillonquimio,
        id_paciente: this.state.id_paciente,
        fecha: this.state.fecha,
      });

    const handleClose2 = () => this.setState({ show2: false });

    const handleDelete = () => this.borrarPACSillonquimio(this.state.id);

    return (
      <Container fluid className="main-content-container px-4">
        {/* Page Header */}
        <Row noGutters className="page-header py-4"></Row>
        <>
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
                          <label>Id de paciente</label>
                          <FormInput
                            value={id_paciente}
                            onChange={(event) =>
                              this.setState({
                                id_paciente: event.target.value,
                              })
                            }
                            size="lg"
                            className="mb-3"
                            placeholder="Ingrese Id del paciente"
                          />
                        </FormGroup>
                        <FormGroup>
                          <label>Id de sillon</label>
                          <FormInput
                            value={id_sillonquimio}
                            onChange={(event) =>
                              this.setState({
                                id_sillonquimio: event.target.value,
                              })
                            }
                            size="lg"
                            className="mb-3"
                            placeholder="Ingrese Id del sillon"
                          />
                        </FormGroup>
                        <FormGroup>
                          <label>Fecha</label>
                          <FormInput
                            value={fecha}
                            onChange={(event) =>
                              this.setState({ fecha: event.target.value })
                            }
                            size="lg"
                            className="mb-3"
                            placeholder="Ingrese fecha"
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
              <Button variant="secondary" onClick={handleClose2}>
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
            {PEQS.map((PEQ, index) => {
              return (
                <Col lg="2" key={PEQ.id}>
                  <Card small className="card-post mb-4">
                    <CardBody>
                      <p className="card-text text-muted">{PEQ.id}</p>
                      <p className="card-text text-muted">{PEQ.nombre}</p>
                      <p className="card-text text-muted">
                        {PEQ.antecedentes_medicos}
                      </p>
                      <p className="card-text text-muted">
                        {PEQ.fecha_ingreso}
                      </p>
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
                icon: "add_task",
                tooltip: "Liberar",
                onClick: (event, rowData) => {
                  this.liberarSillon(rowData);
                  //this.setState({ show2: true });
                },
              },
            ]}
            columns={[
              { title: "Id de paciente", field: "id_paciente" },
              { title: "Id de sillon", field: "id_sillonquimio" },
              { title: "Fecha", field: "fecha", editable: "never" },
            ]}
            data={this.state.pacsillonquimios}
            title="Historial Sillones"
            options={{
              filtering: true,
            }}
            editable={{
              onRowAdd: (newData) =>
                new Promise((resolve) => {
                  setTimeout(() => {
                    resolve();
                    var dnow = new Date();
                    newData.fecha = dnow;
                    this.crearPACSillonquimio(newData);
                    this.actualizarEPaciente(newData.id_paciente, 2);
                    this.cambiarEstado(newData.id_sillonquimio, "Ocupado");
                  }, 600);
                }),
            }}
          />
        </div>
      </Container>
    );
  }
}

export default PACSillonquimioList;
