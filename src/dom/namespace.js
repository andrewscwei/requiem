/**
 * Requiem
 * (c) VARIANTE (http://variante.io)
 *
 * This software is released under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 */

'use strict';

import assertType from '../helpers/assertType';

/**
 * Generates a nested namespace in the specified scope, as described by the dot-
 * notated namespace path.
 *
 * @param {string}        [path]            - Namespace path with keywords
 *                                            separated by dots.
 * @param {Object|window} [scope=window|{}] - Scope/object to create the nested
 *                                            namespace in. If browser
 *                                            environment is detected, this
 *                                            param will default to window.
 *                                            Otherwise it will be an empty
 *                                            object literal.
 *
 * @return {Object} The generated namespace.
 *
 * @alias module:requiem~dom.namespace
 */
function namespace(path, scope) {
  assertType(path, 'string', true, 'Invalid parameter: path');
  assertType(scope, 'object', true, 'Invalid optional parameter: scope');

  if (!scope) scope = (window) ? window : {};
  if (path === undefined || path === '') return scope;

  var groups = path.split('.');
  var currentScope = scope;

  for (var i = 0; i < groups.length; i++) {
    currentScope = currentScope[groups[i]] || (currentScope[groups[i]] = {});
  }

  return currentScope;
}

module.exports = namespace;
