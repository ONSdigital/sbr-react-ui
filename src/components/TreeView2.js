import React from 'react';
import PropTypes from 'prop-types';
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

    const json = {
      name: `ENT - ${this.props.enterpriseId}`,
      newId: this.props.enterpriseId,
      type: 'ENT',
      children: this.props.childrenJson,
    };

    // Draw uses the draw method in resources/dndTree.js
    // This is imported in the index.html
    draw(json);
  }
  componentDidMount() {
    this.drawGraph();
  }
  render() {
    return (
      <div id="tree-container"> {/* className="rotate"> */}
        {/* The SVG created by d3 will go here */}
      </div>
    );
  }
}

TreeView2.propTypes = {
  enterpriseId: PropTypes.string.isRequired,
  childrenJson: PropTypes.array.isRequired,
  unitType: PropTypes.string.isRequired,
};

export default TreeView2;
