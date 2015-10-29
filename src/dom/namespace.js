/**
 * Requiem
 * (c) VARIANTE (http://variante.io)
 *
 * This software is released under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 *
 * @type {Function}
 */

'use strict';

define([
  'helpers/assertType'
], function(
  assertType
) {
  /**
   * Creates the specified namespace in the specified scope.
   *
   * @param {String} identifiers  Namespace identifiers with parts separated by
   *                              dots.
   * @param {Object} scope:*      Object to create namespace in, which defaults
   *                              to window if browser environment or a new
   *                              blank object.
   *
   * @return {Object} Reference to the created namespace.
   */
  function namespace(identifiers, scope) {
    assertType(identifiers, 'string', true, 'Invalid parameter: identifiers');
    assertType(scope, 'object', true, 'Invalid optional parameter: scope');

    if (!scope) scope = (window) ? window : {};
    if (identifiers === undefined || identifiers === '') return scope;

    var groups = identifiers.split('.');
    var currentScope = scope;

    for (var i = 0; i < groups.length; i++) {
      currentScope = currentScope[groups[i]] || (currentScope[groups[i]] = {});
    }

    return currentScope;
  }

  return namespace;
});
