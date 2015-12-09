/**
 * Requiem
 * (c) VARIANTE (http://variante.io)
 *
 * This software is released under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 */

'use strict';

/**
 * Gets the data registry.
 *
 * @return {Object} The data registry.
 *
 * @alias module:requiem~dom.getDataRegistry
 */
function getDataRegistry() {
  if (window._dataRegistry === undefined) window._dataRegistry = {};
  return window._dataRegistry;
}

module.exports = getDataRegistry;
