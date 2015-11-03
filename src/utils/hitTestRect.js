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
let getIntersectRect = require('./getIntersectRect');
let getRect = require('./getRect');

/**
 * Hit tests a vector or element against other elements.
 *
 * @param {Object|HTMLElement|Element} obj
 * @param {number}                     obj.x
 * @param {number}                     obj.y
 * @param {...Object}                  rect
 * @param {number}                     rect.top
 * @param {number}                     rect.right
 * @param {number}                     rect.bottom
 * @param {number}                     rect.left
 *
 * @return {boolean} True if test passes, false otherwise.
 *
 * @alias module:requiem~utils.hitTestRect
 */
function hitTestRect(obj, rect) {
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

module.exports = hitTestRect;
