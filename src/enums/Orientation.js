// (c) Andrew Wei

'use strict';

/**
 * Enum for all orientation types.
 *
 * @readonly
 * @enum {number}
 * @alias module:requiem~enums.Orientation
 */
const Orientation = {
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

export default Orientation;
