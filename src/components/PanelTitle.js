import React from 'react';
import PropTypes from 'prop-types';
import { Glyphicon, ButtonToolbar, Button } from 'react-bootstrap';

const PanelTitle = function ({ name, id, toggle }) {
  return (
    <div style={{ height: '30px' }}>
      <h3 style={{ marginTop: '0px', paddingBottom: '50px' }}>
        <Glyphicon glyph="tower" />&nbsp;{name} <small>{id}</small>
      </h3>
      <ButtonToolbar className="pull-right" style={{ marginTop: '-92px' }}>
        {/* Provides extra visual weight and identifies the primary action in a set of buttons */}
        <Button bsStyle="primary" onClick={() => toggle()}><Glyphicon glyph="tree-deciduous" />&nbsp;Toggle Tree View</Button>
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
