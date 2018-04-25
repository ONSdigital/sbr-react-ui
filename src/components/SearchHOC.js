import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { search, setQuery, resetResults } from '../actions/ApiActions';
import { SET_QUERY } from '../constants/ApiConstants';

/**
 * @function withSearch - This is a higher order component that accepts a component
 * (which is either the Home/Results page) and wraps it with the common logic
 * for changing form values and searching.
 *
 * https://reactjs.org/docs/higher-order-components.html
 *
 * @param {Object} Content - The child react component
 */
export default function withSearch(Content) {
  class SearchHOC extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        showError: false,
        errorMessage: '',
        query: this.props.query,
      };
    }
    componentWillReceiveProps = (nextProps) => {
      // Check for error messages when we recieve new props
      if (nextProps.errorMessage !== '' && nextProps.errorMessage !== this.props.errorMessage) {
        this.setState({
          ...this.state,
          showError: true,
          errorMessage: nextProps.errorMessage,
        });
      }
    }
    onSubmit = (e) => {
      e.preventDefault();

      // Check that there are some values in the form
      if (this.state.query === '') {
        this.props.dispatch(resetResults());
        this.setState({
          ...this.state,
          showError: true,
          errorMessage: 'You cannot submit an empty query.',
        });
      } else {
        this.setState({ ...this.state, showError: false });
        this.props.dispatch(search(this.state.query, true));
      }
    }
    onChange = (evt) => {
      this.setState({ ...this.state, query: evt.target.value });
      this.props.dispatch(setQuery(SET_QUERY, evt.target.value));
    }
    onClear = () => {
      this.props.dispatch(setQuery(SET_QUERY, ''));
      this.setState({ ...this.state, query: '', showError: false });
    }
    closeModal = () => this.setState({ ...this.state, showError: false, errorMessage: '' });
    render = () => (
      <Content
        showError={this.state.showError}
        onChange={this.onChange}
        onClear={this.onClear}
        onSubmit={this.onSubmit}
        closeModal={this.closeModal}
        currentlySending={this.props.currentlySending}
        query={this.props.query}
        errorMessage={this.state.errorMessage}
      />
    )
  }

  const select = (state) => ({
    currentlySending: state.apiSearch.currentlySending,
    query: state.apiSearch.query,
    errorMessage: state.apiSearch.errorMessage,
  });

  SearchHOC.propTypes = {
    dispatch: PropTypes.func.isRequired,
    currentlySending: PropTypes.bool.isRequired,
    query: PropTypes.string.isRequired,
    errorMessage: PropTypes.string.isRequired,
  };

  return connect(select)(SearchHOC);
}
