export function countStatus(history, status) {
  if (history === []) {
    return 0;
  }
  return history.filter(h => h.HTTPCode === status).length;
}

export function countStatusBetween(history, status) {
  if (history === []) {
    return 0;
  }
  return history.filter(h => h.HTTPCode >= status.min && h.HTTPCode <= status.max).length;
}

export function getDestination(source) {
  let destination;
  switch (source) {
    case 'Legal Unit':
      destination = 'LegalUnit';
      break;
    case 'VAT':
      destination = 'VAT';
      break;
    default:
      destination = 'Enterprise';
  }
  return destination;
}
