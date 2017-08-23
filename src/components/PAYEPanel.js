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

const PAYEPanel = function ({ paye }) {
  const unitRecord = paye.UnitRecord.vars;
  const json = {
    fullemp: ifEmptyNull(unitRecord, 'fullemp'),
    nameline1: ifEmptyNull(unitRecord, 'nameline1'),
    employer_cat: ifEmptyNull(unitRecord, 'employer_cat'),
    msubemp: ifEmptyNull(unitRecord, 'msubemp'),
    ffullemp: ifEmptyNull(unitRecord, 'ffullemp'),
    legalstatus: ifEmptyNull(unitRecord, 'legalstatus'),
    address3: ifEmptyNull(unitRecord, 'address3'),
    payeref: ifEmptyNull(unitRecord, 'payeref'),
    mar_jobs: ifEmptyNull(unitRecord, 'mar_jobs'),
    tradstyle3: ifEmptyNull(unitRecord, 'tradstyle3'),
    postcode: ifEmptyNull(unitRecord, 'postcode'),
    fsubemp: ifEmptyNull(unitRecord, 'fsubemp'),
    addressref: ifEmptyNull(unitRecord, 'addressref'),
    june_jobs: ifEmptyNull(unitRecord, 'june_jobs'),
    dec_jobs: ifEmptyNull(unitRecord, 'dec_jobs'),
    nameline2: ifEmptyNull(unitRecord, 'nameline2'),
    address5: ifEmptyNull(unitRecord, 'address5'),
    marker: ifEmptyNull(unitRecord, 'marker'),
    inqcode: ifEmptyNull(unitRecord, 'inqcode'),
    tradstyle2: ifEmptyNull(unitRecord, 'tradstyle2'),
    address2: ifEmptyNull(unitRecord, 'address2'),
    entref: ifEmptyNull(unitRecord, 'entref'),
    unclsubemp: ifEmptyNull(unitRecord, 'unclsubemp'),
    nameline3: ifEmptyNull(unitRecord, 'nameline3'),
    birthdate: ifEmptyNull(unitRecord, 'birthdate'),
    prevpaye: ifEmptyNull(unitRecord, 'prevpaye'),
    address1: ifEmptyNull(unitRecord, 'address1'),
    actiondate: ifEmptyNull(unitRecord, 'actiondate'),
    deathdate: ifEmptyNull(unitRecord, 'deathdate'),
    tradstyle1: ifEmptyNull(unitRecord, 'tradstyle1'),
    crn: ifEmptyNull(unitRecord, 'crn'),
    stc: ifEmptyNull(unitRecord, 'stc'),
    jobs_lastupd: ifEmptyNull(unitRecord, 'jobs_lastupd'),
    address4: ifEmptyNull(unitRecord, 'address4'),
    unclemp: ifEmptyNull(unitRecord, 'unclemp'),
    sept_jobs: ifEmptyNull(unitRecord, 'sept_jobs'),
    deathcode: ifEmptyNull(unitRecord, 'deathcode'),
  }
  const title = (<h1 style={{ fontSize: '30px' }}>
    <Glyphicon style={{ fontSize: '28px', verticalAlign: 'middle', marginBottom: '2px' }} glyph="briefcase" />
    &nbsp;&nbsp;{json.nameline1}
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
                <tr><td><strong>Payeref</strong></td><td>{json.payeref}</td></tr>
                <tr><td><strong>Fullemp</strong></td><td>{json.fullemp}</td></tr>
                <tr><td><strong>Nameline1</strong></td><td>{json.nameline1}</td></tr>
                <tr><td><strong>Nameline2</strong></td><td>{json.nameline2}</td></tr>
                <tr><td><strong>Nameline3</strong></td><td>{json.nameline3}</td></tr>
                <tr><td><strong>Employer_cat</strong></td><td>{json.employer_cat}</td></tr>
                <tr><td><strong>Msubemp</strong></td><td>{json.msubemp}</td></tr>
                <tr><td><strong>Ffullemp</strong></td><td>{json.ffullemp}</td></tr>
                <tr><td><strong>Legalstatus</strong></td><td>{json.legalstatus}</td></tr>
                <tr><td><strong>Mar_jobs</strong></td><td>{json.mar_jobs}</td></tr>
                <tr><td><strong>June_jobs</strong></td><td>{json.june_jobs}</td></tr>
                <tr><td><strong>Sept_jobs</strong></td><td>{json.sept_jobs}</td></tr>
                <tr><td><strong>Dec_jobs</strong></td><td>{json.dec_jobs}</td></tr>
                <tr><td><strong>Postcode</strong></td><td>{json.postcode}</td></tr>
                <tr><td><strong>Fsubemp</strong></td><td>{json.fsubemp}</td></tr>
                <tr><td><strong>Addressref</strong></td><td>{json.addressref}</td></tr>
                <tr><td><strong>Marker</strong></td><td>{json.marker}</td></tr>
                <tr><td><strong>Inqcode</strong></td><td>{json.inqcode}</td></tr>
                <tr><td><strong>Tradstyle1</strong></td><td>{json.tradstyle1}</td></tr>
                <tr><td><strong>Tradstyle2</strong></td><td>{json.tradstyle2}</td></tr>
                <tr><td><strong>Tradstyle3</strong></td><td>{json.tradstyle3}</td></tr>
                <tr><td><strong>Entref</strong></td><td>{json.entref}</td></tr>
                <tr><td><strong>Unclsubemp</strong></td><td>{json.unclsubemp}</td></tr>
                <tr><td><strong>Birthdate</strong></td><td>{json.birthdate}</td></tr>
                <tr><td><strong>Deathdate</strong></td><td>{json.deathdate}</td></tr>
                <tr><td><strong>Prevpaye</strong></td><td>{json.prevpaye}</td></tr>
                <tr><td><strong>Actiondate</strong></td><td>{json.actiondate}</td></tr>
                <tr><td><strong>Crn</strong></td><td>{json.crn}</td></tr>
                <tr><td><strong>Stc</strong></td><td>{json.stc}</td></tr>
                <tr><td><strong>Jobs_lastupd</strong></td><td>{json.jobs_lastupd}</td></tr>
                <tr><td><strong>Unclemp</strong></td><td>{json.unclemp}</td></tr>
                <tr><td><strong>deathcode</strong></td><td>{json.deathcode}</td></tr>
                  <tr>
                    <td><strong>Source</strong></td>
                    <td>{paye.UnitLink.unitType}</td>
                  </tr>
                </tbody>
              </Table>
              <h4>Address</h4>
              <Table striped bordered condensed hover>
                <tbody>
                  <tr>
                    <td><strong>Line 1</strong></td>
                    <td>{json.address1}</td>
                  </tr>
                  <tr>
                    <td><strong>Line 2</strong></td>
                    <td>{json.address2}</td>
                  </tr>
                  <tr>
                    <td><strong>Line 3</strong></td>
                    <td>{json.address3}</td>
                  </tr>
                  <tr>
                    <td><strong>Town/City</strong></td>
                    <td>{json.address4}</td>
                  </tr>
                  <tr>
                    <td><strong>County</strong></td>
                    <td>{json.address5}</td>
                  </tr>
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

PAYEPanel.propTypes = {
  paye: PropTypes.object.isRequired,
};

export default PAYEPanel;
