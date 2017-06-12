import React, { Component } from 'react';
import Header from './Header.js';
import NavBar from './NavBar.js';

class Template extends Component {
  render() {
    if (location.pathname === '/' || location.pathname === 'Login'){
      return (
        <div className="container">
          <Header/>
          {this.props.children}
        </div>
      );
    } else {
      return (
        <div className="container">
          <Header/>
          <NavBar/>
          {this.props.children}
        </div>
      );
    }
  }
}

export default Template;
