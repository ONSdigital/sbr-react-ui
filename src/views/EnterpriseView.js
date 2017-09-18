import React from 'react';
import { connect } from 'react-redux';
import EnterprisePanel from '../components/EnterprisePanel';
import BreadCrumb from '../components/BreadCrumb';
import { getSpecificUnitType } from '../actions/ApiActions';
import PanelContainer from '../components/PanelContainer';

const EnterpriseView = ({ routeParams, data, dispatch }) => {
  // If there is not data in the store, or the correct id is not present,
  // send a request for the data.
  // (e.g. go straight to /Enterprises/:id and not going)
  // if (data.length === 0 || data[0].id === undefined) {
  //   dispatch(getSpecificUnitType('ENT', routeParams.enterprise));
  // }
  const items = [
    { name: 'Enterprise', link: '', unitType: '' },
    { name: `${data[0].id}`, link: '', unitType: 'ENT' },
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
  routeParams: React.PropTypes.object.isRequired,
  dispatch: React.PropTypes.func.isRequired,
};

function select(state) {
  return {
    data: state.apiSearch.enterprise.results,
  };
}

export default connect(select)(EnterpriseView);
