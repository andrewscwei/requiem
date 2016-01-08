/**
 * Requiem
 * (c) VARIANTE (http://variante.io)
 *
 * This software is released under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 */

'use strict';

// let assert = require('./assert');

/**
 * Transforms given element(s) to an element array.
 *
 * @param {*}       element
 * @param {boolean} [keepElement=false]
 *
 * @alias module:requiem~helpers.toElementArray
 */
function toElementArray(element, keepElement) {
  let Element = require('../ui/Element');

  if (!element) return null;

  let elements;

  if (element instanceof Array) {
    elements = element;
  }
  else if (element instanceof NodeList) {
    elements = Array.prototype.slice.call(element);
  }
  else {
    // if (!assert((element instanceof Node) || (element instanceof Element), 'Invalid element specified. Element must be an instance of Node or Requiem Element.')) return null;

    if (element instanceof Element) {
      elements = [element.element];
    }
    else {
      elements = [element];
    }
  }

  let n = elements.length;

  for (let i = 0; i < n; i++) {
    let e = elements[i];

    // if (!assert((e instanceof Node) || (e instanceof Element), 'Element array contains invalid element(s). Each element must be an instance of Node or Requiem Element.')) return null;

    if (!keepElement && (e instanceof Element)) {
      elements[i] = e.element;
    }
  }

  return elements;
}

module.exports = toElementArray;
