/**
 * Requiem
 * (c) VARIANTE (http://variante.io)
 *
 * This software is released under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 */

'use strict';

let assert = require('../helpers/assert');
let toElementArray = require('../helpers/toElementArray');
let getViewportRect = require('./getViewportRect');

/**
 * Gets the rect of a given element or the overall rect of an array of elements.
 *
 * @param {HTMLElement|HTMLElement[]|Element|Element[]} element
 * @param {Object}                                      [reference=window]
 *
 * @return {Object} Object containing top, left, bottom, right, width, height.
 *
 * @alias module:requiem~utils.getRect
 */
function getRect(element, reference) {
  if (!assert(window, 'This method relies on the window object, which is undefined.')) return null;
  if (element === window) return getViewportRect();

  if (!reference) reference = window;

  let elements = toElementArray(element);
  let n = elements.length;

  if (n <= 0) return null;

  let refRect = getRect(reference);

  if (!assert(refRect, 'Cannot determine reference FOV.')) return null;

  let winRect = getRect(window);
  let rect = {};

  for (let i = 0; i < n; i++) {
    let e = elements[i];
    let c = e.getBoundingClientRect();

    let w = c.width;
    let h = c.height;
    let t = c.top + winRect.top;
    if (reference !== window) t -= refRect.top;
    let l = c.left + winRect.left;
    if (reference !== window) l -= refRect.left;
    let b = t + h;
    let r = l + w;

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

module.exports = getRect;
