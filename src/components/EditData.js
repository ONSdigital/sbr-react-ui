import React from 'react';
import PropTypes from 'prop-types';
import Stepper from 'react-stepper-horizontal';
import { Button, Row, Col, Form, FormGroup, ControlLabel, FormControl, HelpBlock } from 'react-bootstrap';
import FormStaticValue from './FormStaticValue';
import FormStaticAddress from './FormStaticAddress';
import FormItem from './FormItem';

function FieldGroup({ id, label, help, ...props }) {
  return (
    <FormGroup controlId={id}>
      <ControlLabel>{label}</ControlLabel>
      <FormControl {...props} />
      {help && <HelpBlock>{help}</HelpBlock>}
    </FormGroup>
  );
}

class EditData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeStep: 0,
      formValues: {},
    };
  }
  back() {
    this.setState({ activeStep: this.state.activeStep - 1 });
  }
  next() {
    this.setState({ activeStep: this.state.activeStep + 1 });
  }
  canSubmit() {
    return true;
  }
  submit() {
    console.log("submitting...");
  }
  onChange(name, value) {
    console.log("on change...")
  }
  renderContent() {
    if (this.state.activeStep === 0) {
      return (
        <div>
          <Row className="show-grid">
            <Col xs={6}>
              <h3 className="text-center">Original Data</h3>
              <Row className="show-grid">
                <Col xs={10} xsOffset={1}>
                  <Form horizontal>
                    {
                      this.props.editableFields.map((data) => {
                        return (
                          <FormItem disabled id={data.id} type={data.type} label={data.label} value={this.props.data.vars[data.accessor]} />
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
                          <FormItem ref={data.id} id={data.id} type={data.type} label={data.label} value={this.props.data.vars[data.accessor]} />
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
      return (<h1>Confirm changes?</h1>);
    }
  }
  render() {
    const nextButton = (<Button disabled={nextDisabled} onClick={() => this.next()} bsStyle="primary">Next</Button>);
    const submitButton = (<Button disabled={nextDisabled} onClick={() => this.submit()} bsStyle="primary">Submit</Button>);
    const backDisabled = (this.state.activeStep === 0);
    const nextDisabled = (this.state.activeStep === 1);
    const nextOrSubmitButton = (this.state.activeStep === 1) ? submitButton : nextButton;
    return (
      <div>
        <Stepper
          steps={[
            { title: 'Edit Data' },
            { title: 'Confirm Changes' },
          ]}
          activeStep={this.state.activeStep}
        />
        {this.renderContent()}
        <Button disabled={backDisabled} onClick={() => this.back()} bsStyle="default">Back</Button>
        {nextOrSubmitButton}
      </div>
    );
  }
}

// EditData.propTypes = {
//   enterprise: PropTypes.object.isRequired,
// };

export default EditData;
