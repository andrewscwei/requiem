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
  'types/Directives',
],
function(
  Directives
) {
  /**
   * Validates whether the attribute can be used (could be reserved by Requiem).
   *
   * @param {String} attribute  Name of the attribute.
   *
   * @return {Boolean} True if attribute is OK to be used, false otherwise.
   */
  function validateAttribute(attribute) {
    for (var d in Directives) {
      if (attribute === d) return false;
      if (attribute === 'data-'+d) return false;
    }

    return true;
  }

  return validateAttribute;
});
