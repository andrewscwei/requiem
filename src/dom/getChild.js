/**
 * Requiem
 * (c) VARIANTE (http://variante.io)
 *
 * This software is released under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 */

'use strict';

import assertType from '../helpers/assertType';
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
 *
 * @return {Element|Array|Object}
 *
 * @alias module:requiem~dom.getChild
 */
function getChild(name, recursive) {
  const Element = require('../ui/Element');

  if (window._children === undefined || window._children === null) return null;
  if (!assertType(name, 'string', true, 'Child name must be string')) return null;
  if (!assertType(recursive, 'boolean', true, 'Parameter \'recursive\', if specified, must be a boolean')) return null;

  if (!name) return window._children;

  recursive = (recursive === undefined) ? true : recursive;

  let targets = name.split('.');
  let currentTarget = targets.shift();
  let child = window._children[currentTarget];

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

module.exports = getChild;
