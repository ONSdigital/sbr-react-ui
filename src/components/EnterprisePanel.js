import React from 'react';
import PropTypes from 'prop-types';
import { Panel, ListGroup, ListGroupItem, Table, Glyphicon } from 'react-bootstrap';
import { browserHistory } from 'react-router';
import PanelToolbar from '../components/PanelToolbar';
import { getValueByKey } from '../utils/helperMethods';

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
  const title = (<h1 style={{ fontSize: '30px' }}>
    <Glyphicon style={{ fontSize: '28px', verticalAlign: 'middle', marginBottom: '2px' }} glyph="briefcase" />
    &nbsp;&nbsp;{json.ent_name}
  </h1>);
  const url = `https://www.google.co.uk/maps/place/${json.ent_postcode}`;
  const mapsLink = <a href={url} target="_blank">{json.ent_postcode}</a>;
  return (
    <div>
      <div className="bootstrap-iso">
        <Panel className="bg-inverse" collapsible={false} defaultExpanded header={title}>
          <PanelToolbar parents={enterprise.parents} children={enterprise.children} pageType="ENT" />
          <ListGroup fill>
            <ListGroupItem>
              <Table striped bordered condensed hover>
                <tbody>
                  <tr><td><strong>Entref</strong></td><td>{json.entref}</td></tr>
                  <tr><td><strong>Legalstatus</strong></td><td>{json.legalstatus}</td></tr>
                  <tr><td><strong>Standard_vat_turnover</strong></td><td>{json.standard_vat_turnover}</td></tr>
                  <tr><td><strong>PAYE_jobs</strong></td><td>{json.PAYE_jobs}</td></tr>
                  <tr><td><strong>Employees</strong></td><td>{json.employees}</td></tr>
                  <tr><td><strong>Num_Unique_VatRefs</strong></td><td>{json.Num_Unique_VatRefs}</td></tr>
                  <tr><td><strong>Num_Unique_PayeRefs</strong></td><td>{json.Num_Unique_PayeRefs}</td></tr>
                </tbody>
              </Table>
              <h4>Address</h4>
              <Table striped bordered condensed hover>
                <tbody>
                  <tr>
                    <td><strong>Line 1</strong></td>
                    <td>{json.ent_address1}</td>
                  </tr>
                  <tr>
                    <td><strong>Line 2</strong></td>
                    <td>{json.ent_address2}</td>
                  </tr>
                  <tr>
                    <td><strong>Line 3</strong></td>
                    <td>{json.ent_address3}</td>
                  </tr>
                  <tr>
                    <td><strong>Town/City</strong></td>
                    <td>{json.ent_address4}</td>
                  </tr>
                  <tr>
                    <td><strong>County</strong></td>
                    <td>{json.ent_address5}</td>
                  </tr>
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
