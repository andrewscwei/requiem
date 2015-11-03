/**
 * Requiem
 * (c) VARIANTE (http://variante.io)
 *
 * This software is released under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 */

'use strict';

let assert = require('./assert');
let checkType = require('./checkType');

/**
 * Asserts the specified condition and throws a warning if assertion fails.
 * Internal use only.
 *
 * @param {*}            value                  - Value used for the assertion.
 * @param {String|Class} type                   - Type(s) to evaluate against.
 *                                                If this is a string, this
 *                                                method will use 'typeof'
 *                                                operator. Otherwise
 *                                                'instanceof' operator will be
 *                                                used. If this parameter is an
 *                                                array, all elements in the
 *                                                array will be evaluated
 *                                                against.
 * @param {boolean}      [allowUndefined=false] - Specifies whether assertion
 *                                                should pass if the supplied
 *                                                value is undefined.
 * @param {string}       [message]              - Message to be displayed when
 *                                                assertion fails.
 *
 * @return {boolean} True if assert passed, false otherwise.
 *
 * @throws Error if assert fails.
 *
 * @alias module:requiem~helpers.assertType
 */
function assertType(value, type, allowUndefined, message) {
  if (!assert(type !== undefined, 'Paremeter \'type\' must be a string or a class')) return;
  if (!assert((allowUndefined === undefined) || (typeof allowUndefined === 'boolean'), 'Paremeter \'allowUndefined\', if specified, must be a boolean')) return;
  if (!assert((message === undefined) || (typeof message === 'string'), 'Parameter \'message\', if specified, must be a string')) return;

  allowUndefined = (allowUndefined === undefined) ? false : allowUndefined;

  let ok = false;

  if (allowUndefined && (value === undefined)) {
    ok = true;
  }
  else if (type instanceof Array) {
    let n = type.length;

    for (let i = 0; i < n; i++) {
      if (checkType(value, type[i])) {
        ok = true;
        break;
      }
    }
  }
  else {
    ok = checkType(value, type);
  }

  if (!ok) {
    throw new Error(message || 'AssertType failed');
  }

  return ok;
}

module.exports = assertType;
