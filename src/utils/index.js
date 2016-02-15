/**
 * Requiem
 * (c) VARIANTE (http://variante.io)
 *
 * This software is released under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 */

'use strict';

/**
 * Utility methods.
 *
 * @namespace module:requiem~utils
 */
let utils = {};

Object.defineProperty(utils, 'addClass',           { value: require('./addClass'),           writable: false, enumerable: true });
Object.defineProperty(utils, 'changeElementState', { value: require('./changeElementState'), writable: false, enumerable: true });
Object.defineProperty(utils, 'hasClass',           { value: require('./hasClass'),           writable: false, enumerable: true });
Object.defineProperty(utils, 'hasChild',           { value: require('./hasChild'),           writable: false, enumerable: true });
Object.defineProperty(utils, 'getClassIndex',      { value: require('./getClassIndex'),      writable: false, enumerable: true });
Object.defineProperty(utils, 'getElementState',    { value: require('./getElementState'),    writable: false, enumerable: true });
Object.defineProperty(utils, 'getIntersectRect',   { value: require('./getIntersectRect'),   writable: false, enumerable: true });
Object.defineProperty(utils, 'getRect',            { value: require('./getRect'),            writable: false, enumerable: true });
Object.defineProperty(utils, 'getViewportRect',    { value: require('./getViewportRect'),    writable: false, enumerable: true });
Object.defineProperty(utils, 'hitTestElement',     { value: require('./hitTestElement'),     writable: false, enumerable: true });
Object.defineProperty(utils, 'hitTestRect',        { value: require('./hitTestRect'),        writable: false, enumerable: true });
Object.defineProperty(utils, 'removeClass',        { value: require('./removeClass'),        writable: false, enumerable: true });
Object.defineProperty(utils, 'translate',          { value: require('./translate'),          writable: false, enumerable: true });
Object.defineProperty(utils, 'translate3d',        { value: require('./translate3d'),        writable: false, enumerable: true });
Object.defineProperty(utils, 'transform',          { value: require('./transform'),          writable: false, enumerable: true });

module.exports = utils;
