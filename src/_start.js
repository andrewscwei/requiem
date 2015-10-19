/**
 * Requiem
 * (c) VARIANTE (http://variante.io)
 *
 * This software is released under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Start file for r.js.
 */
(function(root, factory, undefined) {
  'use strict';

  var requiem = factory;

  // Check if using CommonJS.
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = requiem;
  }
  // Check if using AMD.
  else if (typeof define === 'function' && typeof define.amd === 'object') {
    define('requiem', [], requiem);
  }
  // Browser (?).
  else {
    root.requiem = requiem;
  }
}((typeof window !== 'undefined') ? window : this, function() {
