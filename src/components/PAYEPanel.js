import React from 'react';
import PropTypes from 'prop-types';
import { Panel, Table, Form, Glyphicon, Grid, Row, Col } from 'react-bootstrap';
import { TableHeaderColumn } from 'react-bootstrap-table';
import { browserHistory } from 'react-router';
import { getValueByKey } from '../utils/helperMethods';
import PanelToolbar from '../components/PanelToolbar';
import FormStaticValue from '../components/FormStaticValue';
import FormStaticAddress from '../components/FormStaticAddress';
import FormStaticThreePartValue from '../components/FormStaticThreePartValue';
import FormStaticDatedValue from '../components/FormStaticDatedValue';

const PAYEPanel = function ({ paye }) {
  const json = {
    payeref: getValueByKey(paye.vars, 'payeref'),
    name1: getValueByKey(paye.vars, 'name1'),
    employer_cat: getValueByKey(paye.vars, 'employer_cat'),
    msubemp: getValueByKey(paye.vars, 'msubemp'),
    ffullemp: getValueByKey(paye.vars, 'ffullemp'),
    mfullemp: getValueByKey(paye.vars, 'mfullemp'),
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
  const title = (<h1><Glyphicon glyph="user" />&nbsp;{json.name1} <small>{json.payeref}</small></h1>);
  return (
    <div>
      <div className="bootstrap-iso">
        <Panel className="bg-inverse" collapsible={false} defaultExpanded header={title}>
          <PanelToolbar parents={paye.parents} children={paye.children} pageType="REF" />
                    <Grid>
                      <Row className="show-grid">
                        <Form horizontal>
                          <Col sm={4}>
                            <FormStaticAddress id="formAddress" label="Address" address1={json.address1} address2={json.address2} address3={json.address3} address4={json.address4} address5={json.address5} postcode={json.postcode} />
                            <FormStaticValue id="formAddressRef" label="Address Ref." value={json.addressref} />
                            <FormStaticThreePartValue id="formName" label="Name(s)" value1={json.name1} value2={json.name2} value3={json.name3} />
                            <FormStaticThreePartValue id="formTradStyle" label="Trading Style(s)" value1={json.tradstyle1} value2={json.tradstyle2} value3={json.tradstyle3} />
                          </Col>
                          <Col sm={3}>
                            <FormStaticValue id="formLegalStatus" label="Legal Status" value={json.legalstatus} />
                            <FormStaticValue id="formPreviousPaye" label="Previous PAYE" value={json.prevpaye} />
                            <FormStaticValue id="formEntRef" label="Ent. Ref." value={json.entref} />
                            <FormStaticValue id="formCRN" label="CRN" value={json.crn} />
                            <Table condensed hover>
                              <thead>
                                <TableHeaderColumn colSpan='6'>Employees</TableHeaderColumn>
                                <tr>
                                  <th>FTE (M)</th>
                                  <th>FTE (F)</th>
                                  <th>FTE (U)</th>
                                  <th>SE (M)</th>
                                  <th>SE (F)</th>
                                  <th>SE (U)</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td>{json.mfullemp}</td>
                                  <td>{json.ffullemp}</td>
                                  <td>{json.unclemp}</td>
                                  <td>{json.msubemp}</td>
                                  <td>{json.fsubemp}</td>
                                  <td>{json.unclsubemp}</td>
                                </tr>
                               </tbody>
                             </Table>
                             <Table condensed hover>
                              <thead>
                                <TableHeaderColumn colSpan='4'>Jobs ({json.jobs_lastupd})</TableHeaderColumn>
                                <tr>
                                  <th>Mar</th>
                                  <th>Jun</th>
                                  <th>Sep</th>
                                  <th>Dec</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td>{json.mar_jobs}</td>
                                  <td>{json.june_jobs}</td>
                                  <td>{json.sept_jobs}</td>
                                  <td>{json.dec_jobs}</td>
                                </tr>
                               </tbody>
                             </Table>
                          </Col>
                          <Col sm={3}>
                            <FormStaticValue id="formInqCode" label="Inq. Code" value={json.inqcode} />
                            <FormStaticValue id="formMarker" label="Marker" value={json.marker} />
                            <FormStaticValue id="formEmployerCart" label="Employer Cat." value={json.employer_cat} />
                            <FormStaticValue id="formSTC" label="STC" value={json.stc} />
                            <FormStaticValue id="formActionDate" label="Action Date" value={json.actiondate} />
                            <FormStaticValue id="formBirthDate" label="Birth Date" value={json.birthdate} />
                            <FormStaticDatedValue id="formDeathCode" label="Death Code" value={json.deathcode} date={json.deathdate} />
                          </Col>
                        </Form>
                      </Row>
                    </Grid>
        </Panel>
      </div>
      <button className="btn btn--primary margin-bottom-md--2" aria-label="Link back to Search page" onClick={() => browserHistory.push('/RefSearch')} bsStyle="info">
        Return to search
      </button>
    </div>
  );
};

PAYEPanel.propTypes = {
  paye: PropTypes.object.isRequired,
};

export default PAYEPanel;
