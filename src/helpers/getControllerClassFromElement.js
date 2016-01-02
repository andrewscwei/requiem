/**
 * Requiem
 * (c) VARIANTE (http://variante.io)
 *
 * This software is released under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 */

'use strict';

let getControllerClassNameFromElement = require('./getControllerClassNameFromElement');
let getInstanceNameFromElement = require('./getInstanceNameFromElement');
let getClassRegistry = require('../dom/getClassRegistry');
let namespace = require('../dom/namespace');

/**
 * Gets the controller class from the DOM element.
 *
 * @param  {Node}   element
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
    controllerClass = require('../ui/Element');
  }
  else if (typeof controllerClass !== 'function') {
    switch (controllerClassName) {
      case 'Video':
        controllerClass = require('../ui/Video');
        break;

      case 'Element':
        controllerClass = require('../ui/Element');
        break;

      case 'Grid':
        controllerClass = require('../ui/Grid');
        break;

      default:
        controllerClass = null;
    }
  }

  return controllerClass;
}

module.exports = getControllerClassFromElement;
