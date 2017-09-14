// Ref Search
export const SET_REF_RESULTS = 'SET_REF_RESULTS';
export const SET_REF_HEADERS = 'SET_REF_HEADERS';
export const SENDING_REF_REQUEST = 'SENDING_REF_REQUEST';
export const SET_REF_QUERY = 'SET_REF_QUERY';
export const SET_REF_ERROR_MESSAGE = 'SET_REF_ERROR_MESSAGE';

// Enterprise Search
export const SET_ENTERPRISE_RESULTS = 'SET_ENTERPRISE_RESULTS';
export const SET_ENTERPRISE_HEADERS = 'SET_ENTERPRISE_HEADERS';
export const SENDING_ENTERPRISE_REQUEST = 'SENDING_ENTERPRISE_REQUEST';
export const SET_ENTERPRISE_QUERY = 'SET_ENTERPRISE_QUERY';
export const SET_ENTERPRISE_ERROR_MESSAGE = 'SET_ENTERPRISE_ERROR_MESSAGE';

// Legal Unit Search
export const SET_LEGAL_UNIT_RESULTS = 'SET_LEGAL_UNIT_RESULTS';
export const SET_LEGAL_UNIT_HEADERS = 'SET_LEGAL_UNIT_HEADERS';
export const SENDING_LEGAL_UNIT_REQUEST = 'SENDING_LEGAL_UNIT_REQUEST';
export const SET_LEGAL_UNIT_QUERY = 'SET_LEGAL_UNIT_QUERY';
export const SET_LEGAL_UNIT_ERROR_MESSAGE = 'SET_LEGAL_UNIT_ERROR_MESSAGE';

// VAT Search
export const SET_VAT_RESULTS = 'SET_VAT_RESULTS';
export const SET_VAT_HEADERS = 'SET_VAT_HEADERS';
export const SENDING_VAT_REQUEST = 'SENDING_VAT_REQUEST';
export const SET_VAT_QUERY = 'SET_VAT_QUERY';
export const SET_VAT_ERROR_MESSAGE = 'SET_VAT_ERROR_MESSAGE';

// PAYE Search
export const SET_PAYE_RESULTS = 'SET_PAYE_RESULTS';
export const SET_PAYE_HEADERS = 'SET_PAYE_HEADERS';
export const SENDING_PAYE_REQUEST = 'SENDING_PAYE_REQUEST';
export const SET_PAYE_QUERY = 'SET_PAYE_QUERY';
export const SET_PAYE_ERROR_MESSAGE = 'SET_PAYE_ERROR_MESSAGE';

// CH Search
export const SET_CH_RESULTS = 'SET_CH_RESULTS';
export const SET_CH_HEADERS = 'SET_CH_HEADERS';
export const SENDING_CH_REQUEST = 'SENDING_CH_REQUEST';
export const SET_CH_QUERY = 'SET_CH_QUERY';
export const SET_CH_ERROR_MESSAGE = 'SET_CH_ERROR_MESSAGE';

export const REFS = {
  ENT: {
    url: 'Enterprises',
    apiEndpoint: 'ents',
    setResults: SET_ENTERPRISE_RESULTS,
    setHeaders: SET_ENTERPRISE_HEADERS,
    setSending: SENDING_ENTERPRISE_REQUEST,
    setQuery: SET_ENTERPRISE_QUERY,
    setError: SET_ENTERPRISE_ERROR_MESSAGE,
  },
  LEU: {
    url: 'LegalUnits',
    apiEndpoint: 'leus',
    setResults: SET_LEGAL_UNIT_RESULTS,
    setHeaders: SET_LEGAL_UNIT_HEADERS,
    setSending: SENDING_LEGAL_UNIT_REQUEST,
    setQuery: SET_LEGAL_UNIT_QUERY,
    setError: SET_LEGAL_UNIT_ERROR_MESSAGE,
  },
  VAT: {
    url: 'Vats',
    apiEndpoint: 'vats',
    setResults: SET_VAT_RESULTS,
    setHeaders: SET_VAT_HEADERS,
    setSending: SENDING_VAT_REQUEST,
    setQuery: SET_VAT_QUERY,
    setError: SET_VAT_ERROR_MESSAGE,
  },
  PAYE: {
    url: 'Payes',
    apiEndpoint: 'payes',
    setResults: SET_PAYE_RESULTS,
    setHeaders: SET_PAYE_HEADERS,
    setSending: SENDING_PAYE_REQUEST,
    setQuery: SET_PAYE_QUERY,
    setError: SET_PAYE_ERROR_MESSAGE,
  },
  CH: {
    url: 'Companies',
    apiEndpoint: 'crns',
    setResults: SET_CH_RESULTS,
    setHeaders: SET_CH_HEADERS,
    setSending: SENDING_CH_REQUEST,
    setQuery: SET_CH_QUERY,
    setError: SET_CH_ERROR_MESSAGE,
  },
};
