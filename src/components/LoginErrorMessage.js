import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ListGroup } from 'react-bootstrap';

const ErrorMessage = (props) => {
  return (props.errorMessage ?
  (<ListGroup>
    <p className="background--abbey">{props.errorMessage}</p>
  </ListGroup>) : (<div></div>)
  );
};


ErrorMessage.propTypes = {
  errorMessage: PropTypes.string.isRequired,
};

// Which props do we want to inject, given the global state?
function select(state) {
  return {
    errorMessage: state.login.errorMessage,
  };
}

export default connect(select)(ErrorMessage);
