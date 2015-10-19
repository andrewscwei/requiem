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
   *                               {Number} top         Top translation value
   *                               {Number} right       Right translation value
   *                               {Number} bottom      Bottom translation value
   *                               {Number} left        Left translation value
   *                               {String} units:'px'  Unit of translation value
   *                             }
   *                             (if unspecified, all translation values will
   *                             be reset to 'initial')
   * @param {Object} constraints  Translation constraints: {
   *                               {Number} top     Bounded top translation value
   *                               {Number} right   Bounded right translation value
   *                               {Number} bottom  Bounded bottom translation value
   *                               {Number} left    Bounded left translation value
   *                             }
   *
   * @return {Object} Translated properties.
   */
  function translate(element, properties, constraints) {
    var elements = toElementArray(element);
    var n = elements.length;

    if (properties) {
      if (!assert((properties.top === undefined) || !isNaN(properties.top), 'Top property must be a number.')) return null;
      if (!assert((properties.right === undefined) || !isNaN(properties.right), 'Right property must be a number.')) return null;
      if (!assert((properties.bottom === undefined) || !isNaN(properties.bottom), 'Bottom property must be a number.')) return null;
      if (!assert((properties.left === undefined) || !isNaN(properties.left), 'Left property must be a number.')) return null;

      var units = properties.units || 'px';

      if (constraints) {
        if (!assert((constraints.top === undefined) || !isNaN(constraints.top), 'Top constraint must be a number.')) return null;
        if (!assert((constraints.right === undefined) || !isNaN(constraints.right), 'Right constraint must be a number.')) return null;
        if (!assert((constraints.bottom === undefined) || !isNaN(constraints.bottom), 'Bottom constraint must be a number.')) return null;
        if (!assert((constraints.left === undefined) || !isNaN(constraints.left), 'Left constraint must be a number.')) return null;
      }

      var top = (constraints && (constraints.top !== undefined)) ? Math.min(properties.top, constraints.top) : properties.top;
      var right = (constraints && (constraints.right !== undefined)) ? Math.min(properties.right, constraints.right) : properties.right;
      var bottom = (constraints && (constraints.bottom !== undefined)) ? Math.min(properties.bottom, constraints.bottom) : properties.bottom;
      var left = (constraints && (constraints.left !== undefined)) ? Math.min(properties.left, constraints.left) : properties.left;

      for (var i = 0; i < n; i++) {
        if (properties.top !== undefined) elements[i].style.top = String(top) + units;
        if (properties.right !== undefined) elements[i].style.right = String(right) + units;
        if (properties.bottom !== undefined) elements[i].style.bottom = String(bottom) + units;
        if (properties.left !== undefined) elements[i].style.left = String(left) + units;
      }

      var t = {};

      if (properties.top !== undefined) t.top = top;
      if (properties.right !== undefined) t.right = right;
      if (properties.bottom !== undefined) t.bottom = bottom;
      if (properties.left !== undefined) t.left = left;

      return t;
    }
    else {
      for (var j = 0; j < n; j++) {
        elements[j].style.top = 'initial';
        elements[j].style.right = 'initial';
        elements[j].style.bottom = 'initial';
        elements[j].style.left = 'initial';
      }

      return {
        top: 'initial',
        right: 'initial',
        bottom: 'initial',
        left: 'initial'
      };
    }
  }

  return translate;
});
