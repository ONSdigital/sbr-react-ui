import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'registers-react-library';
import { Panel, Table, Form, Grid, Row, Col } from 'react-bootstrap';
import { browserHistory } from 'react-router';
import { formPayeJson } from '../utils/formJson';
import FormStaticValue from '../components/FormStaticValue';
import FormStaticAddress from '../components/FormStaticAddress';
import FormStaticThreePartValue from '../components/FormStaticThreePartValue';
import FormStaticDatedValue from '../components/FormStaticDatedValue';
import FormLink from '../components/FormLink';
import PanelTitle from '../components/PanelTitle';
import TreeView1 from '../components/TreeView1';
import TreeView2 from '../components/TreeView2';

const PAYEPanel = function ({ paye, showTreeView, toggleTreeView, goToView }) {
  const json = formPayeJson(paye);
  function panelContent() {
    let dataView = (
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
              <FormLink id="formEntRef" label="Ent. Ref." value={json.entref} unitType="ENT" />
              <FormLink id="formCRN" label="CRN" value={json.crn} unitType="CH" />
              <Table condensed hover>
                <thead>
                  <tr colSpan="6"><td><strong>Employees</strong></td></tr>
                  <tr>
                    <td>FTE (M)</td>
                    <td>FTE (F)</td>
                    <td>FTE (U)</td>
                    <td>SE (M)</td>
                    <td>SE (F)</td>
                    <td>SE (U)</td>
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
                  <tr colSpan="4"><td><strong>Jobs ({json.jobs_lastupd})</strong></td></tr>
                  <tr>
                    <td>Mar</td>
                    <td>Jun</td>
                    <td>Sep</td>
                    <td>Dec</td>
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
    );
    if (showTreeView === 1) {
      dataView = (
        <TreeView1
          entryNodeId={paye.id}
          unitType={'PAYE'}
          enterpriseId={paye.parents.ENT}
          childrenJson={{}}
        />
      );
    } else if (showTreeView === 2) {
      dataView = (
        <TreeView2
          entryNodeId={paye.id}
          unitType={'PAYE'}
          enterpriseId={paye.parents.ENT}
          childrenJson={{}}
        />
      );
    }
    return dataView;
  }
  const title = (
    <PanelTitle
      toggle={() => toggleTreeView('PAYE', paye.parents.ENT)}
      goToDataView={() => goToView(0)}
      goToTreeView1={() => goToView(1)}
      goToTreeView2={() => goToView(2)}
      goToEditView={() => goToView(3)}
      name={json.name1}
      id={json.payeref}
      accessor="paye"
      unitType="PAYE"
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

PAYEPanel.propTypes = {
  paye: PropTypes.object.isRequired,
  // We do not wrap the props below in .isRequired as they are passed in to
  // PAYEPanel by PanelContainer.
  showTreeView: PropTypes.number,
  toggleTreeView: PropTypes.func,
  goToView: PropTypes.func,
};

export default PAYEPanel;
