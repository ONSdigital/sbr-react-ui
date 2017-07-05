import React from 'react';
import PropTypes from 'prop-types';
import { Panel, PageHeader, ListGroup, ListGroupItem, Button, Table, Tabs, Tab } from 'react-bootstrap';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class EnterpriseView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      query: '',
    };
  }
  render() {
    const data = this.props.data;
    const title = <h1 style={{ fontSize: '30px' }}>{data.name}</h1>;
    return (
      <div>
        <PageHeader>Enterprise View</PageHeader>
        <Panel collapsible defaultExpanded header={title}>
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
                    <td>{data.idbrEntRef}</td>
                    <td>{data.sbrEntRef}</td>
                  </tr>
                </tbody>
              </Table>
            </ListGroupItem>
            <ListGroupItem>
              <Table striped bordered condensed hover>
                <tbody>
                  <tr>
                    <td>Line 1</td>
                    <td>{data.address.line1}</td>
                  </tr>
                  <tr>
                    <td>Line 2</td>
                    <td>{data.address.line2}</td>
                  </tr>
                  <tr>
                    <td>Line 3</td>
                    <td>{data.address.line3}</td>
                  </tr>
                  <tr>
                    <td>Town/City</td>
                    <td>{data.address.townCity}</td>
                  </tr>
                  <tr>
                    <td>County</td>
                    <td>{data.address.county}</td>
                  </tr>
                  <tr>
                    <td>Post Code</td>
                    <td>{data.address.postCode}</td>
                  </tr>
                </tbody>
              </Table>
              <Tabs defaultActiveKey={1} id="uncontrolled-tab-example">
                <Tab eventKey={1} title="Details">Tab 1 content</Tab>
                <Tab eventKey={2} title="Tab 2">Tab 2 content</Tab>
                <Tab eventKey={3} title="Tab 3">Tab 3 content</Tab>
              </Tabs>
            </ListGroupItem>
          </ListGroup>
          <Button bsStyle="info">
            <Link to="/Search" style={{ textDecoration: 'none', color: 'white' }}>
            Return to search
            </Link>
          </Button>
        </Panel>
      </div>
    );
  }
}

EnterpriseView.propTypes = {
  data: React.PropTypes.shape({
    name: PropTypes.string.isRequired,
  }).isRequired,
};

function select(state) {
  return {
    data: state.apiSearch.refSearch.results,
  };
}

export default connect(select)(EnterpriseView);
