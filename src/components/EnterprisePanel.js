import React from 'react';
import PropTypes from 'prop-types';
import { Panel, ListGroup, ListGroupItem, Button, Table, Tabs, Tab, Glyphicon } from 'react-bootstrap';
import { browserHistory } from 'react-router';
import DeveloperView from './DeveloperView';

const EnterprisePanel = function ({ enterprise }) {
  const title = (<h1 style={{ fontSize: '30px' }}>
    <Glyphicon style={{ fontSize: '28px', verticalAlign: 'middle', marginBottom: '2px' }} glyph="briefcase" />
    &nbsp;&nbsp;{enterprise.name}
  </h1>);
  const url = `https://www.google.co.uk/maps/place/${enterprise.address.postcode}`;
  const mapsLink = <a href={url} target="_blank">{enterprise.address.postcode}</a>;
  return (
    <div className="bootstrap-iso">
      <Panel bsStyle="primary" collapsible={false} defaultExpanded header={title}>
        <ListGroup fill>
          <ListGroupItem>
            <Table striped bordered condensed hover>
              <tbody>
                <tr>
                  <td><strong>SBR Enterprise Reference</strong></td>
                  <td>{enterprise.id}</td>
                </tr>
                <tr>
                  <td><strong>Legal Status</strong></td>
                  <td>{enterprise.legalStatus}</td>
                </tr>
                <tr>
                  <td><strong>SIC</strong></td>
                  <td>{enterprise.sic}</td>
                </tr>
                <tr>
                  <td><strong>Employees</strong></td>
                  <td>{enterprise.employees}</td>
                </tr>
                <tr>
                  <td><strong>Working Group</strong></td>
                  <td>{enterprise.workingGroup}</td>
                </tr>
                <tr>
                  <td><strong>Employment</strong></td>
                  <td>{enterprise.employment}</td>
                </tr>
                <tr>
                  <td><strong>Turnover</strong></td>
                  <td>{enterprise.turnover}</td>
                </tr>
                <tr>
                  <td><strong>Source</strong></td>
                  <td>{enterprise.source}</td>
                </tr>
              </tbody>
            </Table>
            <h4>Address</h4>
            <Table striped bordered condensed hover>
              <tbody>
                <tr>
                  <td><strong>Line 1</strong></td>
                  <td>{enterprise.address.line1}</td>
                </tr>
                <tr>
                  <td><strong>Line 2</strong></td>
                  <td>{enterprise.address.line2}</td>
                </tr>
                <tr>
                  <td><strong>Line 3</strong></td>
                  <td>{enterprise.address.line3}</td>
                </tr>
                <tr>
                  <td><strong>Town/City</strong></td>
                  <td>{enterprise.address.line4}</td>
                </tr>
                <tr>
                  <td><strong>County</strong></td>
                  <td>{enterprise.address.line5}</td>
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

EnterprisePanel.propTypes = {
  enterprise: PropTypes.object.isRequired,
};

export default EnterprisePanel;
