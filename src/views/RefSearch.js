import React from 'react';
import PropTypes from 'prop-types';
import { TitleAndDescription, BreadCrumb } from 'registers-react-library';
import { connect } from 'react-redux';
import { refSearch, setQuery } from '../actions/ApiActions';
import { SET_REF_QUERY } from '../constants/ApiConstants';
import ErrorModal from '../components/ErrorModal';
import SearchRefForm from '../components/SearchRefForm';
import SearchRefResultsTable from '../components/SearchRefResultsTable';
import { validateRefSearch } from '../utils/validation';

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
  componentWillUpdate() {
    if (!this.state.show) {
      this.child.myInput.focus();
    }
  }
  onSubmit(e) {
    e.preventDefault();
    const query = this.props.data.query;
    if (query.length > 3 && query.length < 20) {
      this.props.dispatch(refSearch(query));
    } else {
      // Possibly swap this action with a redux way of doing it?
      this.props.data.results = 0;
      this.setState({
        results: [],
        show: true,
        errorMessage: 'Please enter a valid VAT/PAYE/UBRN reference.',
      });
    }
  }
  closeModal() {
    this.setState({ show: false, errorMessage: '' });
  }
  changeQuery(evt) {
    // Store the query in Redux store, so we can access it again if a user
    // presses 'back to search' on the Enterprise View page.
    this.props.dispatch(setQuery(SET_REF_QUERY, evt.target.value));
  }
  render() {
    const items = [
      { name: 'Home', link: '/Home' },
      { name: 'Search', link: '' },
    ];
    const results = (<SearchRefResultsTable results={this.props.data.results} />);
    const enterprises = (this.props.data.results.length > 1) ? results : <div></div>;
    return (
      <div>
        <BreadCrumb breadCrumbItems={items} />
        <TitleAndDescription
          marginBottom="1"
          title="Reference Search"
          description="Search the Statistical Business Register for a reference (ERN/LURN/UBRN/VAT/CRN/PAYE)"
        />
        <div className="page-intro background--gallery">
          <div className="wrapper">
            <SearchRefForm
              ref={(ch) => (this.child = ch)}
              currentlySending={this.props.data.currentlySending}
              onSubmit={this.onSubmit}
              onChange={this.changeQuery}
              value={this.props.data.query}
              valid={validateRefSearch(this.props.data.query.length)}
            />
            <ErrorModal
              show={this.state.show}
              message={this.state.errorMessage}
              close={this.closeModal}
            />
            <br />
            {enterprises}
          </div>
        </div>
      </div>
    );
  }
}

Search.propTypes = {
  dispatch: PropTypes.func.isRequired,
  data: PropTypes.object.isRequired,
};

function select(state) {
  return {
    data: state.apiSearch.refSearch,
  };
}

export default connect(select)(Search);
