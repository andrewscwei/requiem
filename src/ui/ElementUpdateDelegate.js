/**
 * Requiem
 * (c) VARIANTE (http://variante.io)
 *
 * This software is released under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 */

'use strict';

import debounce from '../helpers/debounce';
import DirtyType from '../enums/DirtyType';
import EventType from '../enums/EventType';

/**
 * Default refresh (debounce) rate in milliseconds.
 *
 * @const
 * @memberof module:requiem~ui.ElementUpdateDelegate
 * @type {number}
 * @default
 */
const DEFAULT_REFRESH_RATE = 0.0;

/**
 * @class
 *
 * Delegate for managing update calls of a Requiem Element.
 *
 * @alias module:requiem~ui.ElementUpdateDelegate
 */
class ElementUpdateDelegate {
  /**
   * @class
   *
   * Creates a new ElementUpdateDelegate instance.
   *
   * @param {Element} delegate - The Requiem Element instance of which this
   *                             ElementUpdateDelgate instance manages.
   *
   * @alias module:requiem~ui.ElementUpdateDelegate
   */
  constructor(delegate) {
    this.__define_properties();

    let mDirtyTable = 0;
    let mResizeHandler = null;
    let mScrollHandler = null;
    let mMouseMoveHandler = null;
    let mOrientationChangeHandler = null;
    let mMouseWheelHandler = null;
    let mKeyUpHandler = null;
    let mKeyPressHandler = null;
    let mKeyDownHandler = null;

    this.delegate = delegate;

    /**
     * Custom requestAnimationFrame implementation.
     *
     * @param {Function} callback
     *
     * @private
     */
    let _requestAnimationFrame = function(callback) {
      let raf = window && (window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame) || null;

      if (!raf) {
        raf = function(callback) {
          return window.setTimeout(callback, 10.0);
        };
      }

      return raf(callback);
    };

    /**
     * Custom cancelAnimationFrame implementation.
     *
     * @return {Function} callback
     *
     * @private
     */
    let _cancelAnimationFrame = function(callback) {
      let caf = window && (window.requestAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || window.oCancelAnimationFrame || window.msCancelAnimationFrame) || null;

      if (!caf) {
        caf = function(callback) {
          return window.clearTimeout(callback);
        };
      }

      return caf;
    };

    /**
     * Handler invoked when the window resizes.
     *
     * @param {Event} event
     *
     * @private
     */
    let _onWindowResize = function(event) {
      this.setDirty(DirtyType.SIZE);
    };

    /**
     * Handler invoked when the window scrolls.
     *
     * @param {Event} event
     *
     * @private
     */
    let _onWindowScroll = function(event) {
      this.setDirty(DirtyType.POSITION);
    };

    /**
     * Handler invoked when mouse moves in the window.
     *
     * @param {Event} event
     *
     * @private
     */
    let _onWindowMouseMove = function(event) {
      this.mouse.pointerX = event.clientX;
      this.mouse.pointerY = event.clientY;

      this.setDirty(DirtyType.INPUT);
    };

    /**
     * Handler invoked when mouse wheel moves in the window.
     *
     * @param {Event} event
     *
     * @private
     */
    let _onWindowMouseWheel = function(event) {
      this.mouse.wheelX = event.deltaX;
      this.mouse.wheelY = event.deltaY;

      this.setDirty(DirtyType.INPUT);
    };

    /**
     * Handler invoked when device orientation changes.
     *
     * @param {Event} event
     *
     * @private
     */
    let _onWindowOrientationChange = function(event) {
      if (!window) return;

      let x, y, z;

      if (event instanceof window.DeviceOrientationEvent) {
        x = event.beta;
        y = event.gamma;
        z = event.alpha;
      }
      else if (event instanceof window.DeviceMotionEvent) {
        x = event.acceleration.x * 2;
        y = event.acceleration.y * 2;
        z = event.acceleration.z * 2;
      }
      else {
        x = event.orientation.x * 50;
        y = event.orientation.y * 50;
        z = event.orientation.z * 50;
      }

      this.orientation.x = x;
      this.orientation.y = y;
      this.orientation.z = z;

      this.setDirty(DirtyType.ORIENTATION);
    };

    /**
     * Handler invoked when a key is pressed down.
     *
     * @param {Event} event
     *
     * @private
     */
    let _onWindowKeyDown = function(event) {
      if (!window) return;
      if (this.keyCode.down === undefined) this.keyCode.down = [];
      this.keyCode.down.push(event.keyCode);
      this.setDirty(DirtyType.INPUT);
    };

    /**
     * Handler invoked when a key is pressed.
     *
     * @param {Event} event
     *
     * @private
     */
    let _onWindowKeyPress = function(event) {
      if (!window) return;
      if (this.keyCode.press === undefined) this.keyCode.press = [];
      this.keyCode.press.push(event.keyCode);
      this.setDirty(DirtyType.INPUT);
    };

    /**
     * Handler invoked when a key is pressed up.
     *
     * @param {Event} event
     *
     * @private
     */
    let _onWindowKeyUp = function(event) {
      if (!window) return;
      if (this.keyCode.up === undefined) this.keyCode.up = [];
      this.keyCode.up.push(event.keyCode);
      this.setDirty(DirtyType.INPUT);
    };

    /**
     * Sets a dirty type as dirty.
     *
     * @param {number} dirtyType
     */
    this.setDirty = function(dirtyType, validateNow) {
      if (this.transmissive !== DirtyType.NONE) {
        if (this.delegate.children) {
          for (let name in this.delegate.children) {
            let children;

            if (this.delegate.children[name] instanceof Array) {
              children = this.delegate.children[name];
            } else {
              children = [this.delegate.children[name]];
            }

            let n = children.length;

            for (let i = 0; i < n; i++) {
              let child = children[i];

              if (child.updateDelegate && child.updateDelegate.setDirty) {
                let transmitted = dirtyType & child.updateDelegate.receptive;

                if (transmitted !== DirtyType.NONE) {
                  child.updateDelegate.setDirty(transmitted, validateNow);
                }
              }
            }
          }
        }
      }

      if (this.isDirty(dirtyType) && !validateNow) return;

      switch (dirtyType) {
        case DirtyType.NONE:
        case DirtyType.ALL:
          mDirtyTable = dirtyType;
          break;
        default:
          mDirtyTable |= dirtyType;
      }

      if (validateNow) {
        this.update();
      }
      else if (!this._pendingAnimationFrame) {
        this._pendingAnimationFrame = _requestAnimationFrame(this.update.bind(this));
      }
    };

    /**
     * Checks dirty status of a given dirty type.
     *
     * @param {number} dirtyType [description]
     *
     * @return {boolean}
     */
    this.isDirty = function(dirtyType) {
      switch (dirtyType) {
        case DirtyType.NONE:
        case DirtyType.ALL:
          return (mDirtyTable === dirtyType);
        default:
          return ((dirtyType & mDirtyTable) !== 0);
      }
    };

    /**
     * Initializes this ElementUpdateDelegate instance. Must manually invoke.
     */
    this.init = function() {
      let conductor = this.conductor || window;

      if (window && conductor && conductor.addEventListener && (this.responsive === true || this.responsive instanceof Array)) {
        if (this.responsive === true || this.responsive.indexOf(EventType.OBJECT.RESIZE) > -1 || this.responsive.indexOf(EventType.DEVICE.ORIENTATION_CHANGE) > -1)
          mResizeHandler = (this.refreshRate === 0.0) ? _onWindowResize.bind(this) : debounce(_onWindowResize.bind(this), this.refreshRate);

        if (this.responsive === true || this.responsive.indexOf(EventType.OBJECT.SCROLL) > -1)
          mScrollHandler = (this.refreshRate === 0.0) ? _onWindowScroll.bind(this) : debounce(_onWindowScroll.bind(this), this.refreshRate);

        if (this.responsive === true || this.responsive.indexOf(EventType.MISC.WHEEL) > -1)
          mMouseWheelHandler = (this.refreshRate === 0.0) ? _onWindowMouseWheel.bind(this) : debounce(_onWindowMouseWheel.bind(this), this.refreshRate);

        if (this.responsive === true || this.responsive.indexOf(EventType.MOUSE.MOUSE_MOVE) > -1)
          mMouseMoveHandler = (this.refreshRate === 0.0) ? _onWindowMouseMove.bind(this) : debounce(_onWindowMouseMove.bind(this), this.refreshRate);

        if (this.responsive === true || this.responsive.indexOf(EventType.DEVICE.DEVICE_ORIENTATION) > -1 || this.responsive.indexOf(EventType.DEVICE.DEVICE_MOTION) > -1 || this.responsive.indexOf(EventType.DEVICE.ORIENTATION) > -1)
          mOrientationChangeHandler = (this.refreshRate === 0.0) ? _onWindowOrientationChange.bind(this) : debounce(_onWindowOrientationChange.bind(this), this.refreshRate);

        if (this.responsive === true || this.responsive.indexOf(EventType.KEYBOARD.KEY_DOWN) > -1)
          mKeyDownHandler = _onWindowKeyDown.bind(this);

        if (this.responsive === true || this.responsive.indexOf(EventType.KEYBOARD.KEY_PRESS) > -1)
          mKeyPressHandler = _onWindowKeyPress.bind(this);

        if (this.responsive === true || this.responsive.indexOf(EventType.KEYBOARD.KEY_UP) > -1)
          mKeyUpHandler = _onWindowKeyUp.bind(this);

        if (mResizeHandler) {
          window.addEventListener(EventType.OBJECT.RESIZE, mResizeHandler);
          window.addEventListener(EventType.DEVICE.ORIENTATION_CHANGE, mResizeHandler);
        }

        if (mScrollHandler)
          conductor.addEventListener(EventType.OBJECT.SCROLL, mScrollHandler);

        if (mMouseWheelHandler)
          conductor.addEventListener(EventType.MISC.WHEEL, mMouseWheelHandler);

        if (mMouseMoveHandler)
          conductor.addEventListener(EventType.MOUSE.MOUSE_MOVE, mMouseMoveHandler);

        if (mOrientationChangeHandler) {
          if (window.DeviceOrientationEvent)
            window.addEventListener(EventType.DEVICE.DEVICE_ORIENTATION, mOrientationChangeHandler);
          else if (window.DeviceMotionEvent)
            window.addEventListener(EventType.DEVICE.DEVICE_MOTION, mOrientationChangeHandler);
        }

        if (mKeyDownHandler)
          window.addEventListener(EventType.KEYBOARD.KEY_DOWN, mKeyDownHandler);

        if (mKeyPressHandler)
          window.addEventListener(EventType.KEYBOARD.KEY_PRESS, mKeyPressHandler);

        if (mKeyUpHandler)
          window.addEventListener(EventType.KEYBOARD.KEY_UP, mKeyUpHandler);
      }

      this.setDirty(DirtyType.ALL);
    };

    /**
     * Destroys this ElementUpdateDelegate instance.
     */
    this.destroy = function() {
      _cancelAnimationFrame();

      let conductor = this.conductor || window;

      if (window && conductor && conductor.removeEventListener) {
        if (mResizeHandler) {
          window.removeEventListener(EventType.OBJECT.RESIZE, mResizeHandler);
          window.removeEventListener(EventType.DEVICE.ORIENTATION_CHANGE, mResizeHandler);
        }

        if (mScrollHandler)
          conductor.removeEventListener(EventType.OBJECT.SCROLL, mScrollHandler);

        if (mMouseWheelHandler)
          conductor.removeEventListener(EventType.MISC.WHEEL, mMouseWheelHandler);

        if (mMouseMoveHandler)
          conductor.removeEventListener(EventType.MOUSE.MOUSE_MOVE, mMouseMoveHandler);

        if (mOrientationChangeHandler) {
          if (window.DeviceOrientationEvent)
            window.removeEventListener(EventType.DEVICE.DEVICE_ORIENTATION, mOrientationChangeHandler);
          else if (window.DeviceMotionEvent)
            window.removeEventListener(EventType.DEVICE.DEVICE_MOTION, mOrientationChangeHandler);
        }

        if (mKeyDownHandler)
          window.removeEventListener(EventType.KEYBOARD.KEY_DOWN, mKeyDownHandler);

        if (mKeyPressHandler)
          window.removeEventListener(EventType.KEYBOARD.KEY_PRESS, mKeyPressHandler);

        if (mKeyUpHandler)
          window.removeEventListener(EventType.KEYBOARD.KEY_UP, mKeyUpHandler);
      }

      mResizeHandler = null;
      mScrollHandler = null;
      mMouseWheelHandler = null;
      mMouseMoveHandler = null;
      mOrientationChangeHandler = null;
      mKeyDownHandler = null;
      mKeyPressHandler = null;
      mKeyUpHandler = null;
    };

    /**
     * Handler invoked whenever a visual update is required.
     */
    this.update = function() {
      _cancelAnimationFrame(this._pendingAnimationFrame);

      if (this.delegate && this.delegate.update) {
        this.delegate.update.call(this.delegate);
      }

      // Reset the dirty status of all types.
      this.setDirty(DirtyType.NONE);

      delete this.mouse.pointerX;
      delete this.mouse.pointerY;
      delete this.mouse.wheelX;
      delete this.mouse.wheelY;
      delete this.orientation.x;
      delete this.orientation.y;
      delete this.orientation.z;
      delete this.keyCode.up;
      delete this.keyCode.press;
      delete this.keyCode.down;

      this._pendingAnimationFrame = null;
    };
  }

  /**
   * Gets the string representation of this ElementUpdateDelegate instance.
   *
   * @return {string}
   */
  toString() {
    return '[ElementUpdateDelegate{' + ((this.delegate && this.delegate.name) || 'undefined') + '}]';
  }

  /**
   * Defines all properties.
   *
   * @private
   */
  __define_properties() {
    /**
     * Delegate of this ElementUpdateDelegate instance.
     *
     * @property {Element}
     */
    this.delegate = null;

    /**
     * Indicates whether this ElementUpdateDelegate auto responds to window
     * behaviors (i.e. resizing, scrolling).
     *
     * @property {boolean}
     */
    this.responsive = false;

    /**
     * Indicates the debounce rate of this ElementUpdateDelegate instance.
     *
     * @property {number}
     */
    this.refreshRate = DEFAULT_REFRESH_RATE;

    /**
     * Indicates the dirty flags in which ElementUpdateDelgate instance will
     * transmit to its child Elements.
     *
     * @property {number}
     */
    this.transmissive = DirtyType.NONE;

    /**
     * Indicates the dirty flags in which this ElementUpdateDelegate is capable
     * of receiving from parent Elements.
     *
     * @property {number}
     */
    this.receptive = DirtyType.NONE;

    /**
     * Indicates the conductor in which this ElementUpdateDelegate responds to
     * (defaults to window).
     *
     * @property {Node|window}
     */
    this.conductor = window;

    /**
     * Stores mouse properties if this ElementUpdateDelegate responds to mouse
     * events.
     *
     * @property {Object}
     */
    this.mouse = {};

    /**
     * Stores orientation properties if this ElementUpdateDelgate responds to
     * device orientations (i.e. device accelerometer).
     *
     * @property {Object}
     */
    this.orientation = {};

    /**
     * Stores pressed keycodes if this ElementUpdateDelegate responds to
     * keyboard events.
     *
     * @property {Object}
     */
    this.keyCode = {};
  }
}

module.exports = ElementUpdateDelegate;
