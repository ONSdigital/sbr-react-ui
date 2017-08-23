import React from 'react';
import PropTypes from 'prop-types';
import { Panel, ListGroup, ListGroupItem, Table, Glyphicon } from 'react-bootstrap';
import { browserHistory } from 'react-router';
import { getValueByKey } from '../utils/helperMethods';

const VATPanel = function ({ vat }) {
  const unitRecord = vat.UnitRecord.vars;
  const json = {
    actiondate: getValueByKey(unitRecord, 'actiondate'),
    address1: getValueByKey(unitRecord, 'address1'),
    address2: getValueByKey(unitRecord, 'address2'),
    address3: getValueByKey(unitRecord, 'address3'),
    address4: getValueByKey(unitRecord, 'address4'),
    address5: getValueByKey(unitRecord, 'address5'),
    addressref: getValueByKey(unitRecord, 'addressref'),
    birthdate: getValueByKey(unitRecord, 'birthdate'),
    crn: getValueByKey(unitRecord, 'crn'),
    deathcode: getValueByKey(unitRecord, 'deathcode'),
    deathdate: getValueByKey(unitRecord, 'deathdate'),
    entref: getValueByKey(unitRecord, 'entref'),
    inqcode: getValueByKey(unitRecord, 'inqcode'),
    legalstatus: getValueByKey(unitRecord, 'legalstatus'),
    marker: getValueByKey(unitRecord, 'marker'),
    name1: getValueByKey(unitRecord, 'name1'),
    name2: getValueByKey(unitRecord, 'name2'),
    name3: getValueByKey(unitRecord, 'name3'),
    postcode: getValueByKey(unitRecord, 'postcode'),
    record_type: getValueByKey(unitRecord, 'record_type'),
    sic92: getValueByKey(unitRecord, 'sic92'),
    tradstyle1: getValueByKey(unitRecord, 'tradstyle1'),
    tradstyle2: getValueByKey(unitRecord, 'tradstyle2'),
    tradstyle3: getValueByKey(unitRecord, 'tradstyle3'),
    turnover: getValueByKey(unitRecord, 'turnover'),
    turnover_date: getValueByKey(unitRecord, 'turnover_date'),
    vatref: getValueByKey(unitRecord, 'vatref'),
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
