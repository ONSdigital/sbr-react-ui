import React from 'react';
import PropTypes from 'prop-types';
import { Panel, Form, Grid, Row, Col } from 'react-bootstrap';
import { browserHistory } from 'react-router';
import { formVatJson } from '../utils/formJson';
import FormStaticValue from '../components/FormStaticValue';
import FormStaticAddress from '../components/FormStaticAddress';
import FormStaticThreePartValue from '../components/FormStaticThreePartValue';
import FormLink from '../components/FormLink';
import PanelTitle from '../components/PanelTitle';
import TreeView1 from '../components/TreeView1';
import TreeView2 from '../components/TreeView2';

const VATPanel = function ({ vat, showTreeView, toggleTreeView, goToView }) {
  const json = formVatJson(vat);
  const title = (
    <PanelTitle
      toggle={() => toggleTreeView('VAT', vat.parents.ENT)}
      goToDataView={() => goToView(0)}
      goToTreeView1={() => goToView(1)}
      goToTreeView2={() => goToView(2)}
      goToEditView={() => goToView(3)}
      name={json.name1}
      id={json.vatref}
      accessor="vat"
      unitType="VAT"
    />
  );
  function panelContent() {
    let dataView = (
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
    );
    if (showTreeView === 1) {
      dataView = (
        <TreeView1
          entryNodeId={vat.id}
          unitType={'VAT'}
          enterpriseId={vat.parents.ENT}
          childrenJson={{}}
        />
      );
    } else if (showTreeView === 2) {
      dataView = (
        <TreeView2
          entryNodeId={vat.id}
          unitType={'VAT'}
          enterpriseId={vat.parents.ENT}
          childrenJson={{}}
        />
      );
    }
    return dataView;
  }
  return (
    <div id="bootstrap-container" style={{ height: '100%' }}>
      <div className="bootstrap-iso" style={{ height: '95%' }}>
        <Panel id="panelContainer" className="bg-inverse" style={{ height: '100%', marginBottom: '0px' }} collapsible={false} defaultExpanded header={title}>
          {panelContent()}
        </Panel>
      </div>
      <button style={{ marginTop: '20px' }} className="btn btn--primary margin-bottom-md--2" aria-label="Link back to Search page" onClick={() => browserHistory.push('/RefSearch')} bsStyle="info">
        Return to search
      </button>
    </div>
  );
};

VATPanel.propTypes = {
  vat: PropTypes.object.isRequired,
  // We do not wrap the props below in .isRequired as they are passed in to
  // VATPanel by PanelContainer.
  showTreeView: PropTypes.number,
  toggleTreeView: PropTypes.func,
  goToView: PropTypes.func,
};

export default VATPanel;
