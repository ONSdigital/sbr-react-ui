import React from 'react';
import { connect } from 'react-redux';
import EnterprisePanel from '../components/EnterprisePanel';
import BreadCrumb from '../components/BreadCrumb';

const EnterpriseView = ({ routeParams, data }) => {
  const items = [
    { name: 'Enterprise', link: '' },
    { name: `${data[routeParams.index].id}`, link: '' },
  ];
  return (
    <div>
      <BreadCrumb
        title=""
        description=""
        marginBottom={0}
        breadCrumbItems={items}
      />
      <div className="page-intro background--gallery">
        <div className="wrapper">
          <EnterprisePanel
            key={data[routeParams.index].id}
            enterprise={data[routeParams.index]}
          />
        </div>
      </div>
    </div>
  );
};

EnterpriseView.propTypes = {
  data: React.PropTypes.array.isRequired,
  routeParams: React.PropTypes.object.isRequired,
};

function select(state) {
  return {
    data: state.apiSearch.refSearch.results,
  };
}

export default connect(select)(EnterpriseView);
