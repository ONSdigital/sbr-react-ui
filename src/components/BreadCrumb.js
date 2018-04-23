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
    const breadCrumbItems = this.props.breadCrumbItems;
    const itemsLength = breadCrumbItems.length;
    const chevron = (<span className="breadcrumb__chevron">&nbsp;&gt;&nbsp;</span>);
    return (
      <section>
        <div className="wrapper">
          <div className="group">
            <div className="col-12">
              <nav className="breadcrumb">
                <ul className="breadcrumb__items pluto">
                  <li className="breadcrumb__item">
                    <a href="home.html" className="breadcrumb__link">Search</a>
                    {chevron}
                  </li>
                  {
                    this.props.breadCrumbItems.map((value, key) => {
                      if (key === (itemsLength - 1)) {
                        return (
                          <li key={value.name} className="breadcrumb__item breadcrumb__item--current">{value.name}</li>
                        );
                      }
                      return (
                        <li key={value.name} className="breadcrumb__item">
                          <a href="enterprise.html" className="breadcrumb__link">{value.name}</a>
                          {chevron}
                        </li>
                      );
                    })
                  }
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

BreadCrumb.propTypes = {
  breadCrumbItems: PropTypes.array.isRequired,
};

export default BreadCrumb;
