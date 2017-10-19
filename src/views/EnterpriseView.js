import React from 'react';
import { connect } from 'react-redux';
import EnterprisePanel from '../components/EnterprisePanel';
import BreadCrumb from '../components/BreadCrumb';
import PanelContainer from '../components/PanelContainer';

const EnterpriseView = ({ data }) => {
  const items = [
    { name: 'Enterprise', link: '', unitType: '' },
    { name: `${data[0].id}`, link: '', unitType: 'ENT' },
  ];
  return (
    <div>
      <BreadCrumb breadCrumbItems={items} />
      <div className="page-intro background--gallery">
        <div className="wrapper">
          <PanelContainer>
            <EnterprisePanel
              key={data[0].id}
              enterprise={data[0]}
            />
          </PanelContainer>
        </div>
      </div>
    </div>
  );
};

EnterpriseView.propTypes = {
  data: React.PropTypes.array.isRequired,
};

function select(state) {
  return {
    data: state.apiSearch.enterprise.results,
  };
}

export default connect(select)(EnterpriseView);
