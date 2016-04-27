/**
 * Requiem
 * (c) VARIANTE (http://variante.io)
 *
 * This software is released under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 */

'use strict';

/**
 * Polyfill to support passing of arguments to the callback function of either
 * setTimeout() or setInterval() in IE9 and below.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/WindowTimers/setInterval}
 *
 * @alias module:requiem~polyfills.polyfillTimers
 */
function polyfillTimers() {
  if (document.all && !window.setTimeout.isPolyfill) {
    let __nativeST__ = window.setTimeout;
    window.setTimeout = function (vCallback, nDelay /*, argumentToPass1, argumentToPass2, etc. */) {
      let aArgs = Array.prototype.slice.call(arguments, 2);
      return __nativeST__(vCallback instanceof Function ? function () {
        vCallback.apply(null, aArgs);
      } : vCallback, nDelay);
    };
    window.setTimeout.isPolyfill = true;
  }

  if (document.all && !window.setInterval.isPolyfill) {
    let __nativeSI__ = window.setInterval;
    window.setInterval = function (vCallback, nDelay /*, argumentToPass1, argumentToPass2, etc. */) {
      let aArgs = Array.prototype.slice.call(arguments, 2);
      return __nativeSI__(vCallback instanceof Function ? function () {
        vCallback.apply(null, aArgs);
      } : vCallback, nDelay);
    };
    window.setInterval.isPolyfill = true;
  }
}

export default polyfillTimers;
