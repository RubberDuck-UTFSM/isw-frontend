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



const Personal = ({
  onSubmit
  }) => {
    const [name, setName] = useState('');
    const [tipo, setTipo] = useState('');
    const [especialidad, setEspecialidad] = useState('');

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
                    placeholder="Nombre del Personal" />
                </FormGroup>
                <FormGroup>
                  <label>Tipo de Personal</label>
                  <FormInput
                    value={tipo}
                    onChange={(event) => setTipo(event.target.value)}
                    size="lg"
                    className="mb-3"
                    placeholder="Ingrese Tipo (Medico, Gestor, Personal Pabellon...)" />
                </FormGroup>
                <FormGroup>
                  <label>Especialidad</label>
                  <FormInput
                    value={especialidad}
                    onChange={(event) => setEspecialidad(event.target.value)}
                    size="lg"
                    className="mb-3"
                    placeholder="Ingrese Especialidad" />
                </FormGroup>
              </Form>
              <Button
                theme="primary"
                className="mb-2 mr-1"
                onClick={(event) => onSubmit({ 'nombre': name, 'tipo': tipo, 'especialidad': especialidad, 'estado': 'Libre' })}
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

Personal.propTypes = {
  onSubmit: PropTypes.func,
}

Personal.defaultProps = {
  onSubmit: () => {},
}

export default Personal;
