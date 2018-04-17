import React from 'react';
import { connect } from 'react-redux';
import LocalUnitPanel from '../components/LocalUnitPanel';
import BreadCrumb from '../components/BreadCrumb';
import PanelContainer from '../components/PanelContainer';

const LocalUnitView = ({ data }) => {
  const items = [
    { name: 'Enterprise', link: '' },
    { name: `${data[0].parents.ENT}`, link: `/Enterprises/${data[0].parents.ENT}/0`, unitType: 'ENT' },
    { name: 'Local Unit', link: '' },
    { name: `${data[0].id}`, link: '' },
  ];
  return (
    <div>
      <BreadCrumb breadCrumbItems={items} />
      <div className="page-intro background--gallery">
        <div className="wrapper">
          <PanelContainer>
            <LocalUnitPanel
              key={data[0].id}
              localUnit={data[0]}
            />
          </PanelContainer>
        </div>
      </div>
    </div>
  );
};

LocalUnitView.propTypes = {
  data: React.PropTypes.array.isRequired,
};

function select(state) {
  return {
    data: state.apiSearch.localUnit.results,
  };
}

export default connect(select)(LocalUnitView);
