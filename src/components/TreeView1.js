import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import { Button, ButtonToolbar, ButtonGroup, Glyphicon } from 'react-bootstrap';
import { connect } from 'react-redux';
import { saveSvgAsPng } from 'save-svg-as-png';
import Tree from 'react-d3-tree';
import Toggle from 'react-toggle';
import { getSpecificUnitType } from '../actions/ApiActions';
import { findAndReplace, colourNode } from '../utils/helperMethods';
import colours from '../config/colours';

class TreeView1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse: false,
      ctrlKeyPress: false,
    };
    this.handleToggle = this.handleToggle.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.downloadImage = this.downloadImage.bind(this);
  }

  componentWillMount() {
    document.addEventListener('keydown', this.handleKeyDown.bind(this));
    document.addEventListener('keyup', this.handleKeyUp.bind(this));
  }

  componentDidMount() {
    // Once the component has mounted, we search through all elements with the
    // 'nodeBase' & 'nodeBaseLead' classes and if we find the entryNodeId of the 
    // entry node in the innerHTML, we apply a fill colour.
    this.colourNodes();
  }

  colourNodes() {
    const nodeBase = document.getElementsByClassName('nodeBase');
    const leafNodeBase = document.getElementsByClassName('leafNodeBase');

    for (let m = 0; m < nodeBase.length; m += 1) {
      const id = nodeBase[m].id;
      colourNode(nodeBase, id, m, 'ENT', colours.ENT, false);
      colourNode(nodeBase, id, m, 'LEU', colours.LEU, false);
      if (this.props.unitType === 'ENT' || this.props.unitType === 'LEU') {
        colourNode(nodeBase, id, m, this.props.entryNodeId, colours[this.props.unitType], true);
      }
    }

    for (let i = 0; i < leafNodeBase.length; i += 1) {
      const id = leafNodeBase[i].id;
      colourNode(leafNodeBase, id, i, 'VAT', colours.VAT, false);
      colourNode(leafNodeBase, id, i, 'PAYE', colours.PAYE, false);
      colourNode(leafNodeBase, id, i, 'CH', colours.CRN, false);
      if (this.props.unitType !== 'ENT' || this.props.unitType !== 'LEU') {
        colourNode(leafNodeBase, id, i, this.props.entryNodeId, colours[this.props.unitType], true);
      }
    }
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyDown.bind(this));
    document.removeEventListener('keyup', this.handleKeyUp.bind(this));
  }

  handleKeyDown(e) {
    if (e.code === 'ControlLeft' || e.code === 'ControlRight' || e.code === 'AltLeft') {
      this.setState({ ctrlKeyPress: true });
    }
  }

  handleKeyUp(e) {
    if (e.code === 'ControlLeft' || e.code === 'ControlRight' || e.code === 'AltLeft') {
      this.setState({ ctrlKeyPress: false });
    }
  }

  handleClick(e) {
    // If collapse is off, a click on a node will take the user to that record
    if (this.state.ctrlKeyPress) {
      // If the user has clicked on the Enterprise, they can be sent straight
      // to the URL as we already have the data, otherwise do an API search.
      if (e.type === 'ENT') {
        browserHistory.push(`/Enterprises/${e.newId}`);
      } else {
        this.props.dispatch(getSpecificUnitType(e.type, e.newId, true));
      }
    }
    // We need to colour the nodes here too as on click messes with 
    // the classes/styles
    this.colourNodes();
  }

  handleToggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  downloadImage() {
    // console.log(document.fullscreenEnabled);
    // const a = document.getElementById("treeWrapper");
    const a = document.getElementById("panelContainer");
    const b = document.getElementsByClassName("panel-body");
    const c = document.getElementById("treeWrapper");
    console.log(b)
    b[0].style.height = '95%';
    c.style.height = '95%';
    // a.style.width = '100%';
    // a.style.height = '100%';
    //a.requestFullscreen();
    //const fullScreen = document.fullscreenEnabled || document.mozFullscreenEnabled || document.webkitIsFullScreen ? true : false;
    //console.log(fullScreen)
    var docelem = a;
    var conf = confirm("Fullscreen mode?");    
    if (conf == true) {
      if (docelem.requestFullscreen) {
          docelem.requestFullscreen();
      }
      else if (docelem.mozRequestFullScreen) {
          docelem.mozRequestFullScreen();
      }
      else if (docelem.webkitRequestFullscreen) {
          docelem.webkitRequestFullscreen();
      }
      else if (docelem.msRequestFullscreen) {
          docelem.msRequestFullscreen();
      }
  }
    
    //a.requestFullscreen();
    // saveSvgAsPng(document.getElementsByClassName('rd3t-svg')[0], `ENT-${this.props.enterpriseId}.png`, {
    //   backgroundColor: 'white',
    //   encoderOptions: 1,
    //   width: 1000,
    //   scale: 8,
    // });
  }

  render() {
    // TODO:
    // Ensure translation below is dynamic, based upon number of child nodes,
    // or find some way of calculating the width.
    const translation = { x: 350, y: 100 };
    const data = JSON.parse(JSON.stringify(this.props.results[0]));
    // We need the JSON to be in the correct format for react-d3-tree, so
    // replace 'type' with 'name'
    findAndReplace(data, 'type', 'name');
    // The childrenJson from the API does not have a parent ENT, so we add
    // it in manually
    const json = [{
      name: `ENT - ${this.props.enterpriseId}`,
      newId: this.props.enterpriseId,
      type: 'ENT',
      children: data.childrenJson,
    }];
    return (
      <div id="treeView1" style={{ height: '100%' }}>
        <div style={{ borderBottom: '2px solid', paddingBottom: '5px' }}>
          <ButtonToolbar>
            <ButtonGroup>
              <Glyphicon glyph="info-sign" />&nbsp;Click on a node circle to collapse/expand a node, or use Ctrl + Click to go to the data view for that node.
            </ButtonGroup>
            <ButtonGroup style={{ float: 'right' }}>
              <Button onClick={this.downloadImage} bsSize="small" bsStyle="info"><Glyphicon glyph="download-alt" />&nbsp;&nbsp;Download Tree PNG</Button>
            </ButtonGroup>
          </ButtonToolbar>
        </div>
        <div id="treeWrapper" style={{ width: '100%' }}>
          <Tree
            separation={{ siblings: 1.25, nonSiblings: 2 }}
            data={json}
            collapsible={!this.state.ctrlKeyPress}
            orientation={'vertical'}
            onClick={e => this.handleClick(e)}
            translate={translation}
          />
        </div>
      </div>
    );
  }
}

TreeView1.propTypes = {
  enterpriseId: PropTypes.string.isRequired,
  entryNodeId: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
  results: PropTypes.array.isRequired,
  unitType: PropTypes.string.isRequired,
};

function select(state) {
  return {
    results: state.apiSearch.enterprise.results,
  };
}

export default connect(select)(TreeView1);
