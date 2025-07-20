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

module.exports = { toArrayOfVals };
