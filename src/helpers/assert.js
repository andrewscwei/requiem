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

define(function() {
  /**
   * Asserts the specified condition and throws a warning if assertion fails.
   *
   * @param {Boolean} condition          Condition to validate against.
   * @param {String}  message:undefined  Message to be displayed when assertion
   *                                    fails.
   *
   * @return {Boolean} True if assert passed, false otherwise.
   */
  function assert(condition, message) {
    if (!condition) {
      throw new Error((message || 'Assert failed'));
    }

    return condition;
  }

  return assert;
});
