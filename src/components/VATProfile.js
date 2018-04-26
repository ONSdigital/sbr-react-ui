import React from 'react';
import PropTypes from 'prop-types';
import DataPanel from '../patterns/DataPanel';

/**
 * @const VATProfile - The panel to display PAYE data
 */
const VATProfile = ({ unit }) => (
  <DataPanel
    data={{
      entref: unit.vars.entref,
      vatref: unit.vars.vatref,
      deathcode: unit.vars.deathcode,
      birthdate: unit.vars.birthdate,
      deathdate: unit.vars.deathdate,
      sic92: unit.vars.sic92,
      turnover: unit.vars.turnover,
      turnover_date: unit.vars.turnover_date,
      record_type: unit.vars.record_type,
      status: unit.vars.status,
      actiondate: unit.vars.actiondate,
      crn: unit.vars.crn,
      marker: unit.vars.marker,
      addressref: unit.vars.addressref,
      inqcode: unit.vars.inqcode,
      name1: unit.vars.name1,
      name2: unit.vars.name2,
      name3: unit.vars.name3,
      tradstyle1: unit.vars.tradstyle1,
      tradstyle2: unit.vars.tradstyle2,
      tradstyle3: unit.vars.tradstyle3,
      address1: unit.vars.address1,
      address2: unit.vars.address2,
      address3: unit.vars.address3,
      address4: unit.vars.address4,
      address5: unit.vars.address5,
      postcode: unit.vars.postcode,
      mkr: unit.vars.mkr,
    }}
  />
);

VATProfile.propTypes = {
  unit: PropTypes.object.isRequired,
};

export default VATProfile;
