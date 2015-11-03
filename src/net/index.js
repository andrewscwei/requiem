/**
 * Requiem
 * (c) VARIANTE (http://variante.io)
 *
 * This software is released under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 */

'use strict';

/**
 * Collection of network related methods/classes.
 *
 * @namespace module:requiem~net
 */
let net = {};

Object.defineProperty(net, 'AssetLoader', { value: require('./AssetLoader'), writable: false, enumerable: true });

module.exports = net;
