import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Button, ButtonToolbar, ButtonGroup, Glyphicon } from 'react-bootstrap';
import { saveSvgAsPng } from 'save-svg-as-png';
import { findAndReplace } from '../utils/helperMethods';
import colours from '../config/colours';

class TreeView2 extends React.Component {
  constructor(props) {
    super(props);
    this.drawGraph = this.drawGraph.bind(this);
    this.downloadImage = this.downloadImage.bind(this);
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
  fullScreen() {
    const a = document.getElementById('tree-container');
    const conf = confirm('Fullscreen mode?');
    if (conf === true) {
      if (a.requestFullscreen) {
        a.requestFullscreen();
      } else if (a.mozRequestFullScreen) {
        a.mozRequestFullScreen();
      } else if (a.webkitRequestFullscreen) {
        a.webkitRequestFullscreen();
      } else if (a.msRequestFullscreen) {
        a.msRequestFullscreen();
      }
    }
    document.getElementsByClassName('overlay')[0].style.height = '100%';
  }
  downloadImage() {
    saveSvgAsPng(document.getElementsByClassName('overlay')[0], `ENT-${this.props.enterpriseId}.png`);
  }
  render() {
    return (
      <div>
        <div style={{ borderBottom: '2px solid', paddingBottom: '5px' }}>
          <ButtonToolbar>
            <ButtonGroup style={{ height: '30px' }}>
              <Button onClick={this.fullScreen} style={{ height: '100%' }} bsSize="small" bsStyle="info"><Glyphicon glyph="download-alt" />&nbsp;&nbsp;Full Screen</Button>
              <Button onClick={this.downloadImage} style={{ height: '100%', marginLeft: '5px' }} bsSize="small" bsStyle="info"><Glyphicon glyph="download-alt" />&nbsp;&nbsp;Download Tree PNG</Button>
            </ButtonGroup>
          </ButtonToolbar>
          <ButtonToolbar>
            <ButtonGroup>
              <br />
              <Glyphicon glyph="info-sign" />&nbsp;Click on a node circle to collapse/expand a node.
            </ButtonGroup>
          </ButtonToolbar>
        </div>
        <div id="tree-container">
          {/* The SVG created by d3 will go here */}
        </div>
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
