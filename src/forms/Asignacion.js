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



const Asignacion = ({
  onSubmit
  }) => {
    const [id, setId] = useState('');
    const [paciente, setPaciente] = useState('');
    const [personal, setPersonal] = useState('');
    const [hora, setHora] = useState('');

    return(
      <Row>
        {/* Editor */}
        <Col lg="9" md="12">
          <Card small className="mb-3">
            <CardBody>
              <Form className="add-new-post">
                <FormGroup>
                  <label>Id del Pabellon</label>
                  <FormInput
                    value={id}
                    onChange={(event) => setId(event.target.value)}
                    size="lg"
                    className="mb-3"
                    placeholder="Colocar ID del Pabellon a Asignar" />
                </FormGroup>
                <FormGroup>
                  <label>Id del Paciente</label>
                  <FormInput
                    value={paciente}
                    onChange={(event) => setPaciente(event.target.value)}
                    size="lg"
                    className="mb-3"
                    placeholder="Colocar ID del Paciente a Asignar al Pabellon" />
                </FormGroup>
                <FormGroup>
                  <label>Id del Personal</label>
                  <FormInput
                    value={personal}
                    onChange={(event) => setPersonal(event.target.value)}
                    size="lg"
                    className="mb-3"
                    placeholder="Colocar ID del Personal a Asignar al Pabellon" />
                </FormGroup>
                <FormGroup>
                  <label>Fecha y Hora Ingreso</label>
                  <FormInput
                    value={hora}
                    onChange={(event) => setHora(event.target.value)}
                    size="lg"
                    className="mb-3"
                    placeholder="Colocar Fecha y Hora de Ingreso (DD/MM/YYYY HH:mm)" />
                </FormGroup>
              </Form>
              <Button
                theme="primary" 
                className="mb-2 mr-1"
                onClick={(event) => onSubmit({'id': id,'paciente':paciente,'personal':personal,'hora':hora,'estado': 'Ocupado'})}
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

Asignacion.propTypes = {
  onSubmit: PropTypes.func,
}

Asignacion.defaultProps = {
  onSubmit: () => {},
}

export default Asignacion;
