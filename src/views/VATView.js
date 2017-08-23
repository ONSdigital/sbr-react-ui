import React from 'react';
import { connect } from 'react-redux';
import VATPanel from '../components/VATPanel';
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

const VATView = ({ routeParams, data }) => {
  const name = ifEmptyNull(data[routeParams.index].UnitRecord.vars, 'name1');
  const items = [
    { name: 'Reference Search', link: '/RefSearch' },
    { name: `${data[routeParams.index].UnitRecord.key} [${name}]`, link: '' },
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
