/**
 * Requiem
 * (c) VARIANTE (http://variante.io)
 *
 * This software is released under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Module of methods for manipulating the DOM.
 *
 * @type {Module}
 */

'use strict';

define('dom', [
  'dom/namespace',
  'dom/ready',
  'dom/sightread'
], function(
  namespace,
  ready,
  sightread
) {
  var api = {};

  Object.defineProperty(api, 'namespace', { value: namespace, writable: false, enumerable: true });
  Object.defineProperty(api, 'ready', { value: ready, writable: false, enumerable: true });
  Object.defineProperty(api, 'sightread', { value: sightread, writable: false, enumerable: true });

  return api;
});
