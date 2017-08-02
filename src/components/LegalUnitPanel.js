import React from 'react';
import PropTypes from 'prop-types';
import { Panel, ListGroup, ListGroupItem, Button, Table, Glyphicon } from 'react-bootstrap';
import { browserHistory } from 'react-router';

const LegalUnitPanel = function ({ legalUnit }) {
  const title = (<h1 style={{ fontSize: '30px' }}>
    <Glyphicon style={{ fontSize: '28px', verticalAlign: 'middle', marginBottom: '2px' }} glyph="briefcase" />
    &nbsp;&nbsp;{legalUnit.name}
  </h1>);
  const url = `https://www.google.co.uk/maps/place/${legalUnit.address.postcode}`;
  const mapsLink = <a href={url} target="_blank">{legalUnit.address.postcode}</a>;
  return (
    <div className="bootstrap-iso">
      <Panel bsStyle="primary" collapsible={false} defaultExpanded header={title}>
        <ListGroup fill>
          <ListGroupItem>
            <Table striped bordered condensed hover>
              <tbody>
                <tr>
                  <td><strong>SBR Enterprise Reference</strong></td>
                  <td>{legalUnit.id}</td>
                </tr>
                <tr>
                  <td><strong>Legal Status</strong></td>
                  <td>{legalUnit.legalStatus}</td>
                </tr>
                <tr>
                  <td><strong>SIC</strong></td>
                  <td>{legalUnit.sic}</td>
                </tr>
                <tr>
                  <td><strong>Employees</strong></td>
                  <td>{legalUnit.employees}</td>
                </tr>
                <tr>
                  <td><strong>Working Group</strong></td>
                  <td>{legalUnit.workingGroup}</td>
                </tr>
                <tr>
                  <td><strong>Employment</strong></td>
                  <td>{legalUnit.employment}</td>
                </tr>
                <tr>
                  <td><strong>Turnover</strong></td>
                  <td>{legalUnit.turnover}</td>
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
                  <td><strong>Line 1</strong></td>
                  <td>{legalUnit.address.line1}</td>
                </tr>
                <tr>
                  <td><strong>Line 2</strong></td>
                  <td>{legalUnit.address.line2}</td>
                </tr>
                <tr>
                  <td><strong>Line 3</strong></td>
                  <td>{legalUnit.address.line3}</td>
                </tr>
                <tr>
                  <td><strong>Town/City</strong></td>
                  <td>{legalUnit.address.line4}</td>
                </tr>
                <tr>
                  <td><strong>County</strong></td>
                  <td>{legalUnit.address.line5}</td>
                </tr>
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
