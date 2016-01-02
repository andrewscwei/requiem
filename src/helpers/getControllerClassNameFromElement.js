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
 * Gets the controller class name from the DOM element.
 *
 * @param  {Node} element - The DOM element.
 *
 * @return {string} The controller class name.
 *
 * @alias module:requiem~helpers.getControllerClassNameFromElement
 */
function getControllerClassNameFromElement(element) {
  return element.getAttribute(Directive.CLASS);
}

module.exports = getControllerClassNameFromElement;
