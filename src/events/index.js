/**
 * Requiem
 * (c) VARIANTE (http://variante.io)
 *
 * This software is released under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 */

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
