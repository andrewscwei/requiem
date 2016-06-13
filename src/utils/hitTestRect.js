// (c) Andrew Wei

'use strict';

import getIntersectRect from './getIntersectRect';
import assert from '../helpers/assert';

/**
 * Hit tests a vector or element against other elements.
 *
 * @param {Object|Node} obj
 * @param {number} obj.x
 * @param {number} obj.y
 * @param {...Object} rects
 * @param {number} rects.top
 * @param {number} rects.right
 * @param {number} rects.bottom
 * @param {number} rects.left
 *
 * @return {boolean} True if test passes, false otherwise.
 *
 * @alias module:requiem~utils.hitTestRect
 */
function hitTestRect(obj, rects) {
  if (!assert(arguments.length > 1, 'Insufficient arguments. Expecting at least 2.')) return false;

  let args = Array.prototype.slice.call(arguments);
  let isVector = (typeof args[0] === 'object') && args[0].hasOwnProperty('x') && args[0].hasOwnProperty('y');

  if (isVector) {
    let vector = args.shift();
    let n = args.length;
    let pass = false;

    for (let i = 0; i < n; i++) {
      let rect = args[i];

      if (!assert(rect.top !== undefined && !isNaN(rect.top) && rect.right !== undefined && !isNaN(rect.right) && rect.bottom !== undefined && !isNaN(rect.bottom) && rect.left !== undefined && !isNaN(rect.left), 'Invalid rect supplied. Rect must be an object containing "top", "right", "bottom", and "left" key values.')) return false;

      let clampedX = ((vector.x >= rect.left) && (vector.x <= rect.right));
      let clampedY = ((vector.y >= rect.top) && (vector.x <= rect.bottom));

      if (clampedX && clampedY) {
        pass = true;
      }
    }

    return pass;
  }
  else {
    let intersectRect = getIntersectRect.apply(null, arguments);

    if (!assert(intersectRect, 'Invalid elements specified.')) return false;

    return (intersectRect.width * intersectRect.height !== 0);
  }
}

export default hitTestRect;
