// (c) Andrew Wei

'use strict';

import addToChildRegistry from './addToChildRegistry';
import getChildRegistry from './getChildRegistry';
import assert from '../helpers/assert';
import getInstanceNameFromElement from '../helpers/getInstanceNameFromElement';
import isCustomElement from '../helpers/isCustomElement';

/**
 * Crawls a DOM element, creates a child registry for the element and registers
 * all of its children into the child registry, recursively.
 *
 * @param {Node} [element=document] - Target element for sightreading. By
 *                                    default this will be the document.
 * @param {Object} [childRegistry] - Target child registry to register child
 *                                   elements with. If unspecified it will be
 *                                   inferred from the target element.
 *
 * @alias module:requiem~dom.sightread
 */
function sightread(element, childRegistry) {
  if (!element || element === document) element = window;
  if (!childRegistry && !getChildRegistry(element)) return;

  // Clear the child registry.
  if (!childRegistry) {
    element.__private__.childRegistry = {};
    childRegistry = getChildRegistry(element);
  }

  element = (element === window) ? document.body : (element.shadowRoot ? element.shadowRoot : element);

  assert(element, 'Element is invalid. Too early to sightread?');
  const n = element.childNodes.length;

  for (let i = 0; i < n; i++) {
    let e = element.childNodes[i];

    if (!(e instanceof Node)) continue;
    if (addToChildRegistry(childRegistry, e)) {
      if (!isCustomElement(e)) {
        if (!e.__private__) e.__private__ = {};
        if (!e.__private__.childRegistry) e.__private__.childRegistry = {};
        sightread(e);
      }
    }
    else {
      sightread(e, childRegistry);
    }
  }
}

export default sightread;
