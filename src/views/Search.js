import React from 'react';
import PropTypes from 'prop-types';
import { ControlLabel, PageHeader, FormGroup, FormControl, HelpBlock, Modal } from 'react-bootstrap';
import Button from 'react-bootstrap-button-loader';
import { connect } from 'react-redux';
import { refSearch, setQuery } from '../actions/ApiActions';
import { SET_REF_QUERY } from '../constants/ApiConstants';

class Search extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
    };
    this.changeQuery = this.changeQuery.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onSubmit(e) {
    e.preventDefault();
    const query = this.props.data.query;
    if (query.length > 5 && query.length < 13) {
      this.props.dispatch(refSearch(query));
    } else {
      this.setState({ show: true });
    }
  }
  getValidationState() {
    const length = this.props.data.query.length;
    if (length > 12) return 'error';
    else if (length > 5) return 'success';
    // else if (length > 5) return 'warning';
    else if (length > 0) return 'error';
  }
  changeQuery(evt) {
    this.props.dispatch(setQuery(SET_REF_QUERY, evt.target.value));
  }
  render() {
    let close = () => this.setState({ show: false });
    return (
      <div>
        <PageHeader>
          Reference Search
          <small> by VAT/PAYE/UBRN reference</small>
        </PageHeader>
        <form method="get">
          <div style={{ width: '50%' }}>
            <FormGroup
              controlId="formBasicText"
              validationState={this.getValidationState()}
            >
              <ControlLabel>Enter reference number:</ControlLabel>
              <FormControl
                type="text"
                value={this.props.data.query}
                placeholder="Enter ref to search..."
                onChange={this.changeQuery}
              />
              <FormControl.Feedback />
              <HelpBlock>Validation is based on string length.</HelpBlock>
            </FormGroup>
          </div>
          <Button
            bsStyle="primary"
            type="submit"
            id="searchButton"
            loading={this.props.data.currentlySending}
            disabled={this.props.data.currentlySending}
            onClick={!this.props.data.currentlySending ? this.onSubmit : null}
          >
            {this.props.data.currentlySending ? '' : 'Search' }
          </Button>
        </form>
        <Modal
          show={this.state.show}
          onHide={close}
          aria-labelledby="contained-modal-title"
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title">Contained Modal</Modal.Title>
          </Modal.Header>
          <Modal.Footer>
            <Button onClick={close}>Close</Button>
          </Modal.Footer>
        </Modal>
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
