import React, { useState } from 'react';
import PropTypes from "prop-types";
import {
  Row,
  Col,
  Card,
  CardBody,
  Form,
  FormGroup,
  FormInput,
  Button,
} from "shards-react";



const Paciente = ({
  onSubmit
  }) => {
    const [name, setName] = useState('');
    const [rut, setRut] = useState('');
    const [enfermedad, setEnfermedad] = useState('');
    const [estado, setEstado] = useState('');

    return(
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
                    onChange={(event) => setName(event.target.value)}
                    size="lg"
                    className="mb-3"
                    placeholder="Nombre del Paciente" />
                </FormGroup>
                <FormGroup>
                  <label>Rut</label>
                  <FormInput
                    value={rut}
                    onChange={(event) => setRut(event.target.value)}
                    size="lg"
                    className="mb-3"
                    placeholder="xxxxxxxx-x" />
                </FormGroup>
                <FormGroup>
                  <label>Enfermedad</label>
                  <FormInput
                    value={enfermedad}
                    onChange={(event) => setEnfermedad(event.target.value)}
                    size="lg"
                    className="mb-3"
                    placeholder="Ingrese Enfermedad" />
                </FormGroup>
                <FormGroup>
                  <label>Estado</label>
                  <FormInput
                    value={estado}
                    onChange={(event) => setEstado(event.target.value)}
                    size="lg"
                    className="mb-3"
                    placeholder="Ingrese Estado (puede ser vacio)" />
                </FormGroup>
              </Form>
              <Button
                theme="primary"
                className="mb-2 mr-1"
                onClick={(event) => onSubmit({ 'nombre': name, 'rut': rut, 'enfermedad': enfermedad, 'estado': estado })}
                // onClick={onSubmit}
                >
                  Agregar
                </Button>
            </CardBody>
          </Card>
        </Col>
      </Row>
    );
  }

Paciente.propTypes = {
  onSubmit: PropTypes.func,
}

Paciente.defaultProps = {
  onSubmit: () => {},
}

export default Paciente;
