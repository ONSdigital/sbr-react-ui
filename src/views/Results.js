import React from 'react';
import PropTypes from 'prop-types';
import ResultsSearchForm from '../components/ResultsSearchForm';
import { numberWithCommas } from '../utils/helperMethods';

class Results extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      listView: false,
      showFilter: false,
    };
  }
  render() {
    const numResults = this.props.results.length;
    return (
      <section>
        <ResultsSearchForm
          currentlySending={this.props.currentlySending}
          query={this.props.query}
          onSubmit={this.props.onSubmit}
          onChange={this.props.onChange}
          onClear={this.props.onClear}
        />
        <div className="main-content">
          <div className="wrapper">
            <div className="group">
              <div className="col-12">
                <h1 id="homeTitle" className="jupiter remove-margin">Search results</h1>
                {numResults !== 0 &&
                  <div className="field--toggle" style={{ float: 'right' }}>
                    <label className="label label--inline venus field__label" htmlFor="rangeToggle">List View</label>
                    <input id="rangeToggle" checked={this.state.listView} onChange={() => this.setState({ ...this.state, listView: !this.state.listView })} className="field__input input input--checkbox" type="checkbox" />
                  </div>
                }
                {!this.props.currentlySending &&
                  <div style={{ display: 'inline' }}>
                    <p style={{ display: 'inline' }} className="mars">We&apos;ve found {numberWithCommas(numResults)} {(numResults > 1 || numResults === 0) ? 'businesses' : 'business'}</p>
                  </div>
                }
                <div className="key-line"></div>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

Results.propTypes = {
  currentlySending: PropTypes.bool.isRequired,
  query: PropTypes.string.isRequired,
  results: PropTypes.array.isRequired,
  showError: PropTypes.bool.isRequired,
  errorMessage: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onClear: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default Results;
