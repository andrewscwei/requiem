// (c) Andrew Wei

'use strict';

import EventDispatcher from './EventDispatcher';
import EventTimer from './EventTimer';
import EventQueue from './EventQueue';

/**
 * Collection of event related classes/methods.
 *
 * @namespace module:requiem~events
 */
const events = {
  EventDispatcher: EventDispatcher,
  EventTimer: EventTimer,
  EventQueue: EventQueue
};

export default events;
