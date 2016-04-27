/**
 * Requiem
 * (c) VARIANTE (http://variante.io)
 *
 * This software is released under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 */

'use strict';

/**
 * Injects a module and all of its sub-modules into a target module.
 *
 * @param {Object} target     - Target module for injecting a module into.
 * @param {string} moduleName - Name of the module to be injected (used as the
 *                              key for the key-value pair in target module).
 * @param {Object} module     - Module object (used as value for the key-value
 *                              pair in target module).
 *
 * @alias module:requiem~helpers.injectModule
 */
function injectModule(target, moduleName, module) {
  Object.defineProperty(target, moduleName, {
    value: module,
    writable: false
  });

  for (let key in module) {
    if (module.hasOwnProperty(key)) {
      Object.defineProperty(target, key, {
        value: module[key],
        writable: false
      });
    }
  }
}

export default injectModule;
