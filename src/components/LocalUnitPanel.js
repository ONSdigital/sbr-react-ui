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
            <Col sm={3}>
              <FormStaticAddress id="formAddress" label="Address" postcode={json.postCode} />
              <FormStaticValue id="formLegalStatus" label="Legal Status" value={json.legalStatus} />
              <FormStaticValue id="formTradingStatus" label="Trading Status" value={json.tradingStatus} />
              <FormStaticValue id="formIndustryCode" label="Industry Code" value={json.industryCode} />
              <FormStaticValue id="formEmployees" label="Employees" value={json.employmentBands} />
              <FormStaticValue id="formTurnover" label="Turnover" value={json.turnover} />
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
      name={json.businessName}
      id={json.id}
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
