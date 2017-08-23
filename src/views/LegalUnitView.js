import React from 'react';
import { connect } from 'react-redux';
import LegalUnitPanel from '../components/LegalUnitPanel';
import BreadCrumb from '../components/BreadCrumb';

function ifEmptyNull(data, toGet) {
  let d = '';
  try {
    d = data[toGet];
  } catch (e) {
    d = '';
  }
  return d;
}

const LegalUnitView = ({ routeParams, data }) => {
  const name = ifEmptyNull(data[routeParams.index].UnitRecord,'businessName');
  const items = [
    { name: 'Reference Search', link: '/RefSearch' },
    { name: `${data[routeParams.index].UnitRecord.id} [${name}]`, link: '' },
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
            key={data[routeParams.index].UnitRecord.id}
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
