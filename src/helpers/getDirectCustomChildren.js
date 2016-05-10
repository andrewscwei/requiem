// (c) VARIANTE

'use strict';

import getChildRegistry from '../dom/getChildRegistry';

/**
 * Gets all the direct custom children of an element, flattened to a single
 * array.
 *
 * @param {Node} element - The DOM element to get the direct custom children
 *                         from.
 * @param {boolean} [inclusive] - Specifies whether the element provided should
 *                                be included as part of the search even if
 *                                it is already a custom element.
 *
 * @return {Array} Array of direct custom children.
 *
 * @alias module:requiem~helpers.getInstanceNameFromElement
 */
function getDirectCustomChildren(element, inclusive) {
  if (!inclusive && element.nodeState !== undefined) return [];

  let childRegistry = getChildRegistry(element);
  let children = [];

  for (let name in childRegistry) {
    let child = [].concat(childRegistry[name]);

    child.forEach((c) => {
      if (c.nodeState !== undefined)
        children.push(c);
      else
        children = children.concat(getDirectCustomChildren(c));
    });
  }

  return children;
}

export default getDirectCustomChildren;

