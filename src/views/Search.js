import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap-button-loader';
import { connect } from 'react-redux';
import { refSearch } from '../actions/ApiActions';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
    };
    this.changeQuery = this.changeQuery.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onSubmit() {
    this.props.dispatch(refSearch(this.state.query));
  }
  changeQuery(evt) {
    this.setState({ query: evt.target.value });
  }
  render() {
    return (
      <div>
        <h1 className="page-header">Search</h1>
        <input
          id="refSearch"
          value={this.state.ref}
          onChange={this.changeQuery}
          className="form-control"
          placeholder="Enter ref to search..."
          required=""
        />
        <br />
        <Button
          bsStyle="primary"
          type="submit"
          id="loginButton"
          loading={this.props.data.currentlySending}
          disabled={this.props.data.currentlySending}
          onClick={!this.props.data.currentlySending ? this.onSubmit : null}
        >
          {this.props.data.currentlySending ? '' : 'Search' }
        </Button>
      </div>
    );
  }
}

Search.propTypes = {
  dispatch: PropTypes.func.isRequired,
  data: React.PropTypes.shape({
    currentlySending: PropTypes.bool.isRequired,
  }).isRequired,
};

function select(state) {
  return {
    data: state.apiSearch.refSearch,
  };
}

export default connect(select)(Search);
