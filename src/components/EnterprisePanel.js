import React from 'react';
import PropTypes from 'prop-types';
import { Panel, Form, FormGroup, FormControl, ControlLabel, Glyphicon, Tabs, Tab, Grid, Row, Col } from 'react-bootstrap';
import { browserHistory } from 'react-router';
import { getValueByKey, getChildValues } from '../utils/helperMethods';
import ChildrenTable from '../components/ChildrenTable';
import FormStaticValue from '../components/FormStaticValue';
import FormStaticAddress from '../components/FormStaticAddress';

const EnterprisePanel = function ({ enterprise }) {
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
  const title = (<h1><Glyphicon glyph="tower" />&nbsp;{json.ent_name} <small>{json.entref}</small></h1>);
  const leuData = getChildValues(enterprise.children, 'LEU');
  const chData = getChildValues(enterprise.children, 'CH');
  const vatData = getChildValues(enterprise.children, 'VAT');
  const payeData = getChildValues(enterprise.children, 'PAYE');
  return (
    <div>
      <div className="bootstrap-iso">
        <Panel className="bg-inverse" collapsible={false} defaultExpanded header={title}>
        <Grid>
          <Row className="show-grid">
            <Form horizontal>
              <Col sm={3}>
                <FormStaticAddress id="formAddress" label="Address" address1={json.ent_address1} address2={json.ent_address2} address3={json.ent_address3} address4={json.ent_address4} address5={json.ent_address5} postcode={json.ent_postcode} />
                <FormGroup controlId="formLegalStatus">
                  <Col componentClass={ControlLabel} sm={6}>
                    Legal Status
                  </Col>
                  <Col sm={3}>
                    <FormControl.Static bsClass="label" bsStyle="success">Active</FormControl.Static>
                  </Col>
                </FormGroup>
                <FormStaticValue id="formEmployees" label="Employees" value={json.employees} />
                <FormStaticValue id="formJobs" label="PAYE Jobs" value={json.PAYE_jobs} />
                <FormStaticValue id="formStandardVATTurnover" label="Standard VAT turnover" value={json.standard_vat_turnover} />
              </Col>
            </Form>
            <Col sm={4} xsOffset={2}>
              <Tabs defaultActiveKey="1" animation={false} id="children-tabs" bsStyle="pills">
                <Tab eventKey="1" title="UBRN">
                  <ChildrenTable unitData={leuData} name={'UBRN'} accessor={'LEU'} />
                </Tab>
                <Tab eventKey="2" title="CRN">
                  <ChildrenTable unitData={chData} name={'CRN'} accessor={'CH'} />
                </Tab>
                <Tab eventKey="3" title="PAYE">
                  <ChildrenTable unitData={payeData} name={'PAYE'} accessor={'PAYE'} />
                </Tab>
                <Tab eventKey="4" title="VAT">
                  <ChildrenTable unitData={vatData} name={'VAT'} accessor={'VAT'} />
                </Tab>
              </Tabs>
            </Col>
          </Row>
        </Grid>
        </Panel>
      </div>
      <button className="btn btn--primary margin-bottom-md--2" aria-label="Link back to Search page" autoFocus onClick={() => browserHistory.push('/RefSearch')}>
        Return to search
      </button>
    </div>
  );
};

EnterprisePanel.propTypes = {
  enterprise: PropTypes.object.isRequired,
};

export default EnterprisePanel;
