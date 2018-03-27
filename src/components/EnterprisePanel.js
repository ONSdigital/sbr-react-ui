import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'registers-react-library';
import { Panel, Glyphicon } from 'react-bootstrap';
import { browserHistory } from 'react-router';
import { getValueByKey, getChildValues } from '../utils/helperMethods';
import { formEnterpriseJson } from '../utils/formJson';
import EnterpriseDataGrid from '../components/EnterpriseDataGrid';
import PanelTitle from '../components/PanelTitle';
import TreeView1 from '../components/TreeView1';
// import EditData from '../components/EditData';

class EnterprisePanel extends React.Component {
  panelContent() {
    const enterprise = this.props.enterprise;
    let dataView = (
      <EnterpriseDataGrid
        json={formEnterpriseJson(enterprise)}
        leuData={getChildValues(enterprise.children, 'LEU')}
        chData={getChildValues(enterprise.children, 'CH')}
        payeData={getChildValues(enterprise.children, 'PAYE')}
        vatData={getChildValues(enterprise.children, 'VAT')}
        louData={getChildValues(enterprise.children, 'LOU')}
      />
    );
    if (this.props.showTreeView === 1) {
      dataView = (
        <TreeView1
          unitType="ENT"
          entryNodeId={this.props.enterprise.id}
          enterpriseId={this.props.enterprise.id}
          childrenJson={JSON.parse(JSON.stringify(this.props.enterprise.childrenJson))}
        />
      );
    }
    return dataView;
  }
  render() {
    const title = (
      <PanelTitle
        toggle={() => this.props.toggleTreeView('ENT', this.props.enterprise.id)}
        goToDataView={() => this.props.goToView(0)}
        goToTreeView1={() => this.props.goToView(1)}
        goToTreeView2={() => this.props.goToView(2)}
        goToEditView={() => this.props.goToView(3)}
        name={getValueByKey(this.props.enterprise.vars, 'name')}
        id={getValueByKey(this.props.enterprise.vars, 'ern')}
        accessor="enterprise"
        unitType="ENT"
      />
    );
    const footer = (<p style={{ margin: '0px', padding: '0px' }}>Last updated by: <Glyphicon glyph="user" />&nbsp; {this.props.enterprise.vars.updatedBy}</p>);
    return (
      <div>
        <div className="bootstrap-iso">
          <Panel id="panelContainer" className="bg-inverse" style={{ marginBottom: '0px' }} collapsible={false} defaultExpanded header={title} footer={footer}>
            {this.panelContent()}
          </Panel>
        </div>
        <div className="margin-bottom-md--2" style={{ marginTop: '20px' }}>
          <Button id="returnToSearchButton" size="wide" text="Return to search" onClick={() => browserHistory.push('/RefSearch')} ariaLabel="Return to search Button" type="submit" />
        </div>
      </div>
    );
  }
}

EnterprisePanel.propTypes = {
  enterprise: PropTypes.object.isRequired,
  // We do not wrap the props below in .isRequired as they are passed in to
  // EnterprisePanel by PanelContainer.
  toggleTreeView: PropTypes.func,
  showTreeView: PropTypes.number,
  goToView: PropTypes.func,
};

export default EnterprisePanel;
