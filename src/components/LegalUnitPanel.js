import React from 'react';
import PropTypes from 'prop-types';
import { Panel, ListGroup, ListGroupItem, Button, Table, Glyphicon } from 'react-bootstrap';
import { browserHistory } from 'react-router';

const LegalUnitPanel = function ({ legalUnit }) {
  const title = (<h1 style={{ fontSize: '30px' }}>
    <Glyphicon style={{ fontSize: '28px', verticalAlign: 'middle', marginBottom: '2px' }} glyph="briefcase" />
    &nbsp;&nbsp;{legalUnit.name}
  </h1>);
  const url = `https://www.google.co.uk/maps/place/${legalUnit.postCode}`;
  const mapsLink = <a href={url} target="_blank">{legalUnit.postCode}</a>;
  return (
    <div className="bootstrap-iso">
      <Panel bsStyle="primary" collapsible={false} defaultExpanded header={title}>
        <ListGroup fill>
          <ListGroupItem>
            <Table striped bordered condensed hover>
              <tbody>
                <tr>
                  <td><strong>Legal Unit Reference (UBRN)</strong></td>
                  <td>{legalUnit.id}</td>
                </tr>
                <tr>
                  <td><strong>Legal Status</strong></td>
                  <td>{legalUnit.legalStatus}</td>
                </tr>
                <tr>
                  <td><strong>Company Number</strong></td>
                  <td>{legalUnit.companyNo}</td>
                </tr>
                <tr>
                  <td><strong>Employment Bands</strong></td>
                  <td>{legalUnit.employmentBands}</td>
                </tr>
                <tr>
                  <td><strong>Industry Code</strong></td>
                  <td>{legalUnit.industryCode}</td>
                </tr>
                <tr>
                  <td><strong>Turnover</strong></td>
                  <td>{legalUnit.turnover}</td>
                </tr>
                <tr>
                  <td><strong>Trading Status</strong></td>
                  <td>{legalUnit.tradingStatus}</td>
                </tr>
                <tr>
                  <td><strong>Source</strong></td>
                  <td>{legalUnit.source}</td>
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
        <Button aria-label="Link back to Search page" autoFocus onClick={() => browserHistory.push('/RefSearch')} bsStyle="info">
          Return to search
        </Button>
      </Panel>
    </div>
  );
};

LegalUnitPanel.propTypes = {
  legalUnit: PropTypes.object.isRequired,
};

export default LegalUnitPanel;
