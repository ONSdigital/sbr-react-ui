import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Stepper from 'react-stepper-horizontal';
import { Alert, Glyphicon } from 'react-bootstrap';
import Button from 'react-bootstrap-button-loader';
import Loader from 'halogen/PulseLoader';
import { editEnterprise } from '../actions/EditActions';
import EditDataChanges from './EditDataChanges';
import EditDataForm from './EditDataForm';
import { editFormat, formEdits, hasFormChanged } from '../utils/helperMethods';

class EditData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeStep: 0,
      formValues: {},
      formHasChanged: false,
      edits: {},
      submitted: false,
    };
    this.onChange = this.onChange.bind(this);
    this.submit = this.submit.bind(this);
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
      const formHasChanged = hasFormChanged(this.props.data, this.state.formValues);
      const edits = formEdits(this.props.data, this.state.formValues);
      this.setState({
        edits,
        formHasChanged,
        activeStep: this.state.activeStep + 1,
      });
    }
  }
  submit() {
    const editsObj = editFormat(this.state.edits);
    const json = {
      updatedBy: this.props.username,
      vars: editsObj,
    };
    this.props.dispatch(editEnterprise(this.props.data.id, json));
    this.setState({ submitted: true });
  }
  render() {
    const noChangesAlert = (
      <Alert bsStyle="warning">
        <strong>No changes have been made.</strong> Once an edit has been made, you can review and then sumbit your changes.
      </Alert>
    );
    const nextButton = (hasFormChanged(this.props.data, this.state.formValues)) ? (
      <button aria-label="Next Button" disabled={nextDisabled} onClick={() => this.next()} style={{color: 'white'}} type="submit" className="btn btn--primary btn--wide" id="nav-search-submit">
        Next
      </button>
    ) : noChangesAlert;
    const spinner = (<Loader color="#FFFFFF" size="10px" margin="0px" />);
    const buttonContent = (false) ? spinner : "Submit Changes";
    const submitButton = (
      <button aria-label="Search reference button" disabled={this.state.submitted || this.props.edit.currentlySending} onClick={this.submit} style={{ color: 'white' }} loading={this.props.edit.currentlySending} type="submit" className="btn btn--primary btn--wide pull-right" id="nav-search-submit">
        {buttonContent}
      </button>
    );
    const backButton = (this.state.activeStep !== 0 && !this.state.submitted) ? <Button onClick={() => this.back()} bsStyle="default">Back</Button> : '';
    const nextDisabled = (this.state.activeStep === 1);
    const nextOrSubmitButton = (this.state.activeStep === 1) ? submitButton : nextButton;
    const successAlert = (this.state.submitted && !this.props.edit.currentlySending) ? (
      <div>
        <br /><br /><br />
        <Alert bsStyle="success">
          <strong>Success!</strong> {this.props.edit.errorMessage}
        </Alert>
      </div>
    ) : (<div></div>);
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
        {this.state.activeStep === 0 &&
          <EditDataForm
            editableFields={this.props.editableFields}
            formValues={this.state.formValues}
            enterprise={this.props.data}
            onChange={this.onChange}
          />
        }
        {this.state.activeStep === 1 &&
          <div>
            <h4 className="text-center">Confirm Changes to the following Enterprise:</h4>
            <h2 className="text-center"><Glyphicon glyph="tower" />&nbsp;{this.props.data.vars.ent_name} <small>{this.props.data.id}</small></h2>
            <EditDataChanges edits={this.state.edits} />
          </div>
        }
        <br />
        {backButton}
        {nextOrSubmitButton}
        {successAlert}
      </div>
    );
  }
}

// EditData.propTypes = {
//   enterprise: PropTypes.object.isRequired,
// };

function select(state) {
  return {
    edit: state.edit.enterprise,
    username: state.login.username,
  };
}

export default connect(select)(EditData);
