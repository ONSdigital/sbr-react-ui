import React from 'react';
import ONSLogo from '../resources/img/orglogo.svg';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };
  }
  setHeader() {
    // Default header is Example UI, unless on "/" or login page
    let header = 'Local';
    if (location.pathname === '/' || location.pathname === 'Login') {
      header = 'Statistical Business Register';
    }
    return header;
  }
  render() {
    return (
      <div>
        <header role="banner" id="global-header">
          <div className="header-wrapper">
            <div className="header-global" style={{ marginBottom: '20px' }}>
              <div className="header-logo">
                <a href="https://www.ons.gov.uk/" title="Go to the homepage" id="logo" className="content">
                  <img
                    src={ONSLogo}
                    style={{ marginTop: '30px' }}
                    width="240"
                    alt="Office for National Statistics"
                  />
                </a>
              </div>
              <div className="banner-text">
                <h1 style={{ marginTop: '25px' }}>{this.setHeader()}</h1>
              </div>
            </div>
          </div>
        </header>
      </div>
    );
  }
}

export default Header;
