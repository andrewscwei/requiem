/**
 * Requiem
 * (c) VARIANTE (http://variante.io)
 *
 * This software is released under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 */

'use strict';

import namespace from './namespace';
import assert from '../helpers/assert';
import assertType from '../helpers/assertType';
import getFunctionName from '../helpers/getFunctionName';

/**
 * Registers a controller class with Requiem to be used for instantiating
 * custom elements during the sighreading process.
 *
 * @param {Class}  c   - Class to be registered.
 * @param {string} [n] - Namespace of class.
 *
 * @return {Class} The registered class.
 *
 * @alias module:requiem~dom.register
 */
function register(c, n) {
  assertType(c, 'function', false, 'Invalid class provided');
  assertType(n, 'string', true, 'Invalid optional parameter: namespace');

  if (window._classRegistry === undefined) window._classRegistry = {};

  let className = getFunctionName(c);

  if (!assert(namespace(n, window._classRegistry)[className] === undefined, 'Class name ' + className + ' is already registered')) return;

  namespace(n, window._classRegistry)[className] = c;

  return c;
}

module.exports = register;
