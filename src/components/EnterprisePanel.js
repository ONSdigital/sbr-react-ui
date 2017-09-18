import React from 'react';
import PropTypes from 'prop-types';
import { Panel } from 'react-bootstrap';
import { browserHistory } from 'react-router';
import { getValueByKey, getChildValues } from '../utils/helperMethods';
import { formEnterpriseJson } from '../utils/formJson';
import EnterpriseDataGrid from '../components/EnterpriseDataGrid';
import PanelTitle from '../components/PanelTitle';
import TreeView1 from '../components/TreeView1';
import TreeView2 from '../components/TreeView2';

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
          unitType={'ENT'}
          enterpriseId={this.props.enterprise.id}
          childrenJson={JSON.parse(JSON.stringify(this.props.enterprise.childrenJson))}
        />
      );
    } else if (this.props.showTreeView === 2) {
      dataView = (
        <TreeView2
          unitType={'ENT'}
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
        toggle={() => this.props.toggleTreeView()}
        name={getValueByKey(this.props.enterprise.vars, 'ent_name')}
        id={getValueByKey(this.props.enterprise.vars, 'entref')}
      />
    );
    return (
      <div>
        <div className="bootstrap-iso">
          <Panel className="bg-inverse" collapsible={false} defaultExpanded header={title}>
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
};

export default EnterprisePanel;
