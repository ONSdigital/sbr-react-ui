import React from 'react';
import PropTypes from 'prop-types';
import Panel from '../patterns/Panel';

/**
 * @class ErrorBoundary - This is used in the Template to display a fallback UI if an error
 * occurs within any of the child components.
 *
 * https://reactjs.org/blog/2017/07/26/error-handling-in-react-16.html
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  componentDidMount = () => this.setState({ hasError: false });
  componentDidCatch = () => this.setState({ hasError: true });
  render = () => ((this.state.hasError) ? (<div style={{ marginTop: '15px' }} className="wrapper">
    <Panel
      id="errorPanel"
      text="An error has occured, please go to the home page and refresh the page."
      level="error"
    /></div>) : this.props.children);
}

ErrorBoundary.propTypes = {
  children: PropTypes.object.isRequired,
};

export default ErrorBoundary;
