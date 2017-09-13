import React from 'react';
import { connect } from 'react-redux';
import VATPanel from '../components/VATPanel';
import BreadCrumb from '../components/BreadCrumb';

const VATView = ({ routeParams, data }) => {
  const items = [
    { name: 'Enterprise', link: '' },
    { name: `${data[routeParams.index].parents.ENT}`, link: `/Enterprises/${data[routeParams.index].parents.ENT}/0` },
    { name: 'Legal Unit', link: '' },
    { name: `${data[routeParams.index].parents.LEU}`, link: `/LegalUnits/${data[routeParams.index].parents.LEU}/0` },
    { name: 'VAT', link: '' },
    { name: `${data[routeParams.index].id}`, link: '' },
  ];
  return (
    <div>
      <BreadCrumb
        title="VAT View"
        description=""
        marginBottom={1}
        breadCrumbItems={items}
      />
      <div className="page-intro background--gallery">
        <div className="wrapper">
          <VATPanel
            key={data[routeParams.index].id}
            vat={data[routeParams.index]}
          />
        </div>
      </div>
    </div>
  );
};

VATView.propTypes = {
  data: React.PropTypes.array.isRequired,
  routeParams: React.PropTypes.object.isRequired,
};

function select(state) {
  return {
    data: state.apiSearch.vat.results,
  };
}

export default connect(select)(VATView);
