/**
 * Requiem
 * (c) VARIANTE (http://variante.io)
 *
 * This software is released under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 */

'use strict';

/**
 * Collection of Requiem enums and types.
 *
 * @namespace module:requiem~enums
 */
let enums = {};

Object.defineProperty(enums, 'Directive', { value: require('./Directive'), writable: false, enumerable: true });
Object.defineProperty(enums, 'DirtyType', { value: require('./DirtyType'), writable: false, enumerable: true });
Object.defineProperty(enums, 'EventType', { value: require('./EventType'), writable: false, enumerable: true });
Object.defineProperty(enums, 'KeyCode',   { value: require('./KeyCode'),   writable: false, enumerable: true });
Object.defineProperty(enums, 'NodeState', { value: require('./NodeState'), writable: false, enumerable: true });
Object.defineProperty(enums, 'Orientation', { value: require('./Orientation'), writable: false, enumerable: true });
Object.defineProperty(enums, 'ViewportSizeClass', { value: require('./ViewportSizeClass'), writable: false, enumerable: true });

module.exports = enums;
