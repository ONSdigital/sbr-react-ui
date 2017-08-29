import React from 'react';
import PropTypes from 'prop-types';
import { Panel, ListGroup, ListGroupItem, Table, Glyphicon } from 'react-bootstrap';
import { browserHistory } from 'react-router';
import PanelToolbar from '../components/PanelToolbar';

const LegalUnitPanel = function ({ legalUnit }) {
  const title = (<h1 style={{ fontSize: '30px' }}>
    <Glyphicon style={{ fontSize: '28px', verticalAlign: 'middle', marginBottom: '2px' }} glyph="briefcase" />
    &nbsp;&nbsp;{legalUnit.vars.businessName}
  </h1>);
  const url = `https://www.google.co.uk/maps/place/${legalUnit.vars.postCode}`;
  const mapsLink = <a href={url} target="_blank">{legalUnit.vars.postCode}</a>;
  return (
    <div>
      <div className="bootstrap-iso">
        <Panel className="bg-inverse" collapsible={false} defaultExpanded header={title}>
          <PanelToolbar parents={legalUnit.parents} children={legalUnit.children} pageType="LEU" />
          <ListGroup fill>
            <ListGroupItem>
              <Table striped bordered condensed hover>
                <tbody>
                  <tr>
                    <td><strong>Legal Unit Reference (UBRN)</strong></td>
                    <td>{legalUnit.vars.id}</td>
                  </tr>
                  <tr>
                    <td><strong>Legal Status</strong></td>
                    <td>{legalUnit.vars.legalStatus}</td>
                  </tr>
                  <tr>
                    <td><strong>Company Number</strong></td>
                    <td>{legalUnit.vars.companyNo}</td>
                  </tr>
                  <tr>
                    <td><strong>Employment Bands</strong></td>
                    <td>{legalUnit.vars.employmentBands}</td>
                  </tr>
                  <tr>
                    <td><strong>Industry Code</strong></td>
                    <td>{legalUnit.vars.industryCode}</td>
                  </tr>
                  <tr>
                    <td><strong>Turnover</strong></td>
                    <td>{legalUnit.vars.turnover}</td>
                  </tr>
                  <tr>
                    <td><strong>Trading Status</strong></td>
                    <td>{legalUnit.vars.tradingStatus}</td>
                  </tr>
                </tbody>
              </Table>
              <h4>Address</h4>
              <Table striped bordered condensed hover>
                <tbody>
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

LegalUnitPanel.propTypes = {
  legalUnit: PropTypes.object.isRequired,
};

export default LegalUnitPanel;
