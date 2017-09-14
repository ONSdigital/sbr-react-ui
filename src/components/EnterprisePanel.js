import React from 'react';
import PropTypes from 'prop-types';
import { Panel, Form, Glyphicon, Tabs, Tab, Grid, Row, Col, ButtonToolbar, Button } from 'react-bootstrap';
import { browserHistory } from 'react-router';
import { getValueByKey, getChildValues } from '../utils/helperMethods';
import ChildrenTable from '../components/ChildrenTable';
import FormStaticValue from '../components/FormStaticValue';
import FormStaticAddress from '../components/FormStaticAddress';
import PanelTitle from '../components/PanelTitle';
import TreeView1 from '../components/TreeView1';
import TreeView2 from '../components/TreeView2';

class EnterprisePanel extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showTreeView: 0,
    };
    this.toggleTreeView = this.toggleTreeView.bind(this);
  }
  toggleTreeView() {
    console.log("toggle")
    if (this.state.showTreeView === 2) {
      this.setState({ showTreeView: 0 });
    } else {
      const showTreeView = this.state.showTreeView + 1;
      this.setState({ showTreeView });
    }
  }
  getPanelContent() {
    const enterprise = this.props.enterprise;
    const leuData = getChildValues(enterprise.children, 'LEU');
    const chData = getChildValues(enterprise.children, 'CH');
    const vatData = getChildValues(enterprise.children, 'VAT');
    const payeData = getChildValues(enterprise.children, 'PAYE');
    const json = {
      legalstatus: getValueByKey(enterprise.vars, 'legalstatus'),
      standard_vat_turnover: getValueByKey(enterprise.vars, 'standard_vat_turnover'),
      ent_address3: getValueByKey(enterprise.vars, 'ent_address3'),
      PAYE_jobs: getValueByKey(enterprise.vars, 'PAYE_jobs'),
      employees: getValueByKey(enterprise.vars, 'employees'),
      ent_address2: getValueByKey(enterprise.vars, 'ent_address2'),
      ent_postcode: getValueByKey(enterprise.vars, 'ent_postcode'),
      entref: getValueByKey(enterprise.vars, 'entref'),
      ent_address5: getValueByKey(enterprise.vars, 'ent_address5'),
      Num_Unique_VatRefs: getValueByKey(enterprise.vars, 'Num_Unique_VatRefs'),
      ent_address1: getValueByKey(enterprise.vars, 'ent_address1'),
      ent_name: getValueByKey(enterprise.vars, 'ent_name'),
      Num_Unique_PayeRefs: getValueByKey(enterprise.vars, 'Num_Unique_PayeRefs'),
      ent_address4: getValueByKey(enterprise.vars, 'ent_address4'),
    };
    return (<Grid>
      <Row className="show-grid">
        <Form horizontal>
          <Col sm={3}>
            <FormStaticAddress id="formAddress" label="Address" address1={json.ent_address1} address2={json.ent_address2} address3={json.ent_address3} address4={json.ent_address4} address5={json.ent_address5} postcode={json.ent_postcode} />
            <FormStaticValue id="formLegalStatus" label="Legal Status" value={getLegalStatusDescription(json.legalstatus)}/>
            <FormStaticValue id="formEmployees" label="Employees" value={json.employees} />
            <FormStaticValue id="formJobs" label="PAYE Jobs" value={json.PAYE_jobs} />
            <FormStaticValue id="formStandardVATTurnover" label="Standard VAT turnover" value={json.standard_vat_turnover} />
          </Col>
        </Form>
        <Col sm={4} xsOffset={2}>
          <Tabs defaultActiveKey="1" animation={false} id="children-tabs" bsStyle="pills">
            <Tab eventKey="1" title="UBRN">
              <ChildrenTable unitData={leuData} name={'Universal Business Register No.'} accessor={'LEU'} />
            </Tab>
            <Tab eventKey="2" title="CRN">
              <ChildrenTable unitData={chData} name={'Company Reference No.'} accessor={'CH'} />
            </Tab>
            <Tab eventKey="3" title="PAYE">
              <ChildrenTable unitData={payeData} name={'PAYE Reference'} accessor={'PAYE'} />
            </Tab>
            <Tab eventKey="4" title="VAT">
              <ChildrenTable unitData={vatData} name={'VAT Reference'} accessor={'VAT'} />
            </Tab>
          </Tabs>
        </Col>
      </Row>
    </Grid>);
  }
  panelContent() {
    if (this.state.showTreeView === 0) {
      console.log(0)
      return this.getPanelContent();
    } else if (this.state.showTreeView === 1) {
      console.log(1)
      return <TreeView1 enterpriseId={this.props.enterprise.id} childrenJson={this.props.enterprise.childrenJson} />;
    } else if (this.state.showTreeView === 2) {
      console.log(2)
      return <TreeView2 />;
    }
  }
  render() {
    const enterprise = this.props.enterprise;
    const leuData = getChildValues(enterprise.children, 'LEU');
    const chData = getChildValues(enterprise.children, 'CH');
    const vatData = getChildValues(enterprise.children, 'VAT');
    const payeData = getChildValues(enterprise.children, 'PAYE');
    const json = {
      legalstatus: getValueByKey(enterprise.vars, 'legalstatus'),
      standard_vat_turnover: getValueByKey(enterprise.vars, 'standard_vat_turnover'),
      ent_address3: getValueByKey(enterprise.vars, 'ent_address3'),
      PAYE_jobs: getValueByKey(enterprise.vars, 'PAYE_jobs'),
      employees: getValueByKey(enterprise.vars, 'employees'),
      ent_address2: getValueByKey(enterprise.vars, 'ent_address2'),
      ent_postcode: getValueByKey(enterprise.vars, 'ent_postcode'),
      entref: getValueByKey(enterprise.vars, 'entref'),
      ent_address5: getValueByKey(enterprise.vars, 'ent_address5'),
      Num_Unique_VatRefs: getValueByKey(enterprise.vars, 'Num_Unique_VatRefs'),
      ent_address1: getValueByKey(enterprise.vars, 'ent_address1'),
      ent_name: getValueByKey(enterprise.vars, 'ent_name'),
      Num_Unique_PayeRefs: getValueByKey(enterprise.vars, 'Num_Unique_PayeRefs'),
      ent_address4: getValueByKey(enterprise.vars, 'ent_address4'),
    };
    const title = (<PanelTitle toggle={() => this.toggleTreeView()} name={json.ent_name} id={json.entref} />);
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

function getLegalStatusDescription(status) {
  switch (status) {
    case '1':
      return 'Company';
    case '2':
      return 'Sole Proprietor';
    case '3':
      return 'Partnership';
    case '4':
      return 'Public Corporation';
    case '5':
      return 'Central Government';
    case '6':
      return 'Local Authority';
    case '7':
      return 'Non-Profit Body';
    default:
      return 'Not Allocated';
  }
}

EnterprisePanel.propTypes = {
  enterprise: PropTypes.object.isRequired,
};

export default EnterprisePanel;
