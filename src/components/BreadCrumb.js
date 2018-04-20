import React from 'react';
import PropTypes from 'prop-types';

/**
 * @class BreadCrumb - 
 */
class BreadCrumb extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      opacity: 1,
    };
  }
  render = () => {
    return (
      <section>
        <div className="wrapper">
          <div className="group">
            <div className="col-12">
              <nav className="breadcrumb">
                <ul className="breadcrumb__items pluto">
                  <li className="breadcrumb__item">
                    <a href="home.html" className="breadcrumb__link">Search</a>
                    <span className="breadcrumb__chevron">&nbsp;&gt;&nbsp;</span>
                  </li>
                  <li className="breadcrumb__item breadcrumb__item--current">Tesco Stores Ltd Inc Tesco Distribution</li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default BreadCrumb;
