/**
 * Requiem
 * (c) VARIANTE (http://variante.io)
 *
 * This software is released under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 */

'use strict';

import assert from '../helpers/assert';
import assertType from '../helpers/assertType';
import Element from '../ui/Element';
import getChild from './getChild';
import hasChild from './hasChild';
import noval from '../helpers/noval';

/**
 * Removes a child or multiple children from this Element instance.
 *
 * @param {Node|Element|Array|string} child - Child/children to be removed.
 *                                            This can either be an Element or
 *                                            Node instance or array. It can
 *                                            also be a string namespace of
 *                                            the target child/children.
 * @param {Element} [element] - Specifies the parent Element instance to fetch
 *                              the child from.
 *
 * @return {Element|Element[]} The removed element(s).
 */
function removeChild(child, element) {
  if (!assert(!noval(child, true), 'No valid child specified')) return;
  if (!assertType(element, Element, true, 'Parameter \'element\', if specified, must be an Element instance')) return;

  let childrenLookup = (element instanceof Element) ? element.children : window._children;

  // If child is a string, treat each entry separated by '.' as a child name.
  if (typeof child === 'string') {
    removeChild(getChild(child, true, element), element);
  }
  // If child is an array, remove each element inside recursively.
  else if ((child instanceof Array)) {
    while (child.length > 0) {
      removeChild(child[0], element);
    }
  }
  // If child is not an array, assume that it is an object that equates or
  // contains a valid DOM element. Remove it accordingly if this Element
  // instance is indeed its parent/ancestor.
  else if (hasChild(child, element)) {
    // First extract the DOM element.
    let e;
    let a = [];

    if (child instanceof Element) {
      e = child.element;
    }
    else if (child instanceof Node) {
      e = child;
    }

    // No valid DOM element found? Terminate.
    if (noval(e)) return null;

    for (let key in childrenLookup) {
      let c = childrenLookup[key];

      if (c instanceof Array) {
        let n = c.length;
        let t = 0;

        for (let i = 0; i < n; i++) {
          let element = c[i];
          t = i;

          if (element.element === e) {
            a.push(element);
            element.destroy();
            e.parentNode.removeChild(e);
            break;
          }
        }

        c.splice(t, 1);

        if (c.length === 0) {
          delete childrenLookup[key];
        }
      }
      else if (c instanceof Element) {
        if (c.element === e) {
          a.push(c);
          c.destroy();
          e.parentNode.removeChild(e);
          delete childrenLookup[key];
        }
        else {
          a.push(c.removeChild(child));
        }
      }
    }

    if (a.length === 0) {
      return null;
    }
    else if (a.length === 1) {
      return a[0];
    }
    else {
      return a;
    }
  }
}

export default removeChild;
