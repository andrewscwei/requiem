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
enums['Directive']         = require('./Directive');
enums['DirtyType']         = require('./DirtyType');
enums['EventType']         = require('./EventType');
enums['KeyCode']           = require('./KeyCode');
enums['NodeState']         = require('./NodeState');
enums['Orientation']       = require('./Orientation');
enums['ViewportSizeClass'] = require('./ViewportSizeClass');

module.exports = enums;
