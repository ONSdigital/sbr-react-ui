import React from 'react';
import PropTypes from 'prop-types';
import { Panel, ListGroup, ListGroupItem, Table, Glyphicon } from 'react-bootstrap';
import { browserHistory } from 'react-router';
import { getValueByKey } from '../utils/helperMethods';
import PanelToolbar from '../components/PanelToolbar';

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
  const title = (<h1 style={{ fontSize: '30px' }}>
    <Glyphicon style={{ fontSize: '28px', verticalAlign: 'middle', marginBottom: '2px' }} glyph="list" />
    &nbsp;&nbsp;{json.companyname}
  </h1>);
  const url = `https://www.google.co.uk/maps/place/${json.regaddress_postcode}`;
  const mapsLink = <a href={url} target="_blank">{json.regaddress_postcode}</a>;
  return (
    <div>
      <div className="bootstrap-iso">
        <Panel className="bg-inverse" collapsible={false} defaultExpanded header={title}>
          <PanelToolbar parents={company.parents} children={company.children} pageType="REF" />
          <ListGroup fill>
            <ListGroupItem>
              <Table striped bordered condensed hover>
                <tbody>
                <tr><td><strong>Companynumber</strong></td><td>{json.companynumber}</td></tr>
                <tr><td><strong>Companycategory</strong></td><td>{json.companycategory}</td></tr>
                <tr><td><strong>Companyname</strong></td><td>{json.companyname}</td></tr>
                <tr><td><strong>Accounts_accountrefmonth</strong></td><td>{json.accounts_accountrefmonth}</td></tr>
                <tr><td><strong>Limitedpartnerships_numlimpartners</strong></td><td>{json.limitedpartnerships_numlimpartners}</td></tr>
                <tr><td><strong>Returns_nextduedate</strong></td><td>{json.returns_nextduedate}</td></tr>
                <tr><td><strong>Accounts_accountrefday</strong></td><td>{json.accounts_accountrefday}</td></tr>
                <tr><td><strong>Accounts_accountcategory</strong></td><td>{json.accounts_accountcategory}</td></tr>
                <tr><td><strong>Mortgages_nummortoutstanding</strong></td><td>{json.mortgages_nummortoutstanding}</td></tr>
                <tr><td><strong>Confstmtlastmadeupdate</strong></td><td>{json.confstmtlastmadeupdate}</td></tr>
                <tr><td><strong>Uri</strong></td><td><a href={json.uri} target="_blank">{json.uri}</a></td></tr>
                <tr><td><strong>Countryoforigin</strong></td><td>{json.countryoforigin}</td></tr>
                <tr><td><strong>Accounts_nextduedate</strong></td><td>{json.accounts_nextduedate}</td></tr>
                <tr><td><strong>Accounts_lastmadeupdate</strong></td><td>{json.accounts_lastmadeupdate}</td></tr>
                <tr><td><strong>Siccode_sictext_1</strong></td><td>{json.siccode_sictext_1}</td></tr>
                <tr><td><strong>Limitedpartnerships_numgenpartners</strong></td><td>{json.limitedpartnerships_numgenpartners}</td></tr>
                <tr><td><strong>Ref_period</strong></td><td>{json.ref_period}</td></tr>
                <tr><td><strong>Incorporationdate</strong></td><td>{json.incorporationdate}</td></tr>
                <tr><td><strong>Confstmtnextduedate</strong></td><td>{json.confstmtnextduedate}</td></tr>
                <tr><td><strong>Mortgages_nummortcharges</strong></td><td>{json.mortgages_nummortcharges}</td></tr>
                <tr><td><strong>Returns_lastmadeupdate</strong></td><td>{json.returns_lastmadeupdate}</td></tr>
                <tr><td><strong>Mortgages_nummortsatisfied</strong></td><td>{json.mortgages_nummortsatisfied}</td></tr>
                <tr><td><strong>Companystatus</strong></td><td>{json.companystatus}</td></tr>
                <tr><td><strong>mortgages_nummortpartsatisfied</strong></td><td>{json.mortgages_nummortpartsatisfied}</td></tr>
                </tbody>
              </Table>
              <h4>Address</h4>
              <Table striped bordered condensed hover>
                <tbody>
                <tr><td><strong>Regaddress_addressline1</strong></td><td>{json.regaddress_addressline1}</td></tr>
                <tr><td><strong>Regaddress_addressline2</strong></td><td>{json.regaddress_addressline2}</td></tr>
                <tr><td><strong>Regaddress_county</strong></td><td>{json.regaddress_county}</td></tr>
                <tr><td><strong>Regaddress_posttown</strong></td><td>{json.regaddress_posttown}</td></tr>
                  <tr>
                    <td><strong>Post Code</strong></td>
                    <td>{mapsLink}</td>
                  </tr>
                </tbody>
              </Table>
            </ListGroupItem>
          </ListGroup>
        </Panel>
      </div>
      <button className="btn btn--primary margin-bottom-md--2" aria-label="Link back to Search page" autoFocus onClick={() => browserHistory.push('/RefSearch')} bsStyle="info">
        Return to search
      </button>
    </div>
  );
};

CompanyPanel.propTypes = {
  company: PropTypes.object.isRequired,
};

export default CompanyPanel;
