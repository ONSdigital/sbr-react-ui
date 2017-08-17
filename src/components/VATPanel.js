import React from 'react';
import PropTypes from 'prop-types';
import { Panel, ListGroup, ListGroupItem, Button, Table, Glyphicon } from 'react-bootstrap';
import { browserHistory } from 'react-router';

const VATPanel = function ({ vat }) {
  const title = (<h1 style={{ fontSize: '30px' }}>
    <Glyphicon style={{ fontSize: '28px', verticalAlign: 'middle', marginBottom: '2px' }} glyph="briefcase" />
    &nbsp;&nbsp;{vat.businessName}
  </h1>);
  const url = `https://www.google.co.uk/maps/place/${vat.postCode}`;
  const mapsLink = <a href={url} target="_blank">{vat.postCode}</a>;
  return (
    <div>
      <div className="bootstrap-iso">
        <Panel className="bg-inverse" collapsible={false} defaultExpanded header={title}>
          <ListGroup fill>
            <ListGroupItem>
              <Table striped bordered condensed hover>
                <tbody>
                  <tr>
                    <td><strong>VAT Reference</strong></td>
                    <td>{vat.id}</td>
                  </tr>
                  <tr>
                    <td><strong>Legal Status</strong></td>
                    <td>{vat.legalStatus}</td>
                  </tr>
                  <tr>
                    <td><strong>Company Number</strong></td>
                    <td>{vat.companyNo}</td>
                  </tr>
                  <tr>
                    <td><strong>Employment Bands</strong></td>
                    <td>{vat.employmentBands}</td>
                  </tr>
                  <tr>
                    <td><strong>Industry Code</strong></td>
                    <td>{vat.industryCode}</td>
                  </tr>
                  <tr>
                    <td><strong>Turnover</strong></td>
                    <td>{vat.turnover}</td>
                  </tr>
                  <tr>
                    <td><strong>Trading Status</strong></td>
                    <td>{vat.tradingStatus}</td>
                  </tr>
                  <tr>
                    <td><strong>Source</strong></td>
                    <td>{vat.source}</td>
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

VATPanel.propTypes = {
  vat: PropTypes.object.isRequired,
};

export default VATPanel;
