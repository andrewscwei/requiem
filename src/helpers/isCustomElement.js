// (c) VARIANTE

'use strict';

import assertType from './assertType';
import getAttribute from '../dom/getAttribute';
import getElementRegistry from '../dom/getElementRegistry';

/**
 * Verifies that the specified element is a custom Requiem element.
 *
 * @param {Node} element - Target element.
 *
 * @return {boolean} True if recognized as custom Requiem element, false
 *                   otherwise.
 *
 * @alias module:requiem~helpers.isCustomElement
 */
function isCustomElement(element) {
  assertType(element, Node, false, 'Invalid element specified');

  let is = getAttribute(element, 'is');
  let tag = element.tagName.toLowerCase();

  if (is && (getElementRegistry(is) !== undefined)) return true;
  if (tag && (getElementRegistry(tag) !== undefined)) return true;
  return false;
}

export default isCustomElement;

