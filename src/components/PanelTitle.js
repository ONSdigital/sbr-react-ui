import React from 'react';
import PropTypes from 'prop-types';
import { Glyphicon, ButtonToolbar, Button, SplitButton, MenuItem, ButtonGroup } from 'react-bootstrap';

const PanelTitle = function ({ name, id, unitType, toggle, goToDataView, goToEditView, goToTreeView1, goToTreeView2 }) {
  const style = {
    marginLeft: '0px',
  };
  const editButton = (<Button onClick={() => goToEditView()} style={style}><Glyphicon glyph="edit" /></Button>);
  const displayEditButton = (unitType === 'ENT') ? editButton : null;
  return (
    <div style={{ height: '30px' }}>
      <h4 style={{ marginTop: '0px', paddingBottom: '50px' }}>
        <Glyphicon glyph="tower" />&nbsp;{name} <small>{id}</small>
      </h4>
      <ButtonToolbar className="pull-right" style={{ marginTop: '-88px' }}>
        {/* Provides extra visual weight and identifies the primary action in a set of buttons */}
        {/* <Button bsStyle="primary" onClick={() => goToDataView()}><Glyphicon glyph="tree-deciduous" />&nbsp;Toggle Tree View</Button> */}
        <Button onClick={() => goToDataView()}><Glyphicon glyph="list" /></Button>
        {displayEditButton}
        <Button style={style} onClick={() => goToTreeView1()}><Glyphicon glyph="tree-deciduous" /></Button>
        <Button style={style} onClick={() => goToTreeView2()}><Glyphicon glyph="tree-conifer" /></Button>
      </ButtonToolbar>
    </div>
  );
};

PanelTitle.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  unitType: PropTypes.string.isRequired,
  toggle: PropTypes.func.isRequired,
  goToDataView: PropTypes.func.isRequired,
  goToEditView: PropTypes.func.isRequired,
  goToTreeView1: PropTypes.func.isRequired,
  goToTreeView2: PropTypes.func.isRequired,
};

export default PanelTitle;
