import React from 'react';
import PropTypes from 'prop-types';
import Confetti from 'react-confetti';
import Header from './Header';
import NavBar from './NavBar';
import Banner from './Banner';
import Footer from './Footer';
import Expire from '../components/Expire';
import config from '../config/constants';

const { ENV } = config;

class Template extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      opacity: 1,
      count: 0,
    };
    this.tick = this.tick.bind(this);
  }
  tick() {
    console.log(this.state.opacity)
    console.log(this.state.count)
    console.log('tick...')
    if (this.state.count > 100) {
      clearInterval(this.interval);
    }
    this.setState({ count: this.state.count + 1 });
    this.setState({ opacity: this.state.opacity - 0.025 });
  }
  componentDidMount() {
    this.interval = setInterval(this.tick, 250);
  }
  componentWillUnmount() {
    clearInterval(this.interval);
  }
  render() {
    const onProdEnv = (ENV === 'prod');
    const banner = (onProdEnv) ? '' : (<Banner />);
    if (this.props.location.pathname === '/' || this.props.location.pathname === 'Login') {
      return (
        <div>
          {banner}
          <div className="container">
            <Header />
            {this.props.children}
          </div>
        </div>
      );
    }
    return (
      <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}>
        {/* <Expire delay={220}> */}
          <Confetti opacity={this.state.opacity} width={`${screen.width}px`} height={`${screen.height}px`} />
        {/* </Expire> */}
        {banner}
        <Header />
        <NavBar primary={this.props.location.pathname} />
        <div className="container">
          {this.props.children}
        </div>
        <Footer />
      </div>
    );
  }
}

Template.propTypes = {
  location: React.PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }).isRequired,
  children: PropTypes.object.isRequired,
};

export default Template;
