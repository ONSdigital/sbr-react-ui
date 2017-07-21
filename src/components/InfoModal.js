import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Glyphicon, Table } from 'react-bootstrap';
import Button from 'react-bootstrap-button-loader';
import { connect } from 'react-redux';
import { getUiInfo, getApiInfo } from '../actions/InfoActions';

class InfoModal extends React.Component {
  constructor() {
    super();
    this.state = {
      showModal: false,
    };
    this.close = this.close.bind(this);
    this.open = this.open.bind(this);
  }
  componentDidMount() {
    this.props.dispatch(getUiInfo());
    this.props.dispatch(getApiInfo());
  }
  getData(data, type) {
    if (data.currentlySending) {
      return (<span className="glyphicon glyphicon-refresh glyphicon-spin" />);
    }
    if (data[type] !== '') {
      return (data[type]);
    }
    return (data.errorMessage);
  }
  close() {
    this.setState({ showModal: false });
  }
  open() {
    this.setState({ showModal: true });
  }
  render() {
    const uiVersion = this.getData(this.props.data.ui, 'version');
    const uiLastUpdate = this.getData(this.props.data.ui, 'lastUpdate');
    const apiVersion = this.getData(this.props.data.api, 'version');
    const apiLastUpdate = this.getData(this.props.data.api, 'lastApiUpdate');
    const dataLastUpdate = this.getData(this.props.data.api, 'lastDataUpdate');
    return (
      <div className="infoModal">
        <div aria-label="Open popup icon" id="iconDiv" role="button" tabIndex={0} onClick={this.open}>
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
                  <td>N/A</td>
                  <td>{dataLastUpdate}</td>
                </tr>
                <tr>
                  <td>UI</td>
                  <td>{uiVersion}</td>
                  <td>{uiLastUpdate}</td>
                </tr>
                <tr>
                  <td>API</td>
                  <td>{apiVersion}</td>
                  <td>{apiLastUpdate}</td>
                </tr>
              </tbody>
            </Table>
          </Modal.Body>
          <Modal.Footer>
            <Button aria-label="Close popup button" onClick={this.close}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

InfoModal.propTypes = {
  dispatch: PropTypes.func.isRequired,
  data: React.PropTypes.shape({
    ui: React.PropTypes.shape({
      lastUpdate: PropTypes.string.isRequired,
      version: PropTypes.string.isRequired,
      currentlySending: PropTypes.bool.isRequired,
    }).isRequired,
    api: React.PropTypes.shape({
      lastApiUpdate: PropTypes.string.isRequired,
      lastDataUpdate: PropTypes.string.isRequired,
      version: PropTypes.string.isRequired,
      currentlySending: PropTypes.bool.isRequired,
    }).isRequired,
  }).isRequired,
};

function select(state) {
  return {
    data: state.info,
  };
}

export default connect(select)(InfoModal);
