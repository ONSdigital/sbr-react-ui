import React from 'react';
import PropTypes from 'prop-types';
import { Panel, Table, Form, FormGroup, FormControl, ControlLabel, Grid, Row, Col } from 'react-bootstrap';
import { TableHeaderColumn } from 'react-bootstrap-table';
import { browserHistory } from 'react-router';
import { formCompanyJson } from '../utils/formJson';
import FormStaticValue from '../components/FormStaticValue';
import FormStaticAddress from '../components/FormStaticAddress';
import PanelTitle from '../components/PanelTitle';
import TreeView1 from '../components/TreeView1';
import TreeView2 from '../components/TreeView2';

const CompanyPanel = function ({ company, showTreeView, toggleTreeView }) {
  function panelContent() {
    let dataView = (
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
                  <TableHeaderColumn colSpan="4">Accounts</TableHeaderColumn>
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
                  <TableHeaderColumn colSpan="4">Mortgages</TableHeaderColumn>
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
                  <TableHeaderColumn colSpan="2">Returns</TableHeaderColumn>
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
                  <TableHeaderColumn colSpan="2">Limited Partnerships</TableHeaderColumn>
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
          <Row className="show-grid">
            <Col sm={9}>
              <FormGroup controlId="chLink" >
                <Col componentClass={ControlLabel} sm={2}>
                  CH Link
                </Col>
                <Col>
                  <FormControl.Static><a target="_blank" href={`https://beta.companieshouse.gov.uk/company/${company.id}`}>{`https://beta.companieshouse.gov.uk/company/${company.id}`}</a></FormControl.Static>
                </Col>
              </FormGroup>
            </Col>
          </Row>
        </Form>
      </Grid>
    );
    if (showTreeView === 1) {
      dataView = (
        <TreeView1
          entryNodeId={company.id}
          unitType={'CRN'}
          enterpriseId={company.parents.ENT}
          childrenJson={{}}
        />
      );
    } else if (showTreeView === 2) {
      dataView = (
        <TreeView2
          entryNodeId={company.id}
          unitType={'CRN'}
          enterpriseId={company.parents.ENT}
          childrenJson={{}}
        />
      );
    }
    return dataView;
  }
  const json = formCompanyJson(company);
  const title = (
    <PanelTitle
      toggle={() => toggleTreeView('CRN', company.parents.ENT)}
      name={json.companyname}
      id={json.companynumber}
    />
  );
  return (
    <div>
      <div className="bootstrap-iso">
        <Panel className="bg-inverse" collapsible={false} defaultExpanded header={title}>
          {panelContent()}
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
  showTreeView: PropTypes.number.isRequired,
  toggleTreeView: PropTypes.func.isRequired,
};

export default CompanyPanel;
