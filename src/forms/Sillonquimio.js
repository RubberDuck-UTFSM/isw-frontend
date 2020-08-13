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



const Sillonquimio = ({
  onSubmit
  }) => {
    const [id_salaquimio, setId_salaquimio] = useState('');
    const [id_gestasign, setId_gestasign] = useState('');


    return(
      <Row>
        {/* Editor */}
        <Col lg="9" md="12">
          <Card small className="mb-3">
            <CardBody>
              <Form className="add-new-post">
                <FormGroup>
                  <label>id_salaquimio</label>
                  <FormInput
                    value={id_salaquimio}
                    onChange={(event) => setId_salaquimio(event.target.value)}
                    size="lg"
                    className="mb-3"
                    placeholder="Ingrece Id_salaquimio" />
                </FormGroup>
                <FormGroup>
                  <label>Id_gestasign</label>
                  <FormInput
                    value={id_gestasign}
                    onChange={(event) => setId_gestasign(event.target.value)}
                    size="lg"
                    className="mb-3"
                    placeholder="Ingrece Id_gestasign" />
                </FormGroup>
              </Form>
              <Button
                theme="primary"
                className="mb-2 mr-1"
                onClick={(event) => onSubmit({ 'id_salaquimio': id_salaquimio, 'id_gestasign': id_gestasign, 'estado': "Disponible" })}
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

Sillonquimio.propTypes = {
  onSubmit: PropTypes.func,
}

Sillonquimio.defaultProps = {
  onSubmit: () => {},
}

export default Sillonquimio;
