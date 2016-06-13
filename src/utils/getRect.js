// (c) Andrew Wei

'use strict';

import getViewportRect from './getViewportRect';
import assert from '../helpers/assert';

/**
 * Gets the rect of a given element or the overall rect of an array of elements.
 *
 * @param {Node|Node[]} element
 * @param {Object} [reference=window]
 *
 * @return {Object} Object containing top, left, bottom, right, width, height.
 *
 * @alias module:requiem~utils.getRect
 */
function getRect(element, reference) {
  if (element === window) return getViewportRect();

  if (!reference) reference = window;

  let elements = [].concat(element);
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

    rect.left = (rect.left === undefined) ? l : rect.left = Math.min(rect.left, l);
    rect.right = (rect.right === undefined) ? r : rect.right = Math.max(rect.right, r);
    rect.top = (rect.top === undefined) ? t : rect.top = Math.min(rect.top, t);
    rect.bottom = (rect.bottom === undefined) ? b : rect.bottom = Math.max(rect.bottom, b);
  }

  rect.width = rect.right - rect.left;
  rect.height = rect.bottom - rect.top;

  return rect;
}

export default getRect;
