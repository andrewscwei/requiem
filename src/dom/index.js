/**
 * Requiem
 * (c) VARIANTE (http://variante.io)
 *
 * This software is released under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 */

'use strict';

/**
 * Collection of DOM manipulation methods.
 *
 * @namespace module:requiem~dom
 */
let dom = {};

Object.defineProperty(dom, 'createElement',    { value: require('./createElement'),    writable: false, enumerable: true });
Object.defineProperty(dom, 'getClassRegistry', { value: require('./getClassRegistry'), writable: false, enumerable: true });
Object.defineProperty(dom, 'getDataRegistry',  { value: require('./getDataRegistry'),  writable: false, enumerable: true });
Object.defineProperty(dom, 'namespace',        { value: require('./namespace'),        writable: false, enumerable: true });
Object.defineProperty(dom, 'ready',            { value: require('./ready'),            writable: false, enumerable: true });
Object.defineProperty(dom, 'register',         { value: require('./register'),         writable: false, enumerable: true });
Object.defineProperty(dom, 'sightread',        { value: require('./sightread'),        writable: false, enumerable: true });

module.exports = dom;
