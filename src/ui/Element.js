/**
 * Requiem
 * (c) VARIANTE (http://variante.io)
 *
 * This software is released under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Controller of a DOM element.
 *
 * @type {Class}
 */

'use strict';

define([
  'helpers/assert',
  'helpers/assertType',
  'helpers/isNull',
  'helpers/log',
  'helpers/validateAttribute',
  'types/DirtyType',
  'types/NodeState',
  'types/EventType',
  'types/Directives',
  'ui/ElementUpdateDelegate',
], function(
  assert,
  assertType,
  isNull,
  log,
  validateAttribute,
  DirtyType,
  NodeState,
  EventType,
  Directives,
  ElementUpdateDelegate
) {
  /**
   * @constructor
   *
   * Creates a new Element instance.
   *
   * @param {*} init  Optional initial properties/element of this Element
   *                 instance.
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
        for (var property in init) {
          if (this.hasOwnProperty(property)) {
            if (property === 'children') {
              var children = init.children;

              for (var childName in children) {
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
    var attributes = this.element.attributes;
    var nAtributes = attributes.length;
    var regProperty = new RegExp('^' + Directives.Property + '-' + '|^data-' + Directives.Property + '-', 'i');
    var regData = new RegExp('^' + Directives.Data + '-' + '|^data-' + Directives.Data + '-', 'i');

    for (var i = 0; i < nAtributes; i++) {
      var a = attributes[i];

      if (regProperty.test(a.name)) {
        var pProperty = a.name.replace(regProperty, '').replace(/-([a-z])/g, function(g) {
          return g[1].toUpperCase();
        });

        Element.defineProperty(this, pProperty, {
          value: (a.value === '') ? true : a.value,
          writable: false
        }, 'properties');
      }
      else if (regData.test(a.name)) {
        var pData = a.name.replace(regData, '').replace(/-([a-z])/g, function(g) {
          return g[1].toUpperCase();
        });

        Element.defineProperty(this, pData, {
          defaultValue: (a.value === '') ? true : a.value,
          attribute: a.name,
          dirtyType: DirtyType.DATA,
          get: true,
          set: true
        }, 'data');
      }
    }

    log(this.toString() + ':new(', init, ')');

    this.init();
  }

  /**
   * Defines a property in an Element instance.
   *
   * @param  {Element} element         Element instance of which the property
   *                                   belongs.
   * @param  {String} propertyName     Name of the property.
   * @param  {Object} descriptor       Object literal that defines the behavior
   *                                   of the new property. This object literal
   *                                   inherits that of the descriptor in
   *                                   Object#defineProperty, plus a few extra
   *                                   options: {
   *                                     {Boolean}   unique:true
   *                                     {DirtyType} dirtyType:undefined
   *                                     {EventType} eventType:undefined
   *                                     {String}    attribute:undefined
   *                                     {Function}  onChange:undefined
   *                                     {*}         get:undefined
   *                                     {*}         set:undefined
   *                                   }
   * @param  {String} scope:undefined  Scope (property) of the Element instance
   *                                   to create the new property in. The
   *                                   specified property must be enumerable and
   *                                   it must be a direct property of the
   *                                   Element instance.
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

    var dirtyType = descriptor.dirtyType;
    var defaultValue = descriptor.defaultValue;
    var attribute = descriptor.attribute;
    var eventType = descriptor.eventType;
    var unique = descriptor.unique;

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

    var newDescriptor = {};

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
        if (unique && (this['__'+propertyName] === val)) return;

        var oldVal = this['__'+propertyName];

        if (typeof descriptor.set === 'function') {
          val = descriptor.set(val);
        }

        if (this['__'+propertyName] === undefined) {
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
          var event = new CustomEvent(eventType, {
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

    for (var key in this.children) {
      var child = this.children[key];

      if (child instanceof Array) {
        var n = child.length;

        for (var i = 0; i < n; i++) {
          var c = child[i];

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
    for (var key in this.children) {
      var child = this.children[key];

      if (child instanceof Array) {
        var n = child.length;

        for (var i = 0; i < n; i++) {
          var c = child[i];

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
   * @param {Object/Number}  Either the conductor or the refresh rate (if 1
   *                        argument supplied).
   * @param {Number}         Refresh rate.
   * @param {...args}        EventType(s) which this element will respond to.
   */
  Element.prototype.respondsTo = function() {
    var args = Array.prototype.slice.call(arguments);
    var n = args.length;

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
   * @param {*}      child           Single child or an array of children.
   *                                Child elements can be instance(s) of
   *                                Requiem Elements, jQuery Elements or
   *                                HTMLElements.
   * @param {String} name:undefined  The name of the child/children to be
   *                                added. Typically a name is required.
   *                                If it is not specified, this method
   *                                will attempt to deduct the name from
   *                                the provided child/children. This
   *                                method fails if no name is specified
   *                                or deducted. If there exists another
   *                                child with the same name, the added
   *                                child will be grouped together with
   *                                the existing child.
   */
  Element.prototype.addChild = function(child, name) {
    if (!assert(child !== undefined, 'Parameter \'child\' must be specified')) return;

    if (child.jquery) {
      this.addChild(child.get(), name);
    }
    else if (child instanceof Array) {
      var n = child.length;

      for (var i = 0; i < n; i++) {
        var c = child[i];

        this.addChild(c, name);
      }
    }
    else {
      if (!assertType(child, [HTMLElement, Element], false, 'Invalid child specified. Child must be an instance of HTMLElement or Requiem Element.')) return;

      if (child instanceof HTMLElement) {
        child = new Element({
          element: child,
          name: name
        });
      }

      name = name || child.name;

      if (!assert(name || child.name, 'Either child name was unprovided or it cannot be deducted from the specified child')) return null;

      if (this.children[name]) {
        if (this.children[name] instanceof Array) {
          this.children[name].push(child);
        }
        else {
          var a = [this.children[name]];
          a.push(child);
          this.children[name] = a;
        }
      }
      else {
        this.children[name] = child;
      }

      child.name = name;

      if (child.nodeState === NodeState.IDLE || child.nodeState === NodeState.DESTROYED) {
        child.init();
      }

      var shouldAddChild = true;

      if (child.element.parentNode && document) {
        var e = child.element;

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
    }
  };

  /**
   * Determines if this Element instance contains the specified child.
   *
   * @param {*} child  A child is a Requiem Element, jQuery element or
   *                  HTMLElement. It can also be a string of child name(s)
   *                  separated by '.'.
   *
   * @return {Boolean} True if this Element instance has the specified child,
   *                   false otherwise.
   */
  Element.prototype.hasChild = function(child) {
    if (!assert(child !== undefined, 'Child is undefined')) return false;

    if (typeof child === 'string') {
      return !isNull(this.getChild(child));
    }
    else {
      var e;

      if (child.jquery && child.length === 1) {
        e = child.get(0);
      }
      else if (child instanceof Element) {
        e = child.element;
      }
      else if (child instanceof HTMLElement) {
        e = child;
      }

      while (!isNull(e) && e !== document) {
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
   * @param {*} child  A single child is a Requiem Element, jQuery element or
   *                  HTMLElement. It can also be a string of child name(s)
   *                  separated by '.', or an array of child elements.
   */
  Element.prototype.removeChild = function(child) {
    if (!assert(!isNull(child, true), 'No valid child specified')) return;

    // If child is a string, treat each entry separated by '.' as a child
    // name.
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
      var e;

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
      if (isNull(e)) return;

      for (var key in this.children) {
        var c = this.children[key];

        if (c instanceof Array) {
          var n = c.length;
          var t = 0;

          for (var i = 0; i < n; i++) {
            var element = c[i];
            t = i;

            if (element.element === e) {
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
            c.destroy();
            e.parentNode.removeChild(e);
            delete this.children[key];
          }
          else {
            c.removeChild(child);
          }
        }
      }
    }
  };

  /**
   * Gets a child by its name. If child is an array, it will be returned
   * immediately.
   *
   * @param {String}  name            Name of the child, depth separated by
   *                                 '.' (i.e. 'foo.bar').
   * @param {Boolean} recursive:true  Speciifies whether to search for the
   *                                 child recursively down the tree.
   *
   * @return {Object/Array} The fetched child.
   */
  Element.prototype.getChild = function(name, recursive) {
    if (!assertType(name, 'string', false, 'Child name must be specified')) return null;
    if (!assertType(recursive, 'boolean', true, 'Parameter \'recursive\', if specified, must be a boolean')) return null;

    recursive = (recursive === undefined) ? true : recursive;

    var targets = name.split('.');
    var currentTarget = targets.shift();
    var child = this.children[currentTarget];

    if (recursive && (targets.length > 0)) {
      if (child instanceof Array) {
        var children = [];
        var n = child.length;

        for (var i = 0; i < n; i++) {
          var c = child[i];

          if (c instanceof Element) {
            children.push(c.getChild(targets.join('.')));
          }
          else {
            children.push(null);
          }
        }

        if (!isNull(children, true)) {
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
    else if (!isNull(child, true)) {
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
    var event = arguments[0];
    var listener = arguments[1];
    var useCapture = arguments[2] || false;

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

      var m = this._listenerMap[event];
      var n = m.length;
      var b = true;

      if (event === EventType.MOUSE.CLICK_OUTSIDE) {
        var _listener = listener;
        listener = function(event) {
          if ((event.target !== this.element) && !this.hasChild(event.target)) {
            _listener(event);
          }
        }.bind(this);
      }

      for (var i = 0; i < n; i++) {
        var e = m[i];

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
   * @param {String}   event    Event name.
   * @param {Function} listener Listener function.
   *
   * @return {Boolean}
   */
  Element.prototype.hasEventListener = function(event, listener) {
    if (!this._listenerMap) return false;
    if (!this._listenerMap[event]) return false;

    if (listener) {
      var m = this._listenerMap[event];
      var n = m.length;

      for (var i = 0; i < n; i++) {
        var e = m[i];

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
    var event = arguments[0];
    var listener = arguments[1];
    var useCapture = arguments[2] || false;

    if (this._listenerMap) {
      var m = this._listenerMap[event];
      var n = m.length;
      var s = -1;

      if (listener) {
        for (var i = 0; i < n; i++) {
          var e = m[i];

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
      for (var event in this._listenerMap) {
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
   * @param {Stirng/Array} className
   */
  Element.prototype.addClass = function(className) {
    var classes = [];

    if (!assert((typeof className === 'string') || (className instanceof Array), 'Invalid class name specified. Must be either a string or an array of strings.')) return;

    if (typeof className === 'string') {
      classes.push(className);
    }
    else {
      classes = className;
    }

    var n = classes.length;

    for (var i = 0; i < n; i++) {
      var c = classes[i];

      if (!assert(typeof c === 'string', 'Invalid class detected: ' + c)) continue;
      if (this.hasClass(c)) continue;

      this.element.className = this.element.className + ((this.element.className === '') ? '' : ' ') + c;
    }
  };

  /**
   * Removes class(es) from this Element instance.
   *
   * @param {Stirng/Array} className
   */
  Element.prototype.removeClass = function(className) {
    var classes = [];

    if (!assert((typeof className === 'string') || (className instanceof Array), 'Invalid class name specified. Must be either a string or an array of strings.')) return;

    if (typeof className === 'string') {
      classes.push(className);
    }
    else {
      classes = className;
    }

    var n = classes.length;

    for (var i = 0; i < n; i++) {
      var c = classes[i];

      if (!assert(typeof c === 'string', 'Invalid class detected: ' + c)) continue;
      var regex = new RegExp('^' + c + '\\s+|\\s+' + c + '|^' + c + '$', 'g');
      this.element.className = this.element.className.replace(regex, '');
    }
  };

  /**
   * Determines whether this Element instance has the specified class.
   *
   * @param {String} className
   *
   * @return {Boolean}
   */
  Element.prototype.hasClass = function(className) {
    if (!assert(typeof className === 'string', 'Invalid class detected: ' + className)) return false;

    return (this.classes.indexOf(className) > -1);
  };

  /**
   * Gets the value of the attribute with the specified name.
   *
   * @param  {String} key  Name of the attribute.
   *
   * @return {*} Value of the attribute.
   */
  Element.prototype.getAttribute = function(key) {
    return this.element.getAttribute(key);
  };

  /**
   * Sets an attribute of this Element instance.
   *
   * @param {String} key              Name of the attribute.
   * @param {*}      value:undefined  Value of the attribute. If unspecified,
   *                                  the attribute will still be present but
   *                                  have no value.
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
   * @param  {String} key  Name of the attribute.
   */
  Element.prototype.removeAttribute = function(key) {
    this.element.removeAttribute(key);
  };

  /**
   * Checks to see if this Element instance has the attribute of the specified
   * name.
   *
   * @param  {String}  key  Name of the attribute.
   *
   * @return {Boolean} True if attribute with said name exists, false otherwise.
   */
  Element.prototype.hasAttribute = function(key) {
    return !isNull(this.element.getAttribute(key));
  };

  /**
   * Gets the value of an inline CSS rule of this Element instance by its name.
   *
   * @param {String} key  Name of the CSS rule in camelCase.
   *
   * @return {String} Value of the style.
   */
  Element.prototype.getStyle = function(key) {
    var value = this.element.style[key];

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
   * @param {String} key    Name of the CSS rule in camelCase.
   * @param {*}      value  Value of the style. If a number is provided, it will
   *                        be automatically suffixed with 'px'.
   *
   * @see http://www.w3schools.com/jsref/dom_obj_style.asp
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
   * @param  {String} key  Name of the CSS rule.
   *
   * @see http://www.w3schools.com/jsref/dom_obj_style.asp
   */
  Element.prototype.removeStyle = function(key) {
    this.element.style[key] = '';
  };

  /**
   * Checks to see if this Element instance has the specified inline CSS rule.
   * @param  {[type]}  key [description]
   * @return {Boolean}     [description]
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
   * @return {String}
   */
  Element.prototype.toString = function() {
    return '[Element{' + this.name + '}]';
  };

  /**
   * @protected
   *
   * Define all properties.
   */
  Element.prototype.__define_properties = function() {
    /**
     * @property
     *
     * View of this Element instance.
     *
     * @type {Object}
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
     * @property
     *
     * ID of this Element instance.
     *
     * @type {String}
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
     * @property
     *
     * Instance name of this Element instance. Once set, it cannot be changed.
     *
     * @type {String}
     */
    Object.defineProperty(this, 'name', {
      get: function() {
        var s = this.element.getAttribute(Directives.Instance) || this.element.getAttribute('data-' + Directives.Instance);

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
          this.element.setAttribute('data-' + Directives.Instance, value);
        }
      }
    });

    /**
     * @property
     *
     * Class list of this Element instance.
     *
     * @type {Array}
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
     * @property
     *
     * Gets the attributes of this Element instance.
     *
     * @type {NamedNodeMap}
     */
    Object.defineProperty(this, 'attributes', {
      get: function() {
        return this.element.attributes;
      }
    });

    /**
     * @property
     *
     * Gets the CSS styles of this Element instance.
     */
    Object.defineProperty(this, 'styles', {
      get: function() {
        return this.element.style;
      }
    });

    /**
     * @property
     *
     * Current node state of this Element instance.
     *
     * @type {Enum}
     */
    Object.defineProperty(this, 'nodeState', {
      get: function() {
        return this._nodeState || NodeState.IDLE;
      }
    });

    /**
     * @property
     *
     * State of this Element instance (depicted by Directives.State).
     *
     * @type {String}
     */
    Object.defineProperty(this, 'state', {
      get: function() {
        var s = this.element.getAttribute(Directives.State) || this.element.getAttribute('data-' + Directives.State);

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
          this.element.removeAttribute(Directives.State);
          this.element.removeAttribute('data-' + Directives.State);
        }
        else {
          this.element.setAttribute('data-' + Directives.State, value);
        }

        this.updateDelegate.setDirty(DirtyType.STATE);
      }
    });

    /**
     * @property
     *
     * Scheme of this Element instance (depicted by Directives.Scheme).
     *
     * @type {String}
     */
    Object.defineProperty(this, 'scheme', {
      get: function() {
        var s = this.element.getAttribute(Directives.Scheme) || this.element.getAttribute('data-' + Directives.Scheme);

        if (!s || s === '') {
          return null;
        }
        else {
          return s;
        }
      },
      set: function(value) {
        if (this.scheme === value) return;

        if (value === null || value === undefined) {
          this.element.removeAttribute(Directives.Scheme);
          this.element.removeAttribute('data-' + Directives.Scheme);
        }
        else {
          this.element.setAttribute('data-' + Directives.Scheme, value);
        }

        this.updateDelegate.setDirty(DirtyType.SCHEME);
      }
    });

    /**
     * @property (read-only)
     *
     * Child elements.
     *
     * @type {Object}
     */
    Object.defineProperty(this, 'children', {
      value: {},
      writable: false
    });

    /**
     * @property (read-only)
     *
     * Data attributes.
     *
     * @type {Object}
     * @see ui.Directives.Data
     */
    Object.defineProperty(this, 'data', {
      value: {},
      writable: false
    });

    /**
     * @property (read-only)
     *
     * Property attributes.
     *
     * @type {Object}
     * @see ui.Directives.Property
     */
    Object.defineProperty(this, 'properties', {
      value: {},
      writable: false
    });

    /**
     * @property
     *
     * ViewUpdateDelegate instance.
     *
     * @type {ViewUpdateDelegate}
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
     * @property
     *
     * Specifies whether this Element instance remembers caches every listener
     * that is added to it (via the addEventListener/removeEventListener
     * method).
     *
     * @type {Boolean}
     */
    Object.defineProperty(this, 'cachesListeners', {
      value: true,
      writable: true
    });
  };

  /**
   * @protected
   *
   * Stubbed out setter for element property (for overriding purposes).
   *
   * @param {Object} value The DOM element.
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

  return Element;
}
);
