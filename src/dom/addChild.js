/**
 * Requiem
 * (c) VARIANTE (http://variante.io)
 *
 * This software is released under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 */

'use strict';

import Directive from '../enums/Directive';
import NodeState from '../enums/NodeState';
import assert from '../helpers/assert';
import assertType from '../helpers/assertType';
import noval from '../helpers/noval';
import getInstanceNameFromElement from '../helpers/getInstanceNameFromElement';

/**
 * Adds a child or multiple children to this Element instance. Any added
 * must be a Requiem Element. If an Node is provided, it will be
 * transformed into a Requiem Element. A child is automatically appended
 * to the DOM tree of this instance.
 *
 * @param {Element|Element[]|Node|Node[]} child  - Single child or an array of
 *                                                 children. Child elements
 *                                                 can be instance(s) of
 *                                                 Requiem Elements or Nodes.
 * @param {string} [name] - The name of the child/children to be added.
 *                          Typically a name is required. If it is not
 *                          specified, this method will attempt to deduct the
 *                          name from the provided child/children. This method
 *                          fails if no name is specified or deducted. If there
 *                          exists another child with the same name, the added
 *                          child will be grouped together with the existing
 *                          child.
 * @param {boolean} [prepend=false] - Specifies whether the child is prepended
 *                                    to this element instead of appended.
 * @param {Element} [element] - Specifies the parent Element instance to fetch
 *                              the child from.
 *
 * @return {Element|Element[]} The added element(s).
 */
function addChild(child, name, prepend, element) {
  let Element = require('../ui/Element');

  if (!assert(child !== undefined, 'Parameter \'child\' must be specified')) return null;
  if (typeof prepend !== 'boolean') prepend = false;
  if (!assertType(element, Element, true, 'Parameter \'element\', if specified, must be an Element instance')) return null;

  let childrenLookup = (element instanceof Element) ? element.children : window._children;

  if (child instanceof Array) {
    let n = child.length;
    let children = [];

    if (prepend) {
      for (let i = n-1; i >= 0; i--) {
        let c = child[i];
        children.push(addChild(c, name, true, element));
      }
    }
    else {
      for (let i = 0; i < n; i++) {
        let c = child[i];
        children.push(addChild(c, name, false, element));
      }
    }

    return children;
  }
  else {
    if (!assertType(child, [Node, Element], false, 'Invalid child specified. Child must be an instance of Node or Requiem Element.')) return null;

    if (child instanceof Node) {
      if (noval(name)) name = getInstanceNameFromElement(child);
      if (noval(name)) {
        name = `instance${window._children.count}`;
        window._children.count++;
      }

      child.removeAttribute(Directive.INSTANCE);
      child.setAttribute(Directive.INSTANCE, name);
      child = dom.sightread(child);
    }
    else if (child instanceof Element) {
      if (noval(name)) name = child.name;
      if (noval(name)) {
        name = `instance${window._children.count}`;
        window._children.count++;
      }

      child.name = name;
    }

    if (childrenLookup[name]) {
      if (childrenLookup[name] instanceof Array) {
        childrenLookup[name].push(child);
      }
      else {
        let a = [childrenLookup[name]];
        a.push(child);
        childrenLookup[name] = a;
      }
    }
    else {
      childrenLookup[name] = child;
    }

    if (child.nodeState === NodeState.IDLE || child.nodeState === NodeState.DESTROYED) {
      child.init();
    }

    let shouldAddChild = true;
    let domElement = (element instanceof Element) ? element.element : document.body;

    if (child.element.parentNode && document) {
      let e = child.element;

      while (e !== null && e !== undefined && e !== document) {
        e = e.parentNode;

        if (e === domElement) {
          shouldAddChild = false;
          break;
        }
      }
    }

    if (shouldAddChild) {
      if (prepend) {
        domElement.insertBefore(child.element, domElement.firstChild);
      }
      else {
        domElement.appendChild(child.element);
      }
    }

    return child;
  }
}

module.exports = addChild;
