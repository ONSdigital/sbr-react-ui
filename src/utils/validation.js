/**
 * @function validateRefSearch(length)
 *
 * @param  {int} length - The length of ref input
 *
 * @return {string} Validation state string for bootstrap
 */
export function validateRefSearch(length) {
  if (length > 20) return 'error';
  else if (length > 3) return 'success';
  else if (length > 0) return 'error';
  return 'error';
}
