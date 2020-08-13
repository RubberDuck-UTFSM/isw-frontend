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



const Pquimio = ({
  onSubmit
  }) => {
    const [name, setName] = useState('');
    const [rut, setRut] = useState('');
    const [telefono, setTelefono] = useState('');
    const [mail, setMail] = useState('');

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
                    placeholder="Nombre del personal" />
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
                  <label>Telefono</label>
                  <FormInput
                    value={telefono}
                    onChange={(event) => setTelefono(event.target.value)}
                    size="lg"
                    className="mb-3"
                    placeholder="Ingrese Telefono" />
                </FormGroup>
                <FormGroup>
                  <label>Mail</label>
                  <FormInput
                    value={mail}
                    onChange={(event) => setMail(event.target.value)}
                    size="lg"
                    className="mb-3"
                    placeholder="Ingrese Mail" />
                </FormGroup>
              </Form>
              <Button
                theme="primary"
                className="mb-2 mr-1"
                onClick={(event) => onSubmit({ 'nombre': name, 'rut': rut, 'telefono': telefono, 'estado': 'Disponible', 'mail': mail })}
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

Pquimio.propTypes = {
  onSubmit: PropTypes.func,
}

Pquimio.defaultProps = {
  onSubmit: () => {},
}

export default Pquimio;
