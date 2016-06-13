// (c) Andrew Wei

'use strict';

import getChildRegistry from './getChildRegistry';
import assertType from '../helpers/assertType';

/**
 * Removes a child or an array of children with the same name from the specified
 * child registry.
 *
 * @param {Object} childRegistry - The child registry.
 * @param {Node|Array|string} child - Either one child element or an array of
 *                                    multiple child elements with the same name
 *                                    or the name in dot notation.
 *
 * @alias module:requiem~dom.removeFromChildRegistry
 */
function removeFromChildRegistry(childRegistry, child) {
  assertType(childRegistry, 'object', false, 'Invalid child registry specified');
  assertType(child, [Node, Array, 'string'], false, 'Invalid child(ren) or name specified');

  if (typeof child === 'string') {
    let targets = child.split('.');
    let currentTarget = targets.shift();
    let c = childRegistry[currentTarget];

    if (targets.length > 0) {
      if (c instanceof Array) {
        let n = c.length;
        for (let i = 0; i < n; i++)
          removeFromChildRegistry(getChildRegistry(c[i]), targets);
      }
      else {
        removeFromChildRegistry(getChildRegistry(c), targets);
      }
    }
    else {
      delete childRegistry[currentTarget];
    }
  }
  else {
    for (let key in childRegistry) {
      let value = childRegistry[key];

      if (value instanceof Array) {
        let n = value.length;
        let t = -1;

        for (let i = 0; i < n; i++) {
          let e = value[i];

          if (e === child) {
            t = i;
            break;
          }
        }
        if (~t) value.splice(t, 1);
        if (value.length === 0) delete childRegistry[key];
      }
      else {
        if (value === child) {
          delete childRegistry[key];
        }
        else {
          removeFromChildRegistry(getChildRegistry(child), value);
        }
      }
    }
  }
}

export default removeFromChildRegistry;
