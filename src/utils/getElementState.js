/**
 * Requiem
 * (c) VARIANTE (http://variante.io)
 *
 * This software is released under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 */

'use strict';

import assert from '../helpers/assert';
import Directive from '../types/Directive';
import Element from '../ui/Element';

/**
 * Gets the state of a DOM element, assumes that state classes are prefixed with
 * 'state-'.
 *
 * @param {Node|Element} element
 *
 * @return {string} State of the given element ('state-' prefix is omitted).
 *
 * @alias module:requiem~utils.getElementState
 */
function getElementState(element) {
  if (!assert((element) && ((element instanceof Node) || (element instanceof Element) || (element.jquery)), 'Invalid element specified.')) return null;

  if (element.jquery) element = element.get(0);

  let s;

  if (element instanceof Element) {
    s = element.state;
  }
  else {
    s = element.getAttribute(Directive.STATE);
  }

  if (!s || s === '') {
    return null;
  }
  else {
    return s;
  }
}

module.exports = getElementState;
