import React from 'react';
import PropTypes from 'prop-types';
import { Navbar, Nav, NavItem } from 'react-bootstrap';
import Button from 'react-bootstrap-button-loader';
import { IndexLinkContainer } from 'react-router-bootstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { logout } from '../actions/AppActions';
import UserDetailsModal from '../components/UserDetailsModal';
import '../resources/css/mycss.css';

class NavBar extends React.Component {
  constructor() {
    super();
    this.onLogout = this.onLogout.bind(this);
  }
  onLogout() {
    this.props.dispatch(logout());
  }
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
              <IndexLinkContainer to="Support">
                <NavItem>Support</NavItem>
              </IndexLinkContainer>
              <IndexLinkContainer to="Help">
                <NavItem>Help</NavItem>
              </IndexLinkContainer>
            </Nav>
            <Nav pullRight>
              <NavItem style={{ paddingRight: '0px', paddingLeft: '20px' }}>
                <UserDetailsModal
                  username={this.props.data.userDetails.username}
                  userRole={this.props.data.userDetails.role}
                />
              </NavItem>
              <NavItem style={{ paddingRight: '20px', paddingLeft: '60px' }}>
                <p className="navbar-btn">
                  <Button
                    type="button"
                    className="logout"
                    bsStyle="danger"
                    bsSize="small"
                    loading={this.props.data.currentlySending}
                    disabled={this.props.data.currentlySending}
                    onClick={this.onLogout}
                  >
                    {this.props.data.currentlySending ? '' : 'Logout' }
                  </Button>
                </p>
              </NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

NavBar.propTypes = {
  dispatch: PropTypes.func.isRequired,
  data: React.PropTypes.shape({
    currentlySending: PropTypes.bool.isRequired,
    userDetails: React.PropTypes.shape({
      username: PropTypes.string.isRequired,
      role: PropTypes.string.isRequired,
    }),
  }).isRequired,
};

// Which props do we want to inject, given the global state?
function select(state) {
  return {
    data: state,
  };
}

// If we use 'export default connect()(NavBar)', there is an issue with redux
// affecting shouldComponentUpdate(), which means the NavBar items don't
// highlight on a change of route, the below fixes this issue.
// https://github.com/reactjs/react-redux/blob/v4.0.0/docs/troubleshooting.md

// Wrap the component to inject dispatch and state into it
export default connect(select, null, null, {
  pure: false,
})(NavBar);
