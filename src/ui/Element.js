// (c) VARIANTE

'use strict';

import ElementUpdateDelegate from './ElementUpdateDelegate';
import dom from '../dom';
import Directive from '../enums/Directive';
import DirtyType from '../enums/DirtyType';
import EventType from '../enums/EventType';
import NodeState from '../enums/NodeState';
import assert from '../helpers/assert';
import assertType from '../helpers/assertType';
import hasOwnValue from '../helpers/hasOwnValue';
import noval from '../helpers/noval';
import getRect from '../utils/getRect';

// HACK: In Safari typeof HTMLElement === 'object'
// @see {@link https://bugs.webkit.org/show_bug.cgi?id=74193}
if (typeof HTMLElement !== 'function') {
  var _HTMLElement = function(){};
  _HTMLElement.prototype = HTMLElement.prototype;
  HTMLElement = _HTMLElement;
}

/**
 * @class
 *
 * Custom reactive DOM element.
 *
 * @alias module:requiem~ui.Element
 */
class Element extends HTMLElement {
  /**
   * Gets the tag name of this Element instance.
   *
   * @return {string} The tag name.
   */
  static get tag() {
    return 'r-element';
  }

  /**
   * Gets the existing native element which this custom element extends.
   *
   * @return {string} The tag of the native element.
   */
  static get extends() {
    return null;
  }

  /**
   * Creates a new DOM element from this Element class.
   *
   * @return {Node}
   */
  static factory() { return new (dom.register(this))(); }

  /**
   * Defines a property in an Element instance.
   *
   * @param {Element} element - Element instance to define the new property in.
   * @param {string} propertyName - Name of the property to be defined.
   * @param {Object} descriptor - An object literal that defines the behavior of
   *                              this new property. This object literal
   *                              inherits that of the descriptor param in
   *                              Object#defineProperty.
   * @param {boolean} [descriptor.unique=true] - Specifies that the modifier
   *                                             method will only invoke if the
   *                                             new value is different from the
   *                                             old value.
   * @param {DirtyType} [descriptor.dirtyType] - Specifies the DirtyType to flag
   *                                             whenever a new value is set.
   * @param {EventType} [descriptor.eventType] - Specifies the EventType to
   *                                             dispatch whenever a new value
   *                                             is set.
   * @param {boolean} [descriptor.attributed] - Specifies whether the a
   *                                            corresponding DOM attribute will
   *                                            update whenever a new value is
   *                                            set.
   * @param {Function} [descriptor.onChange] - Method invoked when the property
   *                                           changes.
   * @param {Function|boolean} [descriptor.get] - Method invoked when the
   *                                              accessor method is called.
   *                                              This is a good place to
   *                                              manipulate the value before it
   *                                              is returned. If simply set to
   *                                              true, a generic accessor
   *                                              method will be used.
   * @param {Function|boolean} [descriptor.set] - Method invoked when the
   *                                              modifier method is called.
   *                                              This is a good placd to
   *                                              manipulate the value before it
   *                                              is set. If simply set to true,
   *                                              a generic modifier method will
   *                                              be used.
   * @param {string} [scope] - Name of the instance property of the Element to
   *                           create the new property in. This property must be
   *                           enumerable.
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
    assertType(descriptor.attributed, 'boolean', true, 'Optional attributed must be a boolean');
    assertType(descriptor.onChange, 'function', true, 'Optional change handler must be a function');
    assertType(scope, 'string', true, 'Optional parameter \'scope\' must be a string');

    let dirtyType = descriptor.dirtyType;
    let defaultValue = descriptor.defaultValue;
    let attributed = descriptor.attributed;
    let attributeName = Directive.DATA+propertyName.replace(/([A-Z])/g, ($1) => ('-'+$1.toLowerCase()));
    let eventType = descriptor.eventType;
    let unique = descriptor.unique;

    assert(!attributeName || !hasOwnValue(Directive, attributeName), 'Attribute \'' + attributeName + '\' is reserved');

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
        if (attributed === true) element.setAttribute(attributeName, val);
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

    if (defaultValue !== undefined && attributed === true) {
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

  /** @inheritdoc */
  createdCallback() {
    // Define instance properties.
    this.__define_properties();

    // Check if this Element needs seed data from the data registry.
    this.setData(dom.getDataRegistry(this.getAttribute(Directive.REF)));

    // Scan for internal DOM element attributes prefixed with Directive.DATA
    // and generate data properties from them.
    let attributes = this.attributes;
    let nAtributes = attributes.length;
    let regex = new RegExp('^' + Directive.DATA, 'i');

    for (let i = 0; i < nAtributes; i++) {
      let attribute = attributes[i];

      if (hasOwnValue(Directive, attribute.name) || !regex.test(attribute.name)) continue;

      // Generate camel case property name from the attribute.
      let propertyName = attribute.name.replace(regex, '').replace(/-([a-z])/g, (g) => (g[1].toUpperCase()));
      this.setData(propertyName, this.getAttribute(attribute.name), true);
    }

    // Make element invisible until its first update.
    this.invisible = true;
  }

  /** @inheritdoc */
  attachedCallback() {
    this.render();
    this.init();
  }

  /** @inheritdoc */
  detachedCallback() {
    this.destroy();
  }

  /**
   * Initializes this Element instance.
   */
  init() {
    this.__set_node_state(NodeState.INITIALIZED);
    this.updateDelegate.init();
  }

  /**
   * Destroys this Element instance.
   */
  destroy() {
    this.removeAllEventListeners();
    this.updateDelegate.destroy();
    this.__set_node_state(NodeState.DESTROYED);
  }

  /**
   * Handler invoked whenever a visual update is required.
   */
  update() {
    if (this.isDirty(DirtyType.RENDER) && this.nodeState === NodeState.UPDATED) {
      this.render();
    }

    this.__set_node_state(NodeState.UPDATED);

    // Make element visible upon first update.
    this.invisible = false;
  }

  /**
   * Renders the template of this element instance.
   */
  render() {
    let d = this.data;
    d.state = this.state;
    d.name = this.name;

    let t = this.template(d);
    if (typeof t === 'string') t = dom.createElement(t);

    assert(!t || (t instanceof HTMLTemplateElement), `Element generated from template() must be an HTMLTemplateElement instance`);

    if (t) {
      t = document.importNode(t.content, true);

      // TODO: Add support for shadow DOM in the future when it's easier to style.
      if (false) {
        try {
          if (!this.shadowRoot) this.createShadowRoot();
          while (this.shadowRoot.lastChild) this.shadowRoot.removeChild(this.shadowRoot.lastChild);
          this.shadowRoot.appendChild(t);
        }
        catch (err) {}
      }
      else {
        while(this.lastChild) this.removeChild(this.lastChild);
        this.appendChild(t);
      }
    }

    dom.sightread(this);
  }

  /** @see module:requiem~ui.ElementUpdateDelegate#initResponsiveness */
  respondsTo() { this.updateDelegate.initResponsiveness.apply(this.updateDelegate, arguments); }

  /** @see module:requiem~dom.addChild */
  addChild(child, name, prepend) { return dom.addChild(this, child, name, prepend); }

  /** @see module:requiem~dom.removeChild */
  removeChild(child) {
    if ((child instanceof Node) && (child.parentNode === this)) {
      dom.removeFromChildRegistry(dom.getChildRegistry(this), child);
      return super.removeChild(child);
    }
    else {
      return dom.removeChild(this, child);
    }
  }

  /** @see module:requiem~dom.getChild */
  getChild(name, recursive) { return dom.getChild(this, name, recursive); }

  /** @see module:requiem~dom.hasChild */
  hasChild(child) { return dom.hasChild(child, this); }

  /** @see module:requiem~dom.addClass */
  addClass(className) { return dom.addClass(this, className); }

  /** @see module:requiem~dom.removeClass */
  removeClass(className) { return dom.removeClass(this, className); }

  /** @see module:requiem~dom.hasClass */
  hasClass(className) { return dom.hasClass(this, className); }

  /** @inheritdoc */
  getAttribute(name) {
    let value = super.getAttribute(name);
    if (value === '') return true;
    if (value === undefined || value === null) return null;
    try {
      return JSON.parse(value);
    }
    catch (err) {
      return value;
    }
  }

  /** @inheritdoc */
  setAttribute(name, value) {
    switch (name) {
      case 'name':
        this.name = value;
        break;
      default:
        if (value === undefined || value === null || value === false)
          this.removeAttribute(name);
        else if (value === true)
          super.setAttribute(name, '');
        else
          super.setAttribute(name, value);
        if (name === 'disabled')
          this.setDirty(DirtyType.STATE);
    }
  }

  /** @see module:requiem~dom.hasAttribute */
  hasAttribute(name) { return dom.hasAttribute(this, name); }

  /** @see module:requiem~dom.getStyle */
  getStyle(key, isComputed, isolateUnits) { return dom.getStyle(this, key, isComputed, isolateUnits); }

  /** @see module:requiem~dom.setStyle */
  setStyle(key, value) { return dom.setStyle(this, key, value); }

  /** @see module:requiem~dom.hasStyle */
  hasStyle(key) { return dom.hasStyle(this, key); }

  /** @inheritdoc */
  addEventListener() {
    let event = arguments[0];
    let listener = arguments[1];
    let useCapture = arguments[2] || false;

    if (!this.__private__.listenerRegistry[event]) {
      this.__private__.listenerRegistry[event] = [];
    }

    let m = this.__private__.listenerRegistry[event];
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

    if (event === EventType.MOUSE.CLICK_OUTSIDE) {
      window.addEventListener(EventType.MOUSE.CLICK, listener, useCapture);
    }
    else {
      super.addEventListener.apply(this, arguments);
    }
  }

  /**
   * @see module:requiem~ui.Element#addEventListener
   */
  on() {
    this.addEventListener.apply(this, arguments);
  }

  /**
   * Determines if a particular listener (or any listener in the specified
   * event) exist in this Element instance.
   *
   * @param {string} event - Event name.
   * @param {Function} listener - Listener function.
   *
   * @return {boolean}
   */
  hasEventListener(event, listener) {
    if (!this.__private__.listenerRegistry) return false;
    if (!this.__private__.listenerRegistry[event]) return false;

    if (listener) {
      let m = this.__private__.listenerRegistry[event];
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

  /** @inheritdoc */
  removeEventListener() {
    let event = arguments[0];
    let listener = arguments[1];
    let useCapture = arguments[2] || false;

    if (this.__private__.listenerRegistry) {
      let m = this.__private__.listenerRegistry[event];
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
            this.__private__.listenerRegistry[event] = null;
            delete this.__private__.listenerRegistry[event];
          }
        }
      }
      else {
        while (this.__private__.listenerRegistry[event] !== undefined) {
          this.removeEventListener(event, this.__private__.listenerRegistry[event][0].listener, this.__private__.listenerRegistry[event][0].useCapture);
        }
      }
    }

    if (listener) {
      if (window && event === EventType.MOUSE.CLICK_OUTSIDE) {
        window.removeEventListener(EventType.MOUSE.CLICK, listener, useCapture);
      }
      else {
        super.removeEventListener.apply(this, arguments);
      }
    }
  }

  /**
   * Removes all cached event listeners from this Element instance.
   */
  removeAllEventListeners() {
    if (this.__private__.listenerRegistry) {
      for (let event in this.__private__.listenerRegistry) {
        this.removeEventListener(event);
      }
    }
  }

  /**
   * Gets the value of the data property with the specified name.
   *
   * @param {string} key - Name of the data property.
   *
   * @return {*} Value of the data property.
   */
  getData(key) {
    return this.data[key];
  }

  /**
   * Checks to see if this Element instance has the data property of the
   * specified name.
   *
   * @param {string} key - Name of the data property.
   *
   * @return {boolean} True if data property exists, false othwerwise.
   */
  hasData(key) {
    return this.data.hasOwnProperty(key);
  }

  /**
   * Defines multiple data properties if the first argument is an object literal
   * (hence using its key/value pairs) or sets a single data property of the
   * specified name with the specified value. If the data property does not
   * exist, it will be newly defined.
   *
   * @param {string|object} - Name of the data property if defining only one, or
   *                          an object literal containing key/value pairs to be
   *                          merged into this Element instance's data
   *                          properties.
   * @param {*} - Value of the data property (if defining only one).
   * @param {boolean} - If defining only one data property, specifies whether
   *                    the data property should also be a data attribute of the
   *                    element.
   */
  setData() {
    let descriptor = arguments[0];

    if (typeof descriptor === 'string') {
      let value = arguments[1];
      let attributed = arguments[2] || false;

      if (this.hasData(descriptor)) {
        this.data[descriptor] = value;
      }
      else {
        Element.defineProperty(this, descriptor, {
          defaultValue: value,
          dirtyType: DirtyType.DATA,
          get: true,
          set: true,
          attributed: attributed
        }, 'data');
      }
    }
    else {
      assertType(descriptor, 'object', false);
      if (!descriptor) return;
      for (let key in descriptor) {
        this.setData(key, descriptor[key]);
      }
    }
  }

  /**
   * Creates the associated DOM element from a template.
   *
   * @return {Node|string}
   */
  template(data) {
    return null;
  }

  /** @see ElementUpdateDelegate#isDirty */
  isDirty() { return this.updateDelegate.isDirty.apply(this.updateDelegate, arguments); }

  /** @see ElementUpdateDelegate#setDirty */
  setDirty() { return this.updateDelegate.setDirty.apply(this.updateDelegate, arguments); }

  /**
   * Defines all properties.
   *
   * @protected
   */
  __define_properties() {
    this.__private__ = {};
    this.__private__.childRegistry = {};
    this.__private__.listenerRegistry = {};

    /**
     * Instance name of this Element instance. Once set, it cannot be changed.
     *
     * @property {string}
     */
    Object.defineProperty(this, 'name', {
      get: () => {
        let s = this.getAttribute('name');
        if (!s || s === '') return null;
        return s;
      },
      set: (value) => {
        // Once set, name cannot change.
        if (!this.name)
          super.setAttribute('name', value);
      }
    });

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
        let s = this.getAttribute(Directive.STATE);
        if (!s || s === '') return null;
        return s;
      },
      set: (value) => {
        if (this.state === value) return;

        let oldValue = this.state;

        if (value === null || value === undefined) {
          this.removeAttribute(Directive.STATE);
        }
        else {
          this.setAttribute(Directive.STATE, value);
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
     * Data properties.
     *
     * @property {Object}
     * @see module:requiem~enums.Directive.DATA
     */
    Element.defineProperty(this, 'data', { defaultValue: {}, get: true });

    /**
     * ElementUpdateDelegate instance.
     *
     * @property {ElementUpdateDelegate}
     */
    Element.defineProperty(this, 'updateDelegate', { defaultValue: new ElementUpdateDelegate(this), get: true });

    /**
     * Gets the total number of immediate children in this Element instance.
     *
     * @property {number}
     */
    Object.defineProperty(this, 'childCount', {
      get: () => {
        let count = 0;

        for (let k in this.__private__.childRegistry) {
          let child = this.__private__.childRegistry[k];

          if (child instanceof Node) {
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
     * Specifies whether this Element instance is invisible. This property
     * follows the rules of the CSS rule 'visibility: hidden'.
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
            this.setStyle('visibility', null);
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

export default Element;
