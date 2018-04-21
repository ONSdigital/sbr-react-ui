import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ResultsSearchForm from './ResultsSearchForm';
import { search, setQuery, resetResults } from '../actions/ApiActions';
import { SET_QUERY } from '../constants/ApiConstants';

/**
 * @function withProfile - This is a higher order component that accepts a component
 * (which is either the Home/Results page) and wraps it with the common logic
 * for changing form values and searching.
 *
 * https://reactjs.org/docs/higher-order-components.html
 *
 * @param {Object} Profile - The child react component
 */
export default function withProfile(Profile) {
  class ProfileHOC extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        showError: false,
      };
    }
    render = () => (
      <section>
        <ResultsSearchForm
          currentlySending={this.props.currentlySending}
          query={this.props.query}
          onSubmit={this.props.onSubmit}
          onChange={this.props.onChange}
          onClear={this.props.onClear}
        />
        <Profile />
      </section>
    )
  }

  return ProfileHOC;
}
