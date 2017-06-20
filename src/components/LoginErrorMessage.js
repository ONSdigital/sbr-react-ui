import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { ListGroup, ListGroupItem } from 'react-bootstrap';

const ErrorMessage = (props) => {
  return (props.errorMessage ?
  (<ListGroup>
    <ListGroupItem bsStyle="warning">{props.errorMessage}</ListGroupItem>
  </ListGroup>) : (<div></div>)
  );
};

ErrorMessage.propTypes = {
  errorMessage: PropTypes.string.isRequired,
};

// Which props do we want to inject, given the global state?
function select(state) {
  return {
    errorMessage: state.errorMessage,
  };
}

export default connect(select)(ErrorMessage);
