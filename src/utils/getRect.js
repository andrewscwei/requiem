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
  'helpers/toElementArray',
  'ui/Element',
  'utils/getViewportRect'
], function(
  assert,
  toElementArray,
  Element,
  getViewportRect
) {
  /**
   * Gets the rect of a given element or the overall rect of an array of
   * elements.
   *
   * @param {*}      element    HTMLElement, Requiem Element, or jQuery object.
   * @param {Object} reference  The reference FOV, defaults to window.
   *
   * @return {Object} Object containing top, left, bottom, right, width,
   *                 height.
   */
  function getRect(element, reference) {
    if (!assert(window, 'This method relies on the window object, which is undefined.')) return null;
    if (element === window) return getViewportRect();

    if (!reference) reference = window;

    var elements = toElementArray(element);
    var n = elements.length;

    if (n <= 0) return null;

    var refRect = getRect(reference);

    if (!assert(refRect, 'Cannot determine reference FOV.')) return null;

    var winRect = getRect(window);
    var rect = {};

    for (var i = 0; i < n; i++) {
      var e = elements[i];
      var c = e.getBoundingClientRect();

      var w = c.width;
      var h = c.height;
      var t = c.top + winRect.top;
      if (reference !== window) t -= refRect.top;
      var l = c.left + winRect.left;
      if (reference !== window) l -= refRect.left;
      var b = t + h;
      var r = l + w;

      if (rect.left === undefined) {
        rect.left = l;
      }
      else {
        rect.left = Math.min(rect.left, l);
      }

      if (rect.right === undefined) {
        rect.right = r;
      }
      else {
        rect.right = Math.max(rect.right, r);
      }

      if (rect.top === undefined) {
        rect.top = t;
      }
      else {
        rect.top = Math.min(rect.top, t);
      }

      if (rect.bottom === undefined) {
        rect.bottom = b;
      }
      else {
        rect.bottom = Math.max(rect.bottom, b);
      }
    }

    rect.width = rect.right - rect.left;
    rect.height = rect.bottom - rect.top;

    return rect;
  }

  return getRect;
});
