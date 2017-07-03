import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ListGroup, ListGroupItem } from 'react-bootstrap';

const ErrorMessage = (props) => {
  return (props[props.errorType] ?
  (<ListGroup>
    <ListGroupItem bsStyle="warning">{props[props.errorType]}</ListGroupItem>
  </ListGroup>) : (<div></div>)
  );
};


// ErrorMessage.propTypes = {
//   errorMessage: PropTypes.string.isRequired,
// };

// Which props do we want to inject, given the global state?
function select(state) {
  return {
    uiError: state.info.ui.errorMessage,
    apiError: state.info.api.errorMessage,
    dataError: state.info.data.errorMessage,
  };
}

export default connect(select)(ErrorMessage);
