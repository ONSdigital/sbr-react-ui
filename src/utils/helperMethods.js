export function countStatus(history, status) {
  return history.filter(h => h.HTTPCode === status).length;
}

export function countStatusBetween(history, status) {
  return history.filter(h => h.HTTPCode >= status.min && h.HTTPCode <= status.max).length;
}
