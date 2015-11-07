/**
 * Requiem
 * (c) VARIANTE (http://variante.io)
 *
 * This software is released under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 */

'use strict';

let assert = require('../helpers/assert');
let assertType = require('../helpers/assertType');
let getInstanceNameFromElement = require('../helpers/getInstanceNameFromElement');
let getControllerClassFromElement = require('../helpers/getControllerClassFromElement');
let getControllerClassNameFromElement = require('../helpers/getControllerClassNameFromElement');
let Directive = require('../types/Directive');
let hasChild = require('../utils/hasChild');

/**
 * Crawls a DOM node and performs transformations on child nodes marked with
 * Requiem attributes, such as instantiating controller classes and assigning
 * instance names.
 *
 * @param {HTMLElement} [element=document]      - Target element for
 *                                                sightreading. By default this
 *                                                will be the document.
 * @param {Object}      [controllerDict=window] - Look-up dictionary (object
 *                                                literal) that provides all
 *                                                controller classes when
 *                                                sightreading encounters a
 *                                                controller marked element.
 *
 * @return {Object|Element} Either a dictionary (object literal) containing
 *                          all instantiated Requiem Element instances (if the
 *                          target element was the entire document) or a
 *                          single Requiem Element instance representing to
 *                          the single target element.
 *
 * @alias module:requiem~dom.sightread
 */
function sightread() {
  let element = document;
  let controllerDict = window;

  if (arguments.length === 1) {
    let obj = arguments[0];

    if (obj instanceof HTMLElement) {
      element = obj;
    }
    else if (typeof obj === 'object') {
      controllerDict = obj;
    }
  }
  else if (arguments.length === 2) {
    let arg1 = arguments[0];
    let arg2 = arguments[1];

    if (arg1) element = arg1;
    if (arg2) controllerDict = arg2;
  }

  if (element === document) {
    return _getChildElements(element, controllerDict);
  }
  else {
    let instanceName = getInstanceNameFromElement(element);
    let ControllerClass = getControllerClassFromElement(element, controllerDict);

    assertType(ControllerClass, 'function', false, 'Class \'' + getControllerClassNameFromElement(element) + '\' is not found in specified controller scope: ' + controllerDict);

    return new ControllerClass({
      element: element,
      name: instanceName,
      children: _getChildElements(element, controllerDict)
    });
  }
}

/**
 * Transforms all the DOM elements inside the specified element marked with
 * custom Requiem attributes into an instance of either its specified controller
 * class or a generic Requiem Element. If a marked DOM element is a child of
 * another marked DOM element, it will be passed into the parent element's
 * children tree as its specified controller class instance or a generic Requiem
 * Element.
 *
 * @param {HTMLElement|Element} [element=document]
 * @param {Object}              [controllerDict=window]
 *
 * @private
 * @alias module:requiem~dom._getChildElements
 */
function _getChildElements(element, controllerDict) {
  let Element = require('../ui/Element');
  let children = null;

  if (!element) element = document;
  if (element.jquery) element = element.get(0);
  if (!assert((element instanceof HTMLElement) || (element instanceof Element) || (document && element === document), 'Element must be an instance of an HTMLElement or the DOM itself.')) return null;
  if (element instanceof Element) element = element.element;

  let nodeList = element.querySelectorAll('[' + Directive.CONTROLLER + '], [data-' + Directive.CONTROLLER + '], [' + Directive.INSTANCE + '], [data-' + Directive.INSTANCE + ']');
  let qualifiedChildren = _filterParentElements(nodeList);
  let n = qualifiedChildren.length;

  for (let i = 0; i < n; i++) {
    let child = qualifiedChildren[i];
    let instanceName = getInstanceNameFromElement(child);
    let ControllerClass = getControllerClassFromElement(child, controllerDict);

    assertType(ControllerClass, 'function', false, 'Class \'' + getControllerClassNameFromElement(child) + '\' is not found in specified controller scope: ' + controllerDict);

    let m = new ControllerClass({
      element: child,
      name: instanceName,
      children: _getChildElements(child, controllerDict)
    });

    if (instanceName && instanceName.length > 0) {
      if (!children) children = {};

      if (!children[instanceName]) {
        children[instanceName] = m;
      }
      else {
        if (children[instanceName] instanceof Array) {
          children[instanceName].push(m);
        }
        else {
          let a = [children[instanceName]];
          a.push(m);
          children[instanceName] = a;
        }
      }
    }
  }

  return children;
}

/**
 * Scans the provided node list and returns a new node list with only parent
 * nodes.
 *
 * @param  {NodeList} nodeList - The node list.
 *
 * @return {NodeList} The filtered node list containing only parent nodes.
 *
 * @private
 * @alias module:requiem~dom._filterParentElements
 */
function _filterParentElements(nodeList) {
  let n = nodeList.length;
  let o = [];

  for (let i = 0; i < n; i++) {
    let isParent = true;
    let child = nodeList[i];

    for (let j = 0; j < n; j++) {
      if (i === j) continue;

      let parent = nodeList[j];

      if (hasChild(parent, child)) {
        isParent = false;
        break;
      }
    }

    if (isParent) {
      o.push(child);
    }
  }

  return o;
}

module.exports = sightread;
