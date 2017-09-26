import React from 'react';
import PropTypes from 'prop-types';
import Stepper from 'react-stepper-horizontal';
import { Row, Col, Form, Alert, Glyphicon } from 'react-bootstrap';
import Button from 'react-bootstrap-button-loader';
import FormItem from './FormItem';
import EditDataChanges from './EditDataChanges';
import Loader from 'halogen/PulseLoader';

class EditData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeStep: 0,
      formValues: {},
      formHasChanged: false,
      edits: {},
    };
    this.onChange = this.onChange.bind(this);
    this.back = this.back.bind(this);
    this.next = this.next.bind(this);
  }
  componentWillMount() {
    const formValues = {};
    this.props.editableFields.map((data) => {
      formValues[data.accessor] = { data: this.props.data.vars[data.accessor], accessor: data.accessor }
    });
    this.setState({ formValues });
  }
  onChange(e) {
    const formValues = this.state.formValues;
    formValues[e.target.id].data = e.target.value;
    this.setState({ formValues });
  }
  back() {
    if (this.state.activeStep === 1) {
      this.setState({ activeStep: this.state.activeStep - 1 });
    }
  }
  next() {
    if (this.state.activeStep === 0) {
      const formHasChanged = this.formHasChanged(this.props.data, this.state.formValues);
      const edits = this.formEdits(this.props.data, this.state.formValues);
      this.setState({
        edits,
        formHasChanged,
        activeStep: this.state.activeStep + 1,
      });
    }
  }
  formEdits(original, updated) {
    return Object.keys(updated).map((key) => {
      if (original.vars[key] !== updated[key].data) {
        return { accessor: updated[key].accessor, original: original.vars[key], updated: updated[key].data };
      }
      return null;
    }).filter(a => a !== null);
  }
  submit() {
    console.log('submitting...');
  }
  formHasChanged(original, updated) {
    // We don't want to check all the data, just the data items that are editable
    // Map over the data, return true/false based on whether the data has changed,
    // then reduce using OR, so any true will return true.
    return Object.keys(updated).map((key) => {
      return original.vars[key] !== updated[key].data;
    }).reduce((a, b) => {
      return a || b;
    }, false);
  }
  renderContent() {
    if (this.state.activeStep === 0) {
      return (
        <div>
          <h3 className="text-center">Edit Enterprise</h3>
          <Row className="show-grid">
            <Col xs={6}>
              <h3 className="text-center">Original Data</h3>
              <Row className="show-grid">
                <Col xs={10} xsOffset={1}>
                  <Form horizontal>
                    {
                      this.props.editableFields.map((data) => {
                        return (
                          <FormItem disabled id={data.accessor} type={data.type} label={data.label} value={this.props.data.vars[data.accessor]} />
                        );
                      })
                    }
                  </Form>
                </Col>
              </Row>
            </Col>
            <Col xs={6}>
              <h3 className="text-center">Modified Data</h3>
              <Row className="show-grid">
                <Col xs={10} xsOffset={1}>
                  <Form horizontal>
                    {
                      this.props.editableFields.map((data) => {
                        return (
                          <FormItem value={this.state.formValues[data.accessor].data} onInput={this.onChange} id={data.accessor} type={data.type} label={data.label} />
                        );
                      })
                    }
                  </Form>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      );
    } else if (this.state.activeStep === 1) {
      return (
        <div>
          <h4 className="text-center">Confirm Changes to the following Enterprise:</h4>
          <h2 className="text-center"><Glyphicon glyph="tower" />&nbsp;{this.props.data.vars.ent_name} <small>{this.props.data.id}</small></h2>
          <EditDataChanges edits={this.state.edits} />
        </div>
      );
    }
  }
  render() {
    const noChangesAlert = (
      <Alert bsStyle="warning">
        <strong>No changes have been made.</strong> Once an edit has been made, you can review and then sumbit your changes.
      </Alert>
    );
    const nextButton = (this.formHasChanged(this.props.data, this.state.formValues)) ? (
      // <Button disabled={nextDisabled} onClick={() => this.next()} bsStyle="primary">Next</Button>
      <button aria-label="Next Button" disabled={nextDisabled} onClick={() => this.next()} style={{color: 'white'}} type="submit" className="btn btn--primary btn--wide" id="nav-search-submit">
        Next
      </button>
    ) : noChangesAlert;
    // const submitButton = (
    //   <Button className="pull-right" disabled={nextDisabled} onClick={() => this.submit()} bsStyle="success" loading={true}>Submit</Button>
    // );
    const spinner = (<Loader color="#FFFFFF" size="10px" margin="0px" />);
    const buttonContent = (false) ? spinner : "Submit Changes";
    const submitButton = (
      <button aria-label="Search reference button" style={{color: 'white'}} loading={true} type="submit" className="btn btn--primary btn--wide pull-right" id="nav-search-submit">
        {buttonContent}
      </button>
    );
    const backButton = (this.state.activeStep !== 0) ? <Button onClick={() => this.back()} bsStyle="default">Back</Button> : '';
    const nextDisabled = (this.state.activeStep === 1);
    const nextOrSubmitButton = (this.state.activeStep === 1) ? submitButton : nextButton;
    return (
      <div>
        <Stepper
          steps={[
            { title: 'Edit Data', onClick: this.back },
            { title: 'Confirm Changes', onClick: this.next },
          ]}
          activeStep={this.state.activeStep}
        />
        <br />
        {this.renderContent()}
        <br />
        {backButton}
        {nextOrSubmitButton}
      </div>
    );
  }
}

// EditData.propTypes = {
//   enterprise: PropTypes.object.isRequired,
// };

export default EditData;
