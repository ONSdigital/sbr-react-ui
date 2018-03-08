// @flow

import { getValueByKey } from './helperMethods';

export function formEnterpriseJson(enterprise: object) {
  return {
    legalstatus: getValueByKey(enterprise.vars, 'legalstatus'),
    standard_vat_turnover: getValueByKey(enterprise.vars, 'standard_vat_turnover'),
    ent_address3: getValueByKey(enterprise.vars, 'ent_address3'),
    PAYE_jobs: getValueByKey(enterprise.vars, 'latestSum'),
    employees: getValueByKey(enterprise.vars, 'avg'),
    ent_address2: getValueByKey(enterprise.vars, 'ent_address2'),
    ent_postcode: getValueByKey(enterprise.vars, 'postcode'),
    entref: getValueByKey(enterprise.vars, 'ern'),
    ent_address5: getValueByKey(enterprise.vars, 'ent_address5'),
    Num_Unique_VatRefs: getValueByKey(enterprise.vars, 'Num_Unique_VatRefs'),
    ent_address1: getValueByKey(enterprise.vars, 'ent_address1'),
    ent_name: getValueByKey(enterprise.vars, 'name'),
    Num_Unique_PayeRefs: getValueByKey(enterprise.vars, 'Num_Unique_PayeRefs'),
    ent_address4: getValueByKey(enterprise.vars, 'ent_address4'),
  };
}

export function formCompanyJson(company: object) {
  return {
    accounts_accountrefmonth: getValueByKey(company.vars, 'Accounts.AccountRefMonth'),
    limitedpartnerships_numlimpartners: getValueByKey(company.vars, 'LimitedPartnerships.NumLimPartners'),
    regaddress_posttown: getValueByKey(company.vars, 'RegAddress.PostTown'),
    returns_nextduedate: getValueByKey(company.vars, 'Returns.NextDueDate'),
    accounts_accountrefday: getValueByKey(company.vars, 'Accounts.AccountRefDay'),
    accounts_accountcategory: getValueByKey(company.vars, 'Accounts.AccountCategory'),
    regaddress_addressline2: getValueByKey(company.vars, 'RegAddress.AddressLine2'),
    mortgages_nummortoutstanding: getValueByKey(company.vars, 'Mortgages.NumMortOutstanding'),
    companyname: getValueByKey(company.vars, 'CompanyName'),
    confstmtlastmadeupdate: getValueByKey(company.vars, 'ConfStmtLastMadeUpdate'),
    uri: getValueByKey(company.vars, 'URI'),
    countryoforigin: getValueByKey(company.vars, 'CountryOfOrigin'),
    accounts_nextduedate: getValueByKey(company.vars, 'Accounts.NextDueDate'),
    accounts_lastmadeupdate: getValueByKey(company.vars, 'Accounts.LastMadeUpdate'),
    siccode_sictext_1: getValueByKey(company.vars, 'SICCode.SicText_1'),
    limitedpartnerships_numgenpartners: getValueByKey(company.vars, 'LimitedPartnerships.NumGenPartners'),
    regaddress_addressline1: getValueByKey(company.vars, 'RegAddress.AddressLine1'),
    companynumber: getValueByKey(company.vars, 'CompanyNumber'),
    companycategory: getValueByKey(company.vars, 'CompanyCategory'),
    regaddress_county: getValueByKey(company.vars, 'RegAddress.County'),
    incorporationdate: getValueByKey(company.vars, 'IncorporationDate'),
    confstmtnextduedate: getValueByKey(company.vars, 'ConfStmtNextDueDate'),
    regaddress_postcode: getValueByKey(company.vars, 'RegAddress.PostCode'),
    mortgages_nummortcharges: getValueByKey(company.vars, 'Mortgages.NumMortCharges'),
    returns_lastmadeupdate: getValueByKey(company.vars, 'Returns.LastMadeUpdate'),
    mortgages_nummortsatisfied: getValueByKey(company.vars, 'Mortgages.NumMortSatisfied'),
    companystatus: getValueByKey(company.vars, 'CompanyStatus'),
    mortgages_nummortpartsatisfied: getValueByKey(company.vars, 'Mortgages.NumMortPartSatisfied'),
  };
}

export function formLEUJson(leu) {
  return {
    id: getValueByKey(leu.vars, 'id'),
    businessName: getValueByKey(leu.vars, 'BusinessName'),
    legalStatus: getValueByKey(leu.vars, 'LegalStatus'),
    industryCode: getValueByKey(leu.vars, 'IndustryCode'),
    companyNo: getValueByKey(leu.vars, 'CompanyNo'),
    turnover: getValueByKey(leu.vars, 'Turnover'),
    tradingStatus: getValueByKey(leu.vars, 'TradingStatus'),
    postCode: getValueByKey(leu.vars, 'PostCode'),
    employmentBands: getValueByKey(leu.vars, 'EmploymentBands'),
  };
}

export function formPayeJson(paye) {
  return {
    payeref: getValueByKey(paye.vars, 'payeref'),
    name1: getValueByKey(paye.vars, 'name1'),
    employer_cat: getValueByKey(paye.vars, 'employer_cat'),
    msubemp: getValueByKey(paye.vars, 'msubemp'),
    ffullemp: getValueByKey(paye.vars, 'ffullemp'),
    mfullemp: getValueByKey(paye.vars, 'mfullemp'),
    legalstatus: getValueByKey(paye.vars, 'legalstatus'),
    address3: getValueByKey(paye.vars, 'address3'),
    mar_jobs: getValueByKey(paye.vars, 'mar_jobs'),
    tradstyle3: getValueByKey(paye.vars, 'tradstyle3'),
    postcode: getValueByKey(paye.vars, 'postcode'),
    fsubemp: getValueByKey(paye.vars, 'fsubemp'),
    addressref: getValueByKey(paye.vars, 'addressref'),
    june_jobs: getValueByKey(paye.vars, 'june_jobs'),
    dec_jobs: getValueByKey(paye.vars, 'dec_jobs'),
    name2: getValueByKey(paye.vars, 'name2'),
    address5: getValueByKey(paye.vars, 'address5'),
    marker: getValueByKey(paye.vars, 'marker'),
    inqcode: getValueByKey(paye.vars, 'inqcode'),
    tradstyle2: getValueByKey(paye.vars, 'tradstyle2'),
    address2: getValueByKey(paye.vars, 'address2'),
    entref: getValueByKey(paye.vars, 'entref'),
    unclsubemp: getValueByKey(paye.vars, 'unclsubemp'),
    name3: getValueByKey(paye.vars, 'name3'),
    birthdate: getValueByKey(paye.vars, 'birthdate'),
    prevpaye: getValueByKey(paye.vars, 'prevpaye'),
    address1: getValueByKey(paye.vars, 'address1'),
    actiondate: getValueByKey(paye.vars, 'actiondate'),
    deathdate: getValueByKey(paye.vars, 'deathdate'),
    tradstyle1: getValueByKey(paye.vars, 'tradstyle1'),
    crn: getValueByKey(paye.vars, 'crn'),
    stc: getValueByKey(paye.vars, 'stc'),
    jobs_lastupd: getValueByKey(paye.vars, 'jobs_lastupd'),
    address4: getValueByKey(paye.vars, 'address4'),
    unclemp: getValueByKey(paye.vars, 'unclemp'),
    sept_jobs: getValueByKey(paye.vars, 'sept_jobs'),
    deathcode: getValueByKey(paye.vars, 'deathcode'),
  };
}

export function formVatJson(vat) {
  return {
    actiondate: getValueByKey(vat.vars, 'actiondate'),
    address1: getValueByKey(vat.vars, 'address1'),
    address2: getValueByKey(vat.vars, 'address2'),
    address3: getValueByKey(vat.vars, 'address3'),
    address4: getValueByKey(vat.vars, 'address4'),
    address5: getValueByKey(vat.vars, 'address5'),
    addressref: getValueByKey(vat.vars, 'addressref'),
    birthdate: getValueByKey(vat.vars, 'birthdate'),
    crn: getValueByKey(vat.vars, 'crn'),
    deathcode: getValueByKey(vat.vars, 'deathcode'),
    deathdate: getValueByKey(vat.vars, 'deathdate'),
    entref: getValueByKey(vat.vars, 'entref'),
    inqcode: getValueByKey(vat.vars, 'inqcode'),
    legalstatus: getValueByKey(vat.vars, 'legalstatus'),
    marker: getValueByKey(vat.vars, 'marker'),
    name1: getValueByKey(vat.vars, 'name1'),
    name2: getValueByKey(vat.vars, 'name2'),
    name3: getValueByKey(vat.vars, 'name3'),
    postcode: getValueByKey(vat.vars, 'postcode'),
    record_type: getValueByKey(vat.vars, 'record_type'),
    sic92: getValueByKey(vat.vars, 'sic92'),
    tradstyle1: getValueByKey(vat.vars, 'tradstyle1'),
    tradstyle2: getValueByKey(vat.vars, 'tradstyle2'),
    tradstyle3: getValueByKey(vat.vars, 'tradstyle3'),
    turnover: getValueByKey(vat.vars, 'turnover'),
    turnover_date: getValueByKey(vat.vars, 'turnover_date'),
    vatref: getValueByKey(vat.vars, 'vatref'),
  };
}
