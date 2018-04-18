import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import history from '../history';
import { checkAuth } from '../actions/LoginActions';
import Header from './Header';
import Footer from './Footer';
import config from '../config/constants';

const { SHOW_CONFETTI_TIME } = config;

/**
 * @const Template - The default template for all pages
 */
class Template extends React.Component {
  componentDidMount = () => {
    if (sessionStorage.accessToken) {
      this.props.dispatch(checkAuth());
    } else {
      history.push('/');
    }
  }
  render = () => {
    // The components that are included in the template component do not change between
    // logged in / not logged in states, we handle changes (i.e. not showing the sign
    // out button) in the underlying components
    return (
      <section>
        <Header location={location} />
        {this.props.children}
        <Footer />
      </section>
    );
  };
}

Template.propTypes = {
  location: PropTypes.object.isRequired,
  children: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};

export default withRouter(connect()(Template));
