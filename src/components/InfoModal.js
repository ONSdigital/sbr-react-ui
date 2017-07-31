import React from 'react';
import PropTypes from 'prop-types';
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
    const dialogStyle = {
      marginTop: '0px',
      marginBottom: '0px',
    };
    const nonBold = {
      fontWeight: 'normal',
      border: '1px solid #ddd',
    };
    const headerBorder = {
      border: '1px solid #ddd',
    };
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
            <ModalDialog style={{ width: '50%' }} onClose={this.handleClose}>
              <h1 style={dialogStyle}>Information</h1>
              <hr />
              <table>
                <thead>
                  <tr>
                    <th style={headerBorder}>Type</th>
                    <th style={headerBorder}>Version</th>
                    <th style={headerBorder}>Last Update</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th style={nonBold}>Data</th>
                    <th style={nonBold}>N/A</th>
                    <th style={nonBold}>{dataLastUpdate}</th>
                  </tr>
                  <tr>
                    <th style={nonBold}>UI</th>
                    <th style={nonBold}>{uiVersion}</th>
                    <th style={nonBold}>{uiLastUpdate}</th>
                  </tr>
                  <tr>
                    <th style={nonBold}>API</th>
                    <th style={nonBold}>{apiVersion}</th>
                    <th style={nonBold}>{apiLastUpdate}</th>
                  </tr>
                </tbody>
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
