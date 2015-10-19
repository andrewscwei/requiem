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
   * Removes a class(es) from DOM element(s).
   *
   * @param {Object/Array} element    HTMLElement, Requiem Element, or jQuery
   *                                 object.
   * @param {String/Array} className
   */
  function removeClass(element, className) {
    var elements = toElementArray(element);
    var classes = [];
    var n = elements.length;

    if (!assert((typeof className === 'string') || (className instanceof Array), 'Invalid class name specified. Must be either a string or an array of strings.')) return;

    if (typeof className === 'string') {
      classes.push(className);
    }
    else {
      classes = className;
    }

    var nClasses = classes.length;

    for (var i = 0; i < n; i++) {
      var e = elements[i];

      for (var j = 0; j < nClasses; j++) {
        var c = classes[j];

        if (!assert(typeof c === 'string', 'Invalid class detected: ' + c)) continue;

        var regex = new RegExp('^' + c + '\\s+|\\s+' + c, 'g');
        e.className = e.className.replace(regex, '');
      }
    }
  }

  return removeClass;
});
