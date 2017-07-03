import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Glyphicon, Table } from 'react-bootstrap';
import Button from 'react-bootstrap-button-loader';

class InfoModal extends React.Component {
  constructor() {
    super();
    this.state = {
      showModal: false,
    };
    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
  }
  close() {
    this.setState({ showModal: false });
  }
  open() {
    this.setState({ showModal: true });
  }
  render() {
    return (
      <div className="infoModal">
        <div role="button" tabIndex={0} onClick={this.open}>
          <Glyphicon glyph="info-sign" />
        </div>
        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Information</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Table striped bordered condensed hover>
              <thead>
                <tr>
                  <th>Type</th>
                  <th><Glyphicon glyph="tags" />&nbsp;&nbsp;Version</th>
                  <th><Glyphicon glyph="dashboard" />&nbsp;&nbsp;Last Update</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Data</td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td>UI</td>
                  <td></td>
                  <td></td>
                </tr>
                <tr>
                  <td>API</td>
                  <td></td>
                  <td></td>
                </tr>
              </tbody>
            </Table>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default InfoModal;
