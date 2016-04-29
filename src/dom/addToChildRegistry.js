// (c) VARIANTE

'use strict';

import setAttribute from './setAttribute';
import assert from '../helpers/assert';
import assertType from '../helpers/assertType';
import getInstanceNameFromElement from '../helpers/getInstanceNameFromElement';

/**
 * Adds a child or an array of children with the same name to the specified
 * child registry.
 *
 * @param {Object} childRegistry - The child registry.
 * @param {Node|Array} child - Either one child element or an array of multiple
 *                             child elements with the same name.
 * @param {string} [name] - Name of the child(ren).
 *
 * @return {boolean} True if the child is successfully added to the child
 *                   registry, false otherwise.
 *
 * @alias module:requiem~dom.addToChildRegistry
 */
function addToChildRegistry(childRegistry, child, name) {
  assertType(childRegistry, 'object', false, 'Invalid child registry specified');
  assertType(child, [Node, Array], false, 'Invalid child(ren) specified');
  assertType(name, 'string', true, 'Invalid name specified');

  let inferredName = getInstanceNameFromElement(child);

  if (!inferredName) {
    if ((typeof name !== 'string') || (name === '')) return false;
    setAttribute(child, 'name', name);
  }
  else {
    name = inferredName;
  }

  if (childRegistry[name])
    childRegistry[name] = [].concat(childRegistry[name], child);
  else
    childRegistry[name] = child;

  return true;
}

export default addToChildRegistry;
