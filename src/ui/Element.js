/**
 * Requiem
 * (c) VARIANTE (http://variante.io)
 *
 * This software is released under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 */

'use strict';

import dom from '../dom';
import assert from '../helpers/assert';
import assertType from '../helpers/assertType';
import noval from '../helpers/noval';
import getFunctionName from '../helpers/getFunctionName';
import validateAttribute from '../helpers/validateAttribute';
import getInstanceNameFromElement from '../helpers/getInstanceNameFromElement';
import DirtyType from '../enums/DirtyType';
import NodeState from '../enums/NodeState';
import EventType from '../enums/EventType';
import Directive from '../enums/Directive';
import ElementUpdateDelegate from '../ui/ElementUpdateDelegate';
import getRect from '../utils/getRect';

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
   * @param {string|Node|Object} [init] - Initial properties. If this is a
   *                                      string, it will be used as this
   *                                      Element's instance name. If this is
   *                                      a Node, it would be used as the
   *                                      internal DOM element. If this is a
   *                                      hash, each key/value pair will be
   *                                      mapped to an instance property (only
   *                                      existing instance properties will be
   *                                      mapped).
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
      let data = dom.getDataRegistry()[ref];

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
   * @see module:requiem~ui.Element#addEventListener
   */
  static on() {
    Element.addEventListener.apply(null, arguments);
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
   * Gets the value of an inline CSS rule of an Element/Node instance by its
   * name.
   *
   * @param {Node|Element} element              - Target element.
   * @param {string}       key                  - Name of the CSS rule in
   *                                              camelCase.
   * @param {boolean}      [isComputed=false]   - Specifies whether the styles
   *                                              are computed.
   * @param {boolean}      [isolateUnits=false] - Specifies whether value and
   *                                              units are separated. This
   *                                              affects the return value type.
   *
   * @return {*} Value of the style. If isolateUnits is set to true, this will
   *             return an object containing both 'value' and 'unit' keys.
   */
  static getStyle(element, key, isComputed, isolateUnits) {
    assertType(element, [Node, Element], false, 'Invalid element specified');
    if (element instanceof Element) element = element.element;
    if (typeof isComputed !== 'boolean') isComputed = false;
    if (typeof isolateUnits !== 'boolean') isolateUnits = false;

    let value = (isComputed) ? window.getComputedStyle(element, null).getPropertyValue(key) : element.style[key];
    let regex = new RegExp('^[+-]?[0-9]+.?([0-9]+)?(px|em|ex|%|in|cm|mm|pt|pc)$', 'i');

    if (value === '') return (isolateUnits ? { value: null, unit: null } : null);
    if (!isNaN(Number(value))) return (isolateUnits ? { value: Number(value), unit: null } : Number(value));

    if (regex.test(value)) {
      if (isolateUnits) {
        if (value.charAt(value.length-1) === '%') return { value: Number(value.substr(0, value.length-1)), unit: value.slice(-1) };
        return { value: Number(value.substr(0, value.length-2)), unit: value.slice(-2) };
      }
      else {
        return value;
      }
    }

    return (isolateUnits ? { value: value, units: null } : value);
  }

  /**
   * Sets an inline CSS rule of an Element/Node instance.
   *
   * @param {Node|Element} element - Target element.
   * @param {string}       key     - Name of the CSS rule in camelCase.
   * @param {*}            value   - Value of the style. If a number is
   *                                 provided, it will be automatically suffixed
   *                                 with 'px'.
   *
   * @see {@link http://www.w3schools.com/jsref/dom_obj_style.asp}
   */
  static setStyle(element, key, value) {
    assertType(element, [Node, Element], false, 'Invalid element specified');
    if (element instanceof Element) element = element.element;
    if (typeof value === 'number') value = String(value);
    if (value === null || value === undefined) value = '';

    element.style[key] = value;
  }

  /**
   * Removes an inline CSS rule from an Element/Node instance by its rule name
   * in camelCase.
   *
   * @param {Node|Element} element - Target element.
   * @param {string}       key     - Name of the CSS rule.
   *
   * @see {@link http://www.w3schools.com/jsref/dom_obj_style.asp}
   */
  static removeStyle(element, key) {
    assertType(element, [Node, Element], false, 'Invalid element specified');
    if (element instanceof Element) element = element.element;
    element.style[key] = '';
  }

  /**
   * Checks to see if an Element/Node instance has the specified inline CSS rule.
   *
   * @param {Node|Element} element - Target element.
   * @param {string}       key     - Name of the style.
   *
   * @return {boolean}
   */
  static hasStyle(element, key) {
    assertType(element, [Node, Element], false, 'Invalid element specified');
    if (element instanceof Element) element = element.element;
    return element.style[key] !== '';
  }

  /**
   * Initializes this Element instance. Must manually invoke.
   */
  init() {
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
   * @see module:requiem~ui.ElementUpdateDelegate#initResponsiveness
   */
  respondsTo() {
    this.updateDelegate.initResponsiveness.apply(this.updateDelegate, arguments);
  }

  /**
   * @see module:requiem~dom.addChild
   */
  addChild(child, name, prepend) {
    return dom.addChild(child, name, prepend, this);
  }

  /**
   * @see module:requiem~dom.hasChild
   */
  hasChild(child) {
    return dom.hasChild(child, this);
  }

  /**
   * @see module:requiem~dom.removeChild
   */
  removeChild(child) {
    dom.removeChild(child, this);
  }

  /**
   * @see module:requiem~dom.getChild
   */
  getChild(name, recursive) {
    return dom.getChild(name, recursive, this);
  }

  /**
   * @see module:requiem~ui.Element#addEventListener
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
   * @see Element#addEventListener
   */
  on() {
    this.addEventListener.apply(this, arguments);
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

    if (this.element.className === '') {
      this.element.removeAttribute('class');
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
   * @param {string} key - Name of the attribute.
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
   * @param {string}  key - Name of the attribute.
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
   * @param {string}  key                  - Name of the CSS rule in camelCase.
   * @param {boolean} [isComputed=false]   - Specifies whether the styles are
   *                                         computed.
   * @param {boolean} [isolateUnits=false] - Specifies whether value and units
   *                                         are separated. This affects the
   *                                         return value type.
   *
   * @return {*} Value of the style. If isolateUnits is set to true, this will
   *             return an object containing both 'value' and 'unit' keys.
   */
  getStyle(key, isComputed, isolateUnits) {
    return Element.getStyle(this, key, isComputed, isolateUnits);
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
    Element.setStyle(this, key, value);
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
    return Element.removeStyle(this, key);
  }

  /**
   * Checks to see if this Element instance has the specified inline CSS rule.
   *
   * @param {string} key - Name of the style.
   *
   * @return {boolean}
   */
  hasStyle(key) {
    return Element.hasStyle(this, key);
  }

  /**
   * Creates the associated DOM element from scratch.
   *
   * @return {Element}
   */
  render() {
    return '<div>';
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
          if (typeof e === 'string') e = dom.createElement(e);

          if (this.__validate_element(e)) this.__private__.element = e;

          let children = dom.sightread(e, true);

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

        let oldValue = this.state;

        if (value === null || value === undefined) {
          this.element.removeAttribute(Directive.STATE);
        }
        else {
          this.element.setAttribute(Directive.STATE, value);
        }

        this.updateDelegate.setDirty(DirtyType.STATE);

        let event = new CustomEvent(EventType.OBJECT.STATE, {
          detail: {
            property: 'state',
            oldValue: oldValue,
            newValue: value
          }
        });

        this.dispatchEvent(event);
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
     * @see module:requiem~enums.Directive.PROPERTY
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
     * Gets the total number of immediate children in this Element instance.
     *
     * @property {number}
     */
    Object.defineProperty(this, 'childCount', {
      get: () => {
        let count = 0;

        for (let k in this.children) {
          let child = this.children[k];

          if (child instanceof Element) {
            count += 1;
          }
          else if (child instanceof Array) {
            count += child.length;
          }
        }

        return count;
      }
    });

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
     * Gets the rect of this Element instance.
     *
     * @property {Object}
     */
    Object.defineProperty(this, 'rect', {
      get: () => (getRect(this))
    });

    /**
     * Gets/sets the opacity of this Element instance.
     */
    Object.defineProperty(this, 'opacity', {
      get: () => (this.getStyle('opacity', true)),
      set: (value) => this.setStyle('opacity', value)
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
   * @param {Node} element - DOM element.
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
   * @param {NodeState} nodeState - Node state.
   *
   * @private
   */
  __set_node_state(nodeState) {
    this.__private__.nodeState = nodeState;
  }
}

module.exports = Element;
