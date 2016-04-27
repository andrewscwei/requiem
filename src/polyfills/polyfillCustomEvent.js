/**
 * Requiem
 * (c) VARIANTE (http://variante.io)
 *
 * This software is released under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 */

'use strict';

/**
 * Polyfill to support CustomEvent in IE.
 *
 * @alias module:requiem~polyfills.polyfillCustomEvent
 */
function polyfillCustomEvent() {
  // Create CustomEvent class.
  function CustomEvent ( event, params ) {
    params = params || { bubbles: false, cancelable: false, detail: undefined };
    let evt = document.createEvent( 'CustomEvent' );
    evt.initCustomEvent( event, params.bubbles, params.cancelable, params.detail );
    return evt;
  }
  CustomEvent.prototype = window.Event.prototype;
  window.CustomEvent = CustomEvent;
}

module.exports = polyfillCustomEvent;
