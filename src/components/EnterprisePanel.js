import React from 'react';
import PropTypes from 'prop-types';
import { Panel, Form, FormGroup, FormControl, ControlLabel, Glyphicon, Tabs, Tab, Grid, Row, Col, Label } from 'react-bootstrap';
import { browserHistory } from 'react-router';
import Button from 'react-bootstrap-button-loader';
import PanelToolbar from '../components/PanelToolbar';
import { getValueByKey, getChildValues } from '../utils/helperMethods';
import ChildList from '../components/ChildList';

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
  const url = `https://www.google.co.uk/maps/place/${json.ent_postcode}`;
   const mapsLink = <a href={url} target="_blank">{json.ent_postcode}</a>;
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
          <Col sm={6} md={4}>
          <Form horizontal>
          <FormGroup controlId="formAddress">
                          <Col componentClass={ControlLabel} sm={6}>
                            Address
                          </Col>
                          <Col sm={6}>
                            <FormControl.Static>{json.ent_address1}<br/>{json.ent_address2}<br/>{json.ent_address3}<br/>{json.ent_address4}<br/>{json.ent_address5}<br/>{mapsLink}</FormControl.Static>
                          </Col>
                        </FormGroup>
          <FormGroup controlId="formLegalStatus">
                          <Col componentClass={ControlLabel} sm={6}>
                            Legal Status
                          </Col>
                          <Col sm={6}>
                          <FormControl.Static bsClass="label" bsStyle="success">Active</FormControl.Static>
                          </Col>
                        </FormGroup>
          <FormGroup controlId="formEmployees">
                <Col componentClass={ControlLabel} sm={6}>
                  Employees
                </Col>
                <Col sm={6}>
                  <FormControl.Static>{json.employees}</FormControl.Static>
                </Col>
              </FormGroup>
          <FormGroup controlId="formJobs">
                          <Col componentClass={ControlLabel} sm={6}>
                            PAYE Jobs
                          </Col>
                          <Col sm={6}>
                            <FormControl.Static>{json.PAYE_jobs}</FormControl.Static>
                          </Col>
                        </FormGroup>
          <FormGroup controlId="formStandardVATTurnover">
                          <Col componentClass={ControlLabel} sm={6}>
                            Standard VAT turnover
                          </Col>
                          <Col sm={6}>
                            <FormControl.Static>{json.standard_vat_turnover}</FormControl.Static>
                          </Col>
                        </FormGroup>
          </Form>
           </Col>
            <Col sm={2} md={4}>

             <Tabs defaultActiveKey="1" animation={false} id="children-tabs" bsStyle="pills">
                                                   <Tab eventKey="1" title="UBRN">
                                                     <ChildList unitData={leuData} name={'UBRN'} accessor={'LEU'} />
                                                   </Tab>
                                                   <Tab eventKey="2" title="CRN">
                                                     <ChildList unitData={chData} name={'CRN'} accessor={'CH'} />
                                                   </Tab>
                                                   <Tab eventKey="3" title="PAYE">
                                                     <ChildList unitData={payeData} name={'PAYE'} accessor={'PAYE'} />
                                                   </Tab>
                                                   <Tab eventKey="4" title="VAT">
                                                     <ChildList unitData={vatData} name={'VAT'} accessor={'VAT'} />
                                                   </Tab>
                                                 </Tabs>
            </Col>
            <Col sm={2} md={4}>   <PanelToolbar parents={enterprise.parents} children={enterprise.children} pageType="ENT" />
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
