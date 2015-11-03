/**
 * Requiem
 * (c) VARIANTE (http://variante.io)
 *
 * This software is released under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 */

'use strict';

let assertType = require('./assertType');

/**
 * Sets up prototypal inheritance between a child class and a parent class.
 *
 * @param {Class} childClass  - Child class.
 * @param {Class} parentClass - Parent class.
 *
 * @return {Class} Extended child class.
 *
 * @alias module:requiem~helpers.inherit
 */
function inherit(childClass, parentClass) {
  assertType(childClass, 'class', false, 'Invalid parameter: childClass');
  assertType(parentClass, 'class', false, 'Invalid parameter: parentClass');

  for (let key in parentClass) {
    if (parentClass.hasOwnProperty(key)) {
      childClass[key] = parentClass[key];
    }
  }

  function C() {
    this.constructor = childClass;
  }

  C.prototype = Object.create(parentClass.prototype);
  childClass.prototype = new C();
  childClass.__super__ = parentClass.prototype;
  return childClass;
}

module.exports = inherit;
