import React from 'react';
import PropTypes from 'prop-types';
import { Modal, Button } from 'react-bootstrap';

const ErrorModal = function ({ show, message, close }) {
  return (
    <Modal
      show={show}
      onHide={close}
      aria-labelledby="contained-modal-title"
    >
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title">{message}</Modal.Title>
      </Modal.Header>
      <Modal.Footer>
        <Button
          autoFocus
          onClick={close}
        >
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

ErrorModal.propTypes = {
  show: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  close: PropTypes.func.isRequired,
};

export default ErrorModal;
