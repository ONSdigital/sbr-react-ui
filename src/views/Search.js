import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { refSearch, setQuery } from '../actions/ApiActions';
import { SET_REF_QUERY } from '../constants/ApiConstants';
import ErrorModal from '../components/ErrorModal';
import SearchRefForm from '../components/SearchRefForm';
import SearchRefFormNew from '../components/SearchRefFormNew';
import EnterpriseResultsTable from '../components/EnterpriseResultsTable';
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
  closeModal() {
    this.setState({ show: false, errorMessage: '' });
  }
  changeQuery(evt) {
    // Store the query in Redux store, so we can access it again if a user
    // presses 'back to search' on the Enterprise View page.
    this.props.dispatch(setQuery(SET_REF_QUERY, evt.target.value));
  }
  render() {
    const results = (<EnterpriseResultsTable results={this.props.data.results} />);
    const enterprises = (this.props.data.results.length > 1) ? results : <div></div>;
    return (
      <div className="page-intro background--gallery">
        <div className="wrapper">
          <div className="col-wrap">
            <div className="col">
              <nav>
                <div className="breadcrumb print--hide">
                  <ol className="breadcrumb__list">
                    <li className="breadcrumb__item">
                      <a className="breadcrumb__link" href="/">
                        Home
                      </a>
                    </li>
                    <li className="breadcrumb__item">
                      Reference Search
                    </li>
                  </ol>
                </div>
              </nav>
              <div className="col col--md-47 col--lg-48">
                <h1 className="page-intro__title ">
                  Reference Search
                </h1>
                <p className="page-intro__content" style={{ marginBottom: '0px' }}>
                  Search the Statistical Business Register on a reference (VAT/CH/UBRN)
                </p>
                <SearchRefFormNew
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
        </div>
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
