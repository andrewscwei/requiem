/*!
 * Requiem
 * (c) VARIANTE (http://variante.io)
 *
 * This software is released under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 */

'use strict';

import assert from './helpers/assert';
import injectModule from './helpers/injectModule';
import polyfill from './helpers/polyfill';

/**
 * @module requiem
 */
let requiem = {};

/**
 * @property {string} name - Module name.
 */
Object.defineProperty(requiem, 'name', { value: 'Requiem', writable: false });

/**
 * @property {string} version - Version number.
 */
Object.defineProperty(requiem, 'version', { value: '0.32.0', writable: false });

injectModule(requiem, 'dom',    require('./dom'));
injectModule(requiem, 'events', require('./events'));
injectModule(requiem, 'net',    require('./net'));
injectModule(requiem, 'enums',  require('./enums'));
injectModule(requiem, 'ui',     require('./ui'));
injectModule(requiem, 'utils',  require('./utils'));

polyfill();

assert(window && document, 'Requiem is a front-end web framework where \'window\' and \'document\' must be defined');

module.exports = requiem;
