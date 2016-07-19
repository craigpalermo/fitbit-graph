/**
 * If string is given, try to remove commas and parse as integer. Otherwise,
 * return null.
 * @param string
 * @returns {*}
 */
module.exports = (string) => !!string ? parseInt(string.replace(/,/, '')) : null;