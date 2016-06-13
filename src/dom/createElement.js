// (c) Andrew Wei

'use strict';

import getElementRegistry from './getElementRegistry';
import assertType from '../helpers/assertType';

/**
 * Creates a DOM element from the provided string.
 *
 * @param {string} value - String describing the DOM element.
 *
 * @return {Node} DOM element.
 *
 * @alias module:requiem~dom.createElement
 */
function createElement(value) {
  if (!document) return null;

  assertType(value, 'string', true, 'Value must be a string');

  if (value.match(/^([a-z0-9]+-)+[a-z0-9]+$/)) {
    return new (getElementRegistry(value))();
  }
  else {
    let div = document.createElement('div');
    if (value.indexOf('<') !== 0 && value.indexOf('>') !== (value.length - 1)) value = `<${value}>`;
    div.innerHTML = value;
    return div.firstChild;
  }
}

export default createElement;
