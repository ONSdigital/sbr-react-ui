import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'registers-react-library';
import { Panel, Form, Grid, Row, Col } from 'react-bootstrap';
import { browserHistory } from 'react-router';
import { formLOUJson } from '../utils/formJson';
import FormStaticValue from '../components/FormStaticValue';
import FormStaticAddress from '../components/FormStaticAddress';
import PanelTitle from '../components/PanelTitle';
import TreeView1 from '../components/TreeView1';

const LocalUnitPanel = ({ localUnit, showTreeView, toggleTreeView, goToView }) => {
  const json = formLOUJson(localUnit);
  function panelContent() {
    let dataView = (
      <Grid>
        <Row className="show-grid">
          <Form horizontal>
            <Col sm={4}>
              <FormStaticValue id="formLuref" label="Local Unit Reference (IDBR)" value={json.luref} />
              <FormStaticValue id="formErn" label="Enterprise Reference Number" value={json.ern} />
              <FormStaticValue id="formEntref" label="Enterprise Reference (IDBR)" value={json.ern} />
              <FormStaticValue id="formName" label="Name" value={json.name} />
              <FormStaticValue id="formTradingStatus" label="Trading Style" value={json.tradingStyle} />
              <FormStaticValue id="formSic07" label="SIC 07" value={json.sic07} />
              <FormStaticValue id="formEmployees" label="Employees" value={json.employees} />
            </Col>
            <Col sm={4}>
              <FormStaticAddress id="formAddress" label="Address" address1={json.address1} address2={json.address2} address3={json.address3} address4={json.address4} address5={json.address5} postcode={json.postcode} />
            </Col>
          </Form>
        </Row>
      </Grid>
    );
    if (showTreeView === 1) {
      dataView = (
        <TreeView1
          entryNodeId={localUnit.id}
          unitType={'LEU'}
          enterpriseId={localUnit.parents.ENT}
          childrenJson={{}}
        />
      );
    }
    return dataView;
  }
  const title = (
    <PanelTitle
      toggle={() => toggleTreeView()}
      goToDataView={() => goToView(0)}
      goToTreeView1={() => goToView(1)}
      goToTreeView2={() => goToView(2)}
      goToEditView={() => goToView(3)}
      name={json.name}
      id={json.lurn}
      accessor="localUnit"
      unitType="LOU"
    />
  );
  return (
    <div id="bootstrap-container" style={{ height: '100%' }}>
      <div className="bootstrap-iso" style={{ height: '95%' }}>
        <Panel id="panelContainer" className="bg-inverse" style={{ height: '100%', marginBottom: '0px' }} collapsible={false} defaultExpanded header={title}>
          {panelContent()}
        </Panel>
      </div>
      <div className="margin-bottom-md--2" style={{ marginTop: '20px' }}>
        <Button id="returnToSearchButton" size="wide" text="Return to search" onClick={() => browserHistory.push('/RefSearch')} ariaLabel="Return to search Button" type="submit" />
      </div>
    </div>
  );
};

LocalUnitPanel.propTypes = {
  localUnit: PropTypes.object.isRequired,
  // We do not wrap the props below in .isRequired as they are passed in to
  // LegalUnitPanel by PanelContainer.
  showTreeView: PropTypes.number,
  toggleTreeView: PropTypes.func,
  goToView: PropTypes.func,
};

export default LocalUnitPanel;
