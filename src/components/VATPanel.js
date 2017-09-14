import React from 'react';
import PropTypes from 'prop-types';
import { Panel, Form, Glyphicon, Grid, Row, Col } from 'react-bootstrap';
import { browserHistory } from 'react-router';
import { getValueByKey } from '../utils/helperMethods';
import FormStaticValue from '../components/FormStaticValue';
import FormStaticAddress from '../components/FormStaticAddress';
import FormStaticThreePartValue from '../components/FormStaticThreePartValue';
import FormLink from '../components/FormLink';

const VATPanel = function ({ vat }) {
  const json = {
    actiondate: getValueByKey(vat.vars, 'actiondate'),
    address1: getValueByKey(vat.vars, 'address1'),
    address2: getValueByKey(vat.vars, 'address2'),
    address3: getValueByKey(vat.vars, 'address3'),
    address4: getValueByKey(vat.vars, 'address4'),
    address5: getValueByKey(vat.vars, 'address5'),
    addressref: getValueByKey(vat.vars, 'addressref'),
    birthdate: getValueByKey(vat.vars, 'birthdate'),
    crn: getValueByKey(vat.vars, 'crn'),
    deathcode: getValueByKey(vat.vars, 'deathcode'),
    deathdate: getValueByKey(vat.vars, 'deathdate'),
    entref: getValueByKey(vat.vars, 'entref'),
    inqcode: getValueByKey(vat.vars, 'inqcode'),
    legalstatus: getValueByKey(vat.vars, 'legalstatus'),
    marker: getValueByKey(vat.vars, 'marker'),
    name1: getValueByKey(vat.vars, 'name1'),
    name2: getValueByKey(vat.vars, 'name2'),
    name3: getValueByKey(vat.vars, 'name3'),
    postcode: getValueByKey(vat.vars, 'postcode'),
    record_type: getValueByKey(vat.vars, 'record_type'),
    sic92: getValueByKey(vat.vars, 'sic92'),
    tradstyle1: getValueByKey(vat.vars, 'tradstyle1'),
    tradstyle2: getValueByKey(vat.vars, 'tradstyle2'),
    tradstyle3: getValueByKey(vat.vars, 'tradstyle3'),
    turnover: getValueByKey(vat.vars, 'turnover'),
    turnover_date: getValueByKey(vat.vars, 'turnover_date'),
    vatref: getValueByKey(vat.vars, 'vatref'),
  };
  const title = (<h1><Glyphicon glyph="piggy-bank" />&nbsp;{json.name1} <small>{json.vatref}</small></h1>);
  const entLink = `/Enterprises/${json.entref}`;
  const crnLink = `/Companies/${json.crn}`;
  return (
    <div>
      <div className="bootstrap-iso">
        <Panel className="bg-inverse" collapsible={false} defaultExpanded header={title}>
          <Grid>
            <Row className="show-grid">
              <Form horizontal>
                <Col sm={4}>
                  <FormStaticAddress id="formAddress" label="Address" address1={json.address1} address2={json.address2} address3={json.address3} address4={json.address4} address5={json.address5} postcode={json.postcode} />
                  <FormStaticThreePartValue id="formName" label="Name(s)" value1={json.name1} value2={json.name2} value3={json.name3} />
                  <FormStaticThreePartValue id="formTradStyle" label="Trading Style(s)" value1={json.tradstyle1} value2={json.tradstyle2} value3={json.tradstyle3} />
                </Col>
                <Col sm={3}>
                  <FormStaticValue id="formLegalStatus" label="Legal Status" value={json.legalstatus} />
                  <FormLink id="formEntRef" label="Ent. Ref." value={json.entref} unitType="ENT" />
                  <FormLink id="formCRN" label="CRN" value={json.crn} unitType="CH" />
                  <FormStaticValue id="formRecordType" label="Record Type" value={json.record_type} />
                  <FormStaticValue id="formSic92" label="SIC (92)" value={json.sic92} />
                  <FormStaticValue id="formTurnover" label="Turnover" value={json.turnover} />
                  <FormStaticValue id="formTurnoverDate" label="Turnover Date" value={json.turnover_date} />
                </Col>
                <Col sm={3}>
                  <FormStaticValue id="formInqCode" label="Inq. Code" value={json.inqcode} />
                  <FormStaticValue id="formMarker" label="Marker" value={json.marker} />
                  <FormStaticValue id="formActionDate" label="Action Date" value={json.actiondate} />
                  <FormStaticValue id="formBirthDate" label="Birth Date" value={json.birthdate} />
                  <FormStaticValue id="formDeathCode" label="Death Code" value={json.deathcode} />
                  <FormStaticValue id="formDeathDate" label="Death Date" value={json.deathdate} />
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

VATPanel.propTypes = {
  vat: PropTypes.object.isRequired,
};

export default VATPanel;
