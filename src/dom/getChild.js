/**
 * Requiem
 * (c) VARIANTE (http://variante.io)
 *
 * This software is released under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 */

'use strict';

import assertType from '../helpers/assertType';
import Element from '../ui/Element';
import noval from '../helpers/noval';

/**
 * Gets the a child from the global display tree consisting of all sightread
 * Element instances.
 *
 * @param {string}  [name]           - Name of the child, depth separated by
 *                                     '.' (i.e. 'foo.bar'). If unspecified,
 *                                     the entire child list of this Element
 *                                     will be returned.
 * @param {boolean} [recursive=true] - Speciifies whether to search for the
 *                                     child recursively down the tree.
 * @param {Element} [element]        - Specifies the parent Element instance
 *                                     to fetch the child from.
 *
 * @return {Element|Array|Object}
 *
 * @alias module:requiem~dom.getChild
 */
function getChild(name, recursive, element) {
  if (!assertType(name, 'string', true, 'Child name must be string')) return null;
  if (!assertType(recursive, 'boolean', true, 'Parameter \'recursive\', if specified, must be a boolean')) return null;
  if (!assertType(element, Element, true, 'Parameter \'element\', if specified, must be an Element instance')) return null;

  let childrenHash = (element instanceof Element) ? element.children : window._children;
  if (childrenHash === undefined || childrenHash === null) return null;

  if (!name) return (element instanceof Element) ? element.element : document.body;

  recursive = (recursive === undefined) ? true : recursive;

  let targets = name.split('.');
  let currentTarget = targets.shift();
  let child = childrenHash[currentTarget];

  if (recursive && (targets.length > 0)) {
    if (child instanceof Array) {
      let children = [];
      let n = child.length;

      for (let i = 0; i < n; i++) {
        let c = child[i];

        if (c instanceof Element) {
          children.push(c.getChild(targets.join('.')));
        }
        else {
          children.push(null);
        }
      }

      if (!noval(children, true)) {
        return children;
      }
      else {
        return null;
      }
    }
    else if (child instanceof Element) {
      return child.getChild(targets.join('.'));
    }
    else {
      return null;
    }
  }
  else if (child instanceof Element) {
    return child;
  }
  else if (!noval(child, true)) {
    return child;
  }
  else {
    return null;
  }
}

export default getChild;
