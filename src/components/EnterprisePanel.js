import React from 'react';
import PropTypes from 'prop-types';
import { Panel, ListGroup, ListGroupItem, Button, Table, Tabs, Tab, Glyphicon } from 'react-bootstrap';
import { browserHistory } from 'react-router';
import DeveloperView from './DeveloperView';

const EnterprisePanel = function ({ enterprise }) {
  const title = (<h1 style={{ fontSize: '30px' }}>
    <Glyphicon style={{ fontSize: '28px', verticalAlign: 'middle', marginBottom: '2px' }} glyph="briefcase" />
    &nbsp;&nbsp;{enterprise.name}, Source: {enterprise.source}
  </h1>);
  const url = `https://www.google.co.uk/maps/place/${enterprise.postcode}`;
  const mapsLink = <a href={url} target="_blank">{enterprise.postcode}</a>;
  return (
    <Panel bsStyle="primary" collapsible={false} defaultExpanded header={title}>
      <ListGroup fill>
        <ListGroupItem>
          <Table striped bordered condensed hover>
            <thead>
              <tr>
                <th>IDBR Ent. Ref</th>
                <th>SBR Ent. Ref</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{enterprise.enterprise}</td>
                <td>{enterprise.sbrEntRef}</td>
              </tr>
            </tbody>
          </Table>
        </ListGroupItem>
        <ListGroupItem>
          <Table striped bordered condensed hover>
            <tbody>
              <tr>
                <td>Line 1</td>
                <td>{enterprise.address1}</td>
              </tr>
              <tr>
                <td>Line 2</td>
                <td>{enterprise.address2}</td>
              </tr>
              <tr>
                <td>Line 3</td>
                <td>{enterprise.address3}</td>
              </tr>
              <tr>
                <td>Town/City</td>
                <td>{enterprise.address4}</td>
              </tr>
              <tr>
                <td>County</td>
                <td>{enterprise.address5}</td>
              </tr>
              <tr>
                <td>Post Code</td>
                <td>{mapsLink}</td>
              </tr>
            </tbody>
          </Table>
          <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
            <Tab aria-label="Details tab" eventKey={1} title="Details">
              <br />
              Tab 1 content
            </Tab>
            <Tab aria-label="Tab 2" eventKey={2} title="Tab 2">
              <br />
              Tab 2 content
            </Tab>
            <Tab aria-label="Developer view" eventKey={3} title="Developer View">
              <DeveloperView enterprise={enterprise} />
            </Tab>
          </Tabs>
        </ListGroupItem>
      </ListGroup>
      <Button aria-label="Link back to Search page" autoFocus onClick={() => browserHistory.push('/Search')} bsStyle="info">
        Return to search
      </Button>
    </Panel>
  );
};

EnterprisePanel.propTypes = {
  enterprise: PropTypes.object.isRequired,
};

export default EnterprisePanel;
