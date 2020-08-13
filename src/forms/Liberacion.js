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



const Liberacion = ({
  onSubmit
  }) => {
    const [id, setId] = useState('');

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
                    placeholder="Colocar ID del Pabellon a Liberar" />
                </FormGroup>
              </Form>
              <Button
                theme="primary"
                className="mb-2 mr-1"
                onClick={(event) => onSubmit({'id': id,'paciente':0,'hora':'--:--','estado': 'Disponible'})}
                // onClick={onSubmit}
                >
                  Liberar
                </Button>
            </CardBody>
          </Card>
        </Col>
      </Row>
    );
  }

Liberacion.propTypes = {
  onSubmit: PropTypes.func,
}

Liberacion.defaultProps = {
  onSubmit: () => {},
}

export default Liberacion;
