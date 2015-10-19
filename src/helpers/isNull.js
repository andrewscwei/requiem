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
  'helpers/assert',
  'helpers/assertType'
],
function(
  assert,
  assertType
) {
  /**
   * Checks if a given value is equal to null. Option to specify recursion,
   * which would further evaluate inner elements, such as when an Array or
   * Object is specified.
   *
   * @param {*}       value            Value to evaluate.
   * @param {Boolean} recursive:false  Specifies whether to recursively
   *                                   evaluate the supplied value's inner
   *                                   values (i.e. an Array or Object).
   *
   * @return {Boolean} True if null, false otherwise.
   */
  function isNull(value, recursive) {
    assertType(recursive, 'boolean', true, 'Invalid parameter: recursive');

    if (recursive === undefined) recursive = false;

    if (value === undefined || value === null) {
      return true;
    }
    else if (recursive && (value instanceof Array)) {
      var n = value.length;

      for (var i = 0; i < n; i++) {
        if (!isNull(value[i], true)) return false;
      }

      return true;
    }
    else if (recursive && (typeof value === 'object')) {
      for (var p in value) {
        if (!isNull(value[p], true)) return false;
      }

      return true;
    }
    else {
      return false;
    }
  }

  return isNull;
});
