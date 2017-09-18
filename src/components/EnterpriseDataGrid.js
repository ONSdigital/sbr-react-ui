import React from 'react';
import PropTypes from 'prop-types';
import { Label, Form, Tabs, Tab, Grid, Row, Col } from 'react-bootstrap';
import { getLegalStatusDescription } from '../utils/helperMethods';
import FormStaticValue from '../components/FormStaticValue';
import FormStaticAddress from '../components/FormStaticAddress';
import ChildrenTable from '../components/ChildrenTable';

const EnterpriseDataGrid = ({ json, leuData, chData, payeData, vatData }) => {
  const formTitle = (name, count) => (<p>{name} <Label bsStyle="primary">{count}</Label></p>);
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
        <Col sm={5} xsOffset={1}>
          <Tabs defaultActiveKey="1" animation={false} id="children-tabs" bsStyle="tabs">
            <Tab disabled={leuData.length === 0} eventKey="1" title={formTitle('UBRN', leuData.length)}>
              <ChildrenTable unitData={leuData} name={'Universal Business Register No.'} accessor={'LEU'} />
            </Tab>
            <Tab disabled={chData.length === 0} eventKey="2" title={formTitle('CRN', chData.length)}>
              <ChildrenTable unitData={chData} name={'Company Reference No.'} accessor={'CH'} />
            </Tab>
            <Tab disabled={payeData.length === 0} eventKey="3" title={formTitle('PAYE', payeData.length)}>
              <ChildrenTable unitData={payeData} name={'PAYE Reference'} accessor={'PAYE'} />
            </Tab>
            <Tab disabled={vatData.length === 0} eventKey="4" title={formTitle('VAT', vatData.length)}>
              <ChildrenTable unitData={vatData} name={'VAT Reference'} accessor={'VAT'} />
            </Tab>
          </Tabs>
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
