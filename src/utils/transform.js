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
  'utils/getRect'
], function(
  assert,
  toElementArray,
  getRect
) {
  /**
   * Transforms a DOM element.
   *
   * @param {*}      element      HTMLElement, Requiem Element, or jQuery object.
   *                             Array of the above is also accepted.
   * @param {Object} properties   Transformation properties: {
   *                               {Number} width           Target width of
   *                                                        the element
   *                             	{Number} height          Target height of
   *                                                        the element
   *                               {String} unit:px         Unit of width/
   *                                                        height values
   *                               {String} type:'default'  Resizing
   *                                                        constraint:
   *                                                        'default',
   *                                                        'contain',
   *                                                        'cover'
   *                             }
   *                             (if unspecified, all transformation styles
   *                             will be reset to 'initial')
   * @param {Object} constraints  Transformation constraints: {
   *                               {Number} width   Bounded width of the
   *                                                element.
   *                               {Number} height  Bounded height of the
   *                                                element.
   *                             }
   *
   * @return {Object} Transformed properties.
   */
  function transform(element, properties, constraints) {
    var elements = toElementArray(element);
    var n = elements.length;

    if (properties) {
      if (!assert((properties.width === undefined) || !isNaN(properties.width), 'Width property must be a number.')) return null;
      if (!assert((properties.height === undefined) || !isNaN(properties.height), 'Height property must be a number.')) return null;
      if (!assert((properties.aspectRatio === undefined) || !isNaN(properties.aspectRatio), 'Aspect ratio property must be a number.')) return null;

      var rect = getRect(element);
      var units = properties.units || 'px';
      var aspectRatio = (properties.aspectRatio !== undefined) ? Number(properties.aspectRatio) : rect.width / rect.height;
      var maxW = properties.width;
      var maxH = properties.height;
      var minW = properties.width;
      var minH = properties.height;
      var type = properties.type || 'default';

      if (constraints && type !== 'default') {
        assert((constraints.width === undefined) || !isNaN(constraints.width), 'Width constraint must be a number.');
        assert((constraints.height === undefined) || !isNaN(constraints.height), 'Height constraint must be a number.');

        if (type && type === 'cover') {
          if (constraints.width !== undefined) minW = Math.min(constraints.width, minW);
          if (constraints.width !== undefined) minH = Math.min(constraints.height, minH);
        }
        else {
          if (constraints.width !== undefined) maxW = Math.min(constraints.width, maxW);
          if (constraints.height !== undefined) maxH = Math.min(constraints.height, maxH);
        }
      }

      var w, h;

      if (type === 'contain') {
        w = (maxW > maxH) ? maxH * aspectRatio : maxW;
        h = (maxW > maxH) ? maxH : maxW / aspectRatio;

        if (w > maxW) {
          w = maxW;
          h = w / aspectRatio;
        }
        else if (h > maxH) {
          h = maxH;
          w = h * aspectRatio;
        }
      }
      else if (type === 'cover') {
        w = (minW > minH) ? minH * aspectRatio : minW;
        h = (minW > minH) ? minH : minW / aspectRatio;

        if (w < minW) {
          w = minW;
          h = w / aspectRatio;
        }
        else if (h < minH) {
          h = minH;
          w = h * aspectRatio;
        }
      }
      else {
        w = maxW;
        h = maxH;
      }

      for (var i = 0; i < n; i++) {
        var e = elements[i];

        if (properties.width !== undefined) e.style.width = String(w) + units;
        if (properties.height !== undefined) e.style.height = String(h) + units;
      }

      var t = {};

      if (properties.width !== undefined) t.width = w;
      if (properties.height !== undefined) t.height = h;

      return t;
    }
    else {
      for (var j = 0; j < n; j++) {
        elements[j].style.width = 'initial';
        elements[j].style.height = 'initial';
      }

      return {
        width: 'initial',
        height: 'initial'
      };
    }
  }

  return transform;
});
