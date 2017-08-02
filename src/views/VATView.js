import React from 'react';
import { connect } from 'react-redux';
import VATPanel from '../components/VATPanel';
import BreadCrumb from '../components/BreadCrumb';

const VATView = ({ routeParams, data }) => {
  const items = [
    { name: 'Reference Search', link: '/RefSearch' },
    { name: `${data[routeParams.index].id} [${data[routeParams.index].name}]`, link: '' },
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
            key={data[routeParams.index].ubrn}
            vat={data[routeParams.index]}
          />
        </div>
      </div>
    </div>
  );
};

VATView.propTypes = {
  data: React.PropTypes.object.isRequired,
  routeParams: React.PropTypes.object.isRequired,
};

function select(state) {
  return {
    data: state.apiSearch.refSearch.results,
  };
}

export default connect(select)(VATView);
