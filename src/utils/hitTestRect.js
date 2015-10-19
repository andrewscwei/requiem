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
  'utils/getIntersectRect',
  'utils/getRect'
], function(
  assert,
  toElementArray,
  getIntersectRect,
  getRect
) {
  /**
   * Hit tests a vector or element against other elements.
   *
   * @param {Object/Array}  Vector ({ x, y }), HTMLElement, Requiem Element, or
   *                       jQuery object.
   * @param {Object/Array}  HTMLElement, Requiem Element, or jQuery object.
   *
   * @return {Boolean} True if test passes, false otherwise.
   */
  function hitTestRect() {
    if (!assert(arguments.length > 1, 'Insufficient arguments. Expecting at least 2.')) return false;

    var args = Array.prototype.slice.call(arguments);
    var isVector = (typeof args[0] === 'object') && args[0].hasOwnProperty('x') && args[0].hasOwnProperty('y');

    if (isVector) {
      var vector = args.shift();
      var n = args.length;
      var pass = false;

      for (var i = 0; i < n; i++) {
        var rect = args[i];

        if (!assert(rect.top !== undefined && !isNaN(rect.top) && rect.right !== undefined && !isNaN(rect.right) && rect.bottom !== undefined && !isNaN(rect.bottom) && rect.left !== undefined && !isNaN(rect.left), 'Invalid rect supplied. Rect must be an object containing "top", "right", "bottom", and "left" key values.')) return false;

        var clampedX = ((vector.x >= rect.left) && (vector.x <= rect.right));
        var clampedY = ((vector.y >= rect.top) && (vector.x <= rect.bottom));

        if (clampedX && clampedY) {
          pass = true;
        }
      }

      return pass;
    }
    else {
      var intersectRect = getIntersectRect.apply(null, arguments);

      if (!assert(intersectRect, 'Invalid elements specified.')) return false;

      return (intersectRect.width * intersectRect.height !== 0);
    }
  }

  return hitTestRect;
});
