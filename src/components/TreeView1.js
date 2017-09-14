import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Tree from 'react-d3-tree';

function findAndReplace(object, value, replacevalue) {
  for (var x in object) {
    if (object.hasOwnProperty(x)) {
      if (typeof object[x] == 'object') {
        findAndReplace(object[x], value, replacevalue);
      }
      if (object[value]) {
        object[replacevalue] = object[value] + ' ' + object['id'];
        object['new_id'] = object['id'];
        //delete object[value];
      }
    }
  }
}

function test(e) {
  console.log('e is ',e)
  console.log('testing...')
}

const TreeView1 = ({ enterpriseId, childrenJson }) => {
  const translation = { x: 200, y: 100 };
  findAndReplace(childrenJson, 'type', 'name');
  const json = [{
    name: `ENT - ${enterpriseId}`,
    children: childrenJson,
  }];

  return (
    <div id="treeWrapper" style={{ width: '100%', height: '500px' }}>
      <Tree data={json} orientation={'vertical'} onClick={e => test(e)} translate={translation} />
    </div>
  );
};

TreeView1.propTypes = {
  enterpriseId: PropTypes.string.isRequired,
  childrenJson: PropTypes.array.isRequired,
};

export default TreeView1;
