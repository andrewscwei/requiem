/**
 * Requiem
 * (c) VARIANTE (http://variante.io)
 *
 * This software is released under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Module of global Requiem data types/definitions.
 *
 * @type {Module}
 */

'use strict';

define('types', [
  'types/Directives',
  'types/DirtyType',
  'types/EventType',
  'types/KeyCode',
  'types/NodeState'
], function(
  Directives,
  DirtyType,
  EventType,
  KeyCode,
  NodeState
) {
  var api = {};

  Object.defineProperty(api, 'Directives', { value: Directives, writable: false, enumerable: true });
  Object.defineProperty(api, 'DirtyType', { value: DirtyType, writable: false, enumerable: true });
  Object.defineProperty(api, 'EventType', { value: EventType, writable: false, enumerable: true });
  Object.defineProperty(api, 'KeyCode', { value: KeyCode, writable: false, enumerable: true });
  Object.defineProperty(api, 'NodeState', { value: NodeState, writable: false, enumerable: true });

  return api;
});
