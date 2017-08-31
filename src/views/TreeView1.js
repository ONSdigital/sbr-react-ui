import React from 'react';
import { connect } from 'react-redux';
import Tree from 'react-d3-tree';
import BreadCrumb from '../components/BreadCrumb';

const TreeView1 = () => {
  const items = [
    { name: 'Tree View', link: '' },
  ];

  const myTreeData = [
  {
    name: 'ENTERPRISE',
      children: [
      {
        name: 'LEU',
        children: [
          {name: 'VAT'},
          {name: 'PAYE'},
          {name: 'CH'},
        ],
      },
      { name: 'LEU' },
    ],
    },
  ];

  const translation = {x: 200,y: 100};

  return (
    <div>
      <BreadCrumb
        title="Tree View 1"
        description=""
        marginBottom={1}
        breadCrumbItems={items}
      />
      {/*}<div style={{border:'solid'}} id="tree-containerold"></div>*/}
      <div id="treeWrapper" style={{border:'solid',width: '100%', height: '500px'}}>
        <Tree data={myTreeData} orientation={"vertical"} translate={translation} />
      </div>
    </div>
  );
};

export default TreeView1;
