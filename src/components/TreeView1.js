import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Tree from 'react-d3-tree';
import { ButtonToolbar, Button } from 'react-bootstrap';
import Toggle from 'react-toggle';
import { getSpecificUnitType } from '../actions/ApiActions';

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
    // 'nodeBase' class and if we find the entryNodeId of the entry node in
    // the innerHTML, we apply a fill colour.

    let classToSearch = "";
    if (this.props.unitType === 'ENT' || this.props.unitType === 'LEU') {
      classToSearch = 'nodeBase';
    } else {
      classToSearch = 'leafNodeBase';
    }

    const o = document.getElementsByClassName(classToSearch);

    console.log('o is: ', o)
    for (let m in o) {
      const id = o[m].id;
      console.log('id is: ', id)
      console.log('index of: ', o[m].innerHTML.indexOf(this.props.entryNodeId))
      if (o[m].innerHTML.indexOf(this.props.entryNodeId) !== -1) {
        document.getElementById(id).style.fill = 'red';
      }
    }
  }

  handleClick(e) {
    // If collapse is off, a click on a node will take the user to that record
    if (!this.state.collapse) {
      // TODO:
      // Potentially here, if the component calling the tree is an ENT panel,
      // don't search on click, just toggle the tree view?

      // Go to record
      this.props.dispatch(getSpecificUnitType(e.type, e.newId, true));
    }
  }

  handleToggle() {
    this.setState({ collapse: !this.state.collapse });
  }

  render() {
    const translation = { x: 350, y: 100 };
    console.log('entryNodeId: ', this.props.entryNodeId)
    const data = JSON.parse(JSON.stringify(this.props.results[0]));
    findAndReplace(data, 'type', 'name');
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
  childrenJson: PropTypes.array.isRequired,
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
