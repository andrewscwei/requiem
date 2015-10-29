/**
 * Requiem
 * (c) VARIANTE (http://variante.io)
 *
 * This software is released under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 *
 * @type {Function}
 */

'use strict';

define([
  'dom/namespace',
  'helpers/assert',
  'helpers/assertType',
  'types/Directives',
  'ui/Element',
  'ui/Video',
  'utils/hasChild'
], function(
  namespace,
  assert,
  assertType,
  Directives,
  Element,
  Video,
  hasChild
) {
  /**
   * Parses the entire DOM and transforms elements marked with Requiem attributes
   * into instances of its corresponding controller class (or Requiem Element by
   * by default).
   *
   * @param {*} element:document          Element to perform the sightread on.
   *                                      By default it is the document.
   * @param {*} controllerScope:document  Scope (object literal) that contains
   *                                      all controller classes to instantiate
   *                                      from during the sightreading process.
   */
  function sightread() {
    var element = document;
    var controllerScope = window;

    if (arguments.length === 1) {
      var obj = arguments[0];

      if (obj instanceof HTMLElement) {
        element = obj;
      }
      else if (typeof obj === 'object') {
        controllerScope = obj;
      }
    }
    else if (arguments.length === 2) {
      var arg1 = arguments[0];
      var arg2 = arguments[1];

      if (arg1) element = arg1;
      if (arg2) controllerScope = arg2;
    }

    if (element === document) {
      return getChildElements(element, controllerScope);
    }
    else {
      var instanceName = getInstanceNameFromElement(element);
      var ControllerClass = getControllerClassFromElement(element, controllerScope);

      assertType(ControllerClass, 'function', false, 'Class \'' + getControllerClassNameFromElement(element) + '\' is not found in specified controller scope: ' + controllerScope);

      var m = new ControllerClass({
        element: element,
        name: instanceName,
        children: getChildElements(element, controllerScope)
      });

      if (instanceName && instanceName !== '') {
        var o = {};
        o[instanceName] = m;
        return o;
      }
      else {
        return m;
      }
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
   * @param {Object} controllerScope
   */
  function getChildElements(element, controllerScope) {
    var children = null;

    if (!element) element = document;
    if (element.jquery) element = element.get(0);
    if (!assert((element instanceof HTMLElement) || (element instanceof Element) || (document && element === document), 'Element must be an instance of an HTMLElement or the DOM itself.')) return null;
    if (element instanceof Element) element = element.element;

    var nodeList = element.querySelectorAll('[' + Directives.Controller + '], [data-' + Directives.Controller + '], [' + Directives.Instance + '], [data-' + Directives.Instance + ']');
    var qualifiedChildren = filterParentElements(nodeList);
    var n = qualifiedChildren.length;

    for (var i = 0; i < n; i++) {
      var child = qualifiedChildren[i];
      var instanceName = getInstanceNameFromElement(child);
      var ControllerClass = getControllerClassFromElement(child, controllerScope);

      assertType(ControllerClass, 'function', false, 'Class \'' + getControllerClassNameFromElement(child) + '\' is not found in specified controller scope: ' + controllerScope);

      var m = new ControllerClass({
        element: child,
        name: instanceName,
        children: getChildElements(child, controllerScope)
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
            var a = [children[instanceName]];
            a.push(m);
            children[instanceName] = a;
          }
        }
      }
    }

    return children;
  }

  function getControllerClassFromElement(element, controllerScope) {
    var controllerClassName = getControllerClassNameFromElement(element);
    var instanceName = getInstanceNameFromElement(element);
    var controllerClass = (controllerClassName) ? namespace(controllerClassName, controllerScope) : undefined;

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
    return element.getAttribute(Directives.Instance) || element.getAttribute('data-' + Directives.Instance);
  }

  function getControllerClassNameFromElement(element) {
    return element.getAttribute(Directives.Controller) || element.getAttribute('data-' + Directives.Controller);
  }

  function filterParentElements(nodeList) {
    var n = nodeList.length;
    var o = [];

    for (var i = 0; i < n; i++) {
      var isParent = true;
      var child = nodeList[i];

      for (var j = 0; j < n; j++) {
        if (i === j) continue;

        var parent = nodeList[j];

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

  return sightread;
});
