// @flow

export function countStatus(history: Array<{}>, status: number) {
  if (history === []) {
    return 0;
  }
  return history.filter(h => h.HTTPCode === status).length;
}

export function countStatusBetween(history: Array<{}>, status: object) {
  if (history === []) {
    return 0;
  }
  return history.filter(h => h.HTTPCode >= status.min && h.HTTPCode <= status.max).length;
}

export function getDestination(source: string) {
  let destination: string;
  switch (source) {
    case 'ENT':
      destination = 'ENT';
      break;
    case 'LEU':
      destination = 'LEU';
      break;
    case 'VAT':
      destination = 'VAT';
      break;
    case 'PAYE':
      destination = 'PAYE';
      break;
    case 'CH':
      destination = 'CH';
      break;
    default:
      destination = 'ENT';
  }
  return destination;
}

export function formatResultsTable(results: Array<{}>) {
  const formattedResults: Array<{}> = [];
  results.forEach((i) => {
    const record: Object = i;
    if (record.source === 'VAT' || record.source === 'Legal Unit') {
      record.name = record.businessName;
    }
    formattedResults.push(record);
  });
  return formattedResults;
}

export function getValueByKey(object: {}, toGet: string) {
  return (toGet in object) ? object[toGet] : '';
}

export function getChildValues(json: {}, compareString: string) {
  const arr: Array<{}> = [];
  Object.keys(json).forEach((k) => {
    if (json[k] === compareString) {
      const obj: {} = {};
      obj[compareString] = k;
      arr.push(obj);
    }
  });
  return arr;
}
