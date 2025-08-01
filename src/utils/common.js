// src/utils/common.js

/**
 * @module common
 * Ecospace Common Utilities
 * 
 * @description This module provides common utility functions used across the Ecospace application.
 * It includes functions to convert an object to an array of its values.
 * These utilities help in data manipulation and transformation, making it easier to work with various data structures.
 * @requires none
 * @exports {toArrayOfVals}
 */

// Core module imports
const _ = require('lodash');

/**
 * @function toArrayOfVals
 * 
 * @description Converts an object to an array of its values.
 * If the `isStringify` parameter is true, it will join the values into a single string.
 * If the object is not valid or has no values, it returns an empty array.
 * @param {Object} obj - The object to convert to an array of values.
 * @param {boolean} isStringify - Whether to stringify the values of the object.
 * @returns {Array<string|number|boolean>} - An array of values from the object, optionally stringified.
 */
const toArrayOfVals = (obj, isStringify = false) => {
    if (!obj || typeof obj !== "object") return []; // Return empty array if input is not an object
    const arr = Object.values(obj); // Get values of the object
    if (arr.length === 0) return []; // Return empty array if no values found
    // If isStringify is true, join the values into a string
    if (isStringify && arr.every(val => typeof val === "string")) {
        return arr.join(", "); // Join strings with a comma
    }
    // If isStringify is false, return the array of values
    return arr;
};

/**
 * @function toSnakeCaseKeys
 * 
 * @description Converts the keys of an object to snake_case format.
 * If the input is an array, it recursively converts each object in the array.
 * If the input is a Date object, it skips the transformation.
 * If the input is an object, it converts each key to snake_case using lodash's snakeCase function.
 * If the input is not an object or array, it returns the input as is.
 * This function is useful for standardizing object keys in APIs or data processing tasks.
 * @param {Object|Array} obj - The object or array to convert to snake_case keys.
 * @returns {Object} - A new object with keys converted to snake_case.
 */
function toSnakeCaseKeys(obj) {
  if (Array.isArray(obj)) {
    return obj.map(toSnakeCaseKeys);
  } else if (obj instanceof Date) {
    return obj; // Skip transformation for Date objects
  } else if (obj && typeof obj === 'object') {
    return Object.fromEntries(
      Object.entries(obj).map(([key, value]) => [
        _.snakeCase(key),
        toSnakeCaseKeys(value)
      ])
    );
  }
  return obj;
}

module.exports = { toArrayOfVals, toSnakeCaseKeys };
