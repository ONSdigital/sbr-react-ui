import React, { Component } from 'react';
import Button from 'react-bootstrap-button-loader';
import { connect } from 'react-redux';
import { login } from '../actions/AppActions';
import ErrorMessage from '../components/LoginErrorMessage.js';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state =  {
      username: "",
      password: ""
    };
  }
  render() {
    return (
      <div>
        <div className="loginPage">
          <div className="centered">
            <form className="form-signin" method="POST">
              <h2 className="form-signin-heading">Login</h2>
              <br />
              <input type="text" id="username" value={this.state.username} onChange={this._changeUsername.bind(this)} className="form-control" name="username" placeholder="Username" required="" autoCorrect="off" autoCapitalize="off" spellCheck="false" />
              <br />
              <input type="password" id="password" value={this.state.password} onChange={this._changePassword.bind(this)} className="form-control" name="password" placeholder="Password" required=""/>
              <br />
              <Button
                bsStyle="primary"
                type="submit"
                id="loginButton"
                loading={this.props.data.currentlySending}
                disabled={this.props.data.currentlySending}
                onClick={!this.props.data.currentlySending ? this._onSubmit.bind(this) : null}>
                  {this.props.data.currentlySending ? "" : "Login" }
              </Button>
            </form>
            <br/>
            <ErrorMessage/>
            <br/><br/>
          </div>
        </div>
      </div>
    );
  }

  // Change the username in the app state
  _changeUsername(evt) {
    this.setState({ username: evt.target.value })
  }

  // Change the password in the app state
  _changePassword(evt) {
    this.setState({ password: evt.target.value })
  }

  // onSubmit call the passed onSubmit function
  _onSubmit(evt) {
    // http://stackoverflow.com/questions/39724481/cannot-post-error-react-js
    evt.preventDefault();
    this.props.dispatch(login(this.state.username, this.state.password));
  }
}

// Which props do we want to inject, given the global state?
function select(state) {
  return {
    data: state
  };
}

// Wrap the component to inject dispatch and state into it
export default connect(select)(Login);
