/**
 * Requiem
 * (c) VARIANTE (http://variante.io)
 *
 * This software is released under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 */

'use strict';

let assert = require('../helpers/assert');
let toElementArray = require('../helpers/toElementArray');

/**
 * Translates a DOM element.
 *
 * @param {HTMLElement|HTMLElement[]|Element|Element[]} element - Element(s) to
 *                                                                perform the
 *                                                                translate on.
 * @param {Object} [properties] - Translation properties. (if unspecified, all
 *                                translation values will be reset to 'initial').
 * @param {number} [properties.top] - Top translation value.
 * @param {number} [properties.right] - Right translation value.
 * @param {number} [properties.bottom] - Bottom translation value.
 * @param {number} [properties.left] - Left translation value.
 * @param {number} [properties.units='px'] - Unit of translation value.
 * @param {Object} [constraints] - Translation constraints.
 * @param {number} [constraints.top] - Bounded top translation value.
 * @param {number} [constraints.right] - Bounded right translation value.
 * @param {number} [constraints.bottom] - Bounded bottom translation value.
 * @param {number} [constraints.left] - Bounded left translation value.
 *
 * @return {Object} Translated properties.
 *
 * @alias module:requiem~utils.translate
 */
function translate(element, properties, constraints) {
  let elements = toElementArray(element);
  let n = elements.length;

  if (properties) {
    if (!assert((properties.top === undefined) || !isNaN(properties.top), 'Top property must be a number.')) return null;
    if (!assert((properties.right === undefined) || !isNaN(properties.right), 'Right property must be a number.')) return null;
    if (!assert((properties.bottom === undefined) || !isNaN(properties.bottom), 'Bottom property must be a number.')) return null;
    if (!assert((properties.left === undefined) || !isNaN(properties.left), 'Left property must be a number.')) return null;

    let units = properties.units || 'px';

    if (constraints) {
      if (!assert((constraints.top === undefined) || !isNaN(constraints.top), 'Top constraint must be a number.')) return null;
      if (!assert((constraints.right === undefined) || !isNaN(constraints.right), 'Right constraint must be a number.')) return null;
      if (!assert((constraints.bottom === undefined) || !isNaN(constraints.bottom), 'Bottom constraint must be a number.')) return null;
      if (!assert((constraints.left === undefined) || !isNaN(constraints.left), 'Left constraint must be a number.')) return null;
    }

    let top = (constraints && (constraints.top !== undefined)) ? Math.min(properties.top, constraints.top) : properties.top;
    let right = (constraints && (constraints.right !== undefined)) ? Math.min(properties.right, constraints.right) : properties.right;
    let bottom = (constraints && (constraints.bottom !== undefined)) ? Math.min(properties.bottom, constraints.bottom) : properties.bottom;
    let left = (constraints && (constraints.left !== undefined)) ? Math.min(properties.left, constraints.left) : properties.left;

    for (let i = 0; i < n; i++) {
      if (properties.top !== undefined) elements[i].style.top = String(top) + units;
      if (properties.right !== undefined) elements[i].style.right = String(right) + units;
      if (properties.bottom !== undefined) elements[i].style.bottom = String(bottom) + units;
      if (properties.left !== undefined) elements[i].style.left = String(left) + units;
    }

    let t = {};

    if (properties.top !== undefined) t.top = top;
    if (properties.right !== undefined) t.right = right;
    if (properties.bottom !== undefined) t.bottom = bottom;
    if (properties.left !== undefined) t.left = left;

    return t;
  }
  else {
    for (let j = 0; j < n; j++) {
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

module.exports = translate;
