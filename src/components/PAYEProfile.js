import React from 'react';
import PropTypes from 'prop-types';
import DataPanel from '../patterns/DataPanel';

/**
 * @class PAYEProfile - 
 */
class PAYEProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: false,
    };
  }
  render = () => {
    const unit = this.props.unit;
    return (
      <DataPanel
        data={{
          entref: unit.vars.entref,
          payeref: unit.vars.payeref,
          deathcode: unit.vars.deathcode,
          birthdate: unit.vars.birthdate,
          mfullemp: unit.vars.mfullemp,
          msubemp: unit.vars.msubemp,
          ffullemp: unit.vars.ffullemp,
          fsubemp: unit.vars.fsubemp,
          unclemp: unit.vars.unclemp,
          unclsubemp: unit.vars.unclsubemp,
          dec_jobs: unit.vars.dec_jobs,
          mar_jobs: unit.vars.mar_jobs,
          june_jobssept_jobs: unit.vars.june_jobssept_jobs,
          jobs_lsatupd: unit.vars.jobs_lsatupd,
          status: unit.vars.status,
          prevpaye: unit.vars.prevpaye,
          employer_cat: unit.vars.employer_cat,
          stc: unit.vars.stc,
          crn: unit.vars.crn,
          actiondate: unit.vars.actiondate,
          addressref: unit.vars.addressref,
          marker: unit.vars.marker,
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
  }
}

PAYEProfile.propTypes = {
  unit: PropTypes.object.isRequired,
};

export default PAYEProfile;
