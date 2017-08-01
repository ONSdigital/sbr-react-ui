import React from 'react';
import { connect } from 'react-redux';
import EnterprisePanel from '../components/EnterprisePanel';

const EnterpriseView = ({ routeParams, data }) => {
  return (
    <div className="page-intro background--gallery">
      <div className="wrapper">
        <div className="col-wrap">
          <div className="col">
            <nav>
              <div className="breadcrumb print--hide">
                <ol className="breadcrumb__list">
                  <li className="breadcrumb__item">
                    <a className="breadcrumb__link" href="/">
                      Home
                    </a>
                  </li>
                  <li className="breadcrumb__item">
                    <a className="breadcrumb__link" href="/Search">
                      Ref Search
                    </a>
                  </li>
                  <li className="breadcrumb__item">
                    {routeParams.enterprise} [{data[routeParams.index].name}]
                  </li>
                </ol>
              </div>
            </nav>
            <div className="col col--md-47 col--lg-48">
              <h1 className="page-intro__title ">
                Enterprise View
              </h1>
            </div>
          </div>
        </div>
        <br />
        <EnterprisePanel
          key={data[routeParams.index].ubrn}
          enterprise={data[routeParams.index]}
        />
      </div>
    </div>
  );
};

EnterpriseView.propTypes = {
  data: React.PropTypes.object.isRequired,
  routeParams: React.PropTypes.object.isRequired,
};

function select(state) {
  return {
    data: state.apiSearch.refSearch.results,
  };
}

export default connect(select)(EnterpriseView);
