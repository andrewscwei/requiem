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
   * @param {boolean} [isLandscape=false] - Specifies whether to verify viewport
   *                                       size class in landscape orientation
   *                                       (defaults to portrait).
   *
   * @return {ViewportSizeClass} The viewport size class enum.
   */
  get: (isLandscape) => {
    if (typeof isLandscape !== 'boolean') isLandscape = false;

    let rect = require('../utils/getViewportRect')();
    let t = isLandscape ? Math.max(rect.width, rect.height) : Math.min(rect.width, rect.height);

    if (t >= ViewportSizeClass.MOBILE.min && t <= ViewportSizeClass.MOBILE.max) return ViewportSizeClass.MOBILE;
    if (t >= ViewportSizeClass.PHABLET.min && t <= ViewportSizeClass.PHABLET.max) return ViewportSizeClass.PHABLET;
    if (t >= ViewportSizeClass.TABLET.min && t <= ViewportSizeClass.TABLET.max) return ViewportSizeClass.TABLET;
    if (t >= ViewportSizeClass.DESKTOP.min && t <= ViewportSizeClass.DESKTOP.max) return ViewportSizeClass.DESKTOP;
    return null;
  }
};

module.exports = ViewportSizeClass;
