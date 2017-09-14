import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Tree from 'react-d3-tree';
import { ButtonToolbar, Button } from 'react-bootstrap';
import Toggle from 'react-toggle';

function findAndReplace(object, value, replacevalue) {
  for (var x in object) {
    if (object.hasOwnProperty(x)) {
      if (typeof object[x] == 'object') {
        findAndReplace(object[x], value, replacevalue);
      }
      if (object[value]) {
        object[replacevalue] = object[value] + ' ' + object['id'];
        // id gets overwritten by react-d3-tree, so use newId instead
        object['newId'] = object['id'];
        //delete object[value];
      }
    }
  }
}

const TreeView1 = ({ enterpriseId, childrenJson }) => {
  const translation = { x: 200, y: 100 };
  findAndReplace(childrenJson, 'type', 'name');
  const json = [{
    name: `ENT - ${enterpriseId}`,
    children: childrenJson,
  }];

  function handleClick(e) {
    console.log(e.newId)
    console.log(e.type)
    console.log(collapsible)
  }

  let collapsible = false;

  function handleToggle() {
    collapsible = !collapsible
    console.log(collapsible)
  }

  console.log(collapsible)

  return (
    <div>
      <div style={{ borderBottom: '2px solid', paddingBottom: '5px' }}>
        <span className='label-text' style={{ fontSize: '20px', verticalAlign: 'top' }}>Toggle Collapsible &nbsp;&nbsp;</span>
        <Toggle
          collapsible={collapsible}
          defaultChecked={false}
          onChange={handleToggle}
        />
        <span className='label-text' style={{ fontSize: '16px', verticalAlign: 'top' }}>&nbsp;&nbsp;You can only go to a record when the collapsible toggle is off.</span>
      </div>
      <div id="treeWrapper" style={{ width: '100%', height: '500px' }}>
        <Tree data={json} collapsible={false} orientation={'vertical'} onClick={e => handleClick(e)} translate={translation} />
      </div>
    </div>
  );
};

TreeView1.propTypes = {
  enterpriseId: PropTypes.string.isRequired,
  childrenJson: PropTypes.array.isRequired,
};

export default TreeView1;
