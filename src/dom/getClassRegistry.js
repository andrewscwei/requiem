/**
 * Requiem
 * (c) VARIANTE (http://variante.io)
 *
 * This software is released under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 */

'use strict';

/**
 * Gets the class registry.
 *
 * @return {Object} The class registry.
 *
 * @alias module:requiem~dom.getClassRegistry
 */
function getClassRegistry() {
  if (window._classRegistry === undefined) window._classRegistry = {};
  return window._classRegistry;
}

module.exports = getClassRegistry;
