import React from 'react';
import PropTypes from 'prop-types';
import { Glyphicon, ButtonToolbar, Button } from 'react-bootstrap';
import { browserHistory } from 'react-router';

const PanelTitle = function ({ name, id }) {
  return (
    <div style={{ height: '30px' }}>
      <h3 style={{ marginTop: '0px', paddingBottom: '50px' }}>
        <Glyphicon glyph="tower" />&nbsp;{name} <small>{id}</small>
      </h3>
      <ButtonToolbar className="pull-right" style={{ marginTop: '-92px' }}>
        <Button bsStyle="primary" onClick={() => browserHistory.push('/TreeView1')}><Glyphicon glyph="tree-deciduous" />&nbsp;Tree 1</Button>
        <Button bsStyle="primary" onClick={() => browserHistory.push('/TreeView2')}><Glyphicon glyph="tree-deciduous" />&nbsp;Tree 2</Button>
        {/* Provides extra visual weight and identifies the primary action in a set of buttons */}
      </ButtonToolbar>
    </div>
  );
};

PanelTitle.propTypes = {
  name: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default PanelTitle;
