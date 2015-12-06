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

/**
 * Checks if specified parent contains specified child.
 *
 * @param {Node|Element} parent - Node, Requiem Element, or jQuery
 *                                       object.
 * @param {Node|Element} child  - Node, Requiem Element, or jQuery
 *                                       object.
 *
 * @return {boolean} True if parent has given child, false otherwise.
 *
 * @alias module:requiem~utils.hasChild
 */
function hasChild(parent, child) {
  let ps = toElementArray(parent);
  let cs = toElementArray(child);

  if (!assert(ps.length === 1, 'Invalid parent specified. Parent must be a single Node, Requiem Element, or jQuery object.')) return false;
  if (!assert(cs.length === 1, 'Invalid child specified. Child must be a single Node, Requiem Element, or jQuery object.')) return false;
  if (!assert(document, 'Document not found. This method requires document to be valid.')) return false;

  let p = ps[0];
  let c = cs[0];

  if (!c.parentNode) return false;

  while (c !== null && c !== undefined && c !== document) {
    c = c.parentNode;

    if (c === p) return true;
  }

  return false;
}

module.exports = hasChild;
