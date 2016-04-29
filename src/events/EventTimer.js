// (c) VARIANTE

'use strict';

import EventDispatcher from './EventDispatcher';
import assert from '../helpers/assert';
import assertType from '../helpers/assertType';

/**
 * @class
 *
 * Class for handling timed events.
 *
 * @alias module:requiem~events.EventTimer
 */
class EventTimer extends EventDispatcher {
  /**
   * Gets the singleton instance of EventTimer.
   *
   * @return {EventTimer} The singleton EventTimer instance.
   */
  static get sharedInstance() {
    if (!EventTimer.__private__) EventTimer.__private__ = {};
    if (!EventTimer.__private__.sharedInstance) EventTimer.__private__.sharedInstance = new EventTimer();
    return EventTimer.__private__.sharedInstance;
  }

  /**
   * @see module:requiem~events.EventTimer.eventPool
   */
  static get eventPool() {
    return EventTimer.sharedInstance.eventPool;
  }

  /**
   * @see module:requiem~events.EventTimer.addEvent
   */
  static addEvent() {
    EventTimer.sharedInstance.addEvent.apply(EventTimer.sharedInstance, arguments);
  }

  /**
   * @see module:requiem~events.EventTimer.removeEvent
   */
  static removeEvent() {
    EventTimer.sharedInstance.removeEvent.apply(EventTimer.sharedInstance, arguments);
  }

  /**
   * @see module:requiem~events.EventTimer.removeAllEvents
   */
  static removeAllEvents() {
    EventTimer.sharedInstance.removeAllEvents.apply(EventTimer.sharedInstance, arguments);
  }

  /**
   * @see module:requiem~events.EventTimer.addEventListener
   */
  static addEventListener() {
    EventTimer.sharedInstance.addEventListener.apply(EventTimer.sharedInstance, arguments);
  }

  /**
   * @see module:requiem~events.EventTimer.removeEventListener
   */
  static removeEventListener() {
    EventTimer.sharedInstance.removeEventListener.apply(EventTimer.sharedInstance, arguments);
  }

  /**
   * @see module:requiem~events.EventTimer.hasEventLisetener
   */
  static hasEventLisetener() {
    EventTimer.sharedInstance.hasEventLisetener.apply(EventTimer.sharedInstance, arguments);
  }

  /**
   * The current event pool.
   *
   * @return {Object} The current event pool.
   */
  get eventPool() {
    if (!this.__private__.eventPool) this.__private__.eventPool = {};
    return this.__private__.eventPool;
  }

  /**
   * Adds an event to the EventTimer.
   *
   * @param {string} id - Unique ID of the timed event.
   * @param {Function} func - Callback to be invoked when event triggers.
   * @param {number} [delay=0] - Delay (interval) of event (in ms).
   * @param {number} [count=1] - Number of times the event should invoke. If set
   *                             to 0, it will be infinite.
   * @param {boolean} [overwrite=true] - Specifies whether this timed event
   *                                     should overwrite an existing one with
   *                                     the same name.
   * @param {string [eventName] - The event name of the custom event to be
   *                              dispatched.
   * @param {*} [...params] - Additional parameters that are passed through to
   *                          the function specified by 'func'.
   */
  addEvent() {
    let id = arguments[0];
    let func = arguments[1];
    let delay = (arguments[2] === undefined) ? 0 : arguments[2];
    let count = (arguments[3] === undefined) ? 1 : arguments[3];
    let overwrite = (arguments[4] === undefined) ? true : arguments[4];
    let eventName = arguments[5];
    let params = arguments[6];

    assert(!this.eventPool.hasOwnProperty(id) || overwrite, `Duplicate timed event with id ${id}`);
    assertType(func, 'function', false, `Invalid function provided`);
    assertType(delay, 'number', false, `Invalid delay specified: ${delay}`);
    assertType(count, 'number', false, `Invalid count specified: ${count}`);
    assertType(overwrite, 'boolean', false, `Invalid overwrite flag specified: ${overwrite}`);
    assertType(eventName, 'string', true, `Invalid event name specified: ${eventName}`);

    if (overwrite) this.removeEvent(id);

    // Process params for func.
    if (params !== undefined) {
      params = [];
      for (let i = 6; i < arguments.length; i++) {
        params.push(arguments[i]);
      }
    }

    this.eventPool[id] = {
      event: setInterval(() => {
        this.eventPool[id].iteration++;
        func.apply(this.params);

        if (eventName !== undefined) {
          let e = new CustomEvent(eventName, {
            detail: {
              id: id,
              iteration: this.eventPool[id].iteration,
              count: this.eventPool[id].count
            }
          });

          this.dispatchEvent(e);
        }

        if (this.eventPool[id].iteration >= this.eventPool[id].count) {
          this.removeEvent(id);
        }
      }, delay),
      iteration: 0,
      count: count
    };
  }

  /**
   * Removes a timed event by its ID.
   *
   * @param {string} id - ID of the timed event.
   */
  removeEvent(id) {
    if (this.eventPool.hasOwnProperty(id)) {
      clearInterval(this.eventPool[id].event);
      delete this.eventPool[id];
    }
  }

  /**
   * Removes all timed events from the EventTimer.
   */
  removeAllEvents() {
    for (let k in this.eventPool) {
      let v = this.eventPool[k];
      clearInterval(v.event);
      delete this.eventPool[k];
    }
  }
}

export default EventTimer;
