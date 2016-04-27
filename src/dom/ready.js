/**
 * Requiem
 * (c) VARIANTE (http://variante.io)
 *
 * This software is released under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 */

'use strict';

import assertType from '../helpers/assertType';

/**
 * Invokes a callback when the DOM is ready.
 *
 * @param {Function} callback - Function invoked when the DOM is ready.
 *
 * @alias module:requiem~dom.ready
 */
function ready(callback) {
  assertType(callback, 'function', false, 'Invalid parameter: callback');

  if (!document) return null;

  let onLoaded = function(event) {
    if (document.addEventListener) {
      document.removeEventListener('DOMContentLoaded', onLoaded, false);
      window.removeEventListener('load', onLoaded, false);
    }
    else if (document.attachEvent) {
      document.detachEvent('onreadystatechange', onLoaded);
      window.detachEvent('onload', onLoaded);
    }

    setTimeout(callback, 1);
  };

  if (document.readyState === 'complete') {
    return setTimeout(callback, 1);
  }

  if (document.addEventListener) {
    document.addEventListener('DOMContentLoaded', onLoaded, false);
    window.addEventListener('load', onLoaded, false);
  }
  else if (document.attachEvent) {
    document.attachEvent('onreadystatechange', onLoaded);
    window.attachEvent('onload', onLoaded);
  }

  return null;
}

export default ready;
