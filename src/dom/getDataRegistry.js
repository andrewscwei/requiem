// (c) VARIANTE

'use strict';

import namespace from './namespace';
import assert from '../helpers/assert';

/**
 * Gets the data registry or a specific entry inside the data registry.
 *
 * @param {string} [identifier] - The dot notated identifier.
 *
 * @return {Object} The data registry.
 *
 * @alias module:requiem~dom.getDataRegistry
 */
function getDataRegistry(identifier) {
  assert(!identifier || (typeof identifier === 'string'), `Invalid identifier specified: ${identifier}`);

  if (!window.__private__) window.__private__ = {};
  if (window.__private__.dataRegistry === undefined) window.__private__.dataRegistry = {};

  if (identifier)
    return namespace(identifier, window.__private__.dataRegistry);
  else if (identifier === null)
    return null
  else
    return window.__private__.dataRegistry;
}

export default getDataRegistry;
