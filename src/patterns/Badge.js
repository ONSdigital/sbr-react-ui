import React from 'react';
import PropTypes from 'prop-types';

/**
 * @const Badge - 
 */
const Badge = ({ name, colour }) => {
  return (<div className={`badge badge--${colour} ent-reference`}>{name}</div>);
};

Badge.propTypes = {
  name: PropTypes.string.isRequired,
  colour: PropTypes.string.isRequired,
};

export default Badge;
