/**
 * Requiem
 * (c) VARIANTE (http://variante.io)
 *
 * This software is released under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 */

'use strict';

/**
 * Collection of UI related methods/classes.
 *
 * @namespace module:requiem~ui
 */
let ui = {};

Object.defineProperty(ui, 'Element', { value: require('./Element'),               writable: false, enumerable: true });
Object.defineProperty(ui, 'Video',   { value: require('./Video'),                 writable: false, enumerable: true });
Object.defineProperty(ui, 'Grid',    { value: require('./Grid'),                  writable: false, enumerable: true });

module.exports = ui;
