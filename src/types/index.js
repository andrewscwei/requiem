/**
 * Requiem
 * (c) VARIANTE (http://variante.io)
 *
 * This software is released under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 */

'use strict';

/**
 * Collection of Requiem data-types and definitions.
 *
 * @namespace module:requiem~types
 */
let types = {};

Object.defineProperty(types, 'Directive', { value: require('./Directive'), writable: false, enumerable: true });
Object.defineProperty(types, 'DirtyType', { value: require('./DirtyType'), writable: false, enumerable: true });
Object.defineProperty(types, 'EventType', { value: require('./EventType'), writable: false, enumerable: true });
Object.defineProperty(types, 'KeyCode',   { value: require('./KeyCode'),   writable: false, enumerable: true });
Object.defineProperty(types, 'NodeState', { value: require('./NodeState'), writable: false, enumerable: true });

module.exports = types;
