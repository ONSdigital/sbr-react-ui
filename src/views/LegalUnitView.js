import React from 'react';
import { connect } from 'react-redux';
import LegalUnitPanel from '../components/LegalUnitPanel';
import BreadCrumb from '../components/BreadCrumb';

const LegalUnitView = ({ routeParams, data }) => {
  const items = [
    { name: 'Reference Search', link: '/RefSearch' },
    { name: `${data[routeParams.index].id} [${data[routeParams.index].name}]`, link: '' },
  ];
  return (
    <div>
      <BreadCrumb
        title="Legal Unit View"
        description=""
        marginBottom={1}
        breadCrumbItems={items}
      />
      <div className="page-intro background--gallery">
        <div className="wrapper">
          <LegalUnitPanel
            key={data[routeParams.index].ubrn}
            legalUnit={data[routeParams.index]}
          />
        </div>
      </div>
    </div>
  );
};

LegalUnitView.propTypes = {
  data: React.PropTypes.object.isRequired,
  routeParams: React.PropTypes.object.isRequired,
};

function select(state) {
  return {
    data: state.apiSearch.refSearch.results,
  };
}

export default connect(select)(LegalUnitView);