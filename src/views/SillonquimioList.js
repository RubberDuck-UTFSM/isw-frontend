import React, { Component } from "react";
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

class SillonquimioList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sillonquimios: [],
      show: false,
      show2: false,
      id: 0,
      modelo: "",
      id_salaquimio: 0,
      id_gestasign: 0,
      estado: "",
    };
    this.borrarSillonquimio = this.borrarSillonquimio.bind(this);
  }

  obtenerSillonquimio() {
    sillonquimioService.getAll().then((response) => {
      this.setState({
        sillonquimios: response.status === 200 ? response.data : [],
      });
    });
  }

  crearSillonquimio(data) {
    sillonquimioService.create(data).then((response) => {
        this.obtenerSillonquimio();
    });
  }

  borrarSillonquimio(data) {
    sillonquimioService.borrar(data).then((response) => {
      this.obtenerSillonquimio();
      this.setState({ show2: false });
    });
  }

  obtenerSillonquimio() {
    sillonquimioService.getAll().then((response) => {
      this.setState({
        sillonquimios: response.status === 200 ? response.data : [],
      });
    });
  }

  editarSillonquimio(id, data) {
    sillonquimioService.update(id, data).then((response) => {
      this.obtenerSillonquimio();
      this.setState({ show: false });
    });
  }

  componentDidMount() {
    this.obtenerSillonquimio();
  }

  render() {
    const { id, modelo, id_salaquimio, id_gestasign, estado } = this.state;

    const handleClose = () => this.setState({ show: false });

    const handleSave = () =>
      this.editarSillonquimio(this.state.id, {
          modelo: this.state.modelo,
        id_gestasign: this.state.id_gestasign,
        id_salaquimio: this.state.id_salaquimio,
        estado: this.state.estado,
      });

    const handleClose2 = () => this.setState({ show2: false });

    const handleDelete = () => this.borrarSillonquimio(this.state.id);

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
                          <label>Modelo</label>
                          <FormInput
                            value={modelo}
                            onChange={(event) =>
                              this.setState({
                                modelo: event.target.value,
                              })
                            }
                            size="lg"
                            className="mb-3"
                            placeholder="Modelo del sillon"
                          />
                        </FormGroup>
                        <FormGroup>
                          <label>Id de sala</label>
                          <FormInput
                            value={id_salaquimio}
                            onChange={(event) =>
                              this.setState({
                                id_salaquimio: event.target.value,
                              })
                            }
                            size="lg"
                            className="mb-3"
                            placeholder="Ingrese Id de la sala"
                          />
                        </FormGroup>
                        <FormGroup>
                          <label>Id gestor</label>
                          <FormInput
                            value={id_gestasign}
                            onChange={(event) =>
                              this.setState({
                                id_gestasign: event.target.value,
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
                  this.setState({ modelo: rowData.modelo });
                  this.setState({ id_salaquimio: rowData.id_salaquimio });
                  this.setState({ id_gestasign: rowData.id_gestasign });
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
                { title: "Id", field: "id", editable: "never"},
              { title: "Modelo", field: "modelo" },
              { title: "Id de sala", field: "id_salaquimio" },
              { title: "Id de gestor", field: "id_gestasign" },
              { title: "Estado", field: "estado" },
            ]}
            data={this.state.sillonquimios}
            title="Sillones"
            options={{
              filtering: true,
            }}
            editable={{
                onRowAdd: (newData) =>
                  new Promise((resolve) => {
                    setTimeout(() => {
                      resolve();
                        this.crearSillonquimio(newData)
                    }, 600);
                  }),
                
              }}
          />
        </div>
      </Container>
    );
  }
}

export default SillonquimioList;
