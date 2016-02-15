/**
 * Requiem
 * (c) VARIANTE (http://variante.io)
 *
 * This software is released under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Viewport types.
 *
 * @type {Object}
 */

'use strict';

/**
 * Enum for all viewport size classes (defaults to portrait).
 *
 * @readonly
 * @enum {number}
 * @alias module:requiem~enums.NodeState
 */
let ViewportSizeClass = {
  /**
   * Mobile devices.
   */
  MOBILE: {
    id: 0,
    min: 0,
    max: 599
  },

  /**
   * Phablet devices
   */
  PHABLET: {
    id: 1,
    min: 600,
    max: 767
  },

  /**
   * Tablet devices.
   */
  TABLET: {
    id: 2,
    min: 768,
    max: 1024
  },

  /**
   * Desktop devices.
   */
  DESKTOP: {
    id: 3,
    min: 1025,
    max: 100000
  },

  /**
   * Gets the viewport size class.
   *
   * @param {string} [measurement='width'] - Specifies whether to use a specific
   *                                         measurement to determine the size
   *                                         class ('width', 'height', 'min' or
   *                                         'max').
   *
   * @return {ViewportSizeClass} The viewport size class enum.
   */
  get: (measurement) => {
    if (typeof measurement !== 'string') measurement = 'width';

    let rect = require('../utils/getViewportRect')();
    let t;

    if (measurement === 'height')
      t = rect.height;
    else if (measurement === 'max')
      t = Math.max(rect.width, rect.height);
    else if (measurement === 'min')
      t = Math.min(rect.width, rect.height);
    else
      t = rect.width;

    if (t >= ViewportSizeClass.MOBILE.min && t <= ViewportSizeClass.MOBILE.max) return ViewportSizeClass.MOBILE;
    if (t >= ViewportSizeClass.PHABLET.min && t <= ViewportSizeClass.PHABLET.max) return ViewportSizeClass.PHABLET;
    if (t >= ViewportSizeClass.TABLET.min && t <= ViewportSizeClass.TABLET.max) return ViewportSizeClass.TABLET;
    if (t >= ViewportSizeClass.DESKTOP.min && t <= ViewportSizeClass.DESKTOP.max) return ViewportSizeClass.DESKTOP;
    return null;
  }
};

module.exports = ViewportSizeClass;
