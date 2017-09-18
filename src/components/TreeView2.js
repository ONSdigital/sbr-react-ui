import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import BreadCrumb from '../components/BreadCrumb';
import { Button } from 'react-bootstrap';

// http://bl.ocks.org/robschmuecker/7880033

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

    findAndReplace(this.props.childrenJson, 'type', 'name');

    const json = {
      name: `ENT - ${this.props.enterpriseId}`,
      newId: this.props.enterpriseId,
      id: this.props.enterpriseId,
      type: 'ENT',
      children: this.props.childrenJson,
    };

    // Draw uses the draw method in resources/dndTree.js
    // This is imported in the index.html
    draw(json, this.props.entryNodeId, "red");
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
  entryNodeId: PropTypes.string.isRequired,
  childrenJson: PropTypes.array.isRequired,
};

export default TreeView2;
