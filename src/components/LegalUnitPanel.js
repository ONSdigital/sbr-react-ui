import React from 'react';
import PropTypes from 'prop-types';
import { Panel, Form, Glyphicon, Tabs, Tab, Grid, Row, Col } from 'react-bootstrap';
import { browserHistory } from 'react-router';
import PanelToolbar from '../components/PanelToolbar';
import { getChildValues } from '../utils/helperMethods';
import ChildrenTable from '../components/ChildrenTable';
import FormStaticValue from '../components/FormStaticValue';
import FormStaticAddress from '../components/FormStaticAddress';

const LegalUnitPanel = function ({ legalUnit }) {
  const title = (<h1><Glyphicon glyph="briefcase" />&nbsp;{legalUnit.vars.businessName} <small>{legalUnit.vars.id}</small></h1>);
  const chData = getChildValues(legalUnit.children, 'CH');
  const vatData = getChildValues(legalUnit.children, 'VAT');
  const payeData = getChildValues(legalUnit.children, 'PAYE');
  return (
    <div>
      <div className="bootstrap-iso">
        <Panel className="bg-inverse" collapsible={false} defaultExpanded header={title}>
          <PanelToolbar parents={legalUnit.parents} children={legalUnit.children} pageType="LEU" />
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
              <Col sm={4} xsOffset={2}>
                <Tabs defaultActiveKey="1" animation={false} id="children-tabs" bsStyle="pills">
                  <Tab eventKey="1" title="CRN">
                    <ChildrenTable unitData={chData} name={'CRN'} accessor={'CH'} />
                  </Tab>
                  <Tab eventKey="2" title="PAYE">
                    <ChildrenTable unitData={payeData} name={'PAYE'} accessor={'PAYE'} />
                  </Tab>
                  <Tab eventKey="3" title="VAT">
                    <ChildrenTable unitData={vatData} name={'VAT'} accessor={'VAT'} />
                  </Tab>
                </Tabs>
              </Col>
            </Row>
          </Grid>
        </Panel>
      </div>
      <button className="btn btn--primary margin-bottom-md--2" aria-label="Link back to Search page" onClick={() => browserHistory.push('/RefSearch')} bsStyle="info">
        Return to search
      </button>
    </div>
  );
};

LegalUnitPanel.propTypes = {
  legalUnit: PropTypes.object.isRequired,
};

export default LegalUnitPanel;
