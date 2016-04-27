/**
 * Requiem
 * (c) VARIANTE (http://variante.io)
 *
 * This software is released under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 */

'use strict';

/**
 * Gets the name of a function/class.
 *
 * @param {Function} f - The function/class.
 *
 * @return {string} Name of the function/class.
 *
 * @alias module:requiem~helpers.getFunctionName
 */
function getFunctionName(f) {
  if (!f) return;
  if (f.name) return f.name;

  let regex = /function\s([^(]{1,})\(/;
  let name = (regex).exec((f).toString());

  return (name && name.length > 1) ? name[1].trim() : '';
}

export default getFunctionName;
