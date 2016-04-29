// (c) VARIANTE

'use strict';

import assertType from '../helpers/assertType';

/**
 * Checks to see if a Node has the specified inline CSS rule.
 *
 * @param {Node} element - Target element.
 * @param {string} key - Name of the style.
 *
 * @return {boolean}
 *
 * @alias module:requiem~dom.hasStyle
 */
function hasStyle(element, key) {
  assertType(element, Node, false, 'Invalid element specified');
  return element.style[key] !== '';
}

export default hasStyle;
