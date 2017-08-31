import React from 'react';
import { connect } from 'react-redux';
import BreadCrumb from '../components/BreadCrumb';

// http://bl.ocks.org/robschmuecker/7880033

const TreeView2 = () => {
  const items = [
    { name: 'Tree View 2', link: '' },
  ];

  return (
    <div>
      <BreadCrumb
        title="Tree View 2"
        description="Refresh the page to see the tree"
        marginBottom={1}
        breadCrumbItems={items}
      />
      <div style={{border:'solid'}} id="tree-container"></div>
    </div>
  );
};

export default TreeView2;
