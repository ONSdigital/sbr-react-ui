import React from 'react';
import PropTypes from 'prop-types';

/**
 * @const Id - 
 */
const Id = ({ field, id }) => (<div className="ent-reference u-mb-l">{field} <strong>{id}</strong></div>);

Id.propTypes = {
  field: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
};

export default Id;
