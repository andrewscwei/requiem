/*!
 * Requiem
 * (c) VARIANTE (http://variante.io)
 *
 * This software is released under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 */

'use strict';

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
Object.defineProperty(requiem, 'version', { value: '0.23.0', writable: false });

injectModule(requiem, 'dom',    require('./dom'));
injectModule(requiem, 'events', require('./events'));
injectModule(requiem, 'net',    require('./net'));
injectModule(requiem, 'types',  require('./types'));
injectModule(requiem, 'ui',     require('./ui'));
injectModule(requiem, 'utils',  require('./utils'));

polyfill();

module.exports = requiem;
