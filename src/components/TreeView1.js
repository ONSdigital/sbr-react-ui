import React from 'react';
import PropTypes from 'prop-types';
import { browserHistory } from 'react-router';
import { connect } from 'react-redux';
import Tree from 'react-d3-tree';
import Toggle from 'react-toggle';
import { getSpecificUnitType } from '../actions/ApiActions';
import { findAndReplace } from '../utils/helperMethods';

class TreeView1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse: false,
    };
    this.handleToggle = this.handleToggle.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    // Once the component has mounted, we search through all elements with the
    // 'nodeBase' & 'nodeBaseLead' classes and if we find the entryNodeId of the 
    // entry node in the innerHTML, we apply a fill colour.
    let classToSearch = '';
    if (this.props.unitType === 'ENT' || this.props.unitType === 'LEU') {
      classToSearch = 'nodeBase';
    } else {
      classToSearch = 'leafNodeBase';
    }

    const o = document.getElementsByClassName(classToSearch);

    for (let m in o) {
      const id = o[m].id;
      if (o[m].innerHTML.indexOf(this.props.entryNodeId) !== -1) {
        document.getElementById(id).style.fill = 'red';
      }
    }
  }

  handleClick(e) {
    // If collapse is off, a click on a node will take the user to that record
    if (!this.state.collapse) {
      // If the user has clicked on the Enterprise, they can be sent straight
      // to the URL as we already have the data, otherwise do an API search.
      if (e.type === 'ENT') {
        browserHistory.push(`/Enterprises/${e.newId}`);
      } else {
        this.props.dispatch(getSpecificUnitType(e.type, e.newId, true));
      }
    }
  }

  handleToggle() {
    this.setState({ collapse: !this.state.collapse });
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
      <div>
        <div style={{ borderBottom: '2px solid', paddingBottom: '5px' }}>
          <span className="label-text" style={{ fontSize: '20px', verticalAlign: 'top' }}>
            Toggle Collapsible &nbsp;&nbsp;
          </span>
          <Toggle
            collapsible={this.state.collapse}
            defaultChecked={false}
            onChange={this.handleToggle}
          />
          <span
            className="label-text"
            style={{ fontSize: '16px', verticalAlign: 'top' }}
          >
            &nbsp;&nbsp;You can only go to a record when the collapsible toggle is off.
          </span>
        </div>
        <div id="treeWrapper" style={{ width: '100%', height: '500px' }}>
          <Tree
            data={json}
            collapsible={this.state.collapse}
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
