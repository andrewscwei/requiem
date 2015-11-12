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
let noval = require('../helpers/noval');
let log = require('../helpers/log');
let validateAttribute = require('../helpers/validateAttribute');
let getInstanceNameFromElement = require('../helpers/getInstanceNameFromElement');
let DirtyType = require('../types/DirtyType');
let NodeState = require('../types/NodeState');
let EventType = require('../types/EventType');
let Directive = require('../types/Directive');
let ElementUpdateDelegate = require('../ui/ElementUpdateDelegate');
let sightread = require('../dom/sightread');

/**
 * @class
 *
 * Generic HTMLElement wrapper.
 *
 * @param {HTMLElement|String|Object} [init] - Optional initial properties/
 *                                             element of this Element instance.
 *
 * @alias module:requiem~ui.Element
 */
function Element(init) {
  this._nodeState = NodeState.IDLE;

  // Define instance properties.
  this.__define_properties();

  // Set instance properties per init object.
  if (init !== undefined) {
    // If init value is an HTMLELement, simply assign it to the internal
    // element.
    if (init instanceof HTMLElement) {
      this.element = init;
    }
    // If init value is a string, assign it to the name of this instance.
    else if (typeof init === 'string') {
      this.name = init;
    }
    // If init value is a hash object, assign each value in the hash to the
    // corresponding property of this Element instance with te same name
    // as the key of the value.
    else if (typeof init === 'object') {
      for (let property in init) {
        if (this.hasOwnProperty(property)) {
          if (property === 'children') {
            let children = init.children;

            for (let childName in children) {
              this.addChild(children[childName], childName);
            }
          }
          else {
            this[property] = init[property];
          }
        }
      }
    }
  }

  // Further extend data/properties per custom attribute.
  let attributes = this.element.attributes;
  let nAtributes = attributes.length;
  let regex = new RegExp('^' + Directive.PROPERTY + '-' + '|^data-' + Directive.PROPERTY + '-', 'i');

  for (let i = 0; i < nAtributes; i++) {
    let a = attributes[i];

    if (!validateAttribute(a.name)) {
      continue;
    }

    if (regex.test(a.name)) {
      let propertyName = a.name.replace(regex, '').replace(/-([a-z])/g, function(g) {
        return g[1].toUpperCase();
      });

      Element.defineProperty(this, propertyName, {
        defaultValue: (a.value === '') ? true : a.value,
        attribute: a.name,
        dirtyType: DirtyType.DATA,
        get: true,
        set: true
      }, 'properties');
    }
  }

  log(this.toString() + ':new(', init, ')');

  this.init();
}

/**
 * Defines a property in an Element instance.
 *
 * @param {Element}          element                  - Requiem Element instance
 *                                                      of which the property
 *                                                      belongs.
 * @param {string}           propertyName             - Name of the property to
 *                                                      be defined.
 * @param {Object}           descriptor               - Object literal that
 *                                                      defines the behavior of
 *                                                      the new property. This
 *                                                      object literal inherits
 *                                                      that of the descriptor
 *                                                      in Object#defineProperty,
 *                                                      plus a few extra options.
 * @param {boolean}          [descriptor.unique=true] - Specifies that the
 *                                                      modifier method will
 *                                                      only invoke if the new
 *                                                      value is different from
 *                                                      the old value.
 * @param {DirtyType}        [descriptor.dirtyType]   - Specifies the DirtyType
 *                                                      to mark as dirty at the
 *                                                      end of the modifier
 *                                                      cycle.
 * @param {EventType}        [descriptor.eventType]   - Specifies the EventType
 *                                                      to dispatch at the end
 *                                                      of the modifier cycle.
 * @param {string}           [descriptor.attribute]   - Specifies the DOM
 *                                                      attribute to update
 *                                                      when the property value
 *                                                      changes.
 * @param {Function}         [descriptor.onChange]    - Method invoked when the
 *                                                      property changes.
 * @param {Function|boolean} [descriptor.get]         - Method invoked when the
 *                                                      accessor method is
 *                                                      called. This is a good
 *                                                      place to manipulate the
 *                                                      value before it is
 *                                                      retrieved. If simply set
 *                                                      to true, a generic
 *                                                      accessor method will be
 *                                                      used.
 * @param {Function|boolean} [descriptor.set]         - Method invoked when the
 *                                                      modifier method is
 *                                                      called. This is a good
 *                                                      placd to manipulate the
 *                                                      value before it is set.
 *                                                      If simply set to true,
 *                                                      a generic modifier
 *                                                      method will be used.
 * @param {string}           [scope]                  - Name of the property of
 *                                                      the Element instance to
 *                                                      create the new property
 *                                                      in. This property must
 *                                                      be enumerable and it
 *                                                      must be a direct (not
 *                                                      nested) property of the
 *                                                      Element instance.
 */
Element.defineProperty = function(element, propertyName, descriptor, scope) {
  assertType(element, Element, false, 'Parameter \'element\' must be an Element instance');
  assertType(descriptor, 'object', false, 'Parameter \'descriptor\' must be an object literal');
  assertType(descriptor.configurable, 'boolean', true, 'Optional configurable key in descriptor must be a boolean');
  assertType(descriptor.enumerable, 'boolean', true, 'Optional enumerable key in descriptor must be a boolean');
  assertType(descriptor.writable, 'boolean', true, 'Optional writable key in descriptor must be a boolean');
  assertType(descriptor.unique, 'boolean', true, 'Optional unique key in descriptor must be a boolean');
  assertType(descriptor.dirtyType, 'number', true, 'Optional dirty type must be of DirtyType enum (number)');
  assertType(descriptor.eventType, 'string', true, 'Optional event type must be a string');
  assertType(descriptor.attribute, 'string', true, 'Optional attribute must be a string');
  assertType(descriptor.onChange, 'function', true, 'Optional change handler must be a function');
  assertType(scope, 'string', true, 'Optional parameter \'scope\' must be a string');
  assert(validateAttribute(descriptor.attribute), 'Attribute \'' + descriptor.attribute + '\' is reserved');

  let dirtyType = descriptor.dirtyType;
  let defaultValue = descriptor.defaultValue;
  let attribute = descriptor.attribute;
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
    Object.defineProperty(scope, '__'+propertyName, { value: defaultValue, writable: true });
  }

  let newDescriptor = {};

  if (descriptor.configurable !== undefined) newDescriptor.configurable = descriptor.configurable;
  if (descriptor.enumerable !== undefined) newDescriptor.enumerable = descriptor.enumerable;
  if (descriptor.value !== undefined) newDescriptor.value = descriptor.value;
  if (descriptor.writable !== undefined) newDescriptor.writable = descriptor.writable;

  if (descriptor.get) {
    newDescriptor.get = function() {
      if (typeof descriptor.get === 'function') {
        return descriptor.get(this['__'+propertyName]);
      }
      else {
        return this['__'+propertyName];
      }
    }.bind(scope);
  }

  if (descriptor.set) {
    newDescriptor.set = function(val) {
      let oldVal = this['__'+propertyName];

      if (unique && (oldVal === val)) return;

      if (typeof descriptor.set === 'function') {
        val = descriptor.set(val);
      }

      if (oldVal === undefined) {
        Object.defineProperty(this, '__'+propertyName, { value: val, writable: true });
      }
      else {
        this['__'+propertyName] = val;
      }

      if (descriptor.onChange !== undefined) {
        descriptor.onChange(oldVal, val);
      }

      if (attribute !== undefined) {
        element.setAttribute(attribute, val);
      }

      if (dirtyType !== undefined) {
        element.setDirty(dirtyType);
      }

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
    }.bind(scope);
  }

  Object.defineProperty(scope, propertyName, newDescriptor);

  if (defaultValue !== undefined && attribute !== undefined) {
    element.setAttribute(attribute, defaultValue);
  }
};

/**
 * Initializes this Element instance. Must manually invoke.
 */
Element.prototype.init = function() {
  log(this.toString() + '::init()');

  this._nodeState = NodeState.INITIALIZED;
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
};

/**
 * Destroys this Element instance.
 */
Element.prototype.destroy = function() {
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

  this._nodeState = NodeState.DESTROYED;
};

/**
 * Handler invoked whenever a visual update is required.
 */
Element.prototype.update = function() {
  log(this.toString() + '::update()');

  this._nodeState = NodeState.UPDATED;
};

/**
 * Sets up the responsiveness of the internal ElementUpdateDelegate
 * instance.
 *
 * @param {Object|Number}  Either the conductor or the refresh rate (if 1
 *                         argument supplied).
 * @param {number}         Refresh rate.
 * @param {...args}        EventType(s) which this element will respond to.
 */
Element.prototype.respondsTo = function() {
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
};

/**
 * Adds a child or multiple children to this Element instance. Any added
 * must be a Requiem Element. If an HTMLElement is provided, it will be
 * transformed into a Requiem Element. A child is automatically appended
 * to the DOM tree of this instance.
 *
 * @param {Element|Element[]|HTMLElement|HTMLElement[]} child  - Single child or
 *                                                               an array of
 *                                                               children. Child
 *                                                               elements can be
 *                                                               instance(s) of
 *                                                               Requiem Elements,
 *                                                               jQuery Elements
 *                                                               or HTMLElements.
 * @param {string} [name] - The name of the child/children to be added.
 *                          Typically a name is required. If it is not
 *                          specified, this method will attempt to deduct the
 *                          name from the provided child/children. This method
 *                          fails if no name is specified or deducted. If there
 *                          exists another child with the same name, the added
 *                          child will be grouped together with the existing
 *                          child.
 * @param {Object} [controllerDict=window] - Look-up dictionary (object literal)
 *                                           that provides all controller
 *                                           classes when sightreading
 *                                           encounters a controller marked
 *                                           element.
 *
 * @return {Element|Element[]} The added element(s).
 */
Element.prototype.addChild = function(child, name, controllerDict) {
  if (!assert(child !== undefined, 'Parameter \'child\' must be specified')) return null;
  if (!assertType(controllerDict, 'object', true, 'Parameter \'controllerDict\' is invalid')) return null;

  if (!controllerDict) controllerDict = window;

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
    if (!assertType(child, [HTMLElement, Element], false, 'Invalid child specified. Child must be an instance of HTMLElement or Requiem Element.')) return null;

    if (child instanceof HTMLElement) {
      if (noval(name)) name = getInstanceNameFromElement(child);
      if (!assert(!noval(name), 'Either child name was unprovided or it cannot be deducted from the specified child')) return null;

      child.removeAttribute(Directive.INSTANCE);
      child.removeAttribute('data-'+Directive.INSTANCE);
      child.setAttribute('data-'+Directive.INSTANCE, name);
      child = sightread(child, controllerDict);
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
};

/**
 * Determines if this Element instance contains the specified child.
 *
 * @param {Element|HTMLElement|string} child - A child is a Requiem Element,
 *                                             jQuery element or HTMLElement. It
 *                                             can also be a string of child
 *                                             name(s) separated by '.'.
 *
 * @return {boolean} True if this Element instance has the specified child,
 *                   false otherwise.
 */
Element.prototype.hasChild = function(child) {
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
    else if (child instanceof HTMLElement) {
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
};

/**
 * Removes a child or multiple children from this Element instance.
 *
 * @param {HTMLElement|Element|Array|string} child - A single child is a Requiem
 *                                                   Element, jQuery element or
 *                                                   HTMLElement. It can also be
 *                                                   a string of child name(s)
 *                                                   separated by '.', or an
 *                                                   array of child elements.
 *
 * @return {Element|Element[]} The removed element(s).
 */
Element.prototype.removeChild = function(child) {
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
    else if (child instanceof HTMLElement) {
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
};

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
Element.prototype.getChild = function(name, recursive) {
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
  else if (!noval(child, true)) {
    return child;
  }
  else {
    return null;
  }
};

/**
 * @see HTMLElement#addEventListener
 */
Element.prototype.addEventListener = function() {
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
};

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
Element.prototype.hasEventListener = function(event, listener) {
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
};

/**
 * @see HTMLElement#removeEventListener
 */
Element.prototype.removeEventListener = function() {
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
};

/**
 * Removes all cached event listeners from this Element instance.
 */
Element.prototype.removeAllEventListeners = function() {
  if (this._listenerMap) {
    for (let event in this._listenerMap) {
      this.removeEventListener(event);
    }
  }
};

/**
 * Dispatches an event.
 *
 * @param {Event} event
 */
Element.prototype.dispatchEvent = function(event) {
  this.element.dispatchEvent(event);
};

/**
 * Adds class(es) to this Element instance.
 *
 * @param {Stirng|Array} className
 */
Element.prototype.addClass = function(className) {
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
};

/**
 * Removes class(es) from this Element instance.
 *
 * @param {Stirng|Array} className
 */
Element.prototype.removeClass = function(className) {
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
};

/**
 * Determines whether this Element instance has the specified class.
 *
 * @param {string} className
 *
 * @return {boolean}
 */
Element.prototype.hasClass = function(className) {
  if (!assert(typeof className === 'string', 'Invalid class detected: ' + className)) return false;

  return (this.classes.indexOf(className) > -1);
};

/**
 * Gets the value of the attribute with the specified name.
 *
 * @param  {string} key - Name of the attribute.
 *
 * @return {*} Value of the attribute.
 */
Element.prototype.getAttribute = function(key) {
  return this.element.getAttribute(key);
};

/**
 * Sets an attribute of this Element instance.
 *
 * @param {string} key     - Name of the attribute.
 * @param {*}      [value] - Value of the attribute. If unspecified, the
 *                           attribute will still be present but have no value.
 */
Element.prototype.setAttribute = function(key, value) {
  if (!assert(validateAttribute(key), 'Attribute \'' + key + '\' is reserved')) return;

  if (value === undefined || value === null) {
    this.element.setAttribute(key, '');
  }
  else {
    this.element.setAttribute(key, value);
  }
};

/**
 * Removes an attribute from this Element instance.
 *
 * @param {string} key - Name of the attribute.
 */
Element.prototype.removeAttribute = function(key) {
  this.element.removeAttribute(key);
};

/**
 * Checks to see if this Element instance has the attribute of the specified
 * name.
 *
 * @param  {string}  key - Name of the attribute.
 *
 * @return {boolean} True if attribute with said name exists, false otherwise.
 */
Element.prototype.hasAttribute = function(key) {
  return !noval(this.element.getAttribute(key));
};

/**
 * Gets the value of an inline CSS rule of this Element instance by its name.
 *
 * @param {string} key - Name of the CSS rule in camelCase.
 *
 * @return {string} Value of the style.
 */
Element.prototype.getStyle = function(key) {
  let value = this.element.style[key];

  if (value === '') {
    return null;
  }
  else {
    return value;
  }
};

/**
 * Sets an inline CSS rule of this Element instance.
 *
 * @param {string} key   - Name of the CSS rule in camelCase.
 * @param {*}      value - Value of the style. If a number is provided, it will
 *                         be automatically suffixed with 'px'.
 *
 * @see {@link http://www.w3schools.com/jsref/dom_obj_style.asp}
 */
Element.prototype.setStyle = function(key, value) {
  if (typeof value === 'number') {
    value = value + 'px';
  }

  this.element.style[key] = value;
};

/**
 * Removes an inline CSS rule from this Element instance by its rule name in
 * camelCase.
 *
 * @param {string} key - Name of the CSS rule.
 *
 * @see {@link http://www.w3schools.com/jsref/dom_obj_style.asp}
 */
Element.prototype.removeStyle = function(key) {
  this.element.style[key] = '';
};

/**
 * Checks to see if this Element instance has the specified inline CSS rule.
 * @param {string} key - Name of the style.
 *
 * @return {boolean}
 */
Element.prototype.hasStyle = function(key) {
  return this.element.style[key] !== '';
};

/**
 * Creates the associated DOM element from scratch.
 *
 * @return {Element}
 */
Element.prototype.factory = function() {
  return document.createElement('div');
};

/**
 * @see ElementUpdateDelegate#isDirty
 */
Element.prototype.isDirty = function() {
  return this.updateDelegate.isDirty.apply(this.updateDelegate, arguments);
};

/**
 * @see ElementUpdateDelegate#setDirty
 */
Element.prototype.setDirty = function() {
  return this.updateDelegate.setDirty.apply(this.updateDelegate, arguments);
};

/**
 * Gets the string representation of this Element instance.
 *
 * @return {string}
 */
Element.prototype.toString = function() {
  return '[Element{' + this.name + '}]';
};

/**
 * Defines all properties.
 *
 * @protected
 */
Element.prototype.__define_properties = function() {
  /**
   * View of this Element instance.
   *
   * @property {HTMLElement}
   */
  Object.defineProperty(this, 'element', {
    get: function() {
      if (!this._element) {
        Object.defineProperty(this, '_element', {
          value: this.factory(),
          writable: true
        });
      }

      return this._element;
    },
    set: function(value) {
      this.__set_element(value);
    }
  });

  /**
   * ID of this Element instance.
   *
   * @property {string}
   */
  Object.defineProperty(this, 'id', {
    get: function() {
      return this.element.id;
    },
    set: function(value) {
      this.element.setAttribute('id', value);
    }
  });

  /**
   * Instance name of this Element instance. Once set, it cannot be changed.
   *
   * @property {string}
   */
  Object.defineProperty(this, 'name', {
    get: function() {
      let s = this.element.getAttribute(Directive.INSTANCE) || this.element.getAttribute('data-' + Directive.INSTANCE);

      if (!s || s === '') {
        return null;
      }
      else {
        return s;
      }
    },
    set: function(value) {
      if (!value || value === '') return;

      if (!this.name) {
        this.element.setAttribute('data-' + Directive.INSTANCE, value);
      }
    }
  });

  /**
   * Class list of this Element instance.
   *
   * @property {Array}
   */
  Object.defineProperty(this, 'classes', {
    get: function() {
      return this.element.className.split(' ');
    },
    set: function(value) {
      this.element.className = value.join(' ');
    }
  });

  /**
   * Gets the attributes of this Element instance.
   *
   * @property {NamedNodeMap}
   */
  Object.defineProperty(this, 'attributes', {
    get: function() {
      return this.element.attributes;
    }
  });

  /**
   * Gets the CSS styles of this Element instance.
   *
   * @property {ElementCSSInlineStyle}
   */
  Object.defineProperty(this, 'styles', {
    get: function() {
      return this.element.style;
    }
  });

  /**
   * Current node state of this Element instance.
   *
   * @property {NodeState}
   */
  Object.defineProperty(this, 'nodeState', {
    get: function() {
      return this._nodeState || NodeState.IDLE;
    }
  });

  /**
   * State of this Element instance (depicted by Directive.State).
   *
   * @property {string}
   */
  Object.defineProperty(this, 'state', {
    get: function() {
      let s = this.element.getAttribute(Directive.STATE) || this.element.getAttribute('data-' + Directive.STATE);

      if (!s || s === '') {
        return null;
      }
      else {
        return s;
      }
    },
    set: function(value) {
      if (this.state === value) return;

      if (value === null || value === undefined) {
        this.element.removeAttribute(Directive.STATE);
        this.element.removeAttribute('data-' + Directive.STATE);
      }
      else {
        this.element.setAttribute('data-' + Directive.STATE, value);
      }

      this.updateDelegate.setDirty(DirtyType.STATE);
    }
  });

  /**
   * Child elements.
   *
   * @property {Object}
   */
  Object.defineProperty(this, 'children', {
    value: {},
    writable: false
  });

  /**
   * Data attributes.
   *
   * @property {Object}
   */
  Object.defineProperty(this, 'data', {
    value: {},
    writable: true
  });

  /**
   * Property attributes.
   *
   * @property {Object}
   * @see module:requiem~types.Directive.PROPERTY
   */
  Object.defineProperty(this, 'properties', {
    value: {},
    writable: false
  });

  /**
   * ElementUpdateDelegate instance.
   *
   * @property {ElementUpdateDelegate}
   */
  Object.defineProperty(this, 'updateDelegate', {
    get: function() {
      if (!this._updateDelegate) {
        Object.defineProperty(this, '_updateDelegate', {
          value: new ElementUpdateDelegate(this),
          writable: false
        });
      }

      return this._updateDelegate;
    }
  });

  /**
   * Specifies whether this Element instance remembers caches every listener
   * that is added to it (via the addEventListener/removeEventListener
   * method).
   *
   * @property {boolean}
   */
  Object.defineProperty(this, 'cachesListeners', {
    value: true,
    writable: true
  });

  /**
   * Wrapper for the 'innerHTML' property of the internal element.
   *
   * @property {string}
   */
  Object.defineProperty(this, 'content', {
    get: function() {
      return this.element.innerHTML;
    },
    set: function(value) {
      this.element.innerHTML = value;
    }
  });

  /**
   * Specifies whether this Element instance is hidden. This property follows
   * the rules of the CSS rule 'display: none'.
   *
   * @property {boolean}
   */
  Element.defineProperty(this, 'hidden', {
    get: true,
    set: function(value) {
      assertType(value, 'boolean', false);

      if (value) {
        this.setStyle('display', 'none');
      }
      else {
        if (this.getStyle('display') === 'none') {
          this.removeStyle('display');
        }
      }

      return value;
    }.bind(this)
  });

  /**
   * Specifies whether this Element instance is invisible. This property follows
   * the rules of the CSS rule 'visibility: hidden'.
   *
   * @property {boolean}
   */
  Element.defineProperty(this, 'invisible', {
    get: true,
    set: function(value) {
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
    }.bind(this)
  });
};

/**
 * Stubbed out setter for element property (for overriding purposes).
 *
 * @param {HTMLElement} value The DOM element.
 *
 * @protected
 */
Element.prototype.__set_element = function(value) {
  // Ensure that this is not overwritable.
  assert(!this._element, 'Element cannot be overwritten.');
  assert((value instanceof HTMLElement) || (value instanceof Element), 'Invalid element type specified. Must be an instance of HTMLElement or Element.');

  if (value instanceof Element) {
    Object.defineProperty(this, '_element', {
      value: value.element,
      writable: true
    });
  }
  else {
    Object.defineProperty(this, '_element', {
      value: value,
      writable: true
    });
  }
};

module.exports = Element;
