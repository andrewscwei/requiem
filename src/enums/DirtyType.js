/**
 * Requiem
 * (c) VARIANTE (http://variante.io)
 *
 * This software is released under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 */

'use strict';

/**
 * Enum for custom UI dirty types. Dirty types help identify what needs to be
 * redrawn/updated in the UI.
 *
 * @readonly
 * @enum {number}
 * @alias module:requiem~enums.DirtyType
 */
let DirtyType = {
  /**
   * Indicates that nothing in the UI has changed.
   */
  NONE: 0x00000000,

  /**
   * Indicates that UI element positions have changed.
   */
  POSITION: 1 << 0,

  /**
   * Indicates that UI element sizes have changed.
   */
  SIZE: 1 << 1,
  /**
   * Indicates that UI element layouts have changed.
   */
  LAYOUT: 1 << 2,

  /**
   * Indicates that UI element states have changed.
   */
  STATE: 1 << 3,

  /**
   * Indicates that UI element data has changed.
   */
  DATA: 1 << 4,

  /**
   * Indicates that UI element locale has changed.
   */
  LOCALE: 1 << 5,

  /**
   * Indicates that UI element depths have changed.
   */
  DEPTH: 1 << 6,

  /**
   * Indicates that UI element configurations have changed.
   */
  CONFIG: 1 << 7,

  /**
   * Indicates that UI element styles have changed.
   */
  STYLE: 1 << 8,

  /**
   * Indicates that UI input elements have changed.
   */
  INPUT: 1 << 9,

  /**
   * Indicates that UI element orientations have changed.
   */
  ORIENTATION: 1 << 10,

  /**
   * Indicates that UI element frames have advanced.
   */
  FRAME: 1 << 11,

  /**
   * Custom type used as a base for creating new types.
   */
  CUSTOM: 1 << 12,

  /**
   * Indicates that everything has changed in the UI.
   */
  ALL: 0xFFFFFFFF,

  /**
   * Gets the name of the dirty type.
   *
   * @param {DirtyType} dirtyType - Dirty type.
   *
   * @return {string} - Name of the dirty type.
   */
  toString: (dirtyType) => {
    if (dirtyType === DirtyType.NONE) return 'NONE';
    if (dirtyType >= DirtyType.ALL) return 'ALL';

    let o = '';
    let n = 8*4;

    for (let i = 0; i < n; i++) {
      let bit = (dirtyType  >> i) & 1;
      if (bit === 0) continue;
      switch (1<<i) {
        case DirtyType.POSITION: o += 'POSITION'; break;
        case DirtyType.SIZE: o += 'SIZE'; break;
        case DirtyType.LAYOUT: o += 'LAYOUT'; break;
        case DirtyType.STATE: o += 'STATE'; break;
        case DirtyType.DATA: o += 'DATA'; break;
        case DirtyType.LOCALE: o += 'LOCALE'; break;
        case DirtyType.DEPTH: o += 'DEPTH'; break;
        case DirtyType.CONFIG: o += 'CONFIG'; break;
        case DirtyType.STYLE: o += 'STYLE'; break;
        case DirtyType.INPUT: o += 'INPUT'; break;
        case DirtyType.ORIENTATION: o += 'ORIENTATION'; break;
        default: o += String(1<<i);
      }
    }

    return o;
  }
};

module.exports = DirtyType;
