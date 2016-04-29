// (c) VARIANTE

'use strict';

import EventDispatcher from './EventDispatcher';
import EventTimer from './EventTimer';

/**
 * Collection of event related classes/methods.
 *
 * @namespace module:requiem~events
 */
const events = {
  EventDispatcher: EventDispatcher,
  EventTimer: EventTimer
};

export default events;
