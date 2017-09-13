import React from 'react';
import { connect } from 'react-redux';
import EnterprisePanel from '../components/EnterprisePanel';
import BreadCrumb from '../components/BreadCrumb';
import { getValueByKey } from '../utils/helperMethods';

const EnterpriseView = ({ routeParams, data }) => {
  const name = getValueByKey(data[routeParams.index].vars, 'ent_name');
  const items = [
    { name: 'Reference Search', link: '/RefSearch' },
    { name: 'Enterprise', link: '' },
    { name: `${data[routeParams.index].id}`, link: '' },
  ];
  return (
    <div>
      <BreadCrumb
        title=""
        description=""
        marginBottom="0"
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
  data: React.PropTypes.object.isRequired,
  routeParams: React.PropTypes.object.isRequired,
};

function select(state) {
  return {
    data: state.apiSearch.enterprise.results,
  };
}

export default connect(select)(EnterpriseView);
