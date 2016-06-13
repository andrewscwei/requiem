// (c) Andrew Wei

'use strict';

import assertType from './assertType';

/**
 * Returns a function that, as long as it continues to be invoked, will not be
 * triggered. The function will be called after it stops being called for N
 * milliseconds. If 'leading' is passed, the function will be triggered on the
 * leading edge instead of the trailing.
 *
 * @param {Function} method - Method to be debounced.
 * @param {number} [delay=0] - Debounce rate in milliseconds.
 * @param {boolean} [leading=false] - Indicates whether the method is triggered
 *                                    on the leading edge instead of the
 *                                    trailing.
 *
 * @return {Function} The debounced method.
 *
 * @alias module:requiem~helpers.debounce
 */
function debounce(method, delay, leading) {
  assertType(method, 'function', false, 'Invalid parameter: method');
  assertType(delay, 'number', true, 'Invalid optional parameter: delay');
  assertType(leading, 'boolean', true, 'Invalid optional parameter: leading');

  if (delay === undefined) delay = 0;
  if (leading === undefined) leading = false;

  let timeout;

  return function() {
    let context = this;
    let args = arguments;

    let later = function() {
      timeout = null;
      if (!leading) method.apply(context, args);
    };

    let callNow = leading && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, delay);

    if (callNow) method.apply(context, args);
  };
}

export default debounce;
