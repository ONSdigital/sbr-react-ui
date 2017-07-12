import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Glyphicon, Button } from 'react-bootstrap';
import fontChange from '../utils/fontChange';

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
        <div role="button" tabIndex={0} onClick={this.open}>
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
            <br /><br />
            <Glyphicon glyph="text-size" />&nbsp;&nbsp;Text Size:
            <Button faIcon="minus" onClick={fontChange.decreaseText}>-</Button>
            <Button faIcon="plus" onClick={fontChange.increaseText}>+</Button>
            <Button faIcon="plus" onClick={fontChange.textDefault}>Set to Default</Button>
            <br /><br />
            <Button faIcon="plus" onClick={fontChange.darkMode}>Dark Mode</Button>
            <Button faIcon="plus" onClick={fontChange.normalMode}>Default Mode</Button>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close}>Close</Button>
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
