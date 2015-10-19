/**
 * Requiem
 * (c) VARIANTE (http://variante.io)
 *
 * This software is released under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Module of methods/classes related to UI elements.
 *
 * @type {Module}
 */

'use strict';

define('ui', [
  'ui/Element',
  'ui/ElementUpdateDelegate',
  'ui/Video'
], function(
  Element,
  ElementUpdateDelegate,
  Video
) {
  var api = {};

  Object.defineProperty(api, 'Element', { value: Element, writable: false, enumerable: true });
  Object.defineProperty(api, 'ElementUpdateDelegate', { value: ElementUpdateDelegate, writable: false, enumerable: true });
  Object.defineProperty(api, 'Video', { value: Video, writable: false, enumerable: true });

  return api;
});
