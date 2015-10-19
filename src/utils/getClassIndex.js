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
  'ui/Element'
], function(
  assert,
  Element
) {
  /**
   * Gets the index of a specified class in a DOM element,
   *
   * @param {Object} element    HTMLElement, Requiem Element, or jQuery object.
   * @param {String} className
   *
   * @return {Number} Index of given class name. -1 if not found.
   */
  function getClassIndex(element, className) {
    if (!assert((element) && ((element instanceof HTMLElement) || (element instanceof Element) || (element.jquery)), 'Invalid element specified. Element must be an instance of HTMLElement or Element.')) return null;
    if (element instanceof Element) element = element.element;
    if (element.jquery) element = element.get(0);

    if (!assert(className && (typeof className === 'string'), 'Invalid class name: ' + className)) return -1;

    var classList = element.className.split(' ');

    return classList.indexOf(className);
  }

  return getClassIndex;
});
