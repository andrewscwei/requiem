/**
 * Requiem
 * (c) VARIANTE (http://variante.io)
 *
 * This software is released under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Module of methods/classes related to networking.
 *
 * @type {Module}
 */

'use strict';

define('net', [
  'net/AssetLoader'
], function(
  AssetLoader
) {
  var api = {};

  Object.defineProperty(api, 'AssetLoader', { value: AssetLoader, writable: false, enumerable: true });

  return api;
});
