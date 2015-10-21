/**
 * Requiem
 * (c) VARIANTE (http://variante.io)
 *
 * This software is released under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Construction of the Requiem API.
 */

'use strict';

define('requiem', [
  'helpers/injectModule',
  'helpers/polyfill',
  'dom',
  'events',
  'net',
  'types',
  'ui',
  'utils'
], function(
  injectModule,
  polyfill,
  dom,
  events,
  net,
  types,
  ui,
  utils
) {
  var requiem = {};

  Object.defineProperty(requiem, 'name', { value: 'Requiem', writable: false });
  Object.defineProperty(requiem, 'version', { value: '0.5.0', writable: false });

  injectModule('dom', dom);
  injectModule('events', events);
  injectModule('net', net);
  injectModule('types', types);
  injectModule('ui', ui);
  injectModule('utils', utils);

  polyfill();

  return requiem;
});
