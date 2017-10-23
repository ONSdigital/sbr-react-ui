import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Form } from 'react-bootstrap';
import FormItem from './FormItem';

const EditDataForm = ({ editableFields, formValues, enterprise, onChange }) => {
  return (
    <div>
      <h3 className="text-center">Edit Enterprise</h3>
      <Row className="show-grid">
        <Col xs={6}>
          <h3 className="text-center">Original Data</h3>
          <Row className="show-grid">
            <Col xs={10} xsOffset={1}>
              <Form horizontal>
                {
                  editableFields.map((data) => {
                    return (
                      <FormItem key={`${data.accessor}-${data.label}`} disabled id={data.accessor} type={data.type} label={data.label} value={enterprise.vars[data.accessor]} />
                    );
                  })
                }
              </Form>
            </Col>
          </Row>
        </Col>
        <Col xs={6}>
          <h3 className="text-center">Modified Data</h3>
          <Row className="show-grid">
            <Col xs={10} xsOffset={1}>
              <Form horizontal>
                {
                  editableFields.map((data) => {
                    return (
                      <FormItem key={`${data.accessor}-${data.label}`} value={formValues[data.accessor].data} onInput={onChange} id={data.accessor} type={data.type} label={data.label} />
                    );
                  })
                }
              </Form>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};


EditDataForm.propTypes = {
  editableFields: PropTypes.array.isRequired,
  formValues: PropTypes.object.isRequired,
  enterprise: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
};

export default EditDataForm;
