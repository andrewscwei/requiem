/**
 * Requiem
 * (c) VARIANTE (http://variante.io)
 *
 * This software is released under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 */

'use strict';

let namespace = require('./namespace');
let assert = require('../helpers/assert');
let assertType = require('../helpers/assertType');
let Directive = require('../types/Directive');
let Element = require('../ui/Element');
let Video = require('../ui/Video');
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
    return getChildElements(element, controllerDict);
  }
  else {
    let instanceName = getInstanceNameFromElement(element);
    let ControllerClass = getControllerClassFromElement(element, controllerDict);

    assertType(ControllerClass, 'function', false, 'Class \'' + getControllerClassNameFromElement(element) + '\' is not found in specified controller scope: ' + controllerDict);

    return new ControllerClass({
      element: element,
      name: instanceName,
      children: getChildElements(element, controllerDict)
    });
  }
}

/**
 * Transforms all the DOM elements inside the specified element marked with custom
 * Requiem attributes into an instance of either its specified controller class or a generic
 * Requiem Element. If a marked DOM element is a child of another marked DOM element, it will
 * be passed into the parent element's children tree as its specified controller
 * class instance or a generic Requiem Element.
 *
 * @param {Object} element         HTMLElement, Requiem Element, or jQuery object.
 * @param {Object} controllerDict
 *
 * @private
 */
function getChildElements(element, controllerDict) {
  let children = null;

  if (!element) element = document;
  if (element.jquery) element = element.get(0);
  if (!assert((element instanceof HTMLElement) || (element instanceof Element) || (document && element === document), 'Element must be an instance of an HTMLElement or the DOM itself.')) return null;
  if (element instanceof Element) element = element.element;

  let nodeList = element.querySelectorAll('[' + Directive.CONTROLLER + '], [data-' + Directive.CONTROLLER + '], [' + Directive.INSTANCE + '], [data-' + Directive.INSTANCE + ']');
  let qualifiedChildren = filterParentElements(nodeList);
  let n = qualifiedChildren.length;

  for (let i = 0; i < n; i++) {
    let child = qualifiedChildren[i];
    let instanceName = getInstanceNameFromElement(child);
    let ControllerClass = getControllerClassFromElement(child, controllerDict);

    assertType(ControllerClass, 'function', false, 'Class \'' + getControllerClassNameFromElement(child) + '\' is not found in specified controller scope: ' + controllerDict);

    let m = new ControllerClass({
      element: child,
      name: instanceName,
      children: getChildElements(child, controllerDict)
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

function getControllerClassFromElement(element, controllerDict) {
  let controllerClassName = getControllerClassNameFromElement(element);
  let instanceName = getInstanceNameFromElement(element);
  let controllerClass = (controllerClassName) ? namespace(controllerClassName, controllerDict) : undefined;

  // If no controller class is specified but element is marked as an instance, default the controller class to
  // Element.
  if (!controllerClass && instanceName && instanceName.length > 0) {
    controllerClass = Element;
  }
  else if (typeof controllerClass !== 'function') {
    switch (controllerClassName) {
      case 'Video': {
        controllerClass = Video;
        break;
      }
      case 'Element': {
        controllerClass = Element;
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

function getInstanceNameFromElement(element) {
  return element.getAttribute(Directive.INSTANCE) || element.getAttribute('data-' + Directive.INSTANCE);
}

function getControllerClassNameFromElement(element) {
  return element.getAttribute(Directive.CONTROLLER) || element.getAttribute('data-' + Directive.CONTROLLER);
}

function filterParentElements(nodeList) {
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
