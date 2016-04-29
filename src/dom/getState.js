// (c) VARIANTE

'use strict';

import Directive from '../enums/Directive';
import assertType from '../helpers/assertType';

/**
 * Gets the current state of a DOM element as defined by Directive.STATE.
 *
 * @param {Node} element - Target element.
 *
 * @return {string} State of the target element.
 *
 * @alias module:requiem~dom.getState
 */
function getState(element) {
  assertType(element, Node, false, 'Invalid element specified');

  let state = element.state || element.getAttribute(Directive.STATE);

  if (!state || state === '')
    return null;
  else
    return state;
}

export default getState;
