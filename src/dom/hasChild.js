// (c) VARIANTE

'use strict';

import getChild from './getChild';
import assert from '../helpers/assert';
import assertType from '../helpers/assertType';
import noval from '../helpers/noval';

/**
 * Determines if an element contains the specified child.
 *
 * @param {Node|string} child - A child is a Node. It can also be a string of
 *                              child name(s) separated by '.'.
 * @param {Node} [element] - Specifies the parent Node to fetch the child from.
 *
 * @return {boolean} True if this element has the specified child, false
 *                   otherwise.
 *
 * @alias module:requiem~dom.hasChild
 */
function hasChild(child, element) {
  assert(child !== undefined, 'Child is undefined');
  assertType(element, Node, true, 'Parameter \'element\', if specified, must be a Node');

  if (typeof child === 'string') {
    return !noval(getChild(child, true, element));
  }
  else {
    if (!element || element === window || element === document) element = document.body;
    if (element.shadowRoot) element = element.shadowRoot;

    while (!noval(child) && child !== document) {
      child = child.parentNode;
      if (child === element) return true;
    }

    return false;
  }
}

export default hasChild;
