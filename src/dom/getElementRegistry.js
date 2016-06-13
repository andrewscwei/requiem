// (c) Andrew Wei

'use strict';

/**
 * Gets the element registry.
 *
 * @param {string|Function} [identifier] - Either a tag or the element class to
 *                                         look for. If unspecified the entire
 *                                         registry will be returned.
 *
 * @return {Object} The element registry.
 *
 * @alias module:requiem~dom.getElementRegistry
 */
function getElementRegistry(identifier) {
  if (!window.__private__) window.__private__ = {};
  if (window.__private__.elementRegistry === undefined) window.__private__.elementRegistry = {};
  if (typeof identifier === 'string') {
    if (!~identifier.indexOf('-')) identifier = identifier + '-element';
    return window.__private__.elementRegistry[identifier];
  }
  if (typeof identifier === 'function') {
    for (let tag in window.__private__.elementRegistry) {
      let Class = window.__private__.elementRegistry[tag];
      if (Class.__proto__ === identifier) return Class;
    }
    return null;
  }
  return window.__private__.elementRegistry;
}

export default getElementRegistry;
