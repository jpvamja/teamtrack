/**
 * Pick allowed fields from an object
 */
const pick = (obj, keys = []) => {
  if (!obj || typeof obj !== "object") {
    return {};
  }

  if (!Array.isArray(keys)) {
    return {};
  }

  return keys.reduce((acc, key) => {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      acc[key] = obj[key];
    }
    return acc;
  }, {});
};

export default pick;
