/**
 * Requiem
 * (c) VARIANTE (http://variante.io)
 *
 * This software is released under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 */

'use strict';

import Element from '../ui/Element';

/**
 * Transforms given element(s) to an element array.
 *
 * @param {*}       element
 * @param {boolean} [keepElement=false]
 *
 * @alias module:requiem~helpers.toElementArray
 */
function toElementArray(element, keepElement) {
  if (!element) return null;

  let elements;

  if (element instanceof Array)
    elements = element;
  else if (element instanceof NodeList)
    elements = Array.prototype.slice.call(element);
  else
    elements = [element];

  let n = elements.length;

  for (let i = 0; i < n; i++) {
    let e = elements[i];

    if (!keepElement && (e instanceof Element)) {
      elements[i] = e.element;
    }
  }

  return elements;
}

export default toElementArray;
