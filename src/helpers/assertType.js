/**
 * Requiem
 * (c) VARIANTE (http://variante.io)
 *
 * This software is released under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 *
 * @type {Function}
 */

'use strict';

define([
  'helpers/assert'
],
function(
  assert
) {
  /**
   * Asserts the specified condition and throws a warning if assertion fails.
   * Internal use only.
   *
   * @param {*}            value                 Value used for the assertion.
   * @param {String/Class} type                  Type(s) to evaluate against.
   *                                            If this is a string, this
   *                                            method will use 'typeof'
   *                                            operator. Otherwise
   *                                            'instanceof' operator will be
   *                                            used. If this parameter is an
   *                                            array, all elements in the
   *                                            array will be evaluated
   *                                            against.
   * @param {Boolean}      allowUndefined:false  Specifies whether assertion
   *                                            should pass if the supplied
   *                                            value is undefined.
   * @param {String}       message:undefined     Message to be displayed when
   *                                            assertion fails.
   *
   * @return {Boolean} True if assert passed, false otherwise.
   */
  function assertType(value, type, allowUndefined, message) {
    if (!assert(type !== undefined, 'Paremeter \'type\' must be a string or a class')) return;
    if (!assert((allowUndefined === undefined) || (typeof allowUndefined === 'boolean'), 'Paremeter \'allowUndefined\', if specified, must be a boolean')) return;
    if (!assert((message === undefined) || (typeof message === 'string'), 'Parameter \'message\', if specified, must be a string')) return;

    allowUndefined = (allowUndefined === undefined) ? false : allowUndefined;

    var ok = false;

    if (allowUndefined && (value === undefined)) {
      ok = true;
    }
    else if (type instanceof Array) {
      var n = type.length;

      for (var i = 0; i < n; i++) {
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

  /**
   * Verifies that a given is of the given type.
   *
   * @param {*} value  Any value.
   * @param {*} type   Any class or string that describes a type.
   *
   * @return {Boolean} True if validation passes, false otherwise.
   */
  function checkType(value, type) {
    if (typeof type === 'string') {
      switch (type) {
        case 'string':
        case 'object':
        case 'number':
        case 'boolean':
        case 'function':
          return typeof value === type;

        case 'class':
          return typeof value === 'function';

        case 'array':
          return value instanceof Array;

        default:
          return false;
      }
    }
    else {
      return value instanceof type;
    }
  }

  return assertType;
});
