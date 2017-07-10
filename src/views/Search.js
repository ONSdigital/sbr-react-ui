import React from 'react';
import PropTypes from 'prop-types';
import { PageHeader, Button, Table } from 'react-bootstrap';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { refSearch, setQuery } from '../actions/ApiActions';
import { SET_REF_QUERY } from '../constants/ApiConstants';
import ErrorModal from '../components/ErrorModal';
import SearchRefForm from '../components/SearchRefForm';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      errorMessage: '',
      results: [],
    };
    this.changeQuery = this.changeQuery.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.getValidationState = this.getValidationState.bind(this);
  }
  componentWillReceiveProps(nextProps) {
    // The Redux action for the api request will set the errorMessage in the
    // store if the response is 4xx/5xx etc. Show this errorMessage in a modal,
    // props update on keypress so only show error if it has just appeared.
    if (nextProps.data.errorMessage !== '' &&
        nextProps.data.errorMessage !== this.props.data.errorMessage) {
      this.setState({
        show: true,
        errorMessage: nextProps.data.errorMessage,
        results: [],
      });
    } else {
      this.setState({ results: nextProps.data.results });
    }
  }
  onSubmit(e) {
    e.preventDefault();
    const query = this.props.data.query;
    if (query.length > 5 && query.length < 13) {
      this.props.dispatch(refSearch(query));
    } else {
      this.setState({
        results: [],
        show: true,
        errorMessage: 'Please enter a valid VAT/PAYE/UBRN reference.',
      });
    }
  }
  getValidationState() {
    const length = this.props.data.query.length;
    if (length > 12) return 'error';
    else if (length > 5) return 'success';
    else if (length > 0) return 'error';
    return 'error';
  }
  closeModal() {
    this.setState({ show: false, errorMessage: '' });
  }
  changeQuery(evt) {
    // Store the query in Redux store, so we can access it again if a user
    // presses 'back to search' on the Enterprise View page.
    this.props.dispatch(setQuery(SET_REF_QUERY, evt.target.value));
  }
  displayEnterprises() {
    const tableRows = this.props.data.results.map((enterprise) => {
      return (
        <tr>
          <td>{enterprise.enterprise}</td>
          <td>{enterprise.source}</td>
          <td>{enterprise.name}</td>
          <td>
            <Button
              onClick={() => browserHistory.push(`/Search/${enterprise.enterprise}`)}
              bsStyle="info"
            >
                Go to record
            </Button>
          </td>
        </tr>
      );
    });
    return (
      <Table style={{ width: '75%' }} striped bordered condensed hover>
        <thead>
          <tr>
            <th style={{ width: '120px' }}>ID</th>
            <th style={{ width: '80px' }}>Source</th>
            <th >Name</th>
            <th style={{ width: '120px' }}></th>
          </tr>
        </thead>
        <tbody>
          {tableRows}
        </tbody>
      </Table>
    );
  }
  render() {
    const results = this.displayEnterprises();
    const enterprises = (this.props.data.results.length > 1) ? results : <div></div>;
    return (
      <div>
        <PageHeader>
          Reference Search
          <small> by VAT/PAYE/UBRN reference</small>
        </PageHeader>
        <SearchRefForm
          currentlySending={this.props.data.currentlySending}
          onSubmit={this.onSubmit}
          onChange={this.changeQuery}
          value={this.props.data.query}
          valid={this.getValidationState()}
        />
        <ErrorModal
          show={this.state.show}
          message={this.state.errorMessage}
          close={this.closeModal}
        />
        <br />
        {enterprises}
      </div>
    );
  }
}

Search.propTypes = {
  dispatch: PropTypes.func.isRequired,
  data: React.PropTypes.shape({
    query: PropTypes.string.isRequired,
    currentlySending: PropTypes.bool.isRequired,
    errorMessage: PropTypes.string.isRequired,
    results: PropTypes.object.isRequired,
  }).isRequired,
};

function select(state) {
  return {
    data: state.apiSearch.refSearch,
  };
}

export default connect(select)(Search);
