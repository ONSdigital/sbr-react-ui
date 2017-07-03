import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Glyphicon } from 'react-bootstrap';
import Button from 'react-bootstrap-button-loader';
import { IndexLinkContainer } from 'react-router-bootstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { logout } from '../actions/AppActions';
import '../resources/css/mycss.css';

class UserDetailsModal extends React.Component {
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
      <div>
        <div onClick={this.open}>
          <Glyphicon glyph="user" />&nbsp;&nbsp;{this.props.data.userDetails.username}
        </div>
        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>Modal heading</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Text in a modal</h4>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

// UserDetailsModal.propTypes = {
//   dispatch: PropTypes.func.isRequired,
//   data: React.PropTypes.shape({
//     currentlySending: PropTypes.bool.isRequired,
//   }).isRequired,
// };

// Which props do we want to inject, given the global state?
function select(state) {
  return {
    data: state,
  };
}

// Wrap the component to inject dispatch and state into it
export default connect(select)(UserDetailsModal);
