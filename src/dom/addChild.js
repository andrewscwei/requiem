// (c) VARIANTE

'use strict';

import addToChildRegistry from './addToChildRegistry';
import getChildRegistry from './getChildRegistry';
import sightread from './sightread';
import assertType from '../helpers/assertType';

/**
 * Adds a child element(s) to an element. By default the added element(s) are
 * appended to the end of the element.
 *
 * @param {Node|Node[]} child - Single element or an array of elements.
 * @param {string} [name] - The name of the child/children to be added.
 *                          Typically a name is required. If it is not
 *                          specified, this method will attempt to infer the
 *                          name from the provided child/children. This method
 *                          fails if a name cannot be inferred. If there
 *                          exists another child with the same name, the added
 *                          child will be grouped together with the existing
 *                          child.
 * @param {boolean} [prepend=false] - Specifies whether the child is prepended
 *                                    to this element instead of appended.
 * @param {Node} [element] - Specifies the element to add the child to.
 *
 * @return {Node|Node[]} The added element(s).
 *
 * @alias module:requiem~dom.addChild
 */
function addChild(child, name, prepend, element) {
  assertType(child, [Node, Array], false, 'Invalid child specified');
  assertType(prepend, 'boolean', true, `Param 'prepend' must be a boolean`);
  assertType(element, Node, true, 'Parameter \'element\', if specified, must be a Node');

  if (typeof prepend !== 'boolean') prepend = false;
  if (!element || element === window || element === document) element = document.body;

  let childRegistry = getChildRegistry(element, true);

  if (child instanceof Array) {
    let n = child.length;
    let children = [];

    if (prepend) {
      for (let i = n-1; i >= 0; i--)
        children.push(addChild(child[i], name, prepend, element));
    }
    else {
      for (let i = 0; i < n; i++)
        children.push(addChild(child[i], name, prepend, element));
    }

    return children;
  }
  else {
    if (name)
      addToChildRegistry(childRegistry, child, name);

    if (!child.getChild) sightread(child);

    if (element.shadowRoot) element = element.shadowRoot;

    if (prepend)
      element.insertBefore(child, element.firstChild);
    else
      element.appendChild(child);

    return child;
  }
}

export default addChild;
