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
 * Creates a DOM element from the provided string.
 *
 * @param {string} value - String describing the DOM element.
 *
 * @return {Node} DOM element.
 *
 * @alias module:requiem~dom.createElement
 */
function createElement(value) {
  if (!document) return null;

  assertType(value, 'string', true, 'Value must be a string');

  let div = document.createElement('div');
  div.innerHTML = value;
  return div.firstChild;
}

export default createElement;
