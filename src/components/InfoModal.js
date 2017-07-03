import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Glyphicon, Table } from 'react-bootstrap';
import Button from 'react-bootstrap-button-loader';
import { connect } from 'react-redux';
import { getUiInfo } from '../actions/InfoActions';
import ErrorMessage from '../components/InfoErrorMessage';

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
  }
  close() {
    this.setState({ showModal: false });
  }
  open() {
    this.setState({ showModal: true });
  }
  render() {
    const data = this.props.data;
    const spinner = <span className="glyphicon glyphicon-refresh glyphicon-spin" />;
    const uiVersion = (data.ui.currentlySending) ? spinner : data.ui.version;
    const uiLastUpdate = (data.ui.currentlySending) ? spinner : data.ui.lastUpdate;
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
                  <td><span className="glyphicon glyphicon-refresh glyphicon-spin" /></td>
                  <td><span className="glyphicon glyphicon-refresh glyphicon-spin" /></td>
                </tr>
                <tr>
                  <td>UI</td>
                  <td>{uiVersion}</td>
                  <td>{uiLastUpdate}</td>
                </tr>
                <tr>
                  <td>API</td>
                  <td><span className="glyphicon glyphicon-refresh glyphicon-spin" /></td>
                  <td><span className="glyphicon glyphicon-refresh glyphicon-spin" /></td>
                </tr>
              </tbody>
            </Table>
            <ErrorMessage errorType="apiError" />
            <ErrorMessage errorType="uiError" />
            <ErrorMessage errorType="dataError" />
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close}>Close</Button>
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
    data: React.PropTypes.shape({
      currentlySending: PropTypes.bool.isRequired,
    }).isRequired,
    api: React.PropTypes.shape({
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
