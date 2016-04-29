// (c) VARIANTE

'use strict';

import getChildRegistry from './getChildRegistry';
import assertType from '../helpers/assertType';
import noval from '../helpers/noval';

/**
 * Gets the a child from the global display tree consisting of all sightread
 * Element instances.
 *
 * @param {string} [name] - Name of the child, depth separated by '.' (i.e.
 *                          'foo.bar'). If unspecified, the entire child list of
 *                          this Element will be returned.
 * @param {boolean} [recursive=true] - Speciifies whether to search for the
 *                                     child recursively down the tree.
 * @param {Element} [element] - Specifies the parent Element instance to fetch
 *                              the child from.
 *
 * @return {Element|Array|Object}
 *
 * @alias module:requiem~dom.getChild
 */
function getChild(name, recursive, element) {
  if (!assertType(name, 'string', true, 'Child name must be string')) return null;
  if (!assertType(recursive, 'boolean', true, 'Parameter \'recursive\', if specified, must be a boolean')) return null;

  let childRegistry = getChildRegistry(element);
  if (!childRegistry) return null;
  if (!name) return childRegistry;

  recursive = (typeof recursive === 'boolean') ? recursive : true;

  let targets = name.split('.');
  let currentTarget = targets.shift();
  let child = childRegistry[currentTarget];

  if (recursive && (targets.length > 0)) {
    if (child instanceof Array) {
      let children = [];
      let n = child.length;

      for (let i = 0; i < n; i++)
        children.push(getChild(targets.join('.'), recursive, child[i]));

      return (noval(children, true) ? null : children);
    }
    else {
      return getChild(targets.join('.'), recursive, child);
    }
  }
  else {
    return (noval(child, true) ? null : child);
  }
}

export default getChild;
