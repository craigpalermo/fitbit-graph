module.exports = (string) => {
  if (!!string) {
    return parseInt(string.replace(/,/, ''));
  }

  return null;
};