import React from 'react';
import PropTypes from 'prop-types';
import { Glyphicon } from 'react-bootstrap';
import { connect } from 'react-redux';
import { ModalContainer, ModalDialog } from 'react-modal-dialog';
import { getUiInfo, getApiInfo } from '../actions/InfoActions';

class InfoModal extends React.Component {
  constructor() {
    super();
    this.state = {
      isShowingModal: false,
    };
    this.handleClose = this.handleClose.bind(this);
    this.handleClick = this.handleClick.bind(this);
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
  handleClose() {
    this.setState({ isShowingModal: false });
  }
  handleClick() {
    this.setState({ isShowingModal: true });
  }
  render() {
    const uiVersion = this.getData(this.props.data.ui, 'version');
    const uiLastUpdate = this.getData(this.props.data.ui, 'lastUpdate');
    const apiVersion = this.getData(this.props.data.api, 'version');
    const apiLastUpdate = this.getData(this.props.data.api, 'lastApiUpdate');
    const dataLastUpdate = this.getData(this.props.data.api, 'lastDataUpdate');
    return (
      <div>
        <a className="secondary-nav__link" onClick={this.handleClick}>
          Info
        </a>
        {
          this.state.isShowingModal &&
          <ModalContainer onClose={this.handleClose}>
            <ModalDialog onClose={this.handleClose}>
              <h1>Information</h1>
              <table>
                <tr>
                  <th>Type</th>
                  <th><Glyphicon glyph="tags" />&nbsp;&nbsp;Version</th>
                  <th><Glyphicon glyph="dashboard" />&nbsp;&nbsp;Last Update</th>
                </tr>
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
              </table>
            </ModalDialog>
          </ModalContainer>
        }
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
