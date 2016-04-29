// (c) VARIANTE

'use strict';

import addToChildRegistry from './addToChildRegistry';
import getChildRegistry from './getChildRegistry';
import assert from '../helpers/assert';
import getInstanceNameFromElement from '../helpers/getInstanceNameFromElement';

/**
 * Crawls a DOM element that supports child registries and returns a dictionary
 * of all identifiable child elements. The scope is bounded by the DOM element
 * that has its own local child registry and does not crawl beyond a child that
 * has its own local child registry. The Document will be used if no element is
 * specified. The Document possesses the global child registry.
 *
 * @param {Node} [element=window] - Target element for sightreading. By default
 *                                  this will be the document.
 *
 * @return {Object} Dictionary (object literal) containing all identifiable
 *                  child elements (elements with an 'id' or 'name' attribute,
 *                  'id' being the dominant if both are present) of the target
 *                  element.
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

    if (addToChildRegistry(childRegistry, e)) {
      if (!e.getChild) {
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
