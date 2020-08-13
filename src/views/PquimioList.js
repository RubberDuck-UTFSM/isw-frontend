import React, { Component } from "react";
import MaterialTable from "material-table";
import pquimioService from "../services/pquimio.service";
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

class PquimioList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      pquimios: [],
      show: false,
      show2: false,
      id: 0,
      name: "",
      rut: "",
      telefono: "",
      mail: "",
      cargo: "",
      profesion: "",
      estado: "",
    };
    this.borrarPquimio = this.borrarPquimio.bind(this);
  }

  obtenerPquimio() {
    pquimioService.getAll().then((response) => {
      this.setState({
        pquimios: response.status === 200 ? response.data : [],
      });
    });
  }

  crearPquimio(data) {
    pquimioService.create(data).then((response) => {
      this.obtenerPquimio();
    });
  }

  borrarPquimio(data) {
    pquimioService.borrar(data).then((response) => {
      this.obtenerPquimio();
      this.setState({ show2: false });
    });
  }

  editarPquimio(id, data) {
    pquimioService.update(id, data).then((response) => {
      this.obtenerPquimio();
      this.setState({ show: false });
    });
  }

  componentDidMount() {
    this.obtenerPquimio();
  }

  render() {
    const { id, name, rut, telefono, mail, cargo, profesion, estado } = this.state;

    const handleClose = () => this.setState({ show: false });

    const handleSave = () =>
      this.editarPquimio(this.state.id, {
        nombre: this.state.name,
        rut: this.state.rut,
        telefono: this.state.telefono,
        mail: this.state.mail,
        cargo: this.state.cargo,
        profesion: this.state.profesion,
        estado: this.state.estado
      });

    const handleClose2 = () => this.setState({ show2: false });

    const handleDelete = () => this.borrarPquimio(this.state.id);

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
                          <label>Nombre Completo</label>
                          <FormInput
                            value={name}
                            onChange={(event) =>
                              this.setState({ name: event.target.value })
                            }
                            size="lg"
                            className="mb-3"
                            placeholder="Nombre del personal"
                          />
                        </FormGroup>
                        <FormGroup>
                          <label>Rut</label>
                          <FormInput
                            value={rut}
                            onChange={(event) =>
                              this.setState({ rut: event.target.value })
                            }
                            size="lg"
                            className="mb-3"
                            placeholder="Ingrese Rut"
                          />
                        </FormGroup>
                        <FormGroup>
                          <label>Telefono</label>
                          <FormInput
                            value={telefono}
                            onChange={(event) =>
                              this.setState({ telefono: event.target.value })
                            }
                            size="lg"
                            className="mb-3"
                            placeholder="Ingrese Telefono"
                          />
                        </FormGroup>
                        <FormGroup>
                          <label>Mail</label>
                          <FormInput
                            value={mail}
                            onChange={(event) =>
                              this.setState({ mail: event.target.value })
                            }
                            size="lg"
                            className="mb-3"
                            placeholder="coco@papope.cl"
                          />
                        </FormGroup>
                        <FormGroup>
                          <label>Cargo</label>
                          <FormInput
                            value={cargo}
                            onChange={(event) =>
                              this.setState({ cargo: event.target.value })
                            }
                            size="lg"
                            className="mb-3"
                            placeholder="Ingrese Cargo"
                          />
                        </FormGroup>
                        <FormGroup>
                          <label>Profesion</label>
                          <FormInput
                            value={profesion}
                            onChange={(event) =>
                              this.setState({ profesion: event.target.value })
                            }
                            size="lg"
                            className="mb-3"
                            placeholder="Ingrese Profesion"
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
        <div style={{ maxWidth: "100%" }}>
          <MaterialTable
            actions={[
              {
                icon: "edit",
                tooltip: "Editar",
                onClick: (event, rowData) => {
                  this.setState({ id: rowData.id });
                  this.setState({ name: rowData.nombre });
                  this.setState({ rut: rowData.rut });
                  this.setState({ telefono: rowData.telefono });
                  this.setState({ mail: rowData.mail });
                  this.setState({ cargo: rowData.cargo });
                  this.setState({ profesion: rowData.profesion});
                  this.setState({ estado: rowData.estado });
                  this.setState({ show: true });
                },
              },
              {
                icon: "delete",
                tooltip: "Borrar",
                onClick: (event, rowData) => {
                  this.setState({ id: rowData.id });
                  this.setState({ show2: true });
                },
              },
            ]}
            columns={[
                { title: "Id", field: "id", editable: "never" },
              { title: "Nombre", field: "nombre" },
              { title: "Rut", field: "rut" },
              { title: "Telefono", field: "telefono" },
              { title: "Mail", field: "mail" },
              { title: "Cargo", field: "cargo" },
              { title: "Profesion", field: "profesion" },
              { title: "Estado", field: "estado", editable: "never" },
            ]}
            data={this.state.pquimios}
            title="Personal"
            options={{
              filtering: true,
            }}
            editable={{
              onRowAdd: (newData) =>
                new Promise((resolve) => {
                  setTimeout(() => {
                    resolve();
                    this.crearPquimio(newData);
                  }, 600);
                }),
            }}
          />
        </div>
      </Container>
    );
  }
}

export default PquimioList;
