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
  'dom',
  'events',
  'net',
  'types',
  'ui',
  'utils'
], function(
  dom,
  events,
  net,
  types,
  ui,
  utils
) {
  var requiem = {};

  Object.defineProperty(requiem, 'name', { value: 'Requiem', writable: false });
  Object.defineProperty(requiem, 'version', { value: '0.3.1', writable: false });

  injectModule('dom', dom);
  injectModule('events', events);
  injectModule('net', net);
  injectModule('types', types);
  injectModule('ui', ui);
  injectModule('utils', utils);

  /**
   * @private
   *
   * Injects a module and all of its sub-modules into the core Requiem module.
   *
   * @param {String} name    Name of the module (used as the key for the
   *                        key-value pair in Requiem).
   * @param {Object} module  Module object (used as value for the key-value
   *                        pair in Requiem).
   */
  function injectModule(name, module) {
    Object.defineProperty(requiem, name, {
      value: module,
      writable: false
    });

    for (var key in module) {
      if (module.hasOwnProperty(key)) {
        Object.defineProperty(requiem, key, {
          value: module[key],
          writable: false
        });
      }
    }
  }

  return requiem;
});
