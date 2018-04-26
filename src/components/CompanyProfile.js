import React from 'react';
import PropTypes from 'prop-types';
import DataPanel from '../patterns/DataPanel';

/**
 * @const CompanyProfile - The panel to display Company data
 */
const CompanyProfile = ({ unit }) => (
  <DataPanel
    data={{
      RegAddressCareOf: unit.vars.RegAddressCareOf,
      RegAddressPOBox: unit.vars.RegAddressPOBox,
      RegAddressAddressLine1: unit.vars.RegAddressAddressLine1,
      RegAddressAddressLine2: unit.vars.RegAddressAddressLine2,
      RegAddressPostTown: unit.vars.RegAddressPostTown,
      RegAddressCounty: unit.vars.RegAddressCounty,
      RegAddressCountry: unit.vars.RegAddressCountry,
      RegAddressPostCode: unit.vars.RegAddressPostCode,
      CompanyCategory: unit.vars.CompanyCategory,
      CompanyStatus: unit.vars.CompanyStatus,
      CountryOfOrigin: unit.vars.CountryOfOrigin,
      DissolutionDate: unit.vars.DissolutionDate,
      IncorporationDate: unit.vars.IncorporationDate,
      AccountsAccountRefDay: unit.vars.AccountsAccountRefDay,
      AccountsAccountRefMonth: unit.vars.AccountsAccountRefMonth,
      AccountsNextDueDate: unit.vars.AccountsNextDueDate,
      AccountsLastMadeUpDate: unit.vars.AccountsLastMadeUpDate,
      AccountsAccountCategory: unit.vars.AccountsAccountCategory,
      ReturnsNextDueDate: unit.vars.ReturnsNextDueDate,
      ReturnsLastMadeUpDate: unit.vars.ReturnsLastMadeUpDate,
      MortgagesNumMortCharges: unit.vars.MortgagesNumMortCharges,
      MortgagesNumMortOutstanding: unit.vars.MortgagesNumMortOutstanding,
      MortgagesNumMortPartSatisfied: unit.vars.MortgagesNumMortPartSatisfied,
      MortgagesNumMortSatisfied: unit.vars.MortgagesNumMortSatisfied,
      SICCodeSicText1: unit.vars.SICCodeSicText1,
      SICCodeSicText2: unit.vars.SICCodeSicText2,
      SICCodeSicText3: unit.vars.SICCodeSicText3,
      SICCodeSicText4: unit.vars.SICCodeSicText4,
      LimitedPartnershipsNumGenPartners: unit.vars.LimitedPartnershipsNumGenPartners,
      LimitedPartnershipsNumLimPartners: unit.vars.LimitedPartnershipsNumLimPartners,
      URI: unit.vars.URI,
      PreviousName1CONDATE: unit.vars.PreviousName1CONDATE,
      PreviousName1CompanyName: unit.vars.PreviousName1CompanyName,
      PreviousName2CONDATE: unit.vars.PreviousName2CONDATE,
      PreviousName2CompanyName: unit.vars.PreviousName2CompanyName,
      PreviousName3CONDATE: unit.vars.PreviousName3CONDATE,
      PreviousName3CompanyName: unit.vars.PreviousName3CompanyName,
      PreviousName4CONDATE: unit.vars.PreviousName4CONDATE,
      PreviousName4CompanyName: unit.vars.PreviousName4CompanyName,
      PreviousName5CONDATE: unit.vars.PreviousName5CONDATE,
      PreviousName5CompanyName: unit.vars.PreviousName5CompanyName,
      PreviousName6CONDATE: unit.vars.PreviousName6CONDATE,
      PreviousName6CompanyName: unit.vars.PreviousName6CompanyName,
      PreviousName7CONDATE: unit.vars.PreviousName7CONDATE,
      PreviousName7CompanyName: unit.vars.PreviousName7CompanyName,
      PreviousName8CONDATE: unit.vars.PreviousName8CONDATE,
      PreviousName8CompanyName: unit.vars.PreviousName8CompanyName,
      PreviousName9CONDATE: unit.vars.PreviousName9CONDATE,
      PreviousName9CompanyName: unit.vars.PreviousName9CompanyName,
      PreviousName10CONDATE: unit.vars.PreviousName10CONDATE,
      PreviousName10CompanyName: unit.vars.PreviousName10CompanyName,
      ConfStmtNextDueDate: unit.vars.ConfStmtNextDueDate,
      ConfStmtLastMadeUpDate: unit.vars.ConfStmtLastMadeUpDate,
    }}
  />
);

CompanyProfile.propTypes = {
  unit: PropTypes.object.isRequired,
};

export default CompanyProfile;
