import React from 'react';
import PropTypes from 'prop-types';
import { Panel, Glyphicon } from 'react-bootstrap';
import { browserHistory } from 'react-router';
import { getValueByKey, getChildValues } from '../utils/helperMethods';
import { formEnterpriseJson } from '../utils/formJson';
import EnterpriseDataGrid from '../components/EnterpriseDataGrid';
import PanelTitle from '../components/PanelTitle';
import TreeView1 from '../components/TreeView1';
import TreeView2 from '../components/TreeView2';
import EditData from '../components/EditData';

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
    } else if (this.props.showTreeView === 2) {
      dataView = (
        <TreeView2
          unitType="ENT"
          entryNodeId={this.props.enterprise.id}
          enterpriseId={this.props.enterprise.id}
          childrenJson={JSON.parse(JSON.stringify(this.props.enterprise.childrenJson))}
        />
      );
    } else if (this.props.showTreeView === 3) {
      dataView = (
        <EditData
          unitType="ENT"
          data={this.props.enterprise}
          editableFields={[
            { id: "editEnterpriseName", type:"text", label:"Enterprise Name", accessor:"ent_name" },
            { id: "editEnterpriseAddress1", type:"text", label:"Address Line 1", accessor:"ent_address1" },
            { id: "editEnterpriseAddress2", type:"text", label:"Address Line 2", accessor:"ent_address2" },
            { id: "editEnterpriseAddress3", type:"text", label:"Address Line 3", accessor:"ent_address3" },
            { id: "editEnterpriseAddress4", type:"text", label:"Address Line 4", accessor:"ent_address4" },
            { id: "editEnterpriseAddress5", type:"text", label:"Address Line 5", accessor:"ent_address5" },
            { id: "editEnterprisePostCode", type:"text", label:"Post Code", accessor:"ent_postcode" },
          ]}
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
        name={getValueByKey(this.props.enterprise.vars, 'ent_name')}
        id={getValueByKey(this.props.enterprise.vars, 'entref')}
        unitType="ENT"
      />
    );
    const footer = (<p style={{ margin: '0px', padding: '0px' }}>Last updated by: <Glyphicon glyph="user" />&nbsp; {this.props.enterprise.vars.updatedBy}</p>);
    return (
      <div>
        <div className="bootstrap-iso">
          <Panel footer={footer} className="bg-inverse" collapsible={false} defaultExpanded header={title}>
            {this.panelContent()}
          </Panel>
        </div>
        <button className="btn btn--primary margin-bottom-md--2" aria-label="Link back to Search page" onClick={() => browserHistory.push('/RefSearch')}>
          Return to search
        </button>
      </div>
    );
  }
}

EnterprisePanel.propTypes = {
  enterprise: PropTypes.object.isRequired,
  toggleTreeView: PropTypes.func.isRequired,
  showTreeView: PropTypes.number.isRequired,
  goToView: PropTypes.func.isRequired,
};

export default EnterprisePanel;
