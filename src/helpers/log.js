/**
 * Requiem
 * (c) VARIANTE (http://variante.io)
 *
 * This software is released under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 */

'use strict';

/**
 * Internal console logger that activates only when VARS_DEBUG flag is present
 * in the window.
 *
 * @param {...String} message - Message to log.
 *
 * @alias module:requiem~helpers.log
 */
function log(message) {
  if (window && window.REQUIEM_DEBUG && window.console && console.log) {
    Function.apply.call(console.log, console, arguments);
  }
}

export default log;
