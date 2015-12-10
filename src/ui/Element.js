/**
 * Requiem
 * (c) VARIANTE (http://variante.io)
 *
 * This software is released under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 */

'use strict';

import getDataRegistry from '../dom/getDataRegistry';
import assert from '../helpers/assert';
import assertType from '../helpers/assertType';
import noval from '../helpers/noval';
import getFunctionName from '../helpers/getFunctionName';
import log from '../helpers/log';
import validateAttribute from '../helpers/validateAttribute';
import getInstanceNameFromElement from '../helpers/getInstanceNameFromElement';
import DirtyType from '../types/DirtyType';
import NodeState from '../types/NodeState';
import EventType from '../types/EventType';
import Directive from '../types/Directive';
import ElementUpdateDelegate from '../ui/ElementUpdateDelegate';
import sightread from '../dom/sightread';

/**
 * @class
 *
 * Generic DOM element wrapper.
 *
 * @alias module:requiem~ui.Element
 */
class Element {
  /**
   * Creates a new Element instance with optional initial properties.
   *
   * @param  {string|Node|Object} [init] - Initial properties. If this is a
   *                                       string, it will be used as this
   *                                       Element's instance name. If this is
   *                                       a Node, it would be used as the
   *                                       internal DOM element. If this is a
   *                                       hash, each key/value pair will be
   *                                       mapped to an instance property (only
   *                                       existing instance properties will be
   *                                       mapped).
   *
   * @return {Element} A new Element instance.
   */
  constructor(init) {
    // Define instance properties.
    this.__define_properties();

    // Scan init object and set instance properties as per object body.
    if (init !== undefined && init !== null) {
      // If init value is a Node, simply assign it to the internal DOM element.
      if (init instanceof Node) {
        this.element = init;
      }
      // If init value is a string, assign it to the name of this instance.
      else if (typeof init === 'string') {
        this.name = init;
      }
      // If init value is a hash, map each key/value pair to an instance
      // property.
      else if (typeof init === 'object') {
        for (let key in init) {
          if (this.hasOwnProperty(key)) {
            switch (key) {
              case 'children':
                let children = init.children;
                for (let name in children) {
                  this.addChild(children[name], name);
                }
                break;

              case 'properties':
                this.setProperties(init.properties);
                break;

              default:
                this[key] = init[key];
            }
          }
        }
      }
    }

    // Check if this Element needs seed data from the data registry.
    if (this.hasAttribute(Directive.REF)) {
      let ref = this.getAttribute(Directive.REF);
      let data = getDataRegistry()[ref];

      if (data) this.setProperties(data);
    }

    // Scan for internal DOM element attributes prefixed with Directive.PROPERTY
    // and generate properties from them.
    let attributes = this.element.attributes;
    let nAtributes = attributes.length;
    let regex = new RegExp('^' + Directive.PROPERTY, 'i');

    for (let i = 0; i < nAtributes; i++) {
      let attribute = attributes[i];

      if (!validateAttribute(attribute.name) || !regex.test(attribute.name)) continue;

      // Generate camel case property name from the attribute.
      let propertyName = attribute.name.replace(regex, '').replace(/-([a-z])/g, (g) => (g[1].toUpperCase()));

      Element.defineProperty(this, propertyName, {
        defaultValue: this.getAttribute(attribute.name),
        attribute: true,
        dirtyType: DirtyType.DATA,
        get: true,
        set: true
      }, 'properties');
    }

    log(this.toString() + ':new(', init, ')');

    this.init();
  }

  /**
   * Defines a property in an Element instance.
   *
   * @param {Element}          element                  - Requiem Element
   *                                                      instance of which the
   *                                                      property belongs.
   * @param {string}           propertyName             - Name of the property
   *                                                      to be defined.
   * @param {Object}           descriptor               - A hash that defines
   *                                                      the behavior of this n
   *                                                      ew property. This hash
   *                                                      inherits that of the
   *                                                      descriptor in
   *                                                      Object#defineProperty.
   * @param {boolean}          [descriptor.unique=true] - Specifies that the
   *                                                      modifier method will
   *                                                      only invoke if the new
   *                                                      value is different
   *                                                      from the old value.
   * @param {DirtyType}        [descriptor.dirtyType]   - Specifies the
   *                                                      DirtyType to mark as
   *                                                      dirty whenever a new
   *                                                      value is set.
   * @param {EventType}        [descriptor.eventType]   - Specifies the
   *                                                      EventType to dispatch
   *                                                      whenever a new value
   *                                                      is set.
   * @param {boolean}          [descriptor.attribute]   - Specifies whether the
   *                                                      a corresponding DOM
   *                                                      attribute will update
   *                                                      whenever a new value
   *                                                      is set.
   * @param {Function}         [descriptor.onChange]    - Method invoked when
   *                                                      the property changes.
   * @param {Function|boolean} [descriptor.get]         - Method invoked when
   *                                                      the accessor method is
   *                                                      called. This is a good
   *                                                      place to manipulate
   *                                                      the value before it is
   *                                                      returned. If simply
   *                                                      set to true, a generic
   *                                                      accessor method will
   *                                                      be used.
   * @param {Function|boolean} [descriptor.set]         - Method invoked when
   *                                                      the modifier method is
   *                                                      called. This is a good
   *                                                      placd to manipulate
   *                                                      the value before it is
   *                                                      set. If simply set to
   *                                                      true, a generic
   *                                                      modifier method will
   *                                                      be used.
   * @param {string}           [scope]                  - Name of the instance
   *                                                      property of the
   *                                                      Element instance to
   *                                                      create the new
   *                                                      property in. This
   *                                                      property must be
   *                                                      enumerable.
   */
  static defineProperty(element, propertyName, descriptor, scope) {
    assertType(element, Element, false, 'Parameter \'element\' must be an Element instance');
    assertType(descriptor, 'object', false, 'Parameter \'descriptor\' must be an object literal');
    assertType(descriptor.configurable, 'boolean', true, 'Optional configurable key in descriptor must be a boolean');
    assertType(descriptor.enumerable, 'boolean', true, 'Optional enumerable key in descriptor must be a boolean');
    assertType(descriptor.writable, 'boolean', true, 'Optional writable key in descriptor must be a boolean');
    assertType(descriptor.unique, 'boolean', true, 'Optional unique key in descriptor must be a boolean');
    assertType(descriptor.dirtyType, 'number', true, 'Optional dirty type must be of DirtyType enum (number)');
    assertType(descriptor.eventType, 'string', true, 'Optional event type must be a string');
    assertType(descriptor.attribute, 'boolean', true, 'Optional attribute must be a boolean');
    assertType(descriptor.onChange, 'function', true, 'Optional change handler must be a function');
    assertType(scope, 'string', true, 'Optional parameter \'scope\' must be a string');
    assert(validateAttribute(descriptor.attribute), 'Attribute \'' + descriptor.attribute + '\' is reserved');

    let dirtyType = descriptor.dirtyType;
    let defaultValue = descriptor.defaultValue;
    let attribute = descriptor.attribute;
    let attributeName = Directive.PROPERTY+propertyName.replace(/([A-Z])/g, ($1) => ('-'+$1.toLowerCase()));
    let eventType = descriptor.eventType;
    let unique = descriptor.unique;

    if (unique === undefined) unique = true;

    if (scope === undefined) {
      scope = element;
    }
    else {
      assert(element.hasOwnProperty(scope), 'The specified Element instance does not have a property called \'' + scope + '\'');
      scope = element[scope];
    }

    if (defaultValue !== undefined) {
      scope.__private__ = scope.__private__ || {};
      Object.defineProperty(scope.__private__, propertyName, { value: defaultValue, writable: true });
    }

    let newDescriptor = {};

    if (descriptor.configurable !== undefined) newDescriptor.configurable = descriptor.configurable;
    if (descriptor.enumerable !== undefined) newDescriptor.enumerable = descriptor.enumerable;
    if (descriptor.value !== undefined) newDescriptor.value = descriptor.value;
    if (descriptor.writable !== undefined) newDescriptor.writable = descriptor.writable;

    if (descriptor.get) {
      newDescriptor.get = () => ((typeof descriptor.get === 'function') ? descriptor.get(scope.__private__[propertyName]) : scope.__private__[propertyName]);
    }

    if (descriptor.set) {
      newDescriptor.set = (val) => {
        let oldVal = scope.__private__[propertyName];

        if (typeof descriptor.set === 'function') val = descriptor.set(val);

        if (unique && (oldVal === val)) return;

        if (oldVal === undefined) {
          scope.__private__ = scope.__private__ || {};
          Object.defineProperty(scope.__private__, propertyName, { value: val, writable: true });
        }
        else {
          scope.__private__[propertyName] = val;
        }

        if (descriptor.onChange !== undefined) descriptor.onChange(oldVal, val);
        if (attribute === true) element.setAttribute(attributeName, val);
        if (dirtyType !== undefined) element.setDirty(dirtyType);

        if (eventType !== undefined) {
          let event = new CustomEvent(eventType, {
            detail: {
              property: propertyName,
              oldValue: oldVal,
              newValue: val
            }
          });

          element.dispatchEvent(event);
        }
      };
    }

    Object.defineProperty(scope, propertyName, newDescriptor);

    if (defaultValue !== undefined && attribute === true) {
      element.setAttribute(attributeName, defaultValue);
    }

    if (defaultValue !== undefined && dirtyType !== undefined && element.nodeState >= NodeState.UPDATED) {
      element.setDirty(dirtyType);
    }
  }

  /**
   * Adds an event listener to an Element instance.
   *
   * @see module:requiem~ui.Element#addEventListener
   */
  static addEventListener() {
    let element = arguments[0];
    let event = arguments[1];
    let listener = arguments[2];
    let useCapture = arguments[3] || false;

    assert(!element || element instanceof Element);

    if (noval(element)) return;

    element.addEventListener(event, listener, useCapture);
  }

  /**
   * Removes an event listener from an Element instance.
   *
   * @see module:requiem~ui.Element#removeEventListener
   */
  static removeEventListener() {
    let element = arguments[0];
    let event = arguments[1];
    let listener = arguments[2];
    let useCapture = arguments[3] || false;

    assert(!element || element instanceof Element);

    if (noval(element)) return;

    element.removeEventListener(event, listener, useCapture);
  }

  /**
   * Initializes this Element instance. Must manually invoke.
   */
  init() {
    log(this.toString() + '::init()');

    this.__set_node_state(NodeState.INITIALIZED);
    this.updateDelegate.init();

    for (let key in this.children) {
      let child = this.children[key];

      if (child instanceof Array) {
        let n = child.length;

        for (let i = 0; i < n; i++) {
          let c = child[i];

          if (c.nodeState === NodeState.IDLE || c.nodeState === NodeState.DESTROYED) {
            c.init();
          }
        }
      }
      else {
        if (child.nodeState === NodeState.IDLE || child.nodeState === NodeState.DESTROYED) {
          child.init();
        }
      }
    }
  }

  /**
   * Destroys this Element instance.
   */
  destroy() {
    log(this.toString() + '::destroy()');

    // Destroy all children first.
    for (let key in this.children) {
      let child = this.children[key];

      if (child instanceof Array) {
        let n = child.length;

        for (let i = 0; i < n; i++) {
          let c = child[i];

          if (c.nodeState !== NodeState.DESTROYED) {
            c.destroy();
          }
        }
      }
      else {
        if (child.nodeState !== NodeState.DESTROYED) {
          child.destroy();
        }
      }
    }

    this.removeAllEventListeners();
    this.updateDelegate.destroy();

    this.__set_node_state(NodeState.DESTROYED);
  }

  /**
   * Handler invoked whenever a visual update is required.
   */
  update() {
    this.__set_node_state(NodeState.UPDATED);
  }

  /**
   * Sets up the responsiveness of the internal ElementUpdateDelegate
   * instance.
   *
   * @param {Object|Number}  Either the conductor or the refresh rate (if 1
   *                         argument supplied).
   * @param {number}         Refresh rate.
   * @param {...args}        EventType(s) which this element will respond to.
   */
  respondsTo() {
    let args = Array.prototype.slice.call(arguments);
    let n = args.length;

    if (!assert(n > 0, 'Too few arguments')) return;
    if (!assert(this.nodeState === NodeState.IDLE, 'Responsiveness must be defined when the node state of this element is IDLE')) return;

    if (isNaN(args[0])) {
      this.updateDelegate.conductor = args.shift();
      this.updateDelegate.refreshRate = args.shift();
    }
    else {
      this.updateDelegate.refreshRate = args.shift();
    }

    if (args.length === 0) {
      this.updateDelegate.responsive = true;
    }
    else {
      this.updateDelegate.responsive = args;
    }
  }

  /**
   * Adds a child or multiple children to this Element instance. Any added
   * must be a Requiem Element. If an Node is provided, it will be
   * transformed into a Requiem Element. A child is automatically appended
   * to the DOM tree of this instance.
   *
   * @param {Element|Element[]|Node|Node[]} child  - Single child or an array of
   *                                                 children. Child elements
   *                                                 can be instance(s) of
   *                                                 Requiem Elements, jQuery
   *                                                 Elements or HTMLElements.
   * @param {string} [name] - The name of the child/children to be added.
   *                          Typically a name is required. If it is not
   *                          specified, this method will attempt to deduct the
   *                          name from the provided child/children. This method
   *                          fails if no name is specified or deducted. If there
   *                          exists another child with the same name, the added
   *                          child will be grouped together with the existing
   *                          child.
   *
   * @return {Element|Element[]} The added element(s).
   */
  addChild(child, name) {
    if (!assert(child !== undefined, 'Parameter \'child\' must be specified')) return null;

    if (child.jquery) {
      return this.addChild(child.get(), name);
    }
    else if (child instanceof Array) {
      let n = child.length;
      let children = [];

      for (let i = 0; i < n; i++) {
        let c = child[i];

        children.push(this.addChild(c, name));
      }

      return children;
    }
    else {
      if (!assertType(child, [Node, Element], false, 'Invalid child specified. Child must be an instance of Node or Requiem Element.')) return null;

      if (child instanceof Node) {
        if (noval(name)) name = getInstanceNameFromElement(child);
        if (!assert(!noval(name), 'Either child name was unprovided or it cannot be deducted from the specified child')) return null;

        child.removeAttribute(Directive.INSTANCE);
        child.setAttribute(Directive.INSTANCE, name);
        child = sightread(child);
      }
      else {
        if (noval(name)) name = child.name;
        if (!assert(!noval(name), 'Either child name was unprovided or it cannot be deducted from the specified child')) return null;

        child.name = name;
      }

      if (this.children[name]) {
        if (this.children[name] instanceof Array) {
          this.children[name].push(child);
        }
        else {
          let a = [this.children[name]];
          a.push(child);
          this.children[name] = a;
        }
      }
      else {
        this.children[name] = child;
      }

      if (child.nodeState === NodeState.IDLE || child.nodeState === NodeState.DESTROYED) {
        child.init();
      }

      let shouldAddChild = true;

      if (child.element.parentNode && document) {
        let e = child.element;

        while (e !== null && e !== undefined && e !== document) {
          e = e.parentNode;

          if (e === this.element) {
            shouldAddChild = false;
            break;
          }
        }
      }

      if (shouldAddChild) {
        this.element.appendChild(child.element);
      }

      return child;
    }
  }

  /**
   * Determines if this Element instance contains the specified child.
   *
   * @param {Element|Node|string} child - A child is a Requiem Element,
   *                                             jQuery element or Node. It
   *                                             can also be a string of child
   *                                             name(s) separated by '.'.
   *
   * @return {boolean} True if this Element instance has the specified child,
   *                   false otherwise.
   */
  hasChild(child) {
    if (!assert(child !== undefined, 'Child is undefined')) return false;

    if (typeof child === 'string') {
      return !noval(this.getChild(child));
    }
    else {
      let e;

      if (child.jquery && child.length === 1) {
        e = child.get(0);
      }
      else if (child instanceof Element) {
        e = child.element;
      }
      else {
        e = child;
      }

      while (!noval(e) && e !== document) {
        e = e.parentNode;

        if (e === this.element) {
          return true;
        }
      }

      return false;
    }
  }

  /**
   * Removes a child or multiple children from this Element instance.
   *
   * @param {Node|Element|Array|string} child - A single child is a Requiem
   *                                            Element, jQuery element or Node.
   *                                            It can also be a string of child
   *                                            name(s) separated by '.', or an
   *                                            array of child elements.
   *
   * @return {Element|Element[]} The removed element(s).
   */
  removeChild(child) {
    if (!assert(!noval(child, true), 'No valid child specified')) return;

    // If child is a string, treat each entry separated by '.' as a child name.
    if (typeof child === 'string') {
      this.removeChild(this.getChild(child));
    }
    // If child is an array, remove each element inside recursively.
    else if ((child instanceof Array) || (child.jquery && child.length > 1)) {
      while (child.length > 0) {
        this.removeChild(child[0]);
      }
    }
    // If child is not an array, assume that it is an object that equates or
    // contains a valid DOM element. Remove it accordingly if this Element
    // instance is indeed its parent/ancestor.
    else if (this.hasChild(child)) {
      // First extract the DOM element.
      let e;
      let a = [];

      if (child.jquery && child.length === 1) {
        e = child.get(0);
      }
      else if (child instanceof Element) {
        e = child.element;
      }
      else if (child instanceof Node) {
        e = child;
      }

      // No valid DOM element found? Terminate.
      if (noval(e)) return null;

      for (let key in this.children) {
        let c = this.children[key];

        if (c instanceof Array) {
          let n = c.length;
          let t = 0;

          for (let i = 0; i < n; i++) {
            let element = c[i];
            t = i;

            if (element.element === e) {
              a.push(element);
              element.destroy();
              e.parentNode.removeChild(e);
              break;
            }
          }

          c.splice(t, 1);

          if (c.length === 0) {
            delete this.children[key];
          }
        }
        else if (c instanceof Element) {
          if (c.element === e) {
            a.push(c);
            c.destroy();
            e.parentNode.removeChild(e);
            delete this.children[key];
          }
          else {
            a.push(c.removeChild(child));
          }
        }
      }

      if (a.length === 0) {
        return null;
      }
      else if (a.length === 1) {
        return a[0];
      }
      else {
        return a;
      }
    }
  }

  /**
   * Gets a child by its name. If child is an array, it will be returned
   * immediately.
   *
   * @param {string}  name             - Name of the child, depth separated by
   *                                     '.' (i.e. 'foo.bar').
   * @param {boolean} [recursive=true] - Speciifies whether to search for the
   *                                     child recursively down the tree.
   *
   * @return {Object|Array} The fetched child.
   */
  getChild(name, recursive) {
    if (!assertType(name, 'string', false, 'Child name must be specified')) return null;
    if (!assertType(recursive, 'boolean', true, 'Parameter \'recursive\', if specified, must be a boolean')) return null;

    recursive = (recursive === undefined) ? true : recursive;

    let targets = name.split('.');
    let currentTarget = targets.shift();
    let child = this.children[currentTarget];

    if (recursive && (targets.length > 0)) {
      if (child instanceof Array) {
        let children = [];
        let n = child.length;

        for (let i = 0; i < n; i++) {
          let c = child[i];

          if (c instanceof Element) {
            children.push(c.getChild(targets.join('.')));
          }
          else {
            children.push(null);
          }
        }

        if (!noval(children, true)) {
          return children;
        }
        else {
          return null;
        }
      }
      else if (child instanceof Element) {
        return child.getChild(targets.join('.'));
      }
      else {
        return null;
      }
    }
    else if (child instanceof Element) {
      return child;
    }
    else if (!noval(child, true)) {
      return child;
    }
    else {
      return null;
    }
  }

  /**
   * @see Node#addEventListener
   */
  addEventListener() {
    let event = arguments[0];
    let listener = arguments[1];
    let useCapture = arguments[2] || false;

    if (this.cachesListeners) {
      if (!this._listenerMap) {
        Object.defineProperty(this, '_listenerMap', {
          value: {},
          writable: false
        });
      }

      if (!this._listenerMap[event]) {
        this._listenerMap[event] = [];
      }

      let m = this._listenerMap[event];
      let n = m.length;
      let b = true;

      if (event === EventType.MOUSE.CLICK_OUTSIDE) {
        let _listener = listener;
        listener = function(event) {
          if ((event.target !== this.element) && !this.hasChild(event.target)) {
            _listener(event);
          }
        }.bind(this);
      }

      for (let i = 0; i < n; i++) {
        let e = m[i];

        if (e.listener === listener) {
          b = false;
          break;
        }
      }

      if (b) {
        m.push({
          listener: listener,
          useCapture: useCapture
        });
      }
    }

    if (window && event === EventType.MOUSE.CLICK_OUTSIDE) {
      window.addEventListener(EventType.MOUSE.CLICK, listener, useCapture);
    }
    else {
      this.element.addEventListener.apply(this.element, arguments);
    }
  }

  /**
   * Determines if a particular listener (or any listener in the specified
   * event) exist in this Element instance. For this to work this Element
   * must be configured to have 'cachesListeners' property enabled when event
   * listeners were being added.
   *
   * @param {string}   event    - Event name.
   * @param {Function} listener - Listener function.
   *
   * @return {boolean}
   */
  hasEventListener(event, listener) {
    if (!this._listenerMap) return false;
    if (!this._listenerMap[event]) return false;

    if (listener) {
      let m = this._listenerMap[event];
      let n = m.length;

      for (let i = 0; i < n; i++) {
        let e = m[i];

        if (e.listener === listener) return true;
      }

      return false;
    }
    else {
      return true;
    }
  }

  /**
   * @see Node#removeEventListener
   */
  removeEventListener() {
    let event = arguments[0];
    let listener = arguments[1];
    let useCapture = arguments[2] || false;

    if (this._listenerMap) {
      let m = this._listenerMap[event];
      let n = m.length;
      let s = -1;

      if (listener) {
        for (let i = 0; i < n; i++) {
          let e = m[i];

          if (e.listener === listener) {
            s = i;
            break;
          }
        }

        if (s > -1) {
          m.splice(s, 1);

          if (m.length === 0) {
            this._listenerMap[event] = null;
            delete this._listenerMap[event];
          }
        }
      }
      else {
        while (this._listenerMap[event] !== undefined) {
          this.removeEventListener(event, this._listenerMap[event][0].listener, this._listenerMap[event][0].useCapture);
        }
      }
    }

    if (listener) {
      if (window && event === EventType.MOUSE.CLICK_OUTSIDE) {
        window.removeEventListener(EventType.MOUSE.CLICK, listener, useCapture);
      }
      else {
        this.element.removeEventListener.apply(this.element, arguments);
      }
    }
  }

  /**
   * Removes all cached event listeners from this Element instance.
   */
  removeAllEventListeners() {
    if (this._listenerMap) {
      for (let event in this._listenerMap) {
        this.removeEventListener(event);
      }
    }
  }

  /**
   * Dispatches an event.
   *
   * @param {Event} event
   */
  dispatchEvent(event) {
    this.element.dispatchEvent(event);
  }

  /**
   * Adds class(es) to this Element instance.
   *
   * @param {Stirng|Array} className
   */
  addClass(className) {
    let classes = [];

    if (!assert((typeof className === 'string') || (className instanceof Array), 'Invalid class name specified. Must be either a string or an array of strings.')) return;

    if (typeof className === 'string') {
      classes.push(className);
    }
    else {
      classes = className;
    }

    let n = classes.length;

    for (let i = 0; i < n; i++) {
      let c = classes[i];

      if (!assert(typeof c === 'string', 'Invalid class detected: ' + c)) continue;
      if (this.hasClass(c)) continue;

      this.element.className = this.element.className + ((this.element.className === '') ? '' : ' ') + c;
    }
  }

  /**
   * Removes class(es) from this Element instance.
   *
   * @param {Stirng|Array} className
   */
  removeClass(className) {
    let classes = [];

    if (!assert((typeof className === 'string') || (className instanceof Array), 'Invalid class name specified. Must be either a string or an array of strings.')) return;

    if (typeof className === 'string') {
      classes.push(className);
    }
    else {
      classes = className;
    }

    let n = classes.length;

    for (let i = 0; i < n; i++) {
      let c = classes[i];

      if (!assert(typeof c === 'string', 'Invalid class detected: ' + c)) continue;
      let regex = new RegExp('^' + c + '\\s+|\\s+' + c + '|^' + c + '$', 'g');
      this.element.className = this.element.className.replace(regex, '');
    }
  }

  /**
   * Determines whether this Element instance has the specified class.
   *
   * @param {string} className
   *
   * @return {boolean}
   */
  hasClass(className) {
    if (!assert(typeof className === 'string', 'Invalid class detected: ' + className)) return false;

    return (this.classes.indexOf(className) > -1);
  }

  /**
   * Gets the value of the property with the specified name.
   *
   * @param {string} key - Name of the property.
   *
   * @return {*} Value of the property.
   */
  getProperty(key) {
    return this.properties[key];
  }

  /**
   * Checks to see if this Element instance has the property of the specified
   * name.
   *
   * @param {string} key - Name of the property.
   *
   * @return {boolean} True if property exists, false othwerwise.
   */
  hasProperty(key) {
    return this.properties.hasOwnProperty(key);
  }

  /**
   * Sets the property of the specified name with the specified value. If
   * properties does not exist, it will be newly defined.
   *
   * @param {string}  key                - Name of the property.
   * @param {*}       value              - Value of the property.
   * @param {boolean} [attributed=false] - Specifies whether property should
   *                                       also be an attribute of the element.
   */
  setProperty(key, value, attributed) {
    if (this.hasProperty(key)) {
      this.properties[key] = value;
    }
    else {
      Element.defineProperty(this, key, {
        defaultValue: value,
        dirtyType: DirtyType.DATA,
        get: true,
        set: true,
        attribute: attributed
      }, 'properties');
    }
  }

  /**
   * Defines properties based on the key/value pair in the provided hash.
   *
   * @param {Object} descriptor - Object literal containing key/value pairs to
   *                              be merged into this Element instance's
   *                              properties.
   */
  setProperties(descriptor) {
    assertType(descriptor, 'object', false);

    if (!descriptor) return;

    for (let key in descriptor) {
      this.setProperty(key, descriptor[key]);
    }
  }

  /**
   * Gets the value of the attribute with the specified name.
   *
   * @param  {string} key - Name of the attribute.
   *
   * @return {*} Value of the attribute.
   */
  getAttribute(key) {
    let value = this.element.getAttribute(key);

    if (value === '') return true;
    if (value === undefined || value === null) return null;

    try {
      return JSON.parse(value);
    }
    catch (err) {
      return value;
    }
  }

  /**
   * Sets an attribute of this Element instance.
   *
   * @param {string} key     - Name of the attribute.
   * @param {*}      [value] - Value of the attribute. If unspecified, the
   *                           attribute will still be present but have no value.
   */
  setAttribute(key, value) {
    if (!assert(validateAttribute(key), 'Attribute \'' + key + '\' is reserved')) return;

    if (value === undefined || value === null || value === false) {
      this.element.removeAttribute(key);
    }
    else if (value === true) {
      this.element.setAttribute(key, '');
    } else {
      this.element.setAttribute(key, value);
    }

    if (key === 'disabled') {
      this.setDirty(DirtyType.STATE);
    }
  }

  /**
   * Removes an attribute from this Element instance.
   *
   * @param {string} key - Name of the attribute.
   */
  removeAttribute(key) {
    this.element.removeAttribute(key);
  }

  /**
   * Checks to see if this Element instance has the attribute of the specified
   * name.
   *
   * @param  {string}  key - Name of the attribute.
   *
   * @return {boolean} True if attribute with said name exists, false otherwise.
   */
  hasAttribute(key) {
    let value = this.element.getAttribute(key);

    if (value === '') return true;
    return !noval(value);
  }

  /**
   * Gets the value of an inline CSS rule of this Element instance by its name.
   *
   * @param {string} key - Name of the CSS rule in camelCase.
   *
   * @return {string} Value of the style.
   */
  getStyle(key) {
    let value = this.element.style[key];

    if (value === '') {
      return null;
    }
    else {
      return value;
    }
  }

  /**
   * Sets an inline CSS rule of this Element instance.
   *
   * @param {string} key   - Name of the CSS rule in camelCase.
   * @param {*}      value - Value of the style. If a number is provided, it will
   *                         be automatically suffixed with 'px'.
   *
   * @see {@link http://www.w3schools.com/jsref/dom_obj_style.asp}
   */
  setStyle(key, value) {
    if (typeof value === 'number') {
      value = value + 'px';
    }

    this.element.style[key] = value;
  }

  /**
   * Removes an inline CSS rule from this Element instance by its rule name in
   * camelCase.
   *
   * @param {string} key - Name of the CSS rule.
   *
   * @see {@link http://www.w3schools.com/jsref/dom_obj_style.asp}
   */
  removeStyle(key) {
    this.element.style[key] = '';
  }

  /**
   * Checks to see if this Element instance has the specified inline CSS rule.
   * @param {string} key - Name of the style.
   *
   * @return {boolean}
   */
  hasStyle(key) {
    return this.element.style[key] !== '';
  }

  /**
   * Creates the associated DOM element from scratch.
   *
   * @return {Element}
   */
  render() {
    return document.createElement('div');
  }

  /**
   * @see ElementUpdateDelegate#isDirty
   */
  isDirty() {
    return this.updateDelegate.isDirty.apply(this.updateDelegate, arguments);
  }

  /**
   * @see ElementUpdateDelegate#setDirty
   */
  setDirty() {
    return this.updateDelegate.setDirty.apply(this.updateDelegate, arguments);
  }

  /**
   * Gets the string representation of this Element instance.
   *
   * @return {string}
   */
  toString() {
    return '['+getFunctionName(this.constructor)+'{' + this.name + '}]';
  }

  /**
   * Defines all properties.
   *
   * @protected
   */
  __define_properties() {
    /**
     * Internal DOM element.
     *
     * @property {Node}
     */
    Element.defineProperty(this, 'element', {
      get: (value) => {
        if (!this.__private__.element) {
          let e = this.render();

          if (this.__validate_element(e)) this.__private__.element = e;

          let children = sightread(e, true);

          for (let childName in children) {
            this.addChild(children[childName], childName);
          }
        }
        return this.__private__.element;
      },
      set: (value) => {
        if (this.__private__.element) return this.__private__.element;
        if (this.__validate_element(value)) return value;
        return null;
      }
    });

    /**
     * ID of this Element instance.
     *
     * @property {string}
     */
    Object.defineProperty(this, 'id', {
      get: () => (this.element.id),
      set: (value) => this.element.setAttribute('id', value)
    });

    /**
     * Instance name of this Element instance. Once set, it cannot be changed.
     *
     * @property {string}
     */
    Object.defineProperty(this, 'name', {
      get: () => {
        let s = this.element.getAttribute(Directive.INSTANCE);
        if (!s || s === '') return null;
        return s;
      },
      set: (value) => {
        if (!value || value === '') return;
        if (!this.name) this.element.setAttribute(Directive.INSTANCE, value);
      }
    });

    /**
     * Class list of this Element instance.
     *
     * @property {Array}
     */
    Object.defineProperty(this, 'classes', {
      get: () => (this.element.className.split(' ')),
      set: (value) => this.element.className = value.join(' ')
    });

    /**
     * Gets the attributes of this Element instance.
     *
     * @property {NamedNodeMap}
     */
    Object.defineProperty(this, 'attributes', { get: () => (this.element.attributes) });

    /**
     * Gets the CSS styles of this Element instance.
     *
     * @property {ElementCSSInlineStyle}
     */
    Object.defineProperty(this, 'styles', { get: () => (this.element.style) });

    /**
     * Current node state of this Element instance.
     *
     * @property {NodeState}
     */
    Element.defineProperty(this, 'nodeState', { defaultValue: NodeState.IDLE, get: true });

    /**
     * State of this Element instance (depicted by Directive.State).
     *
     * @property {string}
     */
    Object.defineProperty(this, 'state', {
      get: () => {
        let s = this.element.getAttribute(Directive.STATE);
        if (!s || s === '') return null;
        return s;
      },
      set: (value) => {
        if (this.state === value) return;

        if (value === null || value === undefined) {
          this.element.removeAttribute(Directive.STATE);
        }
        else {
          this.element.setAttribute(Directive.STATE, value);
        }

        this.updateDelegate.setDirty(DirtyType.STATE);
      }
    });

    /**
     * Child elements.
     *
     * @property {Object}
     */
    Element.defineProperty(this, 'children', { defaultValue: {}, get: true });

    /**
     * Data attributes.
     *
     * @property {Object}
     */
    Element.defineProperty(this, 'data', {
      defaultValue: null,
      get: true,
      set: true,
      dirtyType: DirtyType.DATA,
      eventType: EventType.DATA.DATA_CHANGE
    });

    /**
     * Property attributes.
     *
     * @property {Object}
     * @see module:requiem~types.Directive.PROPERTY
     */
    Element.defineProperty(this, 'properties', { defaultValue: {}, get: true });

    /**
     * ElementUpdateDelegate instance.
     *
     * @property {ElementUpdateDelegate}
     */
    Element.defineProperty(this, 'updateDelegate', { defaultValue: new ElementUpdateDelegate(this), get: true });

    /**
     * Specifies whether this Element instance remembers caches every listener
     * that is added to it (via the addEventListener/removeEventListener
     * method).
     *
     * @property {boolean}
     */
    Element.defineProperty(this, 'cachesListeners', { defaultValue: true, get: true, set: true });

    /**
     * Wrapper for the 'innerHTML' property of the internal element.
     *
     * @property {string}
     */
    Object.defineProperty(this, 'content', {
      get: () => (this.element.innerHTML),
      set: (value) => this.element.innerHTML = value
    });

    /**
     * Specifies whether this Element instance is hidden. This property follows
     * the rules of the CSS rule 'display: none'.
     *
     * @property {boolean}
     */
    Element.defineProperty(this, 'hidden', {
      get: true,
      set: (value) => {
        assertType(value, 'boolean', true);

        if (value) {
          this.setStyle('display', 'none');
        }
        else {
          if (this.getStyle('display') === 'none') {
            this.removeStyle('display');
          }
        }

        return value;
      }
    });

    /**
     * Specifies whether this Element instance is invisible. This property follows
     * the rules of the CSS rule 'visibility: hidden'.
     *
     * @property {boolean}
     */
    Element.defineProperty(this, 'invisible', {
      get: true,
      set: (value) => {
        assertType(value, 'boolean', false);

        if (value) {
          this.setStyle('visibility', 'hidden');
        }
        else {
          if (this.getStyle('visibility') === 'hidden') {
            this.removeStyle('visibility');
          }
        }

        return value;
      }
    });

    /**
     * Specifies whether this Element instance is disabled.
     *
     * @property {boolean}
     */
    Object.defineProperty(this, 'disabled', {
      get: () => (this.hasAttribute('disabled') ? this.getAttribute('disabled') : false),
      set: (value) => this.setAttribute('disabled', (value ? true : false))
    });
  }

  /**
   * Validates the inner DOM element.
   *
   * @param  {Node} element - DOM element.
   *
   * @return {boolean} True if validation passes, false otherwise.
   *
   * @private
   */
  __validate_element(element) {
    return assert(element instanceof Node, 'Element validation failed');
  }

  /**
   * Sets the Element's node state.
   *
   * @param  {NodeState} nodeState - Node state.
   *
   * @private
   */
  __set_node_state(nodeState) {
    this.__private__.nodeState = nodeState;
  }
}

module.exports = Element;
