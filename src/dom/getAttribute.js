// (c) VARIANTE

'use strict';

import assertType from '../helpers/assertType';

/**
 * Gets an attribute of an element by its name.
 *
 * @param {Node} element - Target element.
 * @param {string} name - Attribute name.
 *
 * @return {string} Attribute value.
 *
 * @alias module:requiem~dom.getAttribute
 */
function getAttribute(element, name) {
  assertType(element, Node, false, 'Invalid element specified');

  if (!element.getAttribute) return null;

  let value = element.getAttribute(name);
  if (value === '') return true;
  if (value === undefined || value === null) return null;
  try {
    return JSON.parse(value);
  }
  catch (err) {
    return value;
  }
}

export default getAttribute;
