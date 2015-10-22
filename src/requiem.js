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
  Object.defineProperty(requiem, 'version', { value: '0.6.4', writable: false });

  injectModule(requiem, 'dom', dom);
  injectModule(requiem, 'events', events);
  injectModule(requiem, 'net', net);
  injectModule(requiem, 'types', types);
  injectModule(requiem, 'ui', ui);
  injectModule(requiem, 'utils', utils);

  polyfill();

  return requiem;
});
