// (c) VARIANTE

'use strict';

import getChild from './getChild';
import getChildRegistry from './getChildRegistry';
import removeFromChildRegistry from './removeFromChildRegistry';
import assertType from '../helpers/assertType';
import noval from '../helpers/noval';

/**
 * Removes a child element(s) from an element.
 *
 * @param {Node|Array|string} child - Child/children to be removed. This can be
 *                                    a Node or array. It can also be a string
 *                                    namespace of the target child/children.
 * @param {Node} [element] - Specifies the parent Node to remove the child from.
 *
 * @alias module:requiem~dom.removeChild
 */
function removeChild(child, element) {
  assertType(element, Node, true, 'Parameter \'element\', if specified, must be a Node');

  let childRegistry = getChildRegistry(element);

  // If child is a string, treat each entry separated by '.' as a child name.
  if (typeof child === 'string') {
    return removeChild(getChild(child, true, element), element);
  }
  // If child is an array, remove each element inside recursively.
  else if ((child instanceof Array)) {
    let a = [];

    // 'child' here is a direct reference to the corresponding key in this
    // element's child registry.
    while (child.length > 0) {
      let c = removeChild(child[0], element);
      if (c)
        a.push(c);
      else
        c.shift();
    }

    return a;
  }
  // If child is not an array, assume that it is an object that equates or
  // contains a valid DOM element. Remove it accordingly if this element
  // instance is indeed its parent/ancestor.
  else {
    // No valid DOM element found? Terminate.
    if (noval(child)) return null;

    removeFromChildRegistry(childRegistry, child);
    child.parentNode.removeChild(child);

    return child;
  }
}

export default removeChild;
