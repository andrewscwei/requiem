/**
 * Requiem
 * (c) VARIANTE (http://variante.io)
 *
 * This software is released under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 */

'use strict';

/**
 * Asserts the specified condition and throws a warning if assertion fails.
 *
 * @param {boolean} condition - Condition to validate against.
 * @param {string}  [message] - Message to be displayed when assertion fails.
 *
 * @return {boolean} True if assert passed, false otherwise.
 *
 * @throws Error is assert fails.
 *
 * @alias module:requiem~helpers.assert
 */
function assert(condition, message) {
  if (!condition) throw new Error((message || 'Assert failed'));
  return condition;
}

module.exports = assert;
