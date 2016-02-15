/**
 * Requiem
 * (c) VARIANTE (http://variante.io)
 *
 * This software is released under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 */

'use strict';

import toElementArray from '../helpers/toElementArray';
import getElementState from './getElementState';
import Directive from '../enums/Directive';
import Element from '../ui/Element';

/**
 * Changes the state of DOM element(s), assumes that state classes are prefixed
 * with 'state-'.
 *
 * @param {Node|Node[]|Element|Element[]} element
 * @param {string}                        state
 *
 * @alias module:requiem~utils.changeElementState
 */
function changeElementState(element, state) {
  let elements = toElementArray(element, true);

  if (!elements) return;

  let n = elements.length;

  for (let i = 0; i < n; i++) {
    let e = elements[i];

    if (getElementState(e) === state) continue;

    if (e instanceof Element)
      e.state = state;
    else
      e.setAttribute(Directive.STATE, state);
  }
}

module.exports = changeElementState;
