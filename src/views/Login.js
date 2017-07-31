import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap-button-loader';
import { Alert, Label } from 'react-bootstrap';
import { connect } from 'react-redux';
import { login } from '../actions/LoginActions';
import ErrorMessage from '../components/LoginErrorMessage';


class Login extends React.Component {
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
    const divStyle = {
      paddingTop: '1px',
      textAlign: 'center',
      margin: 'auto',
      border: '2px',
      borderRadius: '25px',
      width: '65%',
    };
    const textAlign = {
      textAlign: 'center',
      marginTop: '20px',
      border: '2px',
      borderRadius: '25px',
    };
    return (
      <div>
        <br />
        <div className="wrapper">
          <div className="col-wrap">
            <form className="form-signin" method="POST">
              <div className="background--astral" style={divStyle}>
                <h2 className="form-signin-heading">Login</h2>
                <br />
                <Label bsSize="large">Username</Label>
                <br />
                <input
                  type="text"
                  id="username"
                  aria-label="Username input"
                  aria-required
                  value={this.state.username}
                  onChange={this.changeUsername}
                  className="form-control"
                  name="username"
                  required=""
                  autoCorrect="off"
                  autoCapitalize="off"
                  spellCheck="false"
                />
                <br /><br />
                <Label bsSize="large">Password</Label>
                <br />
                <input
                  type="password"
                  id="password"
                  aria-label="Password input"
                  aria-required
                  value={this.state.password}
                  onChange={this.changePassword}
                  className="form-control"
                  name="password"
                  required=""
                />
                <br /><br />
                <Button
                  className="btn btn--primary btn--thin"
                  bsStyle="primary"
                  type="submit"
                  id="loginButton"
                  aria-label="Login button"
                  loading={this.props.data.currentlySending}
                  disabled={this.props.data.currentlySending}
                  onClick={!this.props.data.currentlySending ? this.onSubmit : null}
                >
                  {this.props.data.currentlySending ? '' : 'Login' }
                </Button>
                <ErrorMessage />
                <Alert style={textAlign}>
                  <strong>Warning: </strong>
                   Do not login using your ONS credentials, use admin/admin or test/test.
                </Alert>
              </div>
            </form>
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
    data: state.login,
  };
}

// Wrap the component to inject dispatch and state into it
export default connect(select)(Login);
