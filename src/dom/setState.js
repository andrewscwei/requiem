// (c) VARIANTE

'use strict';

import getState from './getState';
import Directive from '../enums/Directive';

/**
 * Sets the state of a DOM element(s) as defined by Directive.STATE.
 *
 * @param {Node|Node[]} element - Target element(s).
 * @param {string} state - New state.
 *
 * @alias module:requiem~dom.setState
 */
function setState(element, state) {
  let elements = [].concat(element);

  if (!elements) return;

  let n = elements.length;

  for (let i = 0; i < n; i++) {
    let e = elements[i];

    if (getState(e) === state) continue;

    if (e.state !== undefined) {
      e.state = state;
    }
    else {
      e.setAttribute(Directive.STATE, state);
    }
  }
}

export default setState;
