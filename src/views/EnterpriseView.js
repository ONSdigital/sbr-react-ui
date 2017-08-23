import React from 'react';
import { connect } from 'react-redux';
import EnterprisePanel from '../components/EnterprisePanel';
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

const EnterpriseView = ({ routeParams, data }) => {
  const name = ifEmptyNull(data[routeParams.index].UnitRecord.values,'ent_name');
  const items = [
    { name: 'Reference Search', link: '/RefSearch' },
    { name: `${data[routeParams.index].UnitRecord.id} [${name}]`, link: '' },
  ];
  console.log("data is: ",data)
  console.log("route: ",routeParams)
  console.log(data[routeParams.index])
  console.log(data[routeParams.index].UnitRecord.id)
  return (
    <div>
      <BreadCrumb
        title="Enterprise View"
        description=""
        marginBottom={1}
        breadCrumbItems={items}
      />
      <div className="page-intro background--gallery">
        <div className="wrapper">
          <EnterprisePanel
            key={data[routeParams.index].UnitRecord.id}
            enterprise={data[routeParams.index]}
          />
        </div>
      </div>
    </div>
  );
};

// EnterpriseView.propTypes = {
//   data: React.PropTypes.object.isRequired,
//   routeParams: React.PropTypes.object.isRequired,
// };

function select(state) {
  return {
    data: state.apiSearch.refSearch.results,
  };
}

export default connect(select)(EnterpriseView);
