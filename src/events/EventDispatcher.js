// (c) VARIANTE

'use strict';

import assert from'../helpers/assert';
import assertType from'../helpers/assertType';

/**
 * @class
 *
 * Custom event dispatcher object.
 *
 * @alias module:requiem~events.EventDispatcher
 */
class EventDispatcher {
  /**
   * Creates a new EventDispatcher instance.
   *
   * @return {EventDispatcher} A new EventDispatcher instance.
   */
  constructor() {
    this.__defineProperties__();
  }

  /**
   * Adds an event listener to this EventDispatcher instance.
   *
   * @param {string} type
   * @param {Function} listener
   */
  addEventListener(type, listener) {
    if (!assertType(type, 'string', false, 'Invalid parameter: type')) return;
    if (!assertType(listener, 'function', false, 'Invalid parameter: listener')) return;

    if (!this.__private__.listenerRegistry[type]) {
      this.__private__.listenerRegistry[type] = [];
    }

    this.__private__.listenerRegistry[type].push(listener);
  }

  /** @see module:requiem~events.EventDispatcher#addEventListener */
  on() { this.addEventListener.apply(this, arguments); }

  /**
   * Removes an event listener from this EventDispatcher instance. If no
   * listener method is specified, all the listeners of the specified type
   * will be removed.
   *
   * @param {string} type
   * @param {Function} listener:undefined
   */
  removeEventListener(type, listener) {
    if (!assertType(type, 'string', false, 'Invalid parameter: type')) return;
    if (!assertType(listener, 'function', true, 'Invalid parameter: listener')) return;
    if (!assert(this.__private__.listenerRegistry, 'Listener map is null.')) return;
    if (!assert(this.__private__.listenerRegistry[type], 'There are no listeners registered for event type: ' + type)) return;

    if (listener) {
      let index = this.__private__.listenerRegistry[type].indexOf(listener);

      if (index > -1) {
        this.__private__.listenerRegistry[type].splice(index, 1);
      }
    } else {
      delete this.__private__.listenerRegistry[type];
    }
  }

  /** @see module:requiem~events.EventDispatcher#removeEventListener */
  off() { this.removeEventListener.apply(this, arguments); }

  /**
   * Removes all cached event listeners from this Element instance.
   */
  removeAllEventListeners() {
    if (this.__private__.listenerRegistry) {
      for (let event in this.__private__.listenerRegistry) {
        this.removeEventListener(event);
      }
    }
  }

  /**
   * Determines whether this EventDispatcher instance has a specific event
   * listener registered. If no listener is specified, it will check if any
   * listener of the specified event type is registered.
   *
   * @param {string} type
   * @param {Function} [listener]
   *
   * @return {boolean}
   */
  hasEventListener(type, listener) {
    if (!assertType(type, 'string', false, 'Invalid parameter: type')) return;
    if (!assertType(listener, 'function', true, 'Invalid parameter: listener')) return;
    if (!assert(this.__private__.listenerRegistry, 'Listener map is null.')) return;
    if (!assert(this.__private__.listenerRegistry[type], 'There are no listeners registered for event type: ' + type)) return;

    if (listener) {
      let index = this.__private__.listenerRegistry[type].indexOf(listener);

      return (index > -1);
    } else {
      return true;
    }
  }

  /**
   * Dispatches the specified event.
   *
   * @param {Event} event
   */
  dispatchEvent(event) {
    if (!assertType(event, Event, false, 'Event must be specified.')) return;
    if (!assert(this.__private__.listenerRegistry, 'Listener map is null.')) return;

    if (!this.__private__.listenerRegistry[event.type]) return;

    let arrlen = this.__private__.listenerRegistry[event.type].length;

    for (let i = 0; i < arrlen; i++) {
      let listener = this.__private__.listenerRegistry[event.type][i];
      listener.call(this, event);
    }
  }

  /**
   * Defines all properties.
   *
   * @private
   */
  __defineProperties__() {
    if (!this.__private__) this.__private__ = {};

    Object.defineProperty(this.__private__, 'listenerRegistry', {
      value: {},
      writable: true
    });
  }
}

export default EventDispatcher;
