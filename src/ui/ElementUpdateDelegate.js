/**
 * Requiem
 * (c) VARIANTE (http://variante.io)
 *
 * This software is released under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Delegate for managing update calls of a Requiem modeled element.
 *
 * @type {Class}
 */

'use strict';

define([
  'helpers/assert',
  'helpers/debounce',
  'helpers/log',
  'types/DirtyType',
  'types/EventType'
], function(
  assert,
  debounce,
  log,
  DirtyType,
  EventType
) {
  /**
   * @static
   *
   * Default refresh (debounce) rate in milliseconds.
   *
   * @type {Number}
   */
  var DEFAULT_REFRESH_RATE = 0.0;

  /**
   * @constructor
   *
   * Creates a new ElementUpdateDelegate instance.
   */
  function ElementUpdateDelegate(delegate) {
    log('[ElementUpdateDelegate]::new(', delegate, ')');

    var mDirtyTable = 0;
    var mResizeHandler = null;
    var mScrollHandler = null;
    var mMouseMoveHandler = null;
    var mOrientationChangeHandler = null;
    var mMouseWheelHandler = null;
    var mKeyUpHandler = null;
    var mKeyPressHandler = null;
    var mKeyDownHandler = null;

    this.delegate = delegate;

    /**
     * @privileged
     *
     * Sets a dirty type as dirty.
     *
     * @param {Number} dirtyType
     */
    this.setDirty = function(dirtyType, validateNow) {
      log('[ElementUpdateDelegate]::setDirty(', dirtyType, validateNow, ')');

      if (this.transmissive !== DirtyType.NONE) {
        if (this.delegate.children) {
          for (var name in this.delegate.children) {
            var children;

            if (this.delegate.children[name] instanceof Array) {
              children = this.delegate.children[name];
            } else {
              children = [this.delegate.children[name]];
            }

            var n = children.length;

            for (var i = 0; i < n; i++) {
              var child = children[i];

              if (child.updateDelegate && child.updateDelegate.setDirty) {
                var transmitted = dirtyType & child.updateDelegate.receptive;

                if (transmitted !== DirtyType.NONE) {
                  child.updateDelegate.setDirty(transmitted, validateNow);
                }
              }
            }
          }
        }
      }

      if (this.isDirty(dirtyType) && !validateNow) {
        return;
      }

      switch (dirtyType) {
        case DirtyType.NONE:
        case DirtyType.ALL:
          {
            mDirtyTable = dirtyType;
            break;
          }

        default:
          {
            mDirtyTable |= dirtyType;
            break;
          }
      }

      if (validateNow) {
        this.update();
      } else if (!this._pendingAnimationFrame) {
        this._pendingAnimationFrame = _requestAnimationFrame(this.update.bind(this));
      }
    };

    /**
     * @privileged
     *
     * Checks dirty status of a given dirty type.
     *
     * @param {Number}  dirtyType [description]
     *
     * @return {Boolean}
     */
    this.isDirty = function(dirtyType) {
      log('[ElementUpdateDelegate]::isDirty(', dirtyType, mDirtyTable, ')');

      switch (dirtyType) {
        case DirtyType.NONE:
        case DirtyType.ALL:
          return (mDirtyTable === dirtyType);

        default:
          return ((dirtyType & mDirtyTable) !== 0);
      }
    };

    /**
     * @privileged
     *
     * Initializes this ElementUpdateDelegate instance. Must manually invoke.
     */
    this.init = function() {
      log('[ElementUpdateDelegate]::init()');

      var conductor = this.conductor || window;

      if (window && conductor && conductor.addEventListener && (this.responsive === true || this.responsive instanceof Array)) {
        if (this.responsive === true || this.responsive.indexOf(EventType.OBJECT.RESIZE) > -1 || this.responsive.indexOf(EventType.DEVICE.ORIENTATION_CHANGE) > -1) {
          mResizeHandler = (this.refreshRate === 0.0) ? _onWindowResize.bind(this) : debounce(_onWindowResize.bind(this), this.refreshRate);
        }

        if (this.responsive === true || this.responsive.indexOf(EventType.OBJECT.SCROLL) > -1) {
          mScrollHandler = (this.refreshRate === 0.0) ? _onWindowScroll.bind(this) : debounce(_onWindowScroll.bind(this), this.refreshRate);
        }

        if (this.responsive === true || this.responsive.indexOf(EventType.MISC.WHEEL) > -1) {
          mMouseWheelHandler = (this.refreshRate === 0.0) ? _onWindowMouseWheel.bind(this) : debounce(_onWindowMouseWheel.bind(this), this.refreshRate);
        }

        if (this.responsive === true || this.responsive.indexOf(EventType.MOUSE.MOUSE_MOVE) > -1) {
          mMouseMoveHandler = (this.refreshRate === 0.0) ? _onWindowMouseMove.bind(this) : debounce(_onWindowMouseMove.bind(this), this.refreshRate);
        }

        if (this.responsive === true || this.responsive.indexOf(EventType.DEVICE.DEVICE_ORIENTATION) > -1 || this.responsive.indexOf(EventType.DEVICE.DEVICE_MOTION) > -1 || this.responsive.indexOf(EventType.DEVICE.ORIENTATION) > -1) {
          mOrientationChangeHandler = (this.refreshRate === 0.0) ? _onWindowOrientationChange.bind(this) : debounce(_onWindowOrientationChange.bind(this), this.refreshRate);
        }

        if (this.responsive === true || this.responsive.indexOf(EventType.KEYBOARD.KEY_DOWN) > -1) {
          mKeyDownHandler = _onWindowKeyDown.bind(this);
        }

        if (this.responsive === true || this.responsive.indexOf(EventType.KEYBOARD.KEY_PRESS) > -1) {
          mKeyPressHandler = _onWindowKeyPress.bind(this);
        }

        if (this.responsive === true || this.responsive.indexOf(EventType.KEYBOARD.KEY_UP) > -1) {
          mKeyUpHandler = _onWindowKeyUp.bind(this);
        }

        if (mResizeHandler) {
          window.addEventListener(EventType.OBJECT.RESIZE, mResizeHandler);
          window.addEventListener(EventType.DEVICE.ORIENTATION_CHANGE, mResizeHandler);
        }

        if (mScrollHandler) {
          conductor.addEventListener(EventType.OBJECT.SCROLL, mScrollHandler);
        }

        if (mMouseWheelHandler) {
          conductor.addEventListener(EventType.MISC.WHEEL, mMouseWheelHandler);
        }

        if (mMouseMoveHandler) {
          conductor.addEventListener(EventType.MOUSE.MOUSE_MOVE, mMouseMoveHandler);
        }

        if (mOrientationChangeHandler) {
          if (window.DeviceOrientationEvent) {
            window.addEventListener(EventType.DEVICE.DEVICE_ORIENTATION, mOrientationChangeHandler);
          }
          else if (window.DeviceMotionEvent) {
            window.addEventListener(EventType.DEVICE.DEVICE_MOTION, mOrientationChangeHandler);
          }
        }

        if (mKeyDownHandler) {
          window.addEventListener(EventType.KEYBOARD.KEY_DOWN, mKeyDownHandler);
        }

        if (mKeyPressHandler) {
          window.addEventListener(EventType.KEYBOARD.KEY_PRESS, mKeyPressHandler);
        }

        if (mKeyUpHandler) {
          window.addEventListener(EventType.KEYBOARD.KEY_UP, mKeyUpHandler);
        }
      }

      this.setDirty(DirtyType.ALL);
    };

    /**
     * @privileged
     *
     * Destroys this ElementUpdateDelegate instance.
     */
    this.destroy = function() {
      log('[ElementUpdateDelegate]::destroy()');

      _cancelAnimationFrame();

      var conductor = this.conductor || window;

      if (window && conductor && conductor.removeEventListener) {
        if (mResizeHandler) {
          window.removeEventListener(EventType.OBJECT.RESIZE, mResizeHandler);
          window.removeEventListener(EventType.DEVICE.ORIENTATION_CHANGE, mResizeHandler);
        }

        if (mScrollHandler) {
          conductor.removeEventListener(EventType.OBJECT.SCROLL, mScrollHandler);
        }

        if (mMouseWheelHandler) {
          conductor.removeEventListener(EventType.MISC.WHEEL, mMouseWheelHandler);
        }

        if (mMouseMoveHandler) {
          conductor.removeEventListener(EventType.MOUSE.MOUSE_MOVE, mMouseMoveHandler);
        }

        if (mOrientationChangeHandler) {
          if (window.DeviceOrientationEvent) {
            window.removeEventListener(EventType.DEVICE.DEVICE_ORIENTATION, mOrientationChangeHandler);
          }
          else if (window.DeviceMotionEvent) {
            window.removeEventListener(EventType.DEVICE.DEVICE_MOTION, mOrientationChangeHandler);
          }
        }

        if (mKeyDownHandler) {
          window.removeEventListener(EventType.KEYBOARD.KEY_DOWN, mKeyDownHandler);
        }

        if (mKeyPressHandler) {
          window.removeEventListener(EventType.KEYBOARD.KEY_PRESS, mKeyPressHandler);
        }

        if (mKeyUpHandler) {
          window.removeEventListener(EventType.KEYBOARD.KEY_UP, mKeyUpHandler);
        }
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
     * @privileged
     *
     * Handler invoked whenever a visual update is required.
     */
    this.update = function() {
      log('[ElementUpdateDelegate]::update()');

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

    /**
     * @private
     *
     * Custom requestAnimationFrame implementation.
     *
     * @param {Function} callback
     */
    var _requestAnimationFrame = function(callback) {
      var raf = window && (window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame) || null;

      if (!raf) {
        raf = function(callback) {
          if (window) {
            return window.setTimeout(callback, 10.0);
          } else {
            return null;
          }
        };
      }

      return raf(callback);
    };

    /**
     * @private
     *
     * Custom cancelAnimationFrame implementation.
     *
     * @return {Function} callback
     */
    var _cancelAnimationFrame = function(callback) {
      var caf = window && (window.requestAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || window.oCancelAnimationFrame || window.msCancelAnimationFrame) || null;

      if (!caf) {
        caf = function(callback) {
          if (window) {
            return window.clearTimeout(callback);
          } else {
            return null;
          }
        };
      }

      return caf;
    };

    /**
     * @private
     *
     * Handler invoked when the window resizes.
     *
     * @param {Object} event
     */
    var _onWindowResize = function(event) {
      this.setDirty(DirtyType.SIZE);
    };

    /**
     * @private
     *
     * Handler invoked when the window scrolls.
     *
     * @param {Object} event
     */
    var _onWindowScroll = function(event) {
      this.setDirty(DirtyType.POSITION);
    };

    /**
     * @private
     *
     * Handler invoked when mouse moves in the window.
     *
     * @param {Object} event
     */
    var _onWindowMouseMove = function(event) {
      this.mouse.pointerX = event.clientX;
      this.mouse.pointerY = event.clientY;

      this.setDirty(DirtyType.INPUT);
    };

    /**
     * @private
     *
     * Handler invoked when mouse wheel moves in the window.
     *
     * @param {Object} event
     */
    var _onWindowMouseWheel = function(event) {
      this.mouse.wheelX = event.deltaX;
      this.mouse.wheelY = event.deltaY;

      this.setDirty(DirtyType.INPUT);
    };

    /**
     * @private
     *
     * Handler invoked when device orientation changes.
     *
     * @param {Object} event
     */
    var _onWindowOrientationChange = function(event) {
      if (!window) return;

      var x, y, z;

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
     * @private
     *
     * Handler invoked when a key is pressed down.
     *
     * @param {Object} event
     */
    var _onWindowKeyDown = function(event) {
      if (!window) return;

      if (this.keyCode.down === undefined) {
        this.keyCode.down = [];
      }

      this.keyCode.down.push(event.keyCode);

      this.setDirty(DirtyType.INPUT);
    };

    /**
     * @private
     *
     * Handler invoked when a key is pressed.
     *
     * @param {Object} event
     */
    var _onWindowKeyPress = function(event) {
      if (!window) return;

      if (this.keyCode.press === undefined) {
        this.keyCode.press = [];
      }

      this.keyCode.press.push(event.keyCode);

      this.setDirty(DirtyType.INPUT);
    };

    /**
     * @private
     *
     * Handler invoked when a key is pressed up.
     *
     * @param {Object} event
     */
    var _onWindowKeyUp = function(event) {
      if (!window) return;

      if (this.keyCode.up === undefined) {
        this.keyCode.up = [];
      }

      this.keyCode.up.push(event.keyCode);

      this.setDirty(DirtyType.INPUT);
    };
  }

  /**
   * @property
   *
   * Delegate of this ElementUpdateDelegate instance.
   *
   * @type {Object}
   */
  Object.defineProperty(ElementUpdateDelegate.prototype, 'delegate', {
    value: null,
    writable: true
  });

  /**
   * @property
   *
   * Indicates whether this ElementUpdateDelegate auto responds to window
   * behaviors (i.e. resizing, scrolling).
   *
   * @type {Boolean}
   */
  Object.defineProperty(ElementUpdateDelegate.prototype, 'responsive', {
    value: false,
    writable: true
  });

  /**
   * @property
   *
   * Indicates the debounce rate of this ElementUpdateDelegate instance.
   *
   * @type {Number}
   */
  Object.defineProperty(ElementUpdateDelegate.prototype, 'refreshRate', {
    value: DEFAULT_REFRESH_RATE,
    writable: true
  });

  /**
   * @property
   *
   * Indicates the dirty flags in which ElementUpdateDelgate instance will
   * transmit to its child Elements.
   *
   * @type {Number}
   */
  Object.defineProperty(ElementUpdateDelegate.prototype, 'transmissive', {
    value: DirtyType.NONE,
    writable: true
  });

  /**
   * @property
   *
   * Indicates the dirty flags in which this ElementUpdateDelegate is capable
   * of receiving from parent Elements.
   *
   * @type {Number}
   */
  Object.defineProperty(ElementUpdateDelegate.prototype, 'receptive', {
    value: DirtyType.NONE,
    writable: true
  });

  /**
   * @property
   *
   * Indicates the conductor in which this ElementUpdateDelegate responds to
   * (defaults to window).
   *
   * @type {Object}
   */
  Object.defineProperty(ElementUpdateDelegate.prototype, 'conductor', {
    value: window,
    writable: true
  });

  /**
   * @property
   *
   * Stores mouse properties if this ElementUpdateDelegate responds to mouse
   * events.
   *
   * @type {Object}
   */
  Object.defineProperty(ElementUpdateDelegate.prototype, 'mouse', {
    value: {},
    writable: false
  });

  /**
   * @property
   *
   * Stores orientation properties if this ElementUpdateDelgate responds to
   * device orientations (i.e. device accelerometer).
   *
   * @type {Object}
   */
  Object.defineProperty(ElementUpdateDelegate.prototype, 'orientation', {
    value: {},
    writable: false
  });

  /**
   * @property
   *
   * Stores pressed keycodes if this ElementUpdateDelegate responds to
   * keyboard events.
   *
   * @type {Object}
   */
  Object.defineProperty(ElementUpdateDelegate.prototype, 'keyCode', {
    value: {},
    writable: false
  });

  /**
   * @protected
   *
   * Gets the string representation of this ElementUpdateDelegate instance.
   *
   * @return {String}
   */
  ElementUpdateDelegate.prototype.toString = function() {
    return '[ElementUpdateDelegate{' + ((this.delegate && this.delegate.name) || 'undefined') + '}]';
  };

  return ElementUpdateDelegate;
});
