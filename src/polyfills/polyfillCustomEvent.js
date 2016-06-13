// (c) Andrew Wei

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

export default polyfillCustomEvent;
