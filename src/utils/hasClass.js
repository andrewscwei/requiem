/**
 * Requiem
 * (c) VARIANTE (http://variante.io)
 *
 * This software is released under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 */

'use strict';

import assert from '../helpers/assert';
import toElementArray from '../helpers/toElementArray';
import getClassIndex from './getClassIndex';

/**
 * Verifies that the specified element(s) has the specified class.
 *
 * @param {Node|Node[]|Element|Element[]} element
 * @param {string}                        className
 *
 * @return {boolean} True if element(s) has given class, false otherwise.
 *
 * @alias module:requiem~utils.hasClass
 */
function hasClass(element, className) {
  if (!assert(className && (typeof className === 'string'), 'Invalid class name: ' + className)) return false;

  let elements = toElementArray(element);
  let n = elements.length;

  for (let i = 0; i < n; i++) {
    let e = elements[i];
    if (getClassIndex(e, className) < 0) return false;
  }

  return true;
}

module.exports = hasClass;
