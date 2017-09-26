import React from 'react';
import PropTypes from 'prop-types';
import { Row, Col, Form, Glyphicon } from 'react-bootstrap';
import FormItem from './FormItem';

const EditDataChanges = ({ edits }) => {
  return (
    <div>
      <Row className="show-grid">
        <Col xs={5}>
          <h3 className="text-center">Original Data</h3>
        </Col>
        <Col xs={2}>
          {/* <h3 className="text-center">-></h3> */}
        </Col>
        <Col xs={5}>
          <h3 className="text-center">Modified Data</h3>
        </Col>
      </Row>
      <Row>
        <Col xs={5}>
          {
            edits.map((edit) => {
              return (
                <Row className="show-grid">
                  <Col xs={10} xsOffset={1}>
                    <Form horizontal>
                      <FormItem disabled id={edit.accessor} type="text" label={edit.accessor} value={edit.original} />
                    </Form>
                  </Col>
                </Row>
              );
            })
          }
        </Col>
        <Col xs={2}>
          {
            edits.map(() => {
              return (
                <Row className="show-grid">
                  <Col xs={10} xsOffset={1}>
                    <h1 className="text-center"><Glyphicon glyph="circle-arrow-right" /></h1>
                  </Col>
                </Row>
              );
            })
          }
        </Col>
        <Col xs={5}>
          {
            edits.map((edit) => {
              return (
                <Row className="show-grid">
                  <Col xs={10} xsOffset={1}>
                    <Form horizontal>
                      <FormItem disabled id={edit.accessor} type="text" label={edit.accessor} value={edit.updated} />
                    </Form>
                  </Col>
                </Row>
              );
            })
          }
        </Col>
      </Row>
    </div>
  );
};


EditDataChanges.propTypes = {
  edits: PropTypes.object.isRequired,
};

export default EditDataChanges;
