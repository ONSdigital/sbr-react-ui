import React from 'react';
import PropTypes from 'prop-types';
import { Panel, ListGroup, ListGroupItem, Button, Table, Glyphicon } from 'react-bootstrap';
import { browserHistory } from 'react-router';

function ifEmptyNull(data, toGet) {
  let d = '';
  try {
    d = data[toGet];
  } catch (e) {
    d = '';
  }
  return d;
}

const VATPanel = function ({ vat }) {
  const unitRecord = vat.UnitRecord.vars;
  const json = {
    actiondate: ifEmptyNull(unitRecord, 'actiondate'),
    address1: ifEmptyNull(unitRecord, 'address1'),
    address2: ifEmptyNull(unitRecord, 'address2'),
    address3: ifEmptyNull(unitRecord, 'address3'),
    address4: ifEmptyNull(unitRecord, 'address4'),
    address5: ifEmptyNull(unitRecord, 'address5'),
    addressref: ifEmptyNull(unitRecord, 'addressref'),
    birthdate: ifEmptyNull(unitRecord, 'birthdate'),
    crn: ifEmptyNull(unitRecord, 'crn'),
    deathcode: ifEmptyNull(unitRecord, 'deathcode'),
    deathdate: ifEmptyNull(unitRecord, 'deathdate'),
    entref: ifEmptyNull(unitRecord, 'entref'),
    inqcode: ifEmptyNull(unitRecord, 'inqcode'),
    legalstatus: ifEmptyNull(unitRecord, 'legalstatus'),
    marker: ifEmptyNull(unitRecord, 'marker'),
    name1: ifEmptyNull(unitRecord, 'name1'),
    name2: ifEmptyNull(unitRecord, 'name2'),
    name3: ifEmptyNull(unitRecord, 'name3'),
    postcode: ifEmptyNull(unitRecord, 'postcode'),
    record_type: ifEmptyNull(unitRecord, 'record_type'),
    sic92: ifEmptyNull(unitRecord, 'sic92'),
    tradstyle1: ifEmptyNull(unitRecord, 'tradstyle1'),
    tradstyle2: ifEmptyNull(unitRecord, 'tradstyle2'),
    tradstyle3: ifEmptyNull(unitRecord, 'tradstyle3'),
    turnover: ifEmptyNull(unitRecord, 'turnover'),
    turnover_date: ifEmptyNull(unitRecord, 'turnover_date'),
    vatref: ifEmptyNull(unitRecord, 'vatref'),
  };
  const title = (<h1 style={{ fontSize: '30px' }}>
    <Glyphicon style={{ fontSize: '28px', verticalAlign: 'middle', marginBottom: '2px' }} glyph="briefcase" />
    &nbsp;&nbsp;{json.name1}
  </h1>);
  const url = `https://www.google.co.uk/maps/place/${json.postcode}`;
  const mapsLink = <a href={url} target="_blank">{json.postcode}</a>;
  return (
    <div>
      <div className="bootstrap-iso">
        <Panel className="bg-inverse" collapsible={false} defaultExpanded header={title}>
          <ListGroup fill>
            <ListGroupItem>
              <Table striped bordered condensed hover>
                <tbody>
                  <tr><td><strong>Vatref</strong></td><td>{json.vatref}</td></tr>
                  <tr><td><strong>Actiondate</strong></td><td>{json.actiondate}</td></tr>
                  <tr><td><strong>Birthdate</strong></td><td>{json.birthdate}</td></tr>
                  <tr><td><strong>Crn</strong></td><td>{json.crn}</td></tr>
                  <tr><td><strong>Deathcode</strong></td><td>{json.deathcode}</td></tr>
                  <tr><td><strong>Deathdate</strong></td><td>{json.deathdate}</td></tr>
                  <tr><td><strong>Entref</strong></td><td>{json.entref}</td></tr>
                  <tr><td><strong>Inqcode</strong></td><td>{json.inqcode}</td></tr>
                  <tr><td><strong>Legalstatus</strong></td><td>{json.legalstatus}</td></tr>
                  <tr><td><strong>Marker</strong></td><td>{json.marker}</td></tr>
                  <tr><td><strong>name1</strong></td><td>{json.name1}</td></tr>
                  <tr><td><strong>name2</strong></td><td>{json.name2}</td></tr>
                  <tr><td><strong>name3</strong></td><td>{json.name3}</td></tr>
                  <tr><td><strong>Record_type</strong></td><td>{json.record_type}</td></tr>
                  <tr><td><strong>Sic92</strong></td><td>{json.sic92}</td></tr>
                  <tr><td><strong>Tradstyle1</strong></td><td>{json.tradstyle1}</td></tr>
                  <tr><td><strong>Tradstyle2</strong></td><td>{json.tradstyle2}</td></tr>
                  <tr><td><strong>Tradstyle3</strong></td><td>{json.tradstyle3}</td></tr>
                  <tr><td><strong>Turnover</strong></td><td>{json.turnover}</td></tr>
                  <tr><td><strong>Turnover_date</strong></td><td>{json.turnover_date}</td></tr>
                </tbody>
              </Table>
              <h4>Address</h4>
              <Table striped bordered condensed hover>
                <tbody>
                  <tr><td><strong>Address1</strong></td><td>{json.address1}</td></tr>
                  <tr><td><strong>Address2</strong></td><td>{json.address2}</td></tr>
                  <tr><td><strong>Address3</strong></td><td>{json.address3}</td></tr>
                  <tr><td><strong>Address4</strong></td><td>{json.address4}</td></tr>
                  <tr><td><strong>Address5</strong></td><td>{json.address5}</td></tr>
                  <tr><td><strong>Addressref</strong></td><td>{json.addressref}</td></tr>
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
