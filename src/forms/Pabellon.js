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



const Pabellon = ({
  onSubmit
  }) => {
    const [equipamiento, setEquipamiento] = useState('');

    return(
      <Row>
        {/* Editor */}
        <Col lg="9" md="12">
          <Card small className="mb-3">
            <CardBody>
              <Form className="add-new-post">
                <FormGroup>
                  <label>Equipamiento</label>
                  <FormInput
                    value={equipamiento}
                    onChange={(event) => setEquipamiento(event.target.value)}
                    size="lg"
                    className="mb-3"
                    placeholder="Separar Equipamiento por , (Desfibrilador,Bascula...)" />
                </FormGroup>
              </Form>
              <Button
                theme="primary"
                className="mb-2 mr-1"
                onClick={(event) => onSubmit({'equipamiento': equipamiento, 'estado': 'Disponible'})}
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

Pabellon.propTypes = {
  onSubmit: PropTypes.func,
}

Pabellon.defaultProps = {
  onSubmit: () => {},
}

export default Pabellon;
