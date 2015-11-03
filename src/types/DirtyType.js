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
 * @alias module:requiem~types.DirtyType
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
   * Custom type used as a base for creating new types.
   */
  CUSTOM: 1 << 11,

  /**
   * Indicates that everything has changed in the UI.
   */
  ALL: 0xFFFFFFFF
};

module.exports = DirtyType;
