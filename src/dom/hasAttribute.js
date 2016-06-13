// (c) Andrew Wei

'use strict';

import assertType from '../helpers/assertType';
import noval from '../helpers/noval';

/**
 * Checks to see if an element has the attribute of the specified name.
 *
 * @param {Node} element - Target element.
 * @param {string} name - Attribute name.
 *
 * @return {boolean} True if attribute with said name exists, false otherwise.
 *
 * @alias module:requiem~dom.hasAttribute
 */
function hasAttribute(element, name) {
  assertType(element, Node, false, 'Invalid element specified');
  let value = element.getAttribute(name);
  if (value === '') return true;
  return !noval(value);
}

export default hasAttribute;
