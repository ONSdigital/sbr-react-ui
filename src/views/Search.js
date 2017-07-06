import React from 'react';
import PropTypes from 'prop-types';
import { PageHeader } from 'react-bootstrap';
import { connect } from 'react-redux';
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
    };
    this.changeQuery = this.changeQuery.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
    this.closeModal = this.closeModal.bind(this);
    this.getValidationState = this.getValidationState.bind(this);
  }
  onSubmit(e) {
    e.preventDefault();
    const query = this.props.data.query;
    if (query.length > 5 && query.length < 13) {
      this.props.dispatch(refSearch(query));
    } else {
      this.setState({
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
    this.setState({ show: false });
  }
  changeQuery(evt) {
    this.props.dispatch(setQuery(SET_REF_QUERY, evt.target.value));
  }
  render() {
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
      </div>
    );
  }
}

Search.propTypes = {
  dispatch: PropTypes.func.isRequired,
  data: React.PropTypes.shape({
    query: PropTypes.string.isRequired,
    currentlySending: PropTypes.bool.isRequired,
  }).isRequired,
};

function select(state) {
  return {
    data: state.apiSearch.refSearch,
  };
}

export default connect(select)(Search);
