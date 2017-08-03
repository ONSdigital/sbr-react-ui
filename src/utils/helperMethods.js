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
