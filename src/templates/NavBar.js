import React, { Component } from 'react';
import '../resources/css/mycss.css';
import { Navbar, Nav, NavItem } from "react-bootstrap";
import Button from 'react-bootstrap-button-loader';
import { IndexLinkContainer } from 'react-router-bootstrap';
import { connect } from 'react-redux';
import { logout } from '../actions/AppActions';
import { Link } from 'react-router';

class NavBar extends Component {
  render() {
    return (
      <div>
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              <b><Link to="/Home" style={{ textDecoration: 'none', color: 'black' }}>Statistical Business Register</Link></b>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              <IndexLinkContainer to="Home">
                <NavItem>Home</NavItem>
              </IndexLinkContainer>
            </Nav>
            <Nav pullRight>
              <IndexLinkContainer to="Support">
                <NavItem>Support</NavItem>
              </IndexLinkContainer>
              <IndexLinkContainer to="Help">
                <NavItem>Help</NavItem>
              </IndexLinkContainer>
              <NavItem style={{paddingRight: "20px", paddingLeft: "60px"}}>
              <p className="navbar-btn">
                <Button
                  type="button"
                  className="logout"
                  bsStyle="danger"
                  bsSize="small"
                  loading={this.props.data.currentlySending}
                  disabled={this.props.data.currentlySending}
                  onClick={this._onLogout.bind(this)}>
                    {this.props.data.currentlySending ? "" : "Logout" }
                </Button>
              </p>
              </NavItem>
            </Nav>
          </Navbar.Collapse>
          </Navbar>
      </div>
    );
  }
  _onLogout() {
    this.props.dispatch(logout());
  }
}

// Which props do we want to inject, given the global state?
function select(state) {
  return {
    data: state
  };
}

// Wrap the component to inject dispatch and state into it
export default connect(select)(NavBar);
