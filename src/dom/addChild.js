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
 * @param {Node} [element] - Specifies the element to add the child to.
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
 *
 * @return {Node|Node[]} The added element(s).
 *
 * @alias module:requiem~dom.addChild
 */
function addChild() {
  let element = undefined;
  let child = undefined;
  let name = undefined;
  let prepend = undefined;

  let arg1 = arguments[0];
  if ((arg1 === window) || (arg1 === document) || (arg1 instanceof Node) || (arg1 === null) || (arg1 === undefined))
    element = arg1;
  else if ((arg1 instanceof Node) || (arg1 instanceof Array))
    child = arg1;
  else
    throw new Error('Invalid arguments provided');

  let arg2 = arguments[1];
  if ((child === undefined) && ((arg2 instanceof Node) || (arg2 instanceof Array))) {
    child = arg2;
  }
  else if ((child === undefined) && (element instanceof Node)) {
    child = element;
    element = undefined;
  }
  else {
    throw new Error('Child must be specified');
  }

  if (child) {
    if ((name === undefined) && (typeof arg2 === 'string'))
      name = arg2;
    else if ((prepend === undefined) && (typeof arg2 === 'boolean'))
      prepend = arg2;
  }

  let arg3 = arguments[2];
    if ((name === undefined) && (typeof arg3 === 'string'))
      name = arg3;
    else if ((prepend === undefined) && (typeof arg3 === 'boolean'))
      prepend = arg3;

  let arg4 = arguments[3];
    if ((prepend === undefined) && (typeof arg4 === 'boolean'))
      prepend = arg4;

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
        children.push(addChild(element, child[i], name, prepend));
    }
    else {
      for (let i = 0; i < n; i++)
        children.push(addChild(element, child[i], name, prepend));
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
