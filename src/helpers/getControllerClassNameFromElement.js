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
 * Gets the controller class name from the DOM element.
 *
 * @param  {HTMLElement} element - The DOM element.
 *
 * @return {string} The controller class name.
 *
 * @alias module:requiem~helpers.getControllerClassNameFromElement
 */
function getControllerClassNameFromElement(element) {
  return element.getAttribute(Directive.CONTROLLER) || element.getAttribute('data-' + Directive.CONTROLLER);
}

module.exports = getControllerClassNameFromElement;
