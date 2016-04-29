// (c) VARIANTE

'use strict';

import getAttribute from '../dom/getAttribute';

/**
 * Gets the instance name from a DOM element.
 *
 * @param {Node} element - The DOM element.
 *
 * @return {string} The instance name.
 *
 * @alias module:requiem~helpers.getInstanceNameFromElement
 */
function getInstanceNameFromElement(element) {
  let nameFromId = getAttribute(element, 'id');
  let nameFromName = getAttribute(element, 'name');

  if (nameFromId !== null && nameFromId !== undefined && nameFromId !== '')
    return nameFromId;
  else if (nameFromName !== null && nameFromName !== undefined && nameFromName !== '')
    return nameFromName;
  else
    return null;
}

export default getInstanceNameFromElement;

