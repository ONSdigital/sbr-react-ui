import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { findAndReplace } from '../utils/helperMethods';
import colours from '../config/colours';

class TreeView2 extends React.Component {
  constructor(props) {
    super(props);
    this.drawGraph = this.drawGraph.bind(this);
  }
  componentDidMount() {
    this.drawGraph();
  }
  drawGraph() {
    // Take a copy of the results
    const data = JSON.parse(JSON.stringify(this.props.results[0]));
    // The d3 code needs a 'name' key in each node, so add it in
    findAndReplace(data, 'type', 'name');
    // We need to add in the top level Enterprise structure, as
    // childrenJson from the API only has LEU and below.
    const json = {
      name: `ENT - ${this.props.enterpriseId}`,
      newId: this.props.enterpriseId,
      id: this.props.enterpriseId,
      type: 'ENT',
      children: data.childrenJson,
    };

    // Draw uses the draw method in resources/dndTree.js
    // This is imported in the index.html
    draw(json, this.props.entryNodeId, colours.ENTRY_NODE, 300, colours);
  }
  render() {
    return (
      <div id="tree-container">
        {/* The SVG created by d3 will go here */}
      </div>
    );
  }
}

TreeView2.propTypes = {
  enterpriseId: PropTypes.string.isRequired,
  entryNodeId: PropTypes.string.isRequired,
  results: PropTypes.array.isRequired,
};

function select(state) {
  return {
    results: state.apiSearch.enterprise.results,
  };
}

export default connect(select)(TreeView2);
