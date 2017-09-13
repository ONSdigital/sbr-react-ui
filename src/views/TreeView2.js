import React from 'react';
import { connect } from 'react-redux';
import BreadCrumb from '../components/BreadCrumb';
import { Button } from 'react-bootstrap';

// http://bl.ocks.org/robschmuecker/7880033

class TreeView2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      draw: false,
    };
    this.drawGraph = this.drawGraph.bind(this);
  }
  drawGraph() {
    var data = {
        "name": "flare",
        "children": [{
                "name": "cluster",
                "children": [{
                    "name": "AgglomerativeCluster",
                    "size": 3938
                }, {
                    "name": "CommunityStructure",
                    "size": 3812
                }, {
                    "name": "HierarchicalCluster",
                    "size": 6714
                }, {
                    "name": "MergeEdge",
                    "size": 743
                }]
          }]
    };
    // Draw uses the draw method in resources/dndTree.js
    // This is imported in the index.html
    draw(data);
  }
  componentDidMount() {
    this.drawGraph();
  }
  render() {
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
        <div style={{ border: 'solid' }} id="tree-container"></div>
      </div>
    );
  }
}

export default TreeView2;
