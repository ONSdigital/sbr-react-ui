import React from 'react';
import { connect } from 'react-redux';
import PAYEPanel from '../components/PAYEPanel';
import BreadCrumb from '../components/BreadCrumb';

const PAYEView = ({ routeParams, data }) => {
  const items = [
    { name: 'Enterprise', link: '' },
    { name: `${data[routeParams.index].parents.ENT}`, link: `/Enterprises/${data[routeParams.index].parents.ENT}/0`, unitType: 'ENT' },
    { name: 'Legal Unit', link: '' },
    { name: `${data[routeParams.index].parents.LEU}`, link: `/LegalUnits/${data[routeParams.index].parents.LEU}/0`, unitType: 'LEU' },
    { name: 'PAYE', link: '' },
    { name: `${data[routeParams.index].id}`, link: '' },
  ];
  return (
    <div>
      <BreadCrumb
        title="PAYE View"
        description=""
        marginBottom={1}
        breadCrumbItems={items}
      />
      <div className="page-intro background--gallery">
        <div className="wrapper">
          <PAYEPanel
            key={data[routeParams.index].id}
            paye={data[routeParams.index]}
          />
        </div>
      </div>
    </div>
  );
};

PAYEView.propTypes = {
  data: React.PropTypes.array.isRequired,
  routeParams: React.PropTypes.object.isRequired,
};

function select(state) {
  return {
    data: state.apiSearch.paye.results,
  };
}

export default connect(select)(PAYEView);
