/**
 * Requiem
 * (c) VARIANTE (http://variante.io)
 *
 * This software is released under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 */

'use strict';

import assert from '../helpers/assert';
import Element from '../ui/Element';

/**
 * Gets the index of a specified class in a DOM element,
 *
 * @param {Node|Element} element
 * @param {string}       className
 *
 * @return {number} Index of given class name. -1 if not found.
 *
 * @alias module:requiem~utils.getClassIndex
 */
function getClassIndex(element, className) {
  if (!assert((element) && ((element instanceof Node) || (element instanceof Element)), 'Invalid element specified. Element must be an instance of Node or Element.')) return null;
  if (element instanceof Element) element = element.element;

  if (!assert(className && (typeof className === 'string'), 'Invalid class name: ' + className)) return -1;

  let classList = element.className.split(' ');

  return classList.indexOf(className);
}

export default getClassIndex;
