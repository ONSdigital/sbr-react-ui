import React from 'react';
import PropTypes from 'prop-types';
import { Panel, Form, Label, Tab, Grid, Row, Col, Nav, NavItem, Glyphicon } from 'react-bootstrap';
import { browserHistory } from 'react-router';
import { getChildValues } from '../utils/helperMethods';
import ChildrenTable from '../components/ChildrenTable';
import FormStaticValue from '../components/FormStaticValue';
import FormStaticAddress from '../components/FormStaticAddress';
import PanelTitle from '../components/PanelTitle';
import TreeView1 from '../components/TreeView1';
import TreeView2 from '../components/TreeView2';
import colours from '../config/colours';

const LegalUnitPanel = function ({ legalUnit, showTreeView, toggleTreeView, goToView }) {
  function panelContent() {
    const formTitle = (name, count, accessor) => (<p style={{ margin: '0px', padding: '0px' }}><Label bsStyle="primary" style={{ backgroundColor: colours[accessor], margin: '0px'}}>{count}</Label>&nbsp;{name}</p>);    
    // const formTitle = (name, count, accessor) => (<p>{name} <Label bsStyle="primary" style={{ backgroundColor: colours[accessor] }}>{count}</Label></p>);    
    const chData = getChildValues(legalUnit.children, 'CH');
    const vatData = getChildValues(legalUnit.children, 'VAT');
    const payeData = getChildValues(legalUnit.children, 'PAYE');
    let dataView = (
      <Grid>
        <Row className="show-grid">
          <Form horizontal>
            <Col sm={3}>
              <FormStaticAddress id="formAddress" label="Address" postcode={legalUnit.vars.postCode} />
              <FormStaticValue id="formLegalStatus" label="Legal Status" value={legalUnit.vars.legalStatus} />
              <FormStaticValue id="formTradingStatus" label="Trading Status" value={legalUnit.vars.tradingStatus} />
              <FormStaticValue id="formIndustryCode" label="Industry Code" value={legalUnit.vars.industryCode} />
              <FormStaticValue id="formEmployees" label="Employees" value={legalUnit.vars.employmentBands} />
              <FormStaticValue id="formTurnover" label="Turnover" value={legalUnit.vars.turnover} />
            </Col>
          </Form>
          <Col sm={5} xsOffset={1}>
            {/* <Tabs defaultActiveKey="1" animation={false} id="children-tabs" bsStyle="tabs">
              <Tab disabled={chData.length === 0} eventKey="1" title={formTitle('CRN', chData.length, 'CRN')}>
                <ChildrenTable unitData={chData} name={'Company Reference No.'} accessor={'CH'} />
              </Tab>
              <Tab disabled={payeData.length === 0} eventKey="2" title={formTitle('PAYE', payeData.length, 'PAYE')}>
                <ChildrenTable unitData={payeData} name={'PAYE Reference'} accessor={'PAYE'} />
              </Tab>
              <Tab disabled={vatData.length === 0} eventKey="3" title={formTitle('VAT', vatData.length, 'VAT')}>
                <ChildrenTable unitData={vatData} name={'VAT Reference'} accessor={'VAT'} />
              </Tab>
            </Tabs> */}
            <Tab.Container id="left-tabs-example" defaultActiveKey={1}>
              <Row className="clearfix">
                <Col sm={4}>
                  <Nav bsStyle="pills" stacked style={{ margin: '0px', padding: '0px' }}>
                    <NavItem style={{ margin: '0px', padding: '0px' }} disabled={chData.length === 0} eventKey={1}>
                      {formTitle('CRN', chData.length, 'CRN')}
                    </NavItem>
                    <NavItem style={{ margin: '0px', padding: '0px' }} disabled={payeData.length === 0} eventKey={2}>
                      {formTitle('PAYE', payeData.length, 'PAYE')}
                    </NavItem>
                    <NavItem style={{ margin: '0px', padding: '0px' }} disabled={vatData.length === 0} eventKey={3}>
                      {formTitle('VAT', vatData.length, 'VAT')}
                    </NavItem>
                  </Nav>
                </Col>
                <Col sm={8}>
                  <Tab.Content animation style={{ margin: '0px', padding: '0px' }}>
                    <Tab.Pane eventKey={1}>
                      <ChildrenTable unitData={chData} name={'Company Reference No.'} accessor={'CH'} />
                    </Tab.Pane>
                    <Tab.Pane eventKey={2}>
                      <ChildrenTable unitData={payeData} name={'PAYE Reference'} accessor={'PAYE'} />
                    </Tab.Pane>
                    <Tab.Pane eventKey={3}>
                      <ChildrenTable unitData={vatData} name={'VAT Reference'} accessor={'VAT'} />
                    </Tab.Pane>
                  </Tab.Content>
                </Col>
              </Row>
            </Tab.Container>
          </Col>
        </Row>
      </Grid>
    );
    if (showTreeView === 1) {
      dataView = (
        <TreeView1
          entryNodeId={legalUnit.id}
          unitType={'LEU'}
          enterpriseId={legalUnit.parents.ENT}
          childrenJson={{}}
        />
      );
    } else if (showTreeView === 2) {
      dataView = (
        <TreeView2
          entryNodeId={legalUnit.id}
          unitType={'LEU'}
          enterpriseId={legalUnit.parents.ENT}
          childrenJson={{}}
        />
      );
    }
    return dataView;
  }
  const title = (
    <PanelTitle
      toggle={() => toggleTreeView()}
      goToDataView={() => goToView(0)}
      goToTreeView1={() => goToView(1)}
      goToTreeView2={() => goToView(2)}
      goToEditView={() => goToView(3)}
      name={legalUnit.vars.businessName}
      id={legalUnit.vars.id}
      unitType="LEU"
    />
  );
  const footer = (<p style={{ margin: '0px', padding: '0px' }}>Last updated by: <Glyphicon glyph="user" />&nbsp; placeholder</p>);
  return (
    <div id="bootstrap-container" style={{ height: '100%' }}>
      <div className="bootstrap-iso" style={{ height: '95%' }}>
        <Panel id="panelContainer" className="bg-inverse" style={{ height: '100%', marginBottom: '0px' }} collapsible={false} defaultExpanded header={title}>
          {panelContent()}
        </Panel>
      </div>
      <button style={{ marginTop: '20px' }} className="btn btn--primary margin-bottom-md--2" aria-label="Link back to Search page" onClick={() => browserHistory.push('/RefSearch')}>
        Return to search
      </button>
    </div>
  );
};

LegalUnitPanel.propTypes = {
  legalUnit: PropTypes.object.isRequired,
  showTreeView: PropTypes.number.isRequired,
  toggleTreeView: PropTypes.func.isRequired,
  goToView: PropTypes.func.isRequired,
};

export default LegalUnitPanel;
