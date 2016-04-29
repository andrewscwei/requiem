// (c) VARIANTE

'use strict';

import assertType from '../helpers/assertType';

/**
 * Gets the index of a specified class in a DOM element,
 *
 * @param {Node} element - Target element.
 * @param {string} className - Target class name.
 *
 * @return {number} Index of given class name. -1 if not found.
 *
 * @alias module:requiem~dom.getClassIndex
 */
function getClassIndex(element, className) {
  assertType(element, Node, false, 'Invalid element specified');
  assertType(className, 'string', false, `Invalid class name: ${className}`);
  let classList = element.className.split(' ');
  return classList.indexOf(className);
}

export default getClassIndex;
