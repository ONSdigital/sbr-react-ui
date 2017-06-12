import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { ListGroup, ListGroupItem } from "react-bootstrap";

let ErrorMessage = (props) => {
	return (
		props.errorMessage ?
			<ListGroup>
				<ListGroupItem bsStyle="warning">{props.errorMessage}</ListGroupItem>
			</ListGroup>
			:<div></div>
	);
};

ErrorMessage.propTypes = {
	errorMessage: PropTypes.string
};

const mapStateToProps = (state) => ({
	errorMessage: state.errorMessage
});

ErrorMessage = connect(mapStateToProps)(ErrorMessage);

export default ErrorMessage;
