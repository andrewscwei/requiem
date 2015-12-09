/**
 * Requiem
 * (c) VARIANTE (http://variante.io)
 *
 * This software is released under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 */

'use strict';

import getClassRegistry from '../dom/getClassRegistry';
import assert from '../helpers/assert';
import assertType from '../helpers/assertType';
import getInstanceNameFromElement from '../helpers/getInstanceNameFromElement';
import getControllerClassFromElement from '../helpers/getControllerClassFromElement';
import getControllerClassNameFromElement from '../helpers/getControllerClassNameFromElement';
import Directive from '../types/Directive';
import hasChild from '../utils/hasChild';

/**
 * Crawls a DOM node and performs transformations on child nodes marked with
 * Requiem attributes, such as instantiating controller classes and assigning
 * instance names. Transformations are also applied to the specified DOM node,
 * not just its children.
 *
 * @param {Node}   [element=document] - Target element for sightreading. By
 *                                      default this will be the document.
 * @param {Object} [exclusive=false]  - Specifies whether the root node should
 *                                      be excluded from the sightread.
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
  let classRegistry = getClassRegistry();
  let exclusive = false;

  if (arguments.length === 1) {
    let arg = arguments[0];

    assertType(arg, [Node, 'boolean'], true);

    if (arg instanceof Node) {
      element = arg;
    }
    else if (typeof obj === 'boolean') {
      exclusive = arg;
    }
  }
  else if (arguments.length === 2) {
    let arg1 = arguments[0];
    let arg2 = arguments[1];

    assertType(arg1, Node, true);
    assertType(arg2, 'boolean', true);

    if (arg1 !== undefined) element = arg1;
    if (arg2 !== undefined) exclusive = arg2;
  }

  if (element === document) exclusive = true;

  if (!exclusive) {
    let instanceName = getInstanceNameFromElement(element);
    let ControllerClass = getControllerClassFromElement(element);

    assertType(ControllerClass, 'function', false, 'Class \'' + getControllerClassNameFromElement(element) + '\' is not found in specified controller scope: ' + classRegistry);

    return new ControllerClass({
      element: element,
      name: instanceName,
      children: sightread(element, true)
    });
  }
  else {
    let Element = require('../ui/Element');
    let children = null;

    if (element.jquery) element = element.get(0);
    if (!assert((element instanceof Node) || (element instanceof Element) || (document && element === document), 'Element must be an instance of an Node or the DOM itself.')) return null;
    if (element instanceof Element) element = element.element;

    let nodeList = element.querySelectorAll('[' + Directive.CLASS + '], [' + Directive.INSTANCE + ']');
    let qualifiedChildren = _filterParentElements(nodeList);
    let n = qualifiedChildren.length;

    for (let i = 0; i < n; i++) {
      let child = qualifiedChildren[i];
      let instanceName = getInstanceNameFromElement(child);
      let ControllerClass = getControllerClassFromElement(child, classRegistry);

      assertType(ControllerClass, 'function', false, 'Class \'' + getControllerClassNameFromElement(child) + '\' is not found in specified controller scope: ' + classRegistry);

      let m = new ControllerClass({
        element: child,
        name: instanceName,
        children: sightread(child, true)
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
