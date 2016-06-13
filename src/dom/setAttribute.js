// (c) Andrew Wei

'use strict';

import DirtyType from '../enums/DirtyType';
import assertType from '../helpers/assertType';

/**
 * Sets an attribute of an element by the attribute name.
 *
 * @param {Node} element - Target element.
 * @param {string} name - Attribute name.
 * @param {*} value - Attribute value.
 *
 * @alias module:requiem~dom.setAttribute
 */
function setAttribute(element, name, value) {
  assertType(element, Node, false, 'Invalid element specified');
  if (value === undefined || value === null || value === false)
    element.removeAttribute(name);
  else if (value === true)
    element.setAttribute(name, '');
  else
    element.setAttribute(name, value);
  if (name === 'disabled' && element.setDirty)
    element.setDirty(DirtyType.STATE);
}

export default setAttribute;
