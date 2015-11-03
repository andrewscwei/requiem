/**
 * Requiem
 * (c) VARIANTE (http://variante.io)
 *
 * This software is released under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 */

'use strict';

let assert = require('../helpers/assert');
let Element = require('../ui/Element');

/**
 * Gets the index of a specified class in a DOM element,
 *
 * @param {HTMLElement|Element} element
 * @param {string}              className
 *
 * @return {number} Index of given class name. -1 if not found.
 *
 * @alias module:requiem~utils.getClassIndex
 */
function getClassIndex(element, className) {
  if (!assert((element) && ((element instanceof HTMLElement) || (element instanceof Element) || (element.jquery)), 'Invalid element specified. Element must be an instance of HTMLElement or Element.')) return null;
  if (element instanceof Element) element = element.element;
  if (element.jquery) element = element.get(0);

  if (!assert(className && (typeof className === 'string'), 'Invalid class name: ' + className)) return -1;

  let classList = element.className.split(' ');

  return classList.indexOf(className);
}

module.exports = getClassIndex;
