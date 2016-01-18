/**
 * Requiem
 * (c) VARIANTE (http://variante.io)
 *
 * This software is released under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 */

'use strict';

/**
 * Collection of event related classes/methods.
 *
 * @namespace module:requiem~events
 */
let events = {};

Object.defineProperty(events, 'EventDispatcher', { value: require('./EventDispatcher'), writable: false, enumerable: true });
Object.defineProperty(events, 'EventTimer', { value: require('./EventTimer'), writable: false, enumerable: true });

module.exports = events;
