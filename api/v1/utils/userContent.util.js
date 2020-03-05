/**
 *
 * @param {*} count
 * @param {*} singular
 * @param {*} plural
 */
const userContent = (count, singular, plural) => {
  if (count === 1) {
    return `${count} ${singular}`;
  }
  const pluralCheck = plural || `${singular}s`;
  return `${count} ${pluralCheck}`;
};

module.exports = {
  userContent
};
