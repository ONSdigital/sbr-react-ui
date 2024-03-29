import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'registers-react-library';
import { Panel, Form, Label, Tab, Grid, Row, Col, Nav, NavItem } from 'react-bootstrap';
import { browserHistory } from 'react-router';
import { getChildValues } from '../utils/helperMethods';
import { formLEUJson } from '../utils/formJson';
import ChildrenTable from '../components/ChildrenTable';
import FormStaticValue from '../components/FormStaticValue';
import FormStaticAddress from '../components/FormStaticAddress';
import PanelTitle from '../components/PanelTitle';
import TreeView1 from '../components/TreeView1';
import colours from '../config/colours';

const LegalUnitPanel = ({ legalUnit, showTreeView, toggleTreeView, goToView }) => {
  const json = formLEUJson(legalUnit);
  function panelContent() {
    const formTitle = (name, count, accessor) => (<p style={{ margin: '0px', padding: '0px' }}><Label bsStyle="primary" style={{ backgroundColor: colours[accessor], margin: '0px'}}>{count}</Label>&nbsp;{name}</p>);    
    const chData = getChildValues(legalUnit.children, 'CH');
    const vatData = getChildValues(legalUnit.children, 'VAT');
    const payeData = getChildValues(legalUnit.children, 'PAYE');
    let dataView = (
      <Grid>
        <Row className="show-grid">
          <Form horizontal>
            <Col sm={3}>
              <FormStaticAddress id="formAddress" label="Address" postcode={json.postCode} />
              <FormStaticValue id="formLegalStatus" label="Legal Status" value={json.legalStatus} />
              <FormStaticValue id="formTradingStatus" label="Trading Status" value={json.tradingStatus} />
              <FormStaticValue id="formIndustryCode" label="Industry Code" value={json.industryCode} />
              <FormStaticValue id="formEmployees" label="Employees" value={json.employmentBands} />
              <FormStaticValue id="formTurnover" label="Turnover" value={json.turnover} />
            </Col>
          </Form>
          <Col sm={5} xsOffset={1}>
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
      name={json.businessName}
      id={json.id}
      accessor="legalUnit"
      unitType="LEU"
    />
  );
  return (
    <div id="bootstrap-container" style={{ height: '100%' }}>
      <div className="bootstrap-iso" style={{ height: '95%' }}>
        <Panel id="panelContainer" className="bg-inverse" style={{ height: '100%', marginBottom: '0px' }} collapsible={false} defaultExpanded header={title}>
          {panelContent()}
        </Panel>
      </div>
      <div className="margin-bottom-md--2" style={{ marginTop: '20px' }}>
        <Button id="returnToSearchButton" size="wide" text="Return to search" onClick={() => browserHistory.push('/RefSearch')} ariaLabel="Return to search Button" type="submit" />
      </div>
    </div>
  );
};

LegalUnitPanel.propTypes = {
  legalUnit: PropTypes.object.isRequired,
  // We do not wrap the props below in .isRequired as they are passed in to
  // LegalUnitPanel by PanelContainer.
  showTreeView: PropTypes.number,
  toggleTreeView: PropTypes.func,
  goToView: PropTypes.func,
};

export default LegalUnitPanel;
