/**
 * Requiem
 * (c) VARIANTE (http://variante.io)
 *
 * This software is released under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Orientation types.
 *
 * @type {Object}
 */

'use strict';

/**
 * Enum for all orientation types.
 *
 * @readonly
 * @enum {number}
 * @alias module:requiem~enums.Orientation
 */
let Orientation = {
  /**
   * Portrait orientation, where height > width.
   */
  PORTRAIT: 0,

  /**
   * Landscape orientation, where width > height.
   */
  LANDSCAPE: 1,

  /**
   * Gets the name of an orientation enum.
   *
   * @param {Orientation} orientation - Orientation.
   *
   * @return {string} Name of the orientation.
   */
  toString: (orientation) => {
    switch (orientation) {
      case Orientation.PORTRAIT: return 'PORTRAIT';
      case Orientation.LANDSCAPE: return 'LANDSCAPE';
      default: return 'UNKNOWN';
    }
  }
};

module.exports = Orientation;
