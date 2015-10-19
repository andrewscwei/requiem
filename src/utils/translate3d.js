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
  'helpers/toElementArray'
], function(
  assert,
  toElementArray
) {
  /**
   * Translates a DOM element.
   *
   * @param {*} element           HTMLElement, Requiem Element, or jQuery object.
   *                             An array of the above is also accepted.
   * @param {Object} properties   Translation properties: {
   *                               {Number} x           X-coordinate
   *                               {Number} y           Y-coordinate
   *                               {Number} z           Z-coordinate
   *                               {String} units:'px'  Unit of translations
   *                             }
   *                             (if unspecified, all translation coordinates
   *                             will be reset to 0)
   * @param {Object} constraints  Translation constraints: {
   *                               {Number} x  Bounded x-coordinate
   *                               {Number} y  Bounded y-coordinate
   *                               {Number} z  Bounded z-coordinate
   *                             }
   *
   * @return {Object} Translated properties.
   */
  function translate3d(element, properties, constraints) {
    var elements = toElementArray(element);
    var n = elements.length;

    if (properties) {
      if (!assert(properties.x === undefined || !isNaN(properties.x), 'X property must be a number.')) return null;
      if (!assert(properties.y === undefined || !isNaN(properties.y), 'Y property must be a number.')) return null;
      if (!assert(properties.z === undefined || !isNaN(properties.z), 'Z property must be a number.')) return null;

      var units = properties.units || 'px';

      if (constraints) {
        if (!assert(constraints.x === undefined || !isNaN(constraints.x), 'X constraint must be a number.')) return null;
        if (!assert(constraints.y === undefined || !isNaN(constraints.y), 'Y constraint must be a number.')) return null;
        if (!assert(constraints.z === undefined || !isNaN(constraints.z), 'Z constraint must be a number.')) return null;
      }

      var x = (constraints && (constraints.x !== undefined)) ? Math.min(properties.x, constraints.x) : properties.x;
      var y = (constraints && (constraints.y !== undefined)) ? Math.min(properties.y, constraints.y) : properties.y;
      var z = (constraints && (constraints.z !== undefined)) ? Math.min(properties.z, constraints.z) : properties.z;

      var translateX = (properties.x !== undefined) ? 'translateX(' + x + units + ')' : null;
      var translateY = (properties.y !== undefined) ? 'translateY(' + y + units + ')' : null;
      var translateZ = (properties.z !== undefined) ? 'translateZ(' + z + units + ')' : null;
      var transforms = '';

      if (translateX) transforms += (transforms === '') ? translateX : ' ' + translateX;
      if (translateY) transforms += (transforms === '') ? translateY : ' ' + translateY;
      if (translateZ) transforms += (transforms === '') ? translateZ : ' ' + translateZ;

      for (var i = 0; i < n; i++) {
        elements[i].style.transform = transforms;
      }

      var t = {};

      if (translateX) t.x = x;
      if (translateY) t.y = y;
      if (translateZ) t.z = z;

      return t;
    }
    else {
      for (var j = 0; j < n; j++) {
        elements[j].style.transform = 'translateX(0) translateY(0) translateZ(0)';
      }

      return {
        x: 0,
        y: 0,
        z: 0
      };
    }
  }

  return translate3d;
});
