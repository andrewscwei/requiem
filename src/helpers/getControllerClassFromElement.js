/**
 * Requiem
 * (c) VARIANTE (http://variante.io)
 *
 * This software is released under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 */

'use strict';

import Element from '../ui/Element';
import Grid from '../ui/Grid';
import Video from '../ui/Video';
import getClassRegistry from '../dom/getClassRegistry';
import getControllerClassNameFromElement from './getControllerClassNameFromElement';
import getInstanceNameFromElement from './getInstanceNameFromElement';
import namespace from '../dom/namespace';

/**
 * Gets the controller class from the DOM element.
 *
 * @param {Node} element
 *
 * @return {Class} The controller class.
 *
 * @alias module:requiem~helpers.getControllerClassFromElement
 */
function getControllerClassFromElement(element) {
  let classRegistry = getClassRegistry();
  let controllerClassName = getControllerClassNameFromElement(element);
  let instanceName = getInstanceNameFromElement(element);
  let controllerClass = (controllerClassName) ? namespace(controllerClassName, classRegistry) : undefined;

  // If no controller class is specified but element is marked as an instance,
  // default the controller class to Element.
  if (!controllerClass && instanceName && instanceName.length > 0) {
    controllerClass = Element;
  }
  else if (typeof controllerClass !== 'function') {
    switch (controllerClassName) {
      case 'Video':
        controllerClass = Video;
        break;

      case 'Element':
        controllerClass = Element;
        break;

      case 'Grid':
        controllerClass = Grid;
        break;

      default:
        controllerClass = null;
    }
  }

  return controllerClass;
}

export default getControllerClassFromElement;
