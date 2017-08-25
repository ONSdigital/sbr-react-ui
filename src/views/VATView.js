import React from 'react';
import { connect } from 'react-redux';
import VATPanel from '../components/VATPanel';
import BreadCrumb from '../components/BreadCrumb';
import { getValueByKey } from '../utils/helperMethods';

const VATView = ({ routeParams, data }) => {
  const name = getValueByKey(data[routeParams.index].vars, 'name1');
  const items = [
    { name: 'Reference Search', link: '/RefSearch' },
    { name: 'VAT', link: '' },
    { name: `${data[routeParams.index].id} [${name}]`, link: '' },
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
  data: React.PropTypes.object.isRequired,
  routeParams: React.PropTypes.object.isRequired,
};

function select(state) {
  return {
    data: state.apiSearch.refSearch.results,
  };
}

export default connect(select)(VATView);
