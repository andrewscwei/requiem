/**
 * Requiem
 * (c) VARIANTE (http://variante.io)
 *
 * This software is released under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 */

'use strict';

import getClassRegistry from './getClassRegistry';
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

  let className = getFunctionName(c);

  if (typeof n === 'string') {
    let groups = n.split('.');
    className = groups.pop();
    n = groups.join('.');
  }

  if (!assert(namespace(n, getClassRegistry())[className] === undefined, 'Class name ' + className + ' is already registered')) return;
  namespace(n, getClassRegistry())[className] = c;

  return c;
}

export default register;
