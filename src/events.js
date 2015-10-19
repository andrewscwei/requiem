/**
 * Requiem
 * (c) VARIANTE (http://variante.io)
 *
 * This software is released under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Module of methods/classes related to the event system.
 *
 * @type {Module}
 */

'use strict';

define('events', [
  'events/EventDispatcher'
], function(
  EventDispatcher
) {
  var api = {};

  Object.defineProperty(api, 'EventDispatcher', { value: EventDispatcher, writable: false, enumerable: true });

  return api;
});
