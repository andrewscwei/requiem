/**
 * Requiem
 * (c) VARIANTE (http://variante.io)
 *
 * This software is released under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Event dispatcher object.
 *
 * @type {Class}
 */

'use strict';

define([
  'helpers/assert',
  'helpers/assertType',
  'helpers/log'
], function(
  assert,
  assertType,
  log
) {
  /**
   * @constructor
   *
   * Creates a new EventDispatcher instance.
   */
  function EventDispatcher(element) {
    this.__define_properties();
  }

  /**
   * Adds an event listener to this EventDispatcher instance.
   *
   * @param {String}   type
   * @param {Function} listener
   */
  EventDispatcher.prototype.addEventListener = function(type, listener) {
    if (!assertType(type, 'string', false, 'Invalid parameter: type')) return;
    if (!assertType(listener, 'function', false, 'Invalid parameter: listener')) return;

    log('[EventDispatcher]::addEventListener(' + type + ')');

    if (!this._listenerMap) {
      Object.defineProperty(this, '_listenerMap', {
        value: {},
        writable: true
      });
    }

    if (!this._listenerMap[type]) {
      this._listenerMap[type] = [];
    }

    this._listenerMap[type].push(listener);
  };

  /**
   * Removes an event listener from this EventDispatcher instance. If no
   * listener method is specified, all the listeners of the specified type
   * will be removed.
   *
   * @param {String}   type
   * @param {Function} listener:undefined
   */
  EventDispatcher.prototype.removeEventListener = function(type, listener) {
    if (!assertType(type, 'string', false, 'Invalid parameter: type')) return;
    if (!assertType(listener, 'function', true, 'Invalid parameter: listener')) return;
    if (!assert(this._listenerMap, 'Listener map is null.')) return;
    if (!assert(this._listenerMap[type], 'There are no listeners registered for event type: ' + type)) return;

    log('[EventDispatcher]::removeEventListener(' + type + ')');

    if (listener) {
      var index = this._listenerMap[type].indexOf(listener);

      if (index > -1) {
        this._listenerMap[type].splice(index, 1);
      }
    } else {
      delete this._listenerMap[type];
    }
  };

  /**
   * Determines whether this EventDispatcher instance has a specific event
   * listener registered. If no listener is specified, it will check if any
   * listener of the specified event type is registered.
   *
   * @param {String}   type
   * @param {Function} listener:undefined
   *
   * @return {Boolean}
   */
  EventDispatcher.prototype.hasEventListener = function(type, listener) {
    if (!assertType(type, 'string', false, 'Invalid parameter: type')) return;
    if (!assertType(listener, 'function', true, 'Invalid parameter: listener')) return;
    if (!assert(this._listenerMap, 'Listener map is null.')) return;
    if (!assert(this._listenerMap[type], 'There are no listeners registered for event type: ' + type)) return;

    if (listener) {
      var index = this._listenerMap[type].indexOf(listener);

      return (index > -1);
    } else {
      return true;
    }
  };

  /**
   * Dispatches the specified event.
   *
   * @param {Event} event
   */
  EventDispatcher.prototype.dispatchEvent = function(event) {
    if (!assertType(event, Event, false, 'Event must be specified.')) return;
    if (!assert(this._listenerMap, 'Listener map is null.')) return;

    if (!this._listenerMap[event.type]) return;

    log('[EventDispatcher]::dispatchEvent(' + event.type + ')');

    event.target = this;
    event.currentTarget = this;
    event.customTarget = this;

    var arrlen = this._listenerMap[event.type].length;

    for (var i = 0; i < arrlen; i++) {
      var listener = this._listenerMap[event.type][i];

      listener.call(this, event);
    }
  };

  /**
   * @private
   *
   * Defines all properties.
   */
  EventDispatcher.prototype.__define_properties = function() {

  };

  return EventDispatcher;
});
