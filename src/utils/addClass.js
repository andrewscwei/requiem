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
let hasClass = require('./hasClass');

/**
 * Adds a class(es) to DOM element(s).
 *
 * @param {HTMLElement|HTMLElement[]|Element|Element[]} element
 * @param {string|string[]}                             className
 *
 * @alias module:requiem~utils.addClass
 */
function addClass(element, className) {
  let elements = toElementArray(element);
  let classes = [];
  let n = elements.length;

  if (!assert((typeof className === 'string') || (className instanceof Array), 'Invalid class name specified. Must be either a string or an array of strings.')) return;

  if (typeof className === 'string') {
    classes.push(className);
  }
  else {
    classes = className;
  }

  let nClasses = classes.length;

  for (let i = 0; i < n; i++) {
    let e = elements[i];

    for (let j = 0; j < nClasses; j++) {
      let c = classes[j];

      if (!assert(typeof c === 'string', 'Invalid class detected: ' + c)) continue;
      if (hasClass(e, c)) continue;

      e.className = e.className + ((e.className === '') ? '' : ' ') + c;
    }
  }
}

module.exports = addClass;
