import React from 'react';
import PropTypes from 'prop-types';

/**
 * @const DataPanel - This panel will show the data for the unit data that is
 * passed in.
 */
const DataPanel = ({ data }) => {
  return (
    <div className="panel panel--simple panel--info u-mb-l" style={{ paddingBottom: '1.5rem' }}>
      <table className="unit-info">
        <tbody>
          {
            Object.entries(data).map(([key, value]) => (
              <tr key={`${key}-${value}`}>
                <th key={key} className="mars">{key}</th>
                <td key={value} className="venus">{value}</td>
              </tr>
            ))
          }
        </tbody>
      </table>
    </div>
  );
};

DataPanel.propTypes = {
  data: PropTypes.object.isRequired,
};

export default DataPanel;
