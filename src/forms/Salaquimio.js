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



const Salaquimio = ({
  onSubmit
  }) => {
    const [name, setName] = useState('');
    const [capacidad, setCapacidad] = useState('');

    return(
      <Row>
        {/* Editor */}
        <Col lg="9" md="12">
          <Card small className="mb-3">
            <CardBody>
              <Form className="add-new-post">
                <FormGroup>
                  <label>Nombre Sala</label>
                  <FormInput
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                    size="lg"
                    className="mb-3"
                    placeholder="Nombre de la sala" />
                </FormGroup>
                <FormGroup>
                  <label>Capacidad</label>
                  <FormInput
                    value={capacidad}
                    onChange={(event) => setCapacidad(event.target.value)}
                    size="lg"
                    className="mb-3"
                    placeholder="Ingrece Capacidad" />
                </FormGroup>
              </Form>
              <Button
                theme="primary"
                className="mb-2 mr-1"
                onClick={(event) => onSubmit({ 'nombre': name, 'capacidad': capacidad, 'estado': 0 })}
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

Salaquimio.propTypes = {
  onSubmit: PropTypes.func,
}

Salaquimio.defaultProps = {
  onSubmit: () => {},
}

export default Salaquimio;
