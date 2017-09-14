import React from 'react';
import PropTypes from 'prop-types';
import { Panel, Table, Form, FormGroup, FormControl, ControlLabel, Glyphicon, Grid, Row, Col } from 'react-bootstrap';
import { TableHeaderColumn } from 'react-bootstrap-table';
import { browserHistory } from 'react-router';
import { getValueByKey } from '../utils/helperMethods';
import FormStaticValue from '../components/FormStaticValue';
import FormStaticAddress from '../components/FormStaticAddress';

const CompanyPanel = function ({ company }) {
  const json = {
    accounts_accountrefmonth: getValueByKey(company.vars, 'accounts_accountrefmonth'),
    limitedpartnerships_numlimpartners: getValueByKey(company.vars, 'limitedpartnerships_numlimpartners'),
    regaddress_posttown: getValueByKey(company.vars, 'regaddress_posttown'),
    returns_nextduedate: getValueByKey(company.vars, 'returns_nextduedate'),
    accounts_accountrefday: getValueByKey(company.vars, 'accounts_accountrefday'),
    accounts_accountcategory: getValueByKey(company.vars, 'accounts_accountcategory'),
    regaddress_addressline2: getValueByKey(company.vars, 'regaddress_addressline2'),
    mortgages_nummortoutstanding: getValueByKey(company.vars, 'mortgages_nummortoutstanding'),
    companyname: getValueByKey(company.vars, 'companyname'),
    confstmtlastmadeupdate: getValueByKey(company.vars, 'confstmtlastmadeupdate'),
    uri: getValueByKey(company.vars, 'uri'),
    countryoforigin: getValueByKey(company.vars, 'countryoforigin'),
    accounts_nextduedate: getValueByKey(company.vars, 'accounts_nextduedate'),
    accounts_lastmadeupdate: getValueByKey(company.vars, 'accounts_lastmadeupdate'),
    siccode_sictext_1: getValueByKey(company.vars, 'siccode_sictext_1'),
    limitedpartnerships_numgenpartners: getValueByKey(company.vars, 'limitedpartnerships_numgenpartners'),
    ref_period: getValueByKey(company.vars, 'ref_period'),
    regaddress_addressline1: getValueByKey(company.vars, 'regaddress_addressline1'),
    companynumber: getValueByKey(company.vars, 'companynumber'),
    companycategory: getValueByKey(company.vars, 'companycategory'),
    regaddress_county: getValueByKey(company.vars, 'regaddress_county'),
    incorporationdate: getValueByKey(company.vars, 'incorporationdate'),
    confstmtnextduedate: getValueByKey(company.vars, 'confstmtnextduedate'),
    regaddress_postcode: getValueByKey(company.vars, 'regaddress_postcode'),
    mortgages_nummortcharges: getValueByKey(company.vars, 'mortgages_nummortcharges'),
    returns_lastmadeupdate: getValueByKey(company.vars, 'returns_lastmadeupdate'),
    mortgages_nummortsatisfied: getValueByKey(company.vars, 'mortgages_nummortsatisfied'),
    companystatus: getValueByKey(company.vars, 'companystatus'),
    mortgages_nummortpartsatisfied: getValueByKey(company.vars, 'mortgages_nummortpartsatisfied'),
  };
  const title = (<h1><Glyphicon glyph="list" />&nbsp;{json.companyname} <small>{json.companynumber}</small></h1>);
  return (
    <div>
      <div className="bootstrap-iso">
        <Panel className="bg-inverse" collapsible={false} defaultExpanded header={title}>
          <Grid>
            <Form horizontal>
              <Row className="show-grid">
                <Col sm={4}>
                  <FormStaticAddress id="formAddress" label="Address" address1={json.regaddress_addressline1} address2={json.regaddress_addressline2} address3={json.regaddress_posttown} address4={json.regaddress_county} postcode={json.regaddress_postcode} />
                  <FormStaticValue id="formStatus" label="Status" value={json.companystatus} />
                  <FormStaticValue id="formCategory" label="Category" value={json.companycategory} />
                  <FormStaticValue id="formCountry" label="Country of Origin" value={json.countryoforigin} />
                  <FormStaticValue id="formIncorporationDate" label="Incorporated" value={json.incorporationdate} />
                </Col>
                <Col sm={5}>
                  <Table condensed hover>
                    <thead>
                       <TableHeaderColumn colSpan='4'>Accounts</TableHeaderColumn>
                      <tr>
                       <th>Ref. Date</th>
                       <th>Next Due</th>
                       <th>Last Made</th>
                       <th>Category</th>
                     </tr>
                   </thead>
                   <tbody>
                     <tr>
                       <td>{json.accounts_accountrefday}-{json.accounts_accountrefmonth}</td>
                       <td>{json.accounts_nextduedate}</td>
                       <td>{json.accounts_lastmadeupdate}</td>
                       <td>{json.accounts_accountcategory}</td>
                     </tr>
                   </tbody>
                 </Table>
                 <Table condensed hover>
                   <thead>
                     <TableHeaderColumn colSpan='4'>Mortgages</TableHeaderColumn>
                     <tr>
                       <th>Charges</th>
                       <th>Outstanding</th>
                       <th>Part Satisfied</th>
                       <th>Satisfied</th>
                     </tr>
                   </thead>
                   <tbody>
                     <tr>
                       <td>{json.mortgages_nummortcharges}</td>
                       <td>{json.mortgages_nummortoutstanding}</td>
                       <td>{json.mortgages_nummortpartsatisfied}</td>
                       <td>{json.mortgages_nummortsatisfied}</td>
                     </tr>
                   </tbody>
                 </Table>
                 <Table condensed hover>
                   <thead>
                     <TableHeaderColumn colSpan='2'>Returns</TableHeaderColumn>
                       <tr>
                         <th>Next Due</th>
                         <th>Last Made</th>
                       </tr>
                   </thead>
                   <tbody>
                     <tr>
                       <td>{json.returns_nextduedate}</td>
                       <td>{json.returns_lastmadeupdate}</td>
                     </tr>
                   </tbody>
                 </Table>
                  <Table condensed hover>
                    <thead>
                      <TableHeaderColumn colSpan='2'>Limited Partnerships</TableHeaderColumn>
                      <tr>
                        <th>Limited Partners</th>
                        <th>General Partners</th>
                      </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>{json.limitedpartnerships_numlimpartners}</td>
                          <td>{json.limitedpartnerships_numgenpartners}</td>
                        </tr>
                      </tbody>
                    </Table>
                 </Col>
            </Row>
            <Row className="show-grid">
                 <Col sm={9}>
                  <FormGroup controlId="formSICCode" >
                    <Col componentClass={ControlLabel} sm={2}>
                      SIC Code
                    </Col>
                    <Col>
                      <FormControl.Static>{json.siccode_sictext_1}</FormControl.Static>
                    </Col>
                     </FormGroup>
                 </Col>
             </Row>
           </Form>
         </Grid>
        </Panel>
      </div>
      <button className="btn btn--primary margin-bottom-md--2" aria-label="Link back to Search page" onClick={() => browserHistory.push('/RefSearch')} bsStyle="info">
        Return to search
      </button>
    </div>
  );
};

CompanyPanel.propTypes = {
  company: PropTypes.object.isRequired,
};

export default CompanyPanel;
