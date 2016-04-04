/**
 * Requiem
 * (c) VARIANTE (http://variante.io)
 *
 * This software is released under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 */

'use strict';

let Directive = require('../enums/Directive');

/**
 * Gets the instance name from a DOM element.
 *
 * @param {Node} element - The DOM element.
 *
 * @return {string} The instance name.
 *
 * @alias module:requiem~helpers.getInstanceNameFromElement
 */
function getInstanceNameFromElement(element) {
  let name = element.getAttribute(Directive.INSTANCE);
  return name;
}

module.exports = getInstanceNameFromElement;
