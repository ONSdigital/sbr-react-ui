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
import AlertMessage from './AlertMessage';
import { editFormat, formEdits, hasFormChanged, getValueByKey } from '../utils/helperMethods';

class EditData extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeStep: 0,
      formValues: {},
      formHasChanged: false,
      edits: {},
      submitted: false,
      ent_name: '',
    };
    this.onChange = this.onChange.bind(this);
    this.submit = this.submit.bind(this);
    this.back = this.back.bind(this);
    this.next = this.next.bind(this);
  }
  componentWillMount() {
    // Take a copy of the JSON, so when the props change, the name on the 'confirm enterprise
    // edit to xyz' does not change.
    const entName = JSON.parse(JSON.stringify(this.props.data.vars.ent_name));
    // On mount, form the json to pass into the EditDataForm component
    const formValues = {};
    this.props.editableFields.map((data) => {
      formValues[data.accessor] = { data: getValueByKey(this.props.data.vars, data.accessor), accessor: data.accessor };
    });
    this.setState({ formValues, entName });
  }
  onChange(e) {
    // We handle the changes for all the form items in EditDataForm here
    // We cannot use refs because we need to initiate each input with the
    // original value
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
    // Create the format of json for the API
    const editsObj = editFormat(this.state.edits);
    const json = {
      updatedBy: this.props.username,
      vars: editsObj,
    };
    this.props.dispatch(editEnterprise(this.props.data.id, json));
    this.setState({ submitted: true });
  }
  render() {
    // TODO: the code below is a little complex and could be refactored
    const noChangesAlert = (<AlertMessage warningLevel="warning" strong="No changes have been made." message="Once an edit has been made, you can review and then sumbit your changes." />);
    const nextButton = (hasFormChanged(this.props.data, this.state.formValues)) ? (<button aria-label="Next Button" onClick={() => this.next()} style={{ color: 'white' }} type="submit" className="btn btn--primary btn--wide" id="nav-search-submit">Next</button>) : noChangesAlert;
    const spinner = (<Loader color="#FFFFFF" size="10px" margin="0px" />);
    const buttonContent = (false) ? spinner : 'Submit Changes';
    const submitButton = (<button aria-label="Search reference button" disabled={this.state.submitted || this.props.edit.currentlySending} onClick={this.submit} style={{ color: 'white' }} loading={this.props.edit.currentlySending} type="submit" className="btn btn--primary btn--wide pull-right" id="nav-search-submit">{buttonContent}</button>);
    const nextOrSubmitButton = (this.state.activeStep === 1) ? submitButton : nextButton;
    const alertStyle = (this.props.edit.headers.status === 200) ? 'success' : 'danger';
    const alertStrong = (this.props.edit.headers.status === 200) ? 'Success!' : 'Error.';
    return (
      <div>
        <Stepper
          steps={[{ title: 'Edit Data', onClick: this.back }, { title: 'Confirm Changes', onClick: this.next }]}
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
            <h4 className="text-center">Confirm changes to the following Enterprise:</h4>
            <h2 className="text-center"><Glyphicon glyph="tower" />&nbsp;{this.state.entName} <small>{this.props.data.id}</small></h2>
            <EditDataChanges edits={this.state.edits} />
          </div>
        }
        <br />
        {(this.state.activeStep !== 0 && !this.state.submitted) &&
          <Button onClick={() => this.back()} bsStyle="default">Back</Button>
        }
        {nextOrSubmitButton}
        {(this.state.submitted && !this.props.edit.currentlySending) &&
          <div>
            <br /><br /><br />
            <AlertMessage warningLevel={alertStyle} strong={alertStrong} message={this.props.edit.errorMessage} />
          </div>
        }
      </div>
    );
  }
}

EditData.propTypes = {
  editableFields: PropTypes.array.isRequired,
  data: PropTypes.object.isRequired,
  username: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
  edit: PropTypes.object.isRequired,
};

function select(state) {
  return {
    edit: state.edit.enterprise,
    username: state.login.username,
  };
}

export default connect(select)(EditData);
