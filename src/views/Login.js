import React, { Component, PropTypes } from 'react';
import Button from 'react-bootstrap-button-loader';
import { Alert } from 'react-bootstrap';
import { connect } from 'react-redux';
import { login } from '../actions/AppActions';
import ErrorMessage from '../components/LoginErrorMessage';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
    this.changeUsername = this.changeUsername.bind(this);
    this.changePassword = this.changePassword.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }
  onSubmit(evt) {
    // http://stackoverflow.com/questions/39724481/cannot-post-error-react-js
    evt.preventDefault();
    this.props.dispatch(login(this.state.username, this.state.password));
  }
  changeUsername(evt) {
    this.setState({ username: evt.target.value });
  }
  changePassword(evt) {
    this.setState({ password: evt.target.value });
  }
  render() {
    return (
      <div>
        <div className="loginPage">
          <div className="centered">
            <form className="form-signin" method="POST">
              <h2 className="form-signin-heading">Login</h2>
              <br />
              <input
                type="text"
                id="username"
                value={this.state.username}
                onChange={this.changeUsername}
                className="form-control"
                name="username"
                placeholder="Username"
                required=""
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck="false"
              />
              <br />
              <input
                type="password"
                id="password"
                value={this.state.password}
                onChange={this.changePassword}
                className="form-control"
                name="password"
                placeholder="Password"
                required=""
              />
              <br />
              <Button
                bsStyle="primary"
                type="submit"
                id="loginButton"
                loading={this.props.data.currentlySending}
                disabled={this.props.data.currentlySending}
                onClick={!this.props.data.currentlySending ? this.onSubmit : null}
              >
                {this.props.data.currentlySending ? '' : 'Login' }
              </Button>
            </form>
            <br />
            <ErrorMessage />
            <br /><br />
            <Alert bsStyle="danger">
              <strong>Warning: </strong>
               Do not login using your ONS credentials, use admin/admin or test/test.
            </Alert>
          </div>
        </div>
      </div>
    );
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  data: React.PropTypes.shape({
    currentlySending: PropTypes.bool.isRequired,
  }).isRequired,
};

// Which props do we want to inject, given the global state?
function select(state) {
  return {
    data: state,
  };
}

// Wrap the component to inject dispatch and state into it
export default connect(select)(Login);
