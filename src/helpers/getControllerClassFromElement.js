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
let namespace = require('../dom/namespace');

/**
 * Gets the controller class from the DOM element.
 *
 * @param  {Node} element
 * @param  {Object}      [controllerDict] - Look-up dictionary (object literal)
 *                                          that provides all controller classes
 *                                          when sightreading encounters a
 *                                          controller marked element.
 *
 * @return {Class} The controller class.
 *
 * @alias module:requiem~helpers.getControllerClassFromElement
 */
function getControllerClassFromElement(element, controllerDict) {
  let controllerClassName = getControllerClassNameFromElement(element);
  let instanceName = getInstanceNameFromElement(element);
  let controllerClass = (controllerClassName) ? namespace(controllerClassName, controllerDict) : undefined;

  // If no controller class is specified but element is marked as an instance,
  // default the controller class to Element.
  if (!controllerClass && instanceName && instanceName.length > 0) {
    controllerClass = require('../ui/Element');
  }
  else if (typeof controllerClass !== 'function') {
    switch (controllerClassName) {
      case 'Video': {
        controllerClass = require('../ui/Video');
        break;
      }
      case 'Element': {
        controllerClass = require('../ui/Element');
        break;
      }
      default: {
        controllerClass = null;
        break;
      }
    }
  }

  return controllerClass;
}

module.exports = getControllerClassFromElement;
