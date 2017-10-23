import React from 'react';
import PropTypes from 'prop-types';
import { Label, Form, Tab, Grid, Row, Col, NavItem, Nav } from 'react-bootstrap';
import { getLegalStatusDescription } from '../utils/helperMethods';
import FormStaticValue from '../components/FormStaticValue';
import FormStaticAddress from '../components/FormStaticAddress';
import ChildrenTable from '../components/ChildrenTable';
import colours from '../config/colours';

const EnterpriseDataGrid = ({ json, leuData, chData, payeData, vatData }) => {
  const formTitle = (name, count, accessor) => (<p style={{ margin: '0px', padding: '0px' }}><Label bsStyle="primary" style={{ backgroundColor: colours[accessor], margin: '0px'}}>{count}</Label>&nbsp;{name}</p>);
  return (
    <Grid>
      <Row className="show-grid">
        <Form horizontal>
          <Col sm={3}>
            <FormStaticAddress id="formAddress" label="Address" address1={json.ent_address1} address2={json.ent_address2} address3={json.ent_address3} address4={json.ent_address4} address5={json.ent_address5} postcode={json.ent_postcode} />
            <FormStaticValue id="formLegalStatus" label="Legal Status" value={getLegalStatusDescription(json.legalstatus)} />
            <FormStaticValue id="formEmployees" label="Employees" value={json.employees} />
            <FormStaticValue id="formJobs" label="PAYE Jobs" value={json.PAYE_jobs} />
            <FormStaticValue id="formStandardVATTurnover" label="Standard VAT turnover" value={json.standard_vat_turnover} />
          </Col>
        </Form>
        <Col sm={5}>
          <Tab.Container id="left-tabs-example" defaultActiveKey={1}>
            <Row className="clearfix">
              <Col sm={4}>
                <Nav bsStyle="pills" stacked style={{ margin: '0px', padding: '0px' }}>
                  <NavItem style={{ margin: '0px', padding: '0px' }} disabled={leuData.length === 0} eventKey={1}>
                    {formTitle('UBRN', leuData.length, 'LEU')}
                  </NavItem>
                  <NavItem style={{ margin: '0px', padding: '0px' }} disabled={chData.length === 0} eventKey={2}>
                    {formTitle('CRN', chData.length, 'CRN')}
                  </NavItem>
                  <NavItem style={{ margin: '0px', padding: '0px' }} disabled={payeData.length === 0} eventKey={3}>
                    {formTitle('PAYE', payeData.length, 'PAYE')}
                  </NavItem>
                  <NavItem style={{ margin: '0px', padding: '0px' }} disabled={vatData.length === 0} eventKey={4}>
                    {formTitle('VAT', vatData.length, 'VAT')}
                  </NavItem>
                </Nav>
              </Col>
              <Col sm={8}>
                <Tab.Content animation style={{ margin: '0px', padding: '0px' }}>
                  <Tab.Pane eventKey={1}>
                    <ChildrenTable unitData={leuData} name={'Universal Business Register No.'} accessor={'LEU'} />
                  </Tab.Pane>
                  <Tab.Pane eventKey={2}>
                    <ChildrenTable unitData={chData} name={'Company Reference No.'} accessor={'CH'} />
                  </Tab.Pane>
                  <Tab.Pane eventKey={3}>
                    <ChildrenTable unitData={payeData} name={'PAYE Reference'} accessor={'PAYE'} />
                  </Tab.Pane>
                  <Tab.Pane eventKey={4}>
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
};

EnterpriseDataGrid.propTypes = {
  json: PropTypes.object.isRequired,
  leuData: PropTypes.array.isRequired,
  chData: PropTypes.array.isRequired,
  payeData: PropTypes.array.isRequired,
  vatData: PropTypes.array.isRequired,
};

export default EnterpriseDataGrid;
