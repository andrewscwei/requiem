/**
 * Requiem
 * (c) VARIANTE (http://variante.io)
 *
 * This software is released under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 *
 * @type {Function}
 */

'use strict';

define([
  'helpers/assert',
  'types/Directives',
  'ui/Element'
], function(
  assert,
  Directives,
  Element
) {
  /**
   * Gets the state of a DOM element, assumes that state classes are prefixed
   * with 'state-'.
   *
   * @param {Object} element  HTMLElement, Requiem Element, or jQuery object.
   *
   * @return {String} State of the given element ('state-' prefix is omitted).
   */
  function getElementState(element) {
    if (!assert((element) && ((element instanceof HTMLElement) || (element instanceof Element) || (element.jquery)), 'Invalid element specified.')) return null;

    if (element.jquery) element = element.get(0);

    var s;

    if (element instanceof Element) {
      s = element.state;
    }
    else {
      s = element.getAttribute(Directives.State) || element.getAttribute('data-' + Directives.State);
    }

    if (!s || s === '') {
      return null;
    }
    else {
      return s;
    }
  }

  return getElementState;
}
);
