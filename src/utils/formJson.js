// @flow

import { getValueByKey } from './helperMethods';

export function formEnterpriseJson(enterprise: object) {
  return {
    legalstatus: getValueByKey(enterprise.vars, 'legalstatus'),
    standard_vat_turnover: getValueByKey(enterprise.vars, 'standard_vat_turnover'),
    ent_address3: getValueByKey(enterprise.vars, 'ent_address3'),
    PAYE_jobs: getValueByKey(enterprise.vars, 'PAYE_jobs'),
    employees: getValueByKey(enterprise.vars, 'employees'),
    ent_address2: getValueByKey(enterprise.vars, 'ent_address2'),
    ent_postcode: getValueByKey(enterprise.vars, 'ent_postcode'),
    entref: getValueByKey(enterprise.vars, 'entref'),
    ent_address5: getValueByKey(enterprise.vars, 'ent_address5'),
    Num_Unique_VatRefs: getValueByKey(enterprise.vars, 'Num_Unique_VatRefs'),
    ent_address1: getValueByKey(enterprise.vars, 'ent_address1'),
    ent_name: getValueByKey(enterprise.vars, 'ent_name'),
    Num_Unique_PayeRefs: getValueByKey(enterprise.vars, 'Num_Unique_PayeRefs'),
    ent_address4: getValueByKey(enterprise.vars, 'ent_address4'),
  };
}
