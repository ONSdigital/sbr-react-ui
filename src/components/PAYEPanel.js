import React from 'react';
import PropTypes from 'prop-types';
import { Panel, ListGroup, ListGroupItem, Table, Glyphicon } from 'react-bootstrap';
import { browserHistory } from 'react-router';
import { getValueByKey } from '../utils/helperMethods';

const PAYEPanel = function ({ paye }) {
  const unitRecord = paye.UnitRecord.vars;
  const json = {
    payeref: getValueByKey(unitRecord, 'payeref'),
    name1: getValueByKey(unitRecord, 'name1'),
    employer_cat: getValueByKey(unitRecord, 'employer_cat'),
    msubemp: getValueByKey(unitRecord, 'msubemp'),
    ffullemp: getValueByKey(unitRecord, 'ffullemp'),
    legalstatus: getValueByKey(unitRecord, 'legalstatus'),
    address3: getValueByKey(unitRecord, 'address3'),
    mar_jobs: getValueByKey(unitRecord, 'mar_jobs'),
    tradstyle3: getValueByKey(unitRecord, 'tradstyle3'),
    postcode: getValueByKey(unitRecord, 'postcode'),
    fsubemp: getValueByKey(unitRecord, 'fsubemp'),
    addressref: getValueByKey(unitRecord, 'addressref'),
    june_jobs: getValueByKey(unitRecord, 'june_jobs'),
    dec_jobs: getValueByKey(unitRecord, 'dec_jobs'),
    name2: getValueByKey(unitRecord, 'name2'),
    address5: getValueByKey(unitRecord, 'address5'),
    marker: getValueByKey(unitRecord, 'marker'),
    inqcode: getValueByKey(unitRecord, 'inqcode'),
    tradstyle2: getValueByKey(unitRecord, 'tradstyle2'),
    address2: getValueByKey(unitRecord, 'address2'),
    entref: getValueByKey(unitRecord, 'entref'),
    unclsubemp: getValueByKey(unitRecord, 'unclsubemp'),
    name3: getValueByKey(unitRecord, 'name3'),
    birthdate: getValueByKey(unitRecord, 'birthdate'),
    prevpaye: getValueByKey(unitRecord, 'prevpaye'),
    address1: getValueByKey(unitRecord, 'address1'),
    actiondate: getValueByKey(unitRecord, 'actiondate'),
    deathdate: getValueByKey(unitRecord, 'deathdate'),
    tradstyle1: getValueByKey(unitRecord, 'tradstyle1'),
    crn: getValueByKey(unitRecord, 'crn'),
    stc: getValueByKey(unitRecord, 'stc'),
    jobs_lastupd: getValueByKey(unitRecord, 'jobs_lastupd'),
    address4: getValueByKey(unitRecord, 'address4'),
    unclemp: getValueByKey(unitRecord, 'unclemp'),
    sept_jobs: getValueByKey(unitRecord, 'sept_jobs'),
    deathcode: getValueByKey(unitRecord, 'deathcode'),
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
                <tr><td><strong>Payeref</strong></td><td>{json.payeref}</td></tr>
                <tr><td><strong>Fullemp</strong></td><td>{json.fullemp}</td></tr>
                <tr><td><strong>name1</strong></td><td>{json.name1}</td></tr>
                <tr><td><strong>name2</strong></td><td>{json.name2}</td></tr>
                <tr><td><strong>name3</strong></td><td>{json.name3}</td></tr>
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
