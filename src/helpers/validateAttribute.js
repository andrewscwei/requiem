/**
 * Requiem
 * (c) VARIANTE (http://variante.io)
 *
 * This software is released under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 */

'use strict';

let Directive = require('../types/Directive');

/**
 * Validates whether an attribute can be used (could be reserved by Requiem).
 *
 * @param {string} attribute - Name of the attribute.
 *
 * @return {boolean} True if attribute is OK to be used, false otherwise.
 *
 * @alias module:requiem~helpers.validateAttribute
 */
function validateAttribute(attribute) {
  for (var d in Directive) {
    if (attribute === d) return false;
    if (attribute === 'data-'+d) return false;
  }

  return true;
}

module.exports = validateAttribute;
