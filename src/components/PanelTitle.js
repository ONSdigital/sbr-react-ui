import React from 'react';
import PropTypes from 'prop-types';
import { Glyphicon, ButtonToolbar, Button, SplitButton, MenuItem, ButtonGroup } from 'react-bootstrap';

const PanelTitle = function ({ name, id, toggle }) {
  return (
    <div style={{ height: '30px' }}>
      <h4 style={{ marginTop: '0px', paddingBottom: '50px' }}>
        <Glyphicon glyph="tower" />&nbsp;{name} <small>{id}</small>
      </h4>
      <ButtonToolbar className="pull-right" style={{ marginTop: '-92px' }}>
        {/* Provides extra visual weight and identifies the primary action in a set of buttons */}
        <Button bsStyle="primary" onClick={() => toggle()}><Glyphicon glyph="tree-deciduous" />&nbsp;Toggle Tree View</Button>
        <ButtonGroup>
          <Button>1</Button>
          <Button>2</Button>
          <SplitButton title="Dropdown right" pullRight id="split-button-pull-right">
          <MenuItem eventKey="1">Action</MenuItem>
          <MenuItem eventKey="2">Another action</MenuItem>
          <MenuItem eventKey="3">Something else here</MenuItem>
          <MenuItem divider />
          <MenuItem eventKey="4">Separated link</MenuItem>
        </SplitButton>
        </ButtonGroup>
      </ButtonToolbar>
    </div>
  );
};

PanelTitle.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  toggle: PropTypes.func.isRequired,
};

export default PanelTitle;
