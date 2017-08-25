import React from 'react';
import PropTypes from 'prop-types';
import { Panel, ListGroup, ListGroupItem, Table, Glyphicon } from 'react-bootstrap';
import { browserHistory } from 'react-router';
import { getValueByKey } from '../utils/helperMethods';
import PanelToolbar from '../components/PanelToolbar';

const PAYEPanel = function ({ paye }) {
  const json = {
    payeref: getValueByKey(paye.vars, 'payeref'),
    name1: getValueByKey(paye.vars, 'name1'),
    employer_cat: getValueByKey(paye.vars, 'employer_cat'),
    msubemp: getValueByKey(paye.vars, 'msubemp'),
    ffullemp: getValueByKey(paye.vars, 'ffullemp'),
    legalstatus: getValueByKey(paye.vars, 'legalstatus'),
    address3: getValueByKey(paye.vars, 'address3'),
    mar_jobs: getValueByKey(paye.vars, 'mar_jobs'),
    tradstyle3: getValueByKey(paye.vars, 'tradstyle3'),
    postcode: getValueByKey(paye.vars, 'postcode'),
    fsubemp: getValueByKey(paye.vars, 'fsubemp'),
    addressref: getValueByKey(paye.vars, 'addressref'),
    june_jobs: getValueByKey(paye.vars, 'june_jobs'),
    dec_jobs: getValueByKey(paye.vars, 'dec_jobs'),
    name2: getValueByKey(paye.vars, 'name2'),
    address5: getValueByKey(paye.vars, 'address5'),
    marker: getValueByKey(paye.vars, 'marker'),
    inqcode: getValueByKey(paye.vars, 'inqcode'),
    tradstyle2: getValueByKey(paye.vars, 'tradstyle2'),
    address2: getValueByKey(paye.vars, 'address2'),
    entref: getValueByKey(paye.vars, 'entref'),
    unclsubemp: getValueByKey(paye.vars, 'unclsubemp'),
    name3: getValueByKey(paye.vars, 'name3'),
    birthdate: getValueByKey(paye.vars, 'birthdate'),
    prevpaye: getValueByKey(paye.vars, 'prevpaye'),
    address1: getValueByKey(paye.vars, 'address1'),
    actiondate: getValueByKey(paye.vars, 'actiondate'),
    deathdate: getValueByKey(paye.vars, 'deathdate'),
    tradstyle1: getValueByKey(paye.vars, 'tradstyle1'),
    crn: getValueByKey(paye.vars, 'crn'),
    stc: getValueByKey(paye.vars, 'stc'),
    jobs_lastupd: getValueByKey(paye.vars, 'jobs_lastupd'),
    address4: getValueByKey(paye.vars, 'address4'),
    unclemp: getValueByKey(paye.vars, 'unclemp'),
    sept_jobs: getValueByKey(paye.vars, 'sept_jobs'),
    deathcode: getValueByKey(paye.vars, 'deathcode'),
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
          <PanelToolbar parents={paye.parents} children={paye.children} pageType="REF" />
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
