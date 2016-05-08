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
import defineProperty from '../helpers/defineProperty';
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
 * Abstract class of Node/classes that inherited from Node. Note that this class
 * is an abstract class and must be 'mixed' into an real class.
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes}
 *
 * @alias module:requiem~ui.Element
 */
const Element = (Base) => class extends (Base || HTMLElement) {
  /**
   * Gets the tag name of this Element instance. This method is meant to be
   * overridden by sub-classes because this class merely provides the foundation
   * functionality of a custom element, hence this class does not register
   * directly with the element registry.
   *
   * @return {string} The tag name.
   */
  static get tag() { return null; }

  /**
   * Gets the existing native element which this custom element extends.
   *
   * @return {string} The tag of the native element.
   */
  static get extends() { return null; }

  /**
   * Creates a new DOM element from this Element class.
   *
   * @return {Node}
   */
  static factory() { return new (dom.register(this))(); }

  /**
   * Instance name of this Element instance. Once set, it cannot be changed.
   *
   * @type {string}
   */
  get name() {
    let s = this.getAttribute('name');
    if (!s || s === '') return null;
    return s;
  }
  set name(val) {
    // Once set, name cannot change.
    if (!this.name)
    super.setAttribute('name', val);
  }

  /**
   * State of this Element instance (depicted by Directive.State).
   *
   * @type {string}
   */
  get state() {
    let s = this.getAttribute(Directive.STATE);
    if (!s || s === '') return null;
    return s;
  }
  set state(val) {
    if (this.state === val) return;

    let oldValue = this.state;

    if (val === null || val === undefined)
      this.removeAttribute(Directive.STATE);
    else
      this.setAttribute(Directive.STATE, val);

    this.updateDelegate.setDirty(DirtyType.STATE);

    let event = new CustomEvent(EventType.OBJECT.STATE, {
      detail: {
        property: 'state',
        oldValue: oldValue,
        newValue: val
      }
    });

    this.dispatchEvent(event);
  }

  /**
   * Rect of this Element instance.
   *
   * @type {Object}
   */
  get rect() { return getRect(this); }

  /**
   * Opacity of this Element instance.
   *
   * @type {number}
   */
  get opacity() { return this.getStyle('opacity', true); }
  set opacity(val) { this.setStyle('opacity', val); }

  /** @inheritdoc */
  createdCallback() {
    // Define instance properties.
    this.__defineProperties__();


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
    this.setStyle('visibility', 'hidden');
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
    this.__setNodeState__(NodeState.INITIALIZED);
    this.updateDelegate.init();
  }

  /**
   * Destroys this Element instance.
   */
  destroy() {
    this.removeAllEventListeners();
    this.updateDelegate.destroy();
    this.__setNodeState__(NodeState.DESTROYED);
  }

  /**
   * Handler invoked whenever a visual update is required.
   */
  update() {
    if (this.isDirty(DirtyType.RENDER) && this.nodeState === NodeState.UPDATED) this.render();

    if (this.nodeState !== NodeState.UPDATED) {
      this.__setNodeState__(NodeState.UPDATED);
      this.invisible = (this.invisible === undefined) ? false : this.invisible;
    }
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
      let l = listener;
      listener = function(event) {
        if ((event.target !== this.element) && !this.hasChild(event.target)) {
          l(event);
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

  /** @see module:requiem~ui.Element#addEventListener */
  on() { this.addEventListener.apply(this, arguments); }

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

  /** @see module:requiem~ui.Element#removeEventListener */
  off() { this.removeEventListener.apply(this, arguments); }

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
        defineProperty(this, descriptor, {
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
  __defineProperties__() {
    this.__private__ = {};
    this.__private__.childRegistry = {};
    this.__private__.listenerRegistry = {};

    /**
     * Current node state of this Element instance.
     *
     * @type {NodeState}
     */
    defineProperty(this, 'nodeState', { defaultValue: NodeState.IDLE, get: true });

    /**
     * Data properties.
     *
     * @type {Object}
     * @see module:requiem~enums.Directive.DATA
     */
    defineProperty(this, 'data', { defaultValue: {}, get: true });

    /**
     * ElementUpdateDelegate instance.
     *
     * @type {ElementUpdateDelegate}
     */
    defineProperty(this, 'updateDelegate', { defaultValue: new ElementUpdateDelegate(this), get: true });

    /**
     * Specifies whether this Element instance is invisible. This property
     * follows the rules of the CSS rule 'visibility: hidden'.
     *
     * @type {boolean}
     */
    defineProperty(this, 'invisible', {
      get: true,
      set: (value) => {
        assertType(value, 'boolean', false);

        if (this.nodeState === NodeState.UPDATED) {
          if (value) {
            this.setStyle('visibility', 'hidden');
          }
          else {
            if (this.getStyle('visibility') === 'hidden') {
              this.setStyle('visibility', null);
            }
          }
        }

        return value;
      }
    });

    if (this.disabled === undefined) {
      /**
       * Specifies whether this Element instance is disabled.
       *
       * @type {boolean}
       */
      Object.defineProperty(this, 'disabled', {
        get: () => (this.hasAttribute('disabled') ? this.getAttribute('disabled') : false),
        set: (value) => this.setAttribute('disabled', (value ? true : false))
      });
    }
  }

  /**
   * Sets the Element's node state.
   *
   * @param {NodeState} nodeState - Node state.
   *
   * @private
   */
  __setNodeState__(nodeState) {
    this.__private__.nodeState = nodeState;
  }
}

export default Element;
