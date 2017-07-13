import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Glyphicon } from 'react-bootstrap';
import Button from 'react-bootstrap-button-loader';

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
      <div className="userDetails">
        <div id="iconDiv" role="button" tabIndex={0} onClick={this.open}>
          <Glyphicon glyph="user" />&nbsp;&nbsp;{this.props.username}
        </div>
        <Modal show={this.state.showModal} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>User Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Glyphicon glyph="user" />&nbsp;&nbsp;Username: <strong>{this.props.username}</strong>
            <br /><br />
            <Glyphicon glyph="lock" />&nbsp;&nbsp;Role: <strong>{this.props.userRole}</strong>
          </Modal.Body>
          <Modal.Footer>
            <Button id="closeModal" type="submit" onClick={this.close}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

UserDetailsModal.propTypes = {
  username: PropTypes.string.isRequired,
  userRole: PropTypes.string.isRequired,
};

export default UserDetailsModal;
