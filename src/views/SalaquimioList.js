import React, { Component } from "react";
import salaquimioService from "../services/salaquimio.service";
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
    FormInput
  } from "shards-react";


class SalaquimioList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      salaquimios: [],
      show: false,
      show2: false,
      id: 0,
      nombre: 0,
      capacidad: 0,
      estado: 0,
    };
    this.borrarSalaquimio = this.borrarSalaquimio.bind(this);
  }

  obtenerSalaquimio() {
    salaquimioService.getAll().then((response) => {
      this.setState({
        salaquimios: response.status === 200 ? response.data : [],
      });
    });
  }

  crearSalaquimio(data) {
    salaquimioService.create(data).then((response) => {
        this.obtenerSalaquimio();
    });
  }

  borrarSalaquimio(data) {
    salaquimioService.borrar(data).then((response) => {
        this.obtenerSalaquimio();
      this.setState({ show2: false });
    });
  }

  editarSalaquimio(id, data) {
    salaquimioService.update(id, data).then((response) => {
      this.obtenerSalaquimio();
      this.setState({ show: false });
    });
  }

  componentDidMount() {
    this.obtenerSalaquimio();
  }

  render() {
    const { id, nombre, capacidad, estado } = this.state;

    const handleClose = () => this.setState({ show: false });

    const handleSave = () =>
      this.editarSalaquimio(this.state.id, {
        nombre: this.state.nombre,
        capacidad: this.state.capacidad,
        estado: this.state.estado,
      });

      const handleClose2 = () => this.setState({ show2: false });

      const handleDelete = () => this.borrarSalaquimio(this.state.id);
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
                          <label>Nombre sala</label>
                          <FormInput
                            value={nombre}
                            onChange={(event) =>
                              this.setState({
                                nombre: event.target.value,
                              })
                            }
                            size="lg"
                            className="mb-3"
                            placeholder="Ingrese Id de la sala"
                          />
                        </FormGroup>
                        <FormGroup>
                          <label>Capacidad</label>
                          <FormInput
                            value={capacidad}
                            onChange={(event) =>
                              this.setState({
                                capacidad: event.target.value,
                              })
                            }
                            size="lg"
                            className="mb-3"
                            placeholder="Ingrese Id del gestor"
                          />
                        </FormGroup>
                        <FormGroup>
                          <label>Estado</label>
                          <FormInput
                            value={estado}
                            onChange={(event) =>
                              this.setState({ estado: event.target.value })
                            }
                            size="lg"
                            className="mb-3"
                            placeholder="Ingrese Estado"
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
            <Modal.Body>
              ¿Estas seguro?
            </Modal.Body>
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
        <div style={{ maxWidth: "100%" }}>
          <MaterialTable
            actions={[
              {
                icon: "edit",
                tooltip: "Editar",
                onClick: (event, rowData) => {
                  this.setState({ id: rowData.id });
                  this.setState({ nombre: rowData.nombre });
                  this.setState({ capacidad: rowData.capacidad });
                  this.setState({ estado: rowData.estado });
                  this.setState({ show: true });
                },
              },
              {
                icon: "delete",
                tooltip: "Borrar",
                onClick: (event, rowData) => {
                    this.setState({ id: rowData.id})
                    this.setState({ show2: true });
                },
              },
            ]}
            columns={[
                { title: "Id", field: "id", editable: "never" },
              { title: "Nombre", field: "nombre" },
              { title: "Capacidad", field: "capacidad" },
              { title: "Estado", field: "estado" },
            ]}
            data={this.state.salaquimios}
            title="Salas"
            options={{
              filtering: true,
            }}
            editable={{
                onRowAdd: (newData) =>
                  new Promise((resolve) => {
                    setTimeout(() => {
                      resolve();
                        this.crearSalaquimio(newData)
                    }, 600);
                  }),
                
              }}
          />
        </div>
      </Container>
    );
  }
}

export default SalaquimioList;
