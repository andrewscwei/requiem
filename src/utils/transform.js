/**
 * Requiem
 * (c) VARIANTE (http://variante.io)
 *
 * This software is released under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 */

'use strict';

import assert from '../helpers/assert';
import toElementArray from '../helpers/toElementArray';
import getRect from './getRect';

/**
 * Transforms a DOM element.
 *
 * @param {Node|Node[]|Element|Element[]} element - Element(s) to perform the
 *                                                  transform on.
 * @param {Object} [properties] - Transformation properties. (If unspecified,
 *                                all transformation styles will be reset to
 *                                'initial').
 * @param {number} properties.width - Target width of the element.
 * @param {number} properties.height - Target height of the element.
 * @param {number} properties.aspectRatio - Target aspect ratio of the element.
 *                                          If unspecified, it will be inferred
 *                                          from the original element.
 * @param {string} [properties.unit='px'] - Unit of width/height values.
 * @param {string} [properties.type='default'] - Resizing constraint: 'default',
 *                                               'contain', 'cover'.
 * @param {Object} [constraints] - Transformation constraints.
 * @param {number} [contraints.width] - Bounded width of the element.
 * @param {number} [contraints.height] - Bounded height of the element.
 *
 * @return {Object} Transformed properties.
 *
 * @alias module:requiem~utils.transform
 */
function transform(element, properties, constraints) {
  let elements = toElementArray(element);
  let n = elements.length;

  if (properties) {
    if (!assert((properties.width === undefined) || !isNaN(properties.width), 'Width property must be a number.')) return null;
    if (!assert((properties.height === undefined) || !isNaN(properties.height), 'Height property must be a number.')) return null;
    if (!assert((properties.aspectRatio === undefined) || !isNaN(properties.aspectRatio), 'Aspect ratio property must be a number.')) return null;

    let rect = getRect(element);
    let units = properties.units || 'px';
    let aspectRatio = (properties.aspectRatio !== undefined) ? Number(properties.aspectRatio) : rect.width / rect.height;
    let maxW = properties.width;
    let maxH = properties.height;
    let minW = properties.width;
    let minH = properties.height;
    let type = properties.type || 'default';

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

    let w, h;

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

    for (let i = 0; i < n; i++) {
      let e = elements[i];

      if (properties.width !== undefined) e.style.width = String(w) + units;
      if (properties.height !== undefined) e.style.height = String(h) + units;
    }

    let t = {};

    if (properties.width !== undefined) t.width = w;
    if (properties.height !== undefined) t.height = h;

    return t;
  }
  else {
    for (let j = 0; j < n; j++) {
      elements[j].style.width = 'initial';
      elements[j].style.height = 'initial';
    }

    return {
      width: 'initial',
      height: 'initial'
    };
  }
}

export default transform;
