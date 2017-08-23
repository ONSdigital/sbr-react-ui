import React from 'react';
import PropTypes from 'prop-types';
import { Panel, ListGroup, ListGroupItem, Button, Table, Glyphicon } from 'react-bootstrap';
import { browserHistory } from 'react-router';

const VATPanel = function ({ vat }) {
  const unitRecord = vat.UnitRecord;
  const unitRecordValues = unitRecord.vars;
  const title = (<h1 style={{ fontSize: '30px' }}>
    <Glyphicon style={{ fontSize: '28px', verticalAlign: 'middle', marginBottom: '2px' }} glyph="briefcase" />
    &nbsp;&nbsp;{vat.businessName}
  </h1>);
  const url = `https://www.google.co.uk/maps/place/${vat.postCode}`;
  const mapsLink = <a href={url} target="_blank">{unitRecordValues.postcode}</a>;
  return (
    <div>
      <div className="bootstrap-iso">
        <Panel className="bg-inverse" collapsible={false} defaultExpanded header={title}>
          <ListGroup fill>
            <ListGroupItem>
              <Table striped bordered condensed hover>
                <tbody>
                  <tr>
                    <td><strong>Vatref</strong></td><td>{unitRecordValues.vatref}</td></tr>
                    <tr><td><strong>Actiondate</strong></td><td>{unitRecordValues.actiondate}</td></tr>
                    <tr><td><strong>Birthdate</strong></td><td>{unitRecordValues.birthdate}</td></tr>
                    <tr><td><strong>Crn</strong></td><td>{unitRecordValues.crn}</td></tr>
                    <tr><td><strong>Deathcode</strong></td><td>{unitRecordValues.deathcode}</td></tr>
                    <tr><td><strong>Deathdate</strong></td><td>{unitRecordValues.deathdate}</td></tr>
                    <tr><td><strong>Entref</strong></td><td>{unitRecordValues.entref}</td></tr>
                    <tr><td><strong>Inqcode</strong></td><td>{unitRecordValues.inqcode}</td></tr>
                    <tr><td><strong>Legalstatus</strong></td><td>{unitRecordValues.legalstatus}</td></tr>
                    <tr><td><strong>Marker</strong></td><td>{unitRecordValues.marker}</td></tr>
                    <tr><td><strong>Nameline1</strong></td><td>{unitRecordValues.nameline1}</td></tr>
                    <tr><td><strong>Nameline2</strong></td><td>{unitRecordValues.nameline2}</td></tr>
                    <tr><td><strong>Nameline3</strong></td><td>{unitRecordValues.nameline3}</td></tr>
                    <tr><td><strong>Record_type</strong></td><td>{unitRecordValues.record_type}</td></tr>
                    <tr><td><strong>Sic92</strong></td><td>{unitRecordValues.sic92}</td></tr>
                    <tr><td><strong>Tradstyle1</strong></td><td>{unitRecordValues.tradstyle1}</td></tr>
                    <tr><td><strong>Tradstyle2</strong></td><td>{unitRecordValues.tradstyle2}</td></tr>
                    <tr><td><strong>Tradstyle3</strong></td><td>{unitRecordValues.tradstyle3}</td></tr>
                    <tr><td><strong>Turnover</strong></td><td>{unitRecordValues.turnover}</td></tr>
                    <tr><td><strong>Turnover_date</strong></td><td>{unitRecordValues.turnover_date}</td></tr>
                </tbody>
              </Table>
              <h4>Address</h4>
              <Table striped bordered condensed hover>
                <tbody>
                  <tr><td><strong>Address1</strong></td><td>{unitRecordValues.address1}</td></tr>
                  <tr><td><strong>Address2</strong></td><td>{unitRecordValues.address2}</td></tr>
                  <tr><td><strong>Address3</strong></td><td>{unitRecordValues.address3}</td></tr>
                  <tr><td><strong>Address4</strong></td><td>{unitRecordValues.address4}</td></tr>
                  <tr><td><strong>Address5</strong></td><td>{unitRecordValues.address5}</td></tr>
                  <tr><td><strong>Addressref</strong></td><td>{unitRecordValues.addressref}</td></tr>
                  <tr><td><strong>Postcode</strong></td><td>{mapsLink}</td></tr>
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
