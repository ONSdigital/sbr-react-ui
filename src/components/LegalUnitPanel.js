import React from 'react';
import PropTypes from 'prop-types';
import { Panel, ListGroup, ListGroupItem, Table, Glyphicon } from 'react-bootstrap';
import { browserHistory } from 'react-router';

const LegalUnitPanel = function ({ legalUnit }) {
  const unitRecord = legalUnit.UnitRecord;
  const title = (<h1 style={{ fontSize: '30px' }}>
    <Glyphicon style={{ fontSize: '28px', verticalAlign: 'middle', marginBottom: '2px' }} glyph="briefcase" />
    &nbsp;&nbsp;{unitRecord.businessName}
  </h1>);
  const url = `https://www.google.co.uk/maps/place/${unitRecord.postCode}`;
  const mapsLink = <a href={url} target="_blank">{unitRecord.postCode}</a>;
  return (
    <div>
      <div className="bootstrap-iso">
        <Panel className="bg-inverse" collapsible={false} defaultExpanded header={title}>
          <ListGroup fill>
            <ListGroupItem>
              <Table striped bordered condensed hover>
                <tbody>
                  <tr>
                    <td><strong>Legal Unit Reference (UBRN)</strong></td>
                    <td>{unitRecord.id}</td>
                  </tr>
                  <tr>
                    <td><strong>Legal Status</strong></td>
                    <td>{unitRecord.legalStatus}</td>
                  </tr>
                  <tr>
                    <td><strong>Company Number</strong></td>
                    <td>{unitRecord.companyNo}</td>
                  </tr>
                  <tr>
                    <td><strong>Employment Bands</strong></td>
                    <td>{unitRecord.employmentBands}</td>
                  </tr>
                  <tr>
                    <td><strong>Industry Code</strong></td>
                    <td>{unitRecord.industryCode}</td>
                  </tr>
                  <tr>
                    <td><strong>Turnover</strong></td>
                    <td>{unitRecord.turnover}</td>
                  </tr>
                  <tr>
                    <td><strong>Trading Status</strong></td>
                    <td>{unitRecord.tradingStatus}</td>
                  </tr>
                  <tr>
                    <td><strong>Source</strong></td>
                    <td>{legalUnit.UnitLink.unitType}</td>
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
