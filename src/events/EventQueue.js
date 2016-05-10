// (c) VARIANTE

'use strict';

import EventDispatcher from './EventDispatcher';
import EventType from '../enums/EventType';
import assert from '../helpers/assert';

/**
 * @class
 *
 * A queue that enqueues multiple events of event dispatchers and notifies when
 * all enqueued events have been dispatched.
 *
 * @alias module:requiem~events.EventQueue
 */
class EventQueue extends EventDispatcher {
  /**
   * Gets the queued up event pool.
   *
   * @type {Object}
   */
  get eventPool() {
    if (this.__private__ === undefined) this.__private__ = {};
    if (this.__private__.eventPool === undefined) this.__private__.eventPool = {};
    return this.__private__.eventPool;
  }

  /**
   * Specifies whether this EventQueue instance is already waiting for queued
   * events.
   *
   * @type {boolean}
   */
  get isWaiting() {
    if (this.__private__ === undefined) this.__private__ = {};
    return this.__private__.isWaiting || false;
  }

  /**
   * Adds an event with the specified event dispatcher and event type to the
   * queue.
   *
   * @param  {EventDispatcher} eventDispatcher - EventDispatcher instance to
   *                                             register the event with.
   * @param  {string} eventType - Name of the event to register.
   */
  enqueue(eventDispatcher, eventType) {
    assert((typeof eventDispatcher.dispatchEvent === 'function') && (typeof eventDispatcher.addEventListener === 'function'), `Not a valid event dispatcher instance`);
    assert(!this.isWaiting, 'Cannot enqueue when EventQueue instance is already waiting for events');
    if (this.eventPool[eventType] === undefined) this.eventPool[eventType] = [];

    let pool = this.eventPool[eventType];
    pool.forEach((event) => assert(event.dispatcher !== eventDispatcher, `The event '${eventType}' of ${eventDispatcher} is already in the queue`));
    pool.push({ dispatcher: eventDispatcher });
  }

  /**
   * Removes an event with the specified event dispatcher and event type from
   * the queue.
   *
   * @param  {EventDispatcher} eventDispatcher - EventDispatcher instance which
   *                                             the event was registered with.
   * @param  {string} eventType - Name of the event which the event was
   *                              registered with.
   */
  dequeue(eventDispatcher, eventType) {
    assert(!this.isWaiting, 'Cannot dequeue when EventQueue instance is already waiting for events');
    let pool = this.eventPool[eventType];
    if (!pool) return;
    let n = pool.length;
    let t = -1;
    for (let i = 0; i < n; i++) {
      if (pool[i].dispatcher === dispatcher) {
        t = i;
        break;
      }
    }
    if (~t) pool.splice(t, 1);
    if (pool.length === 0) delete this.eventPool[eventType];
  }

  /**
   * Starts waiting for queued up events.
   */
  start() {
    for (let eventType in this.eventPool) {
      let pool = this.eventPool[eventType];
      pool.forEach((eventPair) => {
        assert(eventPair.handler === undefined, `Handler not supposed to be defined at this point`);
        eventPair.handler = () => {
          eventPair.dispatcher.removeEventListener(eventType, eventPair.handler);
          delete eventPair.handler;

          let allDone = true;

          for (let t in this.eventPool) {
            let p = this.eventPool[t];
            let n = p.length;
            for (let i = 0; i < n; i++) {
              if (p[i].handler) {
                allDone = false;
                break;
              }
            }
            if (!allDone) break;
          }

          if (allDone) {
            this.kill();
            this.dispatchEvent(new CustomEvent(EventType.OBJECT.COMPLETE));
          }
        };

        eventPair.dispatcher.addEventListener(eventType, eventPair.handler);
        this.__private__.isWaiting = true;
      });
    }

    if (!this.__private__.isWaiting) {
      this.kill();
      this.dispatchEvent(new CustomEvent(EventType.OBJECT.COMPLETE));
    }
  }

  /**
   * Kills this EventQueue instance, setting everything for garbage collection.
   */
  kill() {
    for (let eventType in this.eventPool) {
      let pool = this.eventPool[eventType];
      pool.forEach((eventPair) => {
        if (eventPair.handler) eventPair.dispatcher.removeEventListener(eventType, eventPair.handler);
      });
    }

    delete this.__private__.eventPool;
    this.__private__.isWaiting = false;
  }
}

export default EventQueue;
