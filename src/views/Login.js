import React from 'react';
import PropTypes from 'prop-types';
import Button from 'react-bootstrap-button-loader';
import Loader from 'halogen/PulseLoader';
import { Alert } from 'react-bootstrap';
import { connect } from 'react-redux';
import { login } from '../actions/LoginActions';
import ErrorMessage from '../components/LoginErrorMessage';
import ONSLogo from '../resources/img/ons-symbol.svg';

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
    const spinner = (<Loader color="#FFFFFF" size="8px" margin="0px" />);
    return (
      <div>
        <div className="login-page">
          <div className="form">
            <form className="login-form">
              <img className="loginLogo" src={ONSLogo} />
              <h1>Statistical Business Register</h1>
              <input type="text" placeholder="username" value={this.state.username} onChange={this.changeUsername}/>
              <input type="password" placeholder="password" value={this.state.password} onChange={this.changePassword}/>
              <Button className="btn btn--primary btn--wide" bsStyle="primary" type="submit" id="loginButton" aria-label="Login button" onClick={!this.props.data.currentlySending ? this.onSubmit : null}>
                {this.props.data.currentlySending ? spinner : 'Login'}
              </Button>
            </form>
          </div>
        </div>
      </div>
    )
  }
}

Login.propTypes = {
  dispatch: PropTypes.func.isRequired,
  data: React.PropTypes.shape({
    currentlySending: PropTypes.bool.isRequired,
  }).isRequired,
};

function select(state) {
  return {
    data: state.login,
  };
}

export default connect(select)(Login);
