import React from 'react';
import { connect } from 'react-redux';
import EnterprisePanel from '../components/EnterprisePanel';
import BreadCrumb from '../components/BreadCrumb';

const EnterpriseView = ({ routeParams, data }) => {
  const items = [
    { name: 'Reference Search', link: '/RefSearch' },
    { name: `${data[routeParams.index].id} [${data[routeParams.index].name}]`, link: '' },
  ];
  return (
    <div>
      <BreadCrumb
        title="Enterprise View"
        description=""
        breadCrumbItems={items}
      />
      <div className="page-intro background--gallery">
        <div className="wrapper">
          <EnterprisePanel
            key={data[routeParams.index].ubrn}
            enterprise={data[routeParams.index]}
          />
        </div>
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
