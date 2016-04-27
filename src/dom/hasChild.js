/**
 * Requiem
 * (c) VARIANTE (http://variante.io)
 *
 * This software is released under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 */

'use strict';

import getChild from './getChild';
import assert from '../helpers/assert';
import assertType from '../helpers/assertType';
import Element from '../ui/Element';
import noval from '../helpers/noval';

/**
 * Determines if this Element instance contains the specified child.
 *
 * @param {Element|Node|string} child - A child is a Requiem Element, or Node.
 *                                      It can also be a string of child
 *                                      name(s) separated by '.'.
 * @param {Element|Node} [element] - Specifies the parent Element instance or
 *                                   Node to fetch the child from.
 *
 * @return {boolean} True if this Element instance has the specified child,
 *                   false otherwise.
 */
function hasChild(child, element) {
  if (!assert(child !== undefined, 'Child is undefined')) return false;
  if (!assertType(element, [Element, Node], true, 'Parameter \'element\', if specified, must be an Element instance or a Node')) return;

  let domElement = document.body;

  if (element instanceof Element)
    domElement = element.element;
  else if (element instanceof Node)
    domElement = element;

  if (typeof child === 'string') {
    return !noval(getChild(child, true, element));
  }
  else {
    let node = (child instanceof Element) ? child.element : child;

    while (!noval(node) && node !== document) {
      node = node.parentNode;
      if (node === domElement) return true;
    }

    return false;
  }
}

export default hasChild;
