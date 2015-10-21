/**
 * Requiem
 * (c) VARIANTE (http://variante.io)
 *
 * This software is released under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Start file for r.js.
 */
(function(root, factory, undefined) {
  'use strict';

  var requiem = factory;

  // Check if using CommonJS.
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = requiem;
  }
  // Check if using AMD.
  else if (typeof define === 'function' && typeof define.amd === 'object') {
    define('requiem', [], requiem);
  }
  // Browser (?).
  else {
    root.requiem = requiem;
  }
}((typeof window !== 'undefined') ? window : this, function() {
/**
 * @license almond 0.3.1 Copyright (c) 2011-2014, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 * see: http://github.com/jrburke/almond for details
 */
//Going sloppy to avoid 'use strict' string cost, but strict practices should
//be followed.
/*jslint sloppy: true */
/*global setTimeout: false */

var requirejs, require, define;
(function (undef) {
    var main, req, makeMap, handlers,
        defined = {},
        waiting = {},
        config = {},
        defining = {},
        hasOwn = Object.prototype.hasOwnProperty,
        aps = [].slice,
        jsSuffixRegExp = /\.js$/;

    function hasProp(obj, prop) {
        return hasOwn.call(obj, prop);
    }

    /**
     * Given a relative module name, like ./something, normalize it to
     * a real name that can be mapped to a path.
     * @param {String} name the relative name
     * @param {String} baseName a real name that the name arg is relative
     * to.
     * @returns {String} normalized name
     */
    function normalize(name, baseName) {
        var nameParts, nameSegment, mapValue, foundMap, lastIndex,
            foundI, foundStarMap, starI, i, j, part,
            baseParts = baseName && baseName.split("/"),
            map = config.map,
            starMap = (map && map['*']) || {};

        //Adjust any relative paths.
        if (name && name.charAt(0) === ".") {
            //If have a base name, try to normalize against it,
            //otherwise, assume it is a top-level require that will
            //be relative to baseUrl in the end.
            if (baseName) {
                name = name.split('/');
                lastIndex = name.length - 1;

                // Node .js allowance:
                if (config.nodeIdCompat && jsSuffixRegExp.test(name[lastIndex])) {
                    name[lastIndex] = name[lastIndex].replace(jsSuffixRegExp, '');
                }

                //Lop off the last part of baseParts, so that . matches the
                //"directory" and not name of the baseName's module. For instance,
                //baseName of "one/two/three", maps to "one/two/three.js", but we
                //want the directory, "one/two" for this normalization.
                name = baseParts.slice(0, baseParts.length - 1).concat(name);

                //start trimDots
                for (i = 0; i < name.length; i += 1) {
                    part = name[i];
                    if (part === ".") {
                        name.splice(i, 1);
                        i -= 1;
                    } else if (part === "..") {
                        if (i === 1 && (name[2] === '..' || name[0] === '..')) {
                            //End of the line. Keep at least one non-dot
                            //path segment at the front so it can be mapped
                            //correctly to disk. Otherwise, there is likely
                            //no path mapping for a path starting with '..'.
                            //This can still fail, but catches the most reasonable
                            //uses of ..
                            break;
                        } else if (i > 0) {
                            name.splice(i - 1, 2);
                            i -= 2;
                        }
                    }
                }
                //end trimDots

                name = name.join("/");
            } else if (name.indexOf('./') === 0) {
                // No baseName, so this is ID is resolved relative
                // to baseUrl, pull off the leading dot.
                name = name.substring(2);
            }
        }

        //Apply map config if available.
        if ((baseParts || starMap) && map) {
            nameParts = name.split('/');

            for (i = nameParts.length; i > 0; i -= 1) {
                nameSegment = nameParts.slice(0, i).join("/");

                if (baseParts) {
                    //Find the longest baseName segment match in the config.
                    //So, do joins on the biggest to smallest lengths of baseParts.
                    for (j = baseParts.length; j > 0; j -= 1) {
                        mapValue = map[baseParts.slice(0, j).join('/')];

                        //baseName segment has  config, find if it has one for
                        //this name.
                        if (mapValue) {
                            mapValue = mapValue[nameSegment];
                            if (mapValue) {
                                //Match, update name to the new value.
                                foundMap = mapValue;
                                foundI = i;
                                break;
                            }
                        }
                    }
                }

                if (foundMap) {
                    break;
                }

                //Check for a star map match, but just hold on to it,
                //if there is a shorter segment match later in a matching
                //config, then favor over this star map.
                if (!foundStarMap && starMap && starMap[nameSegment]) {
                    foundStarMap = starMap[nameSegment];
                    starI = i;
                }
            }

            if (!foundMap && foundStarMap) {
                foundMap = foundStarMap;
                foundI = starI;
            }

            if (foundMap) {
                nameParts.splice(0, foundI, foundMap);
                name = nameParts.join('/');
            }
        }

        return name;
    }

    function makeRequire(relName, forceSync) {
        return function () {
            //A version of a require function that passes a moduleName
            //value for items that may need to
            //look up paths relative to the moduleName
            var args = aps.call(arguments, 0);

            //If first arg is not require('string'), and there is only
            //one arg, it is the array form without a callback. Insert
            //a null so that the following concat is correct.
            if (typeof args[0] !== 'string' && args.length === 1) {
                args.push(null);
            }
            return req.apply(undef, args.concat([relName, forceSync]));
        };
    }

    function makeNormalize(relName) {
        return function (name) {
            return normalize(name, relName);
        };
    }

    function makeLoad(depName) {
        return function (value) {
            defined[depName] = value;
        };
    }

    function callDep(name) {
        if (hasProp(waiting, name)) {
            var args = waiting[name];
            delete waiting[name];
            defining[name] = true;
            main.apply(undef, args);
        }

        if (!hasProp(defined, name) && !hasProp(defining, name)) {
            throw new Error('No ' + name);
        }
        return defined[name];
    }

    //Turns a plugin!resource to [plugin, resource]
    //with the plugin being undefined if the name
    //did not have a plugin prefix.
    function splitPrefix(name) {
        var prefix,
            index = name ? name.indexOf('!') : -1;
        if (index > -1) {
            prefix = name.substring(0, index);
            name = name.substring(index + 1, name.length);
        }
        return [prefix, name];
    }

    /**
     * Makes a name map, normalizing the name, and using a plugin
     * for normalization if necessary. Grabs a ref to plugin
     * too, as an optimization.
     */
    makeMap = function (name, relName) {
        var plugin,
            parts = splitPrefix(name),
            prefix = parts[0];

        name = parts[1];

        if (prefix) {
            prefix = normalize(prefix, relName);
            plugin = callDep(prefix);
        }

        //Normalize according
        if (prefix) {
            if (plugin && plugin.normalize) {
                name = plugin.normalize(name, makeNormalize(relName));
            } else {
                name = normalize(name, relName);
            }
        } else {
            name = normalize(name, relName);
            parts = splitPrefix(name);
            prefix = parts[0];
            name = parts[1];
            if (prefix) {
                plugin = callDep(prefix);
            }
        }

        //Using ridiculous property names for space reasons
        return {
            f: prefix ? prefix + '!' + name : name, //fullName
            n: name,
            pr: prefix,
            p: plugin
        };
    };

    function makeConfig(name) {
        return function () {
            return (config && config.config && config.config[name]) || {};
        };
    }

    handlers = {
        require: function (name) {
            return makeRequire(name);
        },
        exports: function (name) {
            var e = defined[name];
            if (typeof e !== 'undefined') {
                return e;
            } else {
                return (defined[name] = {});
            }
        },
        module: function (name) {
            return {
                id: name,
                uri: '',
                exports: defined[name],
                config: makeConfig(name)
            };
        }
    };

    main = function (name, deps, callback, relName) {
        var cjsModule, depName, ret, map, i,
            args = [],
            callbackType = typeof callback,
            usingExports;

        //Use name if no relName
        relName = relName || name;

        //Call the callback to define the module, if necessary.
        if (callbackType === 'undefined' || callbackType === 'function') {
            //Pull out the defined dependencies and pass the ordered
            //values to the callback.
            //Default to [require, exports, module] if no deps
            deps = !deps.length && callback.length ? ['require', 'exports', 'module'] : deps;
            for (i = 0; i < deps.length; i += 1) {
                map = makeMap(deps[i], relName);
                depName = map.f;

                //Fast path CommonJS standard dependencies.
                if (depName === "require") {
                    args[i] = handlers.require(name);
                } else if (depName === "exports") {
                    //CommonJS module spec 1.1
                    args[i] = handlers.exports(name);
                    usingExports = true;
                } else if (depName === "module") {
                    //CommonJS module spec 1.1
                    cjsModule = args[i] = handlers.module(name);
                } else if (hasProp(defined, depName) ||
                           hasProp(waiting, depName) ||
                           hasProp(defining, depName)) {
                    args[i] = callDep(depName);
                } else if (map.p) {
                    map.p.load(map.n, makeRequire(relName, true), makeLoad(depName), {});
                    args[i] = defined[depName];
                } else {
                    throw new Error(name + ' missing ' + depName);
                }
            }

            ret = callback ? callback.apply(defined[name], args) : undefined;

            if (name) {
                //If setting exports via "module" is in play,
                //favor that over return value and exports. After that,
                //favor a non-undefined return value over exports use.
                if (cjsModule && cjsModule.exports !== undef &&
                        cjsModule.exports !== defined[name]) {
                    defined[name] = cjsModule.exports;
                } else if (ret !== undef || !usingExports) {
                    //Use the return value from the function.
                    defined[name] = ret;
                }
            }
        } else if (name) {
            //May just be an object definition for the module. Only
            //worry about defining if have a module name.
            defined[name] = callback;
        }
    };

    requirejs = require = req = function (deps, callback, relName, forceSync, alt) {
        if (typeof deps === "string") {
            if (handlers[deps]) {
                //callback in this case is really relName
                return handlers[deps](callback);
            }
            //Just return the module wanted. In this scenario, the
            //deps arg is the module name, and second arg (if passed)
            //is just the relName.
            //Normalize module name, if it contains . or ..
            return callDep(makeMap(deps, callback).f);
        } else if (!deps.splice) {
            //deps is a config object, not an array.
            config = deps;
            if (config.deps) {
                req(config.deps, config.callback);
            }
            if (!callback) {
                return;
            }

            if (callback.splice) {
                //callback is an array, which means it is a dependency list.
                //Adjust args if there are dependencies
                deps = callback;
                callback = relName;
                relName = null;
            } else {
                deps = undef;
            }
        }

        //Support require(['a'])
        callback = callback || function () {};

        //If relName is a function, it is an errback handler,
        //so remove it.
        if (typeof relName === 'function') {
            relName = forceSync;
            forceSync = alt;
        }

        //Simulate async callback;
        if (forceSync) {
            main(undef, deps, callback, relName);
        } else {
            //Using a non-zero value because of concern for what old browsers
            //do, and latest browsers "upgrade" to 4 if lower value is used:
            //http://www.whatwg.org/specs/web-apps/current-work/multipage/timers.html#dom-windowtimers-settimeout:
            //If want a value immediately, use require('id') instead -- something
            //that works in almond on the global level, but not guaranteed and
            //unlikely to work in other AMD implementations.
            setTimeout(function () {
                main(undef, deps, callback, relName);
            }, 4);
        }

        return req;
    };

    /**
     * Just drops the config on the floor, but returns req in case
     * the config return value is used.
     */
    req.config = function (cfg) {
        return req(cfg);
    };

    /**
     * Expose module registry for debugging and tooling
     */
    requirejs._defined = defined;

    define = function (name, deps, callback) {
        if (typeof name !== 'string') {
            throw new Error('See almond README: incorrect module build, no module name');
        }

        //This module may not have dependencies
        if (!deps.splice) {
            //deps is not an array, so probably means
            //an object literal or factory function for
            //the value. Adjust args.
            callback = deps;
            deps = [];
        }

        if (!hasProp(defined, name) && !hasProp(waiting, name)) {
            waiting[name] = [name, deps, callback];
        }
    };

    define.amd = {
        jQuery: true
    };
}());

define("almond", function(){});

/**
 * Requiem
 * (c) VARIANTE (http://variante.io)
 *
 * This software is released under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 *
 * @type {Function}
 */



define('helpers/assert',[],function() {
  /**
   * Asserts the specified condition and throws a warning if assertion fails.
   *
   * @param {Boolean} condition          Condition to validate against.
   * @param {String}  message:undefined  Message to be displayed when assertion
   *                                    fails.
   *
   * @return {Boolean} True if assert passed, false otherwise.
   */
  function assert(condition, message) {
    if (!condition) {
      throw new Error((message || 'Assert failed'));
    }

    return condition;
  }

  return assert;
});

/**
 * Requiem
 * (c) VARIANTE (http://variante.io)
 *
 * This software is released under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 *
 * @type {Function}
 */



define('helpers/assertType',[
  'helpers/assert'
],
function(
  assert
) {
  /**
   * Asserts the specified condition and throws a warning if assertion fails.
   * Internal use only.
   *
   * @param {*}            value                 Value used for the assertion.
   * @param {String/Class} type                  Type(s) to evaluate against.
   *                                            If this is a string, this
   *                                            method will use 'typeof'
   *                                            operator. Otherwise
   *                                            'instanceof' operator will be
   *                                            used. If this parameter is an
   *                                            array, all elements in the
   *                                            array will be evaluated
   *                                            against.
   * @param {Boolean}      allowUndefined:false  Specifies whether assertion
   *                                            should pass if the supplied
   *                                            value is undefined.
   * @param {String}       message:undefined     Message to be displayed when
   *                                            assertion fails.
   *
   * @return {Boolean} True if assert passed, false otherwise.
   */
  function assertType(value, type, allowUndefined, message) {
    if (!assert(type !== undefined, 'Paremeter \'type\' must be a string or a class')) return;
    if (!assert((allowUndefined === undefined) || (typeof allowUndefined === 'boolean'), 'Paremeter \'allowUndefined\', if specified, must be a boolean')) return;
    if (!assert((message === undefined) || (typeof message === 'string'), 'Parameter \'message\', if specified, must be a string')) return;

    allowUndefined = (allowUndefined === undefined) ? false : allowUndefined;

    var ok = false;

    if (allowUndefined && (value === undefined)) {
      ok = true;
    }
    else if (type instanceof Array) {
      var n = type.length;

      for (var i = 0; i < n; i++) {
        if (checkType(value, type[i])) {
          ok = true;
          break;
        }
      }
    }
    else {
      ok = checkType(value, type);
    }

    if (!ok) {
      throw new Error(message || 'AssertType failed');
    }

    return ok;
  }

  /**
   * Verifies that a given is of the given type.
   *
   * @param {*} value  Any value.
   * @param {*} type   Any class or string that describes a type.
   *
   * @return {Boolean} True if validation passes, false otherwise.
   */
  function checkType(value, type) {
    if (typeof type === 'string') {
      switch (type) {
        case 'string':
        case 'object':
        case 'number':
        case 'boolean':
        case 'function':
          return typeof value === type;

        case 'class':
          return typeof value === 'function';

        case 'array':
          return value instanceof Array;

        default:
          return false;
      }
    }
    else {
      return value instanceof type;
    }
  }

  return assertType;
});

/**
 * Requiem
 * (c) VARIANTE (http://variante.io)
 *
 * This software is released under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 *
 * @type {Function}
 */



define('dom/namespace',[
  'helpers/assertType'
], function(
  assertType
) {
  /**
   * Creates the specified namespace in the specified scope.
   *
   * @param {String} identifiers  Namespace identifiers with parts separated by
   *                              dots.
   * @param {Object} scope:*      Object to create namespace in, which defaults
   *                              to window if browser environment or a new
   *                              blank object.
   *
   * @return {Object} Reference to the created namespace.
   */
  function namespace(identifiers, scope) {
    assertType(identifiers, 'string', false, 'Invalid parameter: identifiers');
    assertType(scope, 'object', true, 'Invalid optional parameter: scope');

    var defaultScope = (window) ? window : {};
    var groups = identifiers.split('.');
    var currentScope = (scope === undefined || scope === null) ? defaultScope : scope;

    for (var i = 0; i < groups.length; i++) {
      currentScope = currentScope[groups[i]] || (currentScope[groups[i]] = {});
    }

    return currentScope;
  }

  return namespace;
});

/**
 * Requiem
 * (c) VARIANTE (http://variante.io)
 *
 * This software is released under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 *
 * @type {Function}
 */



define('dom/ready',[
  'helpers/assertType',
], function(
  assertType
) {
  /**
   * Invokes a function when the DOM is ready.
   *
   * @param {Function} callback  Function invoked when the DOM is ready.
   */
  function ready(callback) {
    assertType(callback, 'function', false, 'Invalid parameter: callback');

    if (!document) return null;

    var onLoaded = function(event) {
      if (document.addEventListener) {
        document.removeEventListener('DOMContentLoaded', onLoaded, false);
        window.removeEventListener('load', onLoaded, false);
      }
      else if (document.attachEvent) {
        document.detachEvent('onreadystatechange', onLoaded);
        window.detachEvent('onload', onLoaded);
      }

      setTimeout(callback, 1);
    };

    if (document.readyState === 'complete') {
      return setTimeout(callback, 1);
    }

    if (document.addEventListener) {
      document.addEventListener('DOMContentLoaded', onLoaded, false);
      window.addEventListener('load', onLoaded, false);
    }
    else if (document.attachEvent) {
      document.attachEvent('onreadystatechange', onLoaded);
      window.attachEvent('onload', onLoaded);
    }

    return null;
  }

  return ready;
});

/**
 * Requiem
 * (c) VARIANTE (http://variante.io)
 *
 * This software is released under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Custom DOM directives used by Requiem.
 *
 * @type {Object}
 */



define('types/Directives',{
  Controller: 'r-controller',
  Instance:   'r-instance',
  Property:   'r-property',
  Data:       'r-data',
  State:      'r-state',
  Scheme:     'r-scheme'
});

/**
 * Requiem
 * (c) VARIANTE (http://variante.io)
 *
 * This software is released under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 *
 * @type {Function}
 */



define('helpers/isNull',[
  'helpers/assert',
  'helpers/assertType'
],
function(
  assert,
  assertType
) {
  /**
   * Checks if a given value is equal to null. Option to specify recursion,
   * which would further evaluate inner elements, such as when an Array or
   * Object is specified.
   *
   * @param {*}       value            Value to evaluate.
   * @param {Boolean} recursive:false  Specifies whether to recursively
   *                                   evaluate the supplied value's inner
   *                                   values (i.e. an Array or Object).
   *
   * @return {Boolean} True if null, false otherwise.
   */
  function isNull(value, recursive) {
    assertType(recursive, 'boolean', true, 'Invalid parameter: recursive');

    if (recursive === undefined) recursive = false;

    if (value === undefined || value === null) {
      return true;
    }
    else if (recursive && (value instanceof Array)) {
      var n = value.length;

      for (var i = 0; i < n; i++) {
        if (!isNull(value[i], true)) return false;
      }

      return true;
    }
    else if (recursive && (typeof value === 'object')) {
      for (var p in value) {
        if (!isNull(value[p], true)) return false;
      }

      return true;
    }
    else {
      return false;
    }
  }

  return isNull;
});

/**
 * Requiem
 * (c) VARIANTE (http://variante.io)
 *
 * This software is released under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 *
 * @type {Function}
 */



define('helpers/log',[],function() {
  /**
   * Internal console logger that activates only when VARS_DEBUG flag is
   * present in the window.
   */
  function log() {
    if (window && window.VARS_DEBUG && window.console && console.log) {
      Function.apply.call(console.log, console, arguments);
    }
  }

  return log;
});

/**
 * Requiem
 * (c) VARIANTE (http://variante.io)
 *
 * This software is released under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 *
 * UI dirty types.
 *
 * @type {Object}
 */



define('types/DirtyType',{
  NONE:        0x00000000,
  POSITION:    1 << 0,
  SIZE:        1 << 1,
  LAYOUT:      1 << 2,
  STATE:       1 << 3,
  DATA:        1 << 4,
  LOCALE:      1 << 5,
  DEPTH:       1 << 6,
  CONFIG:      1 << 7,
  STYLE:       1 << 8,
  SCHEME:      1 << 9,
  INPUT:       1 << 10,
  ORIENTATION: 1 << 11,
  CUSTOM:      1 << 12,
  ALL:         0xFFFFFFFF
});

/**
 * Requiem
 * (c) VARIANTE (http://variante.io)
 *
 * This software is released under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Element node states.
 *
 * @type {Object}
 */



define('types/NodeState',{
  /**
   * Element is instantiated but not initialized yet. This state almost never
   * persists.
   */
  IDLE: 0,

  /**
   * Element is initialized, but not updated yet.
   */
  INITIALIZED: 1,

  /**
   * Element is updated at least once.
   */
  UPDATED: 2,

  /**
   * Element is destroyed.
   */
  DESTROYED: 3
});

/**
 * Requiem
 * (c) VARIANTE (http://variante.io)
 *
 * This software is released under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Requiem supported event types.
 *
 * @type {Object}
 */



define('types/EventType',{
  /**
   * DOM native events.
   *
   * @see http://www.w3schools.com/jsref/dom_obj_event.asp
   */
  DATA: {
    CHANGE: 'datachange'
  },
  MOUSE: {
    CLICK: 'click',
    CONTEXT_MENU: 'contextmenu',
    CLICK_OUTSIDE: 'clickoutside', // Requiem Element exclusive
    DOUBLE_CLICK: 'dblclick',
    MOUSE_DOWN: 'mousedown',
    MOUSE_ENTER: 'mouseenter',
    MOUSE_LEAVE: 'mouseleave',
    MOUSE_MOVE: 'mousemove',
    MOUSE_OVER: 'mouseover',
    MOUSE_OUT: 'mouseout',
    MOUSE_UP: 'mouseup'
  },
  KEYBOARD: {
    KEY_DOWN: 'keydown',
    KEY_PRESS: 'keypress',
    KEY_UP: 'keyup'
  },
  DEVICE: {
    DEVICE_ORIENTATION: 'deviceorientation',
    DEVICE_MOTION: 'devicemotion',
    ORIENTATION: 'MozOrientation',
    ORIENTATION_CHANGE: 'orientationchange'
  },
  OBJECT: {
    ABORT: 'abort',
    BEFORE_UNLOAD: 'beforeunload',
    ERROR: 'error',
    HASH_CHANGE: 'hashchange',
    LOAD: 'load',
    PAGE_SHOW: 'pageshow',
    PAGE_HIDE: 'pagehide',
    RESIZE: 'resize',
    SCROLL: 'scroll',
    UNLOAD: 'unload',
    PROGRESS: 'progress' // custom
  },
  FORM: {
    BLUR: 'blur',
    CHANGE: 'change',
    FOCUS: 'focus',
    FOCUS_IN: 'focusin',
    FOCUS_OUT: 'focusout',
    INPUT: 'input',
    INVALID: 'invalid',
    RESET: 'reset',
    SEARCH: 'search',
    SELECT: 'select',
    SUBMIT: 'submit'
  },
  DRAG: {
    DRAG: 'drag',
    DRAG_END: 'dragend',
    DRAG_ENTER: 'dragenter',
    DRAG_LEAVE: 'dragleave',
    DRAG_OVER: 'dragover',
    DRAG_START: 'dragstart',
    DROP: 'drop'
  },
  CLIPBOARD: {
    COPY: 'copy',
    CUT: 'cut',
    PASTE: 'paste'
  },
  PRINT: {
    AFTER_PRINT: 'afterprint',
    BEFORE_PRINT: 'beforeprint'
  },
  MEDIA: {
    ABORT: 'abort',
    CAN_PLAY: 'canplay',
    CAN_PLAY_THROUGH: 'canplaythrough',
    DURATION_CHANGE: 'durationchange',
    EMPTIED: 'emptied',
    ENDED: 'ended',
    ERROR: 'error',
    LOADED_DATA: 'loadeddata',
    LOADED_METADATA: 'loadedmetadata',
    LOAD_START: 'loadstart',
    PAUSE: 'pause',
    PLAY: 'play',
    PLAYING: 'playing',
    PROGRESS: 'progress',
    RATE_CHANGE: 'ratechange',
    SEEKED: 'seeked',
    SEEKING: 'seeking',
    STALLED: 'stalled',
    SUSPEND: 'suspend',
    TIME_UPDATE: 'timeupdate',
    VOLUME_CHANGE: 'volumechange',
    WAITING: 'waiting'
  },
  ANIMATION: {
    ANIMATION_END: 'animationend',
    ANIMATION_ITERATION: 'animationiteration',
    ANIMATION_START: 'animationstart'
  },
  TRANSITION: {
    TRANSITION_END: 'transitionend'
  },
  SERVER_SENT: {
    ERROR: 'error',
    MESSAGE: 'message',
    OPEN: 'open'
  },
  MISC: {
    MESSAGE: 'message',
    ONLINE: 'online',
    OFFLINE: 'offline',
    POP_STATE: 'popstate',
    SHOW: 'show',
    STORAGE: 'storage',
    TOGGLE: 'toggle',
    WHEEL: 'wheel'
  },
  TOUCH: {
    TOUCH_CANCEL: 'touchcancel',
    TOUCH_END: 'touchend',
    TOUCH_MOVE: 'touchmove',
    TOUCH_START: 'touchstart'
  }
});

/**
 * Requiem
 * (c) VARIANTE (http://variante.io)
 *
 * This software is released under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 *
 * @type {Function}
 */



define('helpers/debounce',[
  'helpers/assertType'
],
function(
  assertType
) {
  /**
   * Returns a function that, as long as it continues to be invoked, will not
   * be triggered. The function will be called after it stops being called for
   * N milliseconds. If 'leading' is passed, the function will be triggered on
   * the leading edge instead of the trailing.
   *
   * @param {Function} method         Method to be debounced.
   * @param {Number}   delay:0        Debounce rate in milliseconds.
   * @param {Boolean}  leading:false  Indicates whether the method is triggered
   *                                 on the leading edge instead of the
   *                                 trailing.
   *
   * @return {Function} The debounced method.
   */
  function debounce(method, delay, leading) {
    assertType(method, 'function', false, 'Invalid parameter: method');
    assertType(delay, 'number', true, 'Invalid optional parameter: delay');
    assertType(leading, 'boolean', true, 'Invalid optional parameter: leading');

    if (delay === undefined) delay = 0;
    if (leading === undefined) leading = false;

    var timeout;

    return function() {
      var context = this;
      var args = arguments;

      var later = function() {
        timeout = null;

        if (!leading) {
          method.apply(context, args);
        }
      };

      var callNow = leading && !timeout;
      clearTimeout(timeout);
      timeout = setTimeout(later, delay);

      if (callNow) {
        method.apply(context, args);
      }
    };
  }

  return debounce;
});

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



define('ui/ElementUpdateDelegate',[
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

    this.__define_properties();

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
   * @protected
   *
   * Define all properties.
   */
  ElementUpdateDelegate.prototype.__define_properties = function() {
    /**
     * @property
     *
     * Delegate of this ElementUpdateDelegate instance.
     *
     * @type {Object}
     */
    Object.defineProperty(this, 'delegate', {
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
    Object.defineProperty(this, 'responsive', {
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
    Object.defineProperty(this, 'refreshRate', {
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
    Object.defineProperty(this, 'transmissive', {
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
    Object.defineProperty(this, 'receptive', {
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
    Object.defineProperty(this, 'conductor', {
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
    Object.defineProperty(this, 'mouse', {
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
    Object.defineProperty(this, 'orientation', {
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
    Object.defineProperty(this, 'keyCode', {
      value: {},
      writable: false
    });
  };

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



define('ui/Element',[
  'helpers/assert',
  'helpers/assertType',
  'helpers/isNull',
  'helpers/log',
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

        Object.defineProperty(this.properties, pProperty, {
          value: (a.value === '') ? true : a.value,
          writable: true
        });
      }
      else if (regData.test(a.name)) {
        var pData = a.name.replace(regData, '').replace(/-([a-z])/g, function(g) {
          return g[1].toUpperCase();
        });

        Object.defineProperty(this.data, pData, {
          get: (function(key, val) {
            return function() {
              if (this.data[key] === undefined) {
                return val;
              }
              else {
                return this.data[key];
              }
            }.bind(this);
          }.bind(this)('_'+pData, (a.value === '') ? true : a.value)),
          set: (function(attr, key) {
            return function(value) {
              this.data[key] = value;
              this.element.setAttribute(attr, value);
              this.updateDelegate.setDirty(DirtyType.DATA);
            }.bind(this);
          }.bind(this)(a.name, '_'+pData))
        });
      }
    }

    log(this.toString() + ':new(', init, ')');

    this.init();
  }

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
        child.forEach(function(c) {
          if (c.nodeState === NodeState.IDLE || c.nodeState === NodeState.DESTROYED) {
            c.init();
          }
        });
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
        child.forEach(function(c) {
          if (c.nodeState !== NodeState.DESTROYED) {
            c.destroy();
          }
        });
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

/**
 * Requiem
 * (c) VARIANTE (http://variante.io)
 *
 * This software is released under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 *
 * @type {Function}
 */



define('helpers/inherit',[
  'helpers/assertType'
],
function(
  assertType
) {
  /**
   * Sets up prototypal inheritance between a child class and a parent class.
   *
   * @param {Class} childClass   Child class
   * @param {Class} parentClass  Parent class
   *
   * @return {Class} Extended child class.
   */
  function inherit(childClass, parentClass) {
    assertType(childClass, 'class', false, 'Invalid parameter: childClass');
    assertType(parentClass, 'class', false, 'Invalid parameter: parentClass');

    for (var key in parentClass) {
      if (parentClass.hasOwnProperty(key)) {
        childClass[key] = parentClass[key];
      }
    }

    function C() {
      this.constructor = childClass;
    }

    C.prototype = Object.create(parentClass.prototype);
    childClass.prototype = new C();
    childClass.__super__ = parentClass.prototype;
    return childClass;
  }

  return inherit;
});

/**
 * Requiem
 * (c) VARIANTE (http://variante.io)
 *
 * This software is released under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Controller of a DOM 'video' element.
 *
 * @type {Class}
 */



define('ui/Video',[
    'helpers/assert',
    'helpers/inherit',
    'helpers/log',
    'types/DirtyType',
    'ui/Element'
  ],
  function(
    assert,
    inherit,
    log,
    DirtyType,
    Element
  ) {
    inherit(Video, Element);

    /**
     * @constructor
     *
     * Creates a new Video instance.
     */
    function Video() {
      Video.__super__.constructor.apply(this, arguments);
    }

    /**
     * @static
     *
     * Constants for the 'preload' attribute.
     *
     * @type {Object}
     *
     * @see  http://www.w3schools.com/tags/tag_video.asp
     */
    Video.PRELOAD = {
      AUTO: 'auto',
      METADATA: 'metada',
      NONE: 'none'
    };

    /**
     * @inheritDoc
     */
    Video.prototype.update = function() {
      if (this.updateDelegate.isDirty(DirtyType.DATA)) {
        this._updateSource();
      }

      if (this.updateDelegate.isDirty(DirtyType.CUSTOM)) {

      }

      Video.__super__.update.call(this);
    };

    /**
     * @inheritDoc
     */
    Video.prototype.factory = function() {
      return document.createElement('video');
    };

    /**
     * @private
     *
     * Updates the sources in this Video instance.
     */
    Video.prototype._updateSource = function() {
      var i;
      var arrlen;

      // Update source(s).
      var oldSources = this.element.getElementsByTagName('source');

      arrlen = oldSources.length;

      for (i = 0; i < arrlen; i++) {
        var oldSource = oldSources[i];

        this.element.removeChild(oldSource);
      }

      if (!this.source) return;

      arrlen = this.source.length;

      for (i = 0; i < arrlen; i++) {
        var newSource = document.createElement('source');
        var path = this.source[i].src;
        var type = this.source[i].type;
        var ext = path.split('.').pop();

        newSource.setAttribute('src', path);
        newSource.setAttribute('type', type || 'video/' + ext);

        this.element.appendChild(newSource);
      }
    };

    /**
     * @inheritDoc
     */
    Video.prototype.toString = function() {
      return '[Video{' + this.name + '}]';
    };

    /**
     * @inheritDoc
     */
    Video.prototype.__define_properties = function() {
      /**
       * @property
       *
       * Specifies that the video will start playing as soon as it is ready.
       *
       * @type {Boolean}
       */
      Object.defineProperty(this, 'autoplay', {
        get: function() {
          return this.element.autoplay;
        },
        set: function(value) {
          this.element.autoplay = value;
          this.updateDelegate.setDirty(DirtyType.CUSTOM);
        }
      });

      /**
       * @property
       *
       * Specifies that video controls should be displayed (such as a play/pause
       * button etc).
       *
       * @type {Boolean}
       */
      Object.defineProperty(this, 'controls', {
        get: function() {
          return this.element.controls;
        },
        set: function(value) {
          this.element.controls = value;
          this.updateDelegate.setDirty(DirtyType.CUSTOM);
        }
      });

      /**
       * @property
       *
       * Specifies that the video will start over again, every time it is
       * finished.
       *
       * @type {Boolean}
       */
      Object.defineProperty(this, 'loop', {
        get: function() {
          return this.element.loop;
        },
        set: function(value) {
          this.element.loop = value;
          this.updateDelegate.setDirty(DirtyType.CUSTOM);
        }
      });

      /**
       * @property
       *
       * Specifies that the audio output of the video should be muted.
       *
       * @type {Boolean}
       */
      Object.defineProperty(this, 'muted', {
        get: function() {
          return this.element.muted;
        },
        set: function(value) {
          this.element.muted = value;
          this.updateDelegate.setDirty(DirtyType.CUSTOM);
        }
      });

      /**
       * @property
       *
       * Specifies an image to be shown while the video is downloading, or until
       * the user hits the play button.
       *
       * @type {String}   URL of image
       */
      Object.defineProperty(this, 'poster', {
        get: function() {
          return this.element.poster;
        },
        set: function(value) {
          this.element.poster = value;
          this.updateDelegate.setDirty(DirtyType.CUSTOM);
        }
      });

      /**
       * @property
       *
       * Specifies if and how the author thinks the video should be loaded when
       * the page loads
       *
       * @type {String}   See Video.AUTOPLAY
       */
      Object.defineProperty(this, 'preload', {
        get: function() {
          return this.element.preload;
        },
        set: function(value) {
          this.element.preload = value;
          this.updateDelegate.setDirty(DirtyType.CUSTOM);
        }
      });

      /**
       * @property
       *
       * Array of sources containing elements in the form of:
       *  Object {
       *    {String} src  Path of source.
       *    {String} type Type of source.
       *  }
       *
       * @type {Array}
       */
      Object.defineProperty(this, 'source', {
        get: function() {
          return this._source;
        },
        set: function(value) {
          Object.defineProperty(this, '_source', {
            value: value,
            writable: true
          });
          this.updateDelegate.setDirty(DirtyType.DATA);
        }
      });

      Video.__super__.__define_properties.call(this);
    };

    /**
     * @inheritDoc
     */
    Video.prototype.__set_element = function(value) {
      assert(value instanceof HTMLVideoElement, 'Invalid element type specified. Must be an instance of HTMLVideoElement.');
      Video.__super__.__set_element.call(this, value);
    };

    return Video;
  }
);

/**
 * Requiem
 * (c) VARIANTE (http://variante.io)
 *
 * This software is released under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 *
 * @type {Function}
 */



define('helpers/toElementArray',[
  'ui/Element',
  'helpers/assert'
], function(
  Element,
  assert
) {
  /**
   * Transforms given element(s) to an element array.
   *
   * @param {Object/Array} element
   * @param {Boolean}      keepElement
   */
  function toElementArray(element, keepElement) {
    if (!assert(element, 'Element is undefined or null.')) return null;

    var elements;

    if (element instanceof Array) {
      elements = element;
    }
    else if (element instanceof NodeList) {
      elements = Array.prototype.slice.call(element);
    }
    else if (element.jquery) {
      elements = element.get();
    }
    else {
      if (!assert((element instanceof HTMLElement) || (element instanceof Element), 'Invalid element specified. Element must be an instance of HTMLElement or Requiem Element.')) return null;

      if (element instanceof HTMLElement) {
        elements = [element];
      }
      else if (element instanceof Element) {
        elements = [element.element];
      }
    }

    var n = elements.length;

    for (var i = 0; i < n; i++) {
      var e = elements[i];

      if (!assert((e instanceof HTMLElement) || (e instanceof Element), 'Element array contains invalid element(s). Each element must be an instance of HTMLElement or Requiem Element.')) return null;

      if (!keepElement && (e instanceof Element)) {
        elements[i] = e.element;
      }
    }

    return elements;
  }

  return toElementArray;
});

/**
 * Requiem
 * (c) VARIANTE (http://variante.io)
 *
 * This software is released under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 *
 * @type {Function}
 */



define('utils/hasChild',[
  'helpers/assert',
  'helpers/toElementArray'
], function(
  assert,
  toElementArray
) {
  /**
   * Checks if specified parent contains specified child.
   *
   * @param {Object} parent  HTMLElement, Requiem Element, or jQuery object.
   * @param {Object} child   HTMLElement, Requiem Element, or jQuery object.
   *
   * @return {Boolean} True if parent has given child, false otherwise.
   */
  function hasChild(parent, child) {
    var ps = toElementArray(parent);
    var cs = toElementArray(child);

    if (!assert(ps.length === 1, 'Invalid parent specified. Parent must be a single HTMLElement, Requiem Element, or jQuery object.')) return false;
    if (!assert(cs.length === 1, 'Invalid child specified. Child must be a single HTMLElement, Requiem Element, or jQuery object.')) return false;
    if (!assert(document, 'Document not found. This method requires document to be valid.')) return false;

    var p = ps[0];
    var c = cs[0];

    if (!c.parentNode) return false;

    while (c !== null && c !== undefined && c !== document) {
      c = c.parentNode;

      if (c === p) return true;
    }

    return false;
  }

  return hasChild;
}
);

/**
 * Requiem
 * (c) VARIANTE (http://variante.io)
 *
 * This software is released under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 *
 * @type {Function}
 */



define('dom/sightread',[
  'dom/namespace',
  'dom/ready',
  'helpers/assert',
  'types/Directives',
  'ui/Element',
  'ui/Video',
  'utils/hasChild'
], function(
  namespace,
  ready,
  assert,
  Directives,
  Element,
  Video,
  hasChild
) {
  /**
   * Parses the entire DOM and transforms elements marked with Requiem attributes
   * into instances of its corresponding controller class (or Requiem Element by
   * by default).
   *
   * @param {Object} controllerScope
   */
  function sightread(controllerScope) {
    ready(function() {
      getChildElements(document, controllerScope);
    });
  }

  /**
   * Transforms all the DOM elements inside the specified element marked with custom
   * Requiem attributes into an instance of either its specified controller class or a generic
   * Requiem Element. If a marked DOM element is a child of another marked DOM element, it will
   * be passed into the parent element's children tree as its specified controller
   * class instance or a generic Requiem Element.
   *
   * @param {Object} element         HTMLElement, Requiem Element, or jQuery object.
   * @param {Object} controllerScope
   */
  function getChildElements(element, controllerScope) {
    var children = null;

    if (!element) element = document;
    if (element.jquery) element = element.get(0);
    if (!assert((element instanceof HTMLElement) || (element instanceof Element) || (document && element === document), 'Element must be an instance of an HTMLElement or the DOM itself.')) return null;
    if (element instanceof Element) element = element.element;

    var nodeList = element.querySelectorAll('[' + Directives.Controller + '], [data-' + Directives.Controller + '], [' + Directives.Instance + '], [data-' + Directives.Instance + ']');
    var qualifiedChildren = filterParentElements(nodeList);
    var n = qualifiedChildren.length;

    for (var i = 0; i < n; i++) {
      var child = qualifiedChildren[i];
      var className = child.getAttribute(Directives.Controller) || child.getAttribute('data-' + Directives.Controller);
      var childName = child.getAttribute(Directives.Instance) || child.getAttribute('data-' + Directives.Instance);
      var controller = (className) ? namespace(className, controllerScope) : null;

      // If no controller class is specified but element is marked as an instance, default the controller class to
      // Element.
      if (!controller && childName && childName.length > 0) {
        controller = Element;
      }
      else if (typeof controller !== 'function') {
        switch (className) {
          case 'Video': {
            controller = Video;
            break;
          }
          case 'Element': {
            controller = Element;
            break;
          }
          default: {
            controller = null;
            break;
          }
        }
      }

      if (!assert(typeof controller === 'function', 'Class "' + className + '" is not found in specified controllerScope ' + (controllerScope || window) + '.')) continue;

      var m = new controller({
        element: child,
        name: childName,
        children: getChildElements(child, controllerScope)
      });

      if (childName && childName.length > 0) {
        if (!children) children = {};

        if (!children[childName]) {
          children[childName] = m;
        }
        else {
          if (children[childName] instanceof Array) {
            children[childName].push(m);
          }
          else {
            var a = [children[childName]];
            a.push(m);
            children[childName] = a;
          }
        }
      }
    }

    return children;
  }

  function filterParentElements(nodeList) {
    var n = nodeList.length;
    var o = [];

    for (var i = 0; i < n; i++) {
      var isParent = true;
      var child = nodeList[i];

      for (var j = 0; j < n; j++) {
        if (i === j) continue;

        var parent = nodeList[j];

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

  return sightread;
});

/**
 * Requiem
 * (c) VARIANTE (http://variante.io)
 *
 * This software is released under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Module of methods for manipulating the DOM.
 *
 * @type {Module}
 */



define('dom', [
  'dom/namespace',
  'dom/ready',
  'dom/sightread'
], function(
  namespace,
  ready,
  sightread
) {
  var api = {};

  Object.defineProperty(api, 'namespace', { value: namespace, writable: false, enumerable: true });
  Object.defineProperty(api, 'ready', { value: ready, writable: false, enumerable: true });
  Object.defineProperty(api, 'sightread', { value: sightread, writable: false, enumerable: true });

  return api;
});

/**
 * Requiem
 * (c) VARIANTE (http://variante.io)
 *
 * This software is released under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Event dispatcher object.
 *
 * @type {Class}
 */



define('events/EventDispatcher',[
  'helpers/assert',
  'helpers/assertType',
  'helpers/log'
], function(
  assert,
  assertType,
  log
) {
  /**
   * @constructor
   *
   * Creates a new EventDispatcher instance.
   */
  function EventDispatcher(element) {
    this.__define_properties();
  }

  /**
   * Adds an event listener to this EventDispatcher instance.
   *
   * @param {String}   type
   * @param {Function} listener
   */
  EventDispatcher.prototype.addEventListener = function(type, listener) {
    if (!assertType(type, 'string', false, 'Invalid parameter: type')) return;
    if (!assertType(listener, 'function', false, 'Invalid parameter: listener')) return;

    log('[EventDispatcher]::addEventListener(' + type + ')');

    if (!this._listenerMap) {
      Object.defineProperty(this, '_listenerMap', {
        value: {},
        writable: true
      });
    }

    if (!this._listenerMap[type]) {
      this._listenerMap[type] = [];
    }

    this._listenerMap[type].push(listener);
  };

  /**
   * Removes an event listener from this EventDispatcher instance. If no
   * listener method is specified, all the listeners of the specified type
   * will be removed.
   *
   * @param {String}   type
   * @param {Function} listener:undefined
   */
  EventDispatcher.prototype.removeEventListener = function(type, listener) {
    if (!assertType(type, 'string', false, 'Invalid parameter: type')) return;
    if (!assertType(listener, 'function', true, 'Invalid parameter: listener')) return;
    if (!assert(this._listenerMap, 'Listener map is null.')) return;
    if (!assert(this._listenerMap[type], 'There are no listeners registered for event type: ' + type)) return;

    log('[EventDispatcher]::removeEventListener(' + type + ')');

    if (listener) {
      var index = this._listenerMap[type].indexOf(listener);

      if (index > -1) {
        this._listenerMap[type].splice(index, 1);
      }
    } else {
      delete this._listenerMap[type];
    }
  };

  /**
   * Determines whether this EventDispatcher instance has a specific event
   * listener registered. If no listener is specified, it will check if any
   * listener of the specified event type is registered.
   *
   * @param {String}   type
   * @param {Function} listener:undefined
   *
   * @return {Boolean}
   */
  EventDispatcher.prototype.hasEventListener = function(type, listener) {
    if (!assertType(type, 'string', false, 'Invalid parameter: type')) return;
    if (!assertType(listener, 'function', true, 'Invalid parameter: listener')) return;
    if (!assert(this._listenerMap, 'Listener map is null.')) return;
    if (!assert(this._listenerMap[type], 'There are no listeners registered for event type: ' + type)) return;

    if (listener) {
      var index = this._listenerMap[type].indexOf(listener);

      return (index > -1);
    } else {
      return true;
    }
  };

  /**
   * Dispatches the specified event.
   *
   * @param {Event} event
   */
  EventDispatcher.prototype.dispatchEvent = function(event) {
    if (!assertType(event, Event, false, 'Event must be specified.')) return;
    if (!assert(this._listenerMap, 'Listener map is null.')) return;

    if (!this._listenerMap[event.type]) return;

    log('[EventDispatcher]::dispatchEvent(' + event.type + ')');

    event.target = this;
    event.currentTarget = this;
    event.customTarget = this;

    var arrlen = this._listenerMap[event.type].length;

    for (var i = 0; i < arrlen; i++) {
      var listener = this._listenerMap[event.type][i];

      listener.call(this, event);
    }
  };

  /**
   * @private
   *
   * Defines all properties.
   */
  EventDispatcher.prototype.__define_properties = function() {

  };

  return EventDispatcher;
});

/**
 * Requiem
 * (c) VARIANTE (http://variante.io)
 *
 * This software is released under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Module of methods/classes related to the event system.
 *
 * @type {Module}
 */



define('events', [
  'events/EventDispatcher'
], function(
  EventDispatcher
) {
  var api = {};

  Object.defineProperty(api, 'EventDispatcher', { value: EventDispatcher, writable: false, enumerable: true });

  return api;
});

/**
 * Requiem
 * (c) VARIANTE (http://variante.io)
 *
 * This software is released under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Asset loader for images, videos, and audios.
 *
 * @type {Class}
 */



define('net/AssetLoader',[
  'events/EventDispatcher',
  'helpers/assert',
  'helpers/inherit',
  'helpers/log',
  'types/EventType'
], function(
  EventDispatcher,
  assert,
  inherit,
  log,
  EventType
) {
  /**
   * @constant
   *
   * Common image file extensions.
   *
   * @type {Array}
   */
  var IMAGE_EXTENSIONS = ['jpg', 'png', 'svg', 'jpeg', 'gif'];

  /**
   * @constant
   *
   * Common video file extensions.
   *
   * @type {Array}
   */
  var VIDEO_EXTENSIONS = ['mp4', 'mpeg', 'ogg', 'ogv', 'mov', 'avi', 'flv'];

  /**
   * @constant
   *
   * Common audio file extensions.
   *
   * @type {Array}
   */
  var AUDIO_EXTENSIONS = ['mp3', 'mp4', 'mpeg', 'flac', 'wav', 'ogg'];

  /**
   * @constant
   *
   * Mime type lookup.
   *
   * @type {Object}
   */
  var MIME_TYPES = {
    IMAGE: {
      jpg: 'image/jpeg',
      jpeg: 'image/jpeg',
      gif: 'image/gif',
      png: 'image/png',
      svg: 'image/svg'
    },
    VIDEO: {
      mp4: 'video/mp4',
      mov: 'video/quicktime',
      mpeg: 'video/mpeg',
      ogg: 'video/ogg',
      ogv: 'video/ogg',
      avi: 'video/avi',
      flv: 'video/x-flv'
    },
    AUDIO: {
      mp3: 'audio/mpeg',
      mpeg: 'audio/mpeg',
      mp4: 'audio/mp4',
      flac: 'audio/flac',
      ogg: 'audio/ogg',
      wav: 'audio/vnd.wave'
    }
  };

  /**
   * @constructor
   *
   * Creates a new AssetLoader instance.
   */
  function AssetLoader() {
    AssetLoader.__super__.constructor.apply(this, arguments);
  }
  inherit(AssetLoader, EventDispatcher);

  /**
   * @static
   *
   * Different states of AssetLoader.
   *
   * @type {Enum}
   */
  AssetLoader.STATE = {
    IDLE: 0,
    IN_PROGRESS: 1,
    COMPLETED: 2,
    FAILED: 3,
    ABORTED: 4
  };

  /**
   * @static
   *
   * Different supported asset types of AssetLoader.
   *
   * @type {Object}
   */
  AssetLoader.TYPE = {
    IMAGE: 'image',
    VIDEO: 'video',
    AUDIO: 'audio'
  };

  /**
   * Initializes this AssetLoader instance and begins loading assets in the
   * queue.
   */
  AssetLoader.prototype.init = function() {
    if (this.queue.length < 1) return;

    log('[AssetLoader]::init()');

    var arrlen = this.queue.length;

    this._xhrs = [];
    this._pending = arrlen;

    for (var i = 0; i < arrlen; i++) {
      var target = this.queue[i];

      log('[AssetLoader]::Started loading: ' + target.path);

      var xhr = this.getXHR({
        id: i,
        path: target.path,
        type: target.type
      });
      xhr.send();

      this._xhrs.push(xhr);
    }


  };

  /**
   * Destroys this AssetLoader instance and resets its state to idle for
   * recyclable use.
   */
  AssetLoader.prototype.destroy = function() {
    if (this._xhrs) {
      var arrlen = this._xhrs.length;

      for (var i = 0; i < arrlen; i++) {
        var xhr = this._xhrs[i];
        xhr.abort();
        this._xhrs[i] = null;
      }

      this._queue = null;
      this._assets = null;
      this._bytesLoaded = null;
      this._bytesTotal = null;
    }

    this._state = AssetLoader.STATE.IDLE;
  };

  /**
   * Adds target loading assets to the queue. Assumes each parameter is as
   * follows:
   * Object {
   *  {String} path  Path of asset.
   *  {String} type  Type of asset (can only be 'image', 'video', or
   *                 'audio').
   * }
   */
  AssetLoader.prototype.enqueue = function() {
    assert(arguments && arguments.length > 0, 'There are no arguments specified.');
    assert(this.state !== AssetLoader.STATE.IN_PROGRESS, 'Enqueueing is prohibited when the state is in progress.');

    if (!arguments) return;
    if (arguments.length <= 0) return;
    if (this.state === AssetLoader.STATE.IN_PROGRESS) return;

    log('[AssetLoader]::enqueue(' + arguments + ')');

    var arrlen = arguments.length;

    for (var i = 0; i < arrlen; i++) {
      var arg = arguments[i];

      assert(typeof arg === 'string' || typeof arg === 'object', 'Each item to be enqueued must be a string of the target path or an object containing a "path" key and/or a "type" key');
      assert(typeof arg === 'string' || typeof arg.path === 'string', 'Invalid path specified: ' + arg.path + '.');

      var path = (typeof arg === 'string') ? arg : arg.path;
      var type = arg.type;

      if (!type) {
        var ext = path.split('.').pop().toLowerCase();

        if (IMAGE_EXTENSIONS.indexOf(ext) > -1) {
          type = AssetLoader.TYPE.IMAGE;
        } else if (VIDEO_EXTENSIONS.indexOf(ext) > -1) {
          type = AssetLoader.TYPE.VIDEO;
        } else if (AUDIO_EXTENSIONS.indexOf(ext) > -1) {
          type = AssetLoader.TYPE.AUDIO;
        } else {
          throw '[AssetLoader]::Unsupported asset format: ' + path;
        }
      }

      if (type) {
        this.queue.push({
          path: path,
          type: type
        });

        if (!this._bytesLoaded) this._bytesLoaded = [];
        if (!this._bytesTotal) this._bytesTotal = [];

        this._bytesLoaded.push(0.0);
        this._bytesTotal.push(0.0);
      }
    }
  };

  /**
   * Removes loading targets from the queue. Each parameter is a path that
   * must match one that is already in the queue.
   */
  AssetLoader.prototype.dequeue = function() {
    assert(arguments && arguments.length > 0, 'There are no arguments specified.');
    assert(this.state !== AssetLoader.STATE.IN_PROGRESS, 'Dequeueing is prohibited when the state is in progress.');

    if (!arguments) return;
    if (arguments.length <= 0) return;
    if (this.state === AssetLoader.STATE.IN_PROGRESS) return;

    var arrlen = arguments.length;

    for (var i = 0; i < arrlen; i++) {
      var arg = arguments[i];

      assert(typeof arg === 'string', 'Expecting path to be a string.');

      var n = this.queue.length;

      for (var j = 0; j < n; j++) {
        var target = this.queue[j];

        if (target.path === arg) {
          this.queue.splice(j, 1);
          this.bytesLoaded.splice(j, 1);
          this.bytesTotal.splice(j, 1);

          break;
        }
      }
    }
  };

  /**
   * Creates and returns a new XHR instance with prepopulated configurations.
   *
   * @param {Object} data
   *
   * @return {Object} XHR instance.
   */
  AssetLoader.prototype.getXHR = function(data) {
    var ext = data.path.split('.').pop().toLowerCase();
    var mimeType = MIME_TYPES[data.type.toUpperCase()][ext];

    if (!mimeType) {
      throw '[AssetLoader]:: Unsupported asset format: ' + data.path;
    }

    var xhr = new XMLHttpRequest();
    xhr.addEventListener('progress', this._onXHRProgress.bind(this), false);
    xhr.addEventListener('load', this._onXHRLoadComplete.bind(this), false);
    xhr.addEventListener('error', this._onXHRLoadError.bind(this), false);
    xhr.addEventListener('abort', this._onXHRAbort.bind(this), false);

    xhr.open('GET', data.path, this.async);
    if (xhr.overrideMimeType) xhr.overrideMimeType(mimeType);
    xhr.data = data;

    return xhr;
  };

  /**
   * @private
   *
   * Handler invoked when an XHR instance is in progress.
   *
   * @param {Object} event
   */
  AssetLoader.prototype._onXHRProgress = function(event) {
    if (!event.lengthComputable) return;

    var xhr = event.currentTarget;
    var id = xhr.data.id;
    var path = xhr.data.path;
    var type = xhr.data.type;
    var bytesLoaded = event.loaded;
    var bytesTotal = event.total;

    // Hash progress into XHR data.
    xhr.data.bytesLoaded = bytesLoaded;
    xhr.data.bytesTotal = bytesTotal;

    this._bytesLoaded[id] = bytesLoaded;
    this._bytesTotal[id] = bytesTotal;

    if (!this._bytesLoaded) this._bytesLoaded = [];

    log('[AssetLoader]::_onXHRProgress("' + path + '":' + bytesLoaded + '/' + bytesTotal + ')');

    var progressEvent = document.createEvent('CustomEvent');
    progressEvent.initCustomEvent(EventType.OBJECT.PROGRESS, true, true, {
      id: id,
      path: path,
      type: type,
      pending: this._pending,
      loaded: this.bytesLoaded,
      total: this.bytesTotal
    });

    this.dispatchEvent(progressEvent);
  };

  /**
   * @private
   *
   * Handler invoked when an XHR instance completes its operation.
   *
   * @param {Object} event
   */
  AssetLoader.prototype._onXHRLoadComplete = function(event) {
    var xhr = event.currentTarget;
    var id = xhr.data.id;
    var path = xhr.data.path;
    var type = xhr.data.type;

    log('[AssetLoader]::_onXHRLoadComplete("' + path + '"")');

    this._pending--;

    var loadEvent = document.createEvent('CustomEvent');
    loadEvent.initCustomEvent(EventType.OBJECT.LOAD, true, true, {
      id: id,
      path: path,
      type: type,
      pending: this._pending,
      loaded: this.bytesLoaded,
      total: this.bytesTotal
    });

    this.dispatchEvent(loadEvent);
  };

  /**
   * @private
   *
   * Handler invoked when an XHR instance fails its operation.
   *
   * @param {Object} event
   */
  AssetLoader.prototype._onXHRLoadError = function(event) {
    var xhr = event.currentTarget;
    var id = xhr.data.id;
    var path = xhr.data.path;
    var type = xhr.data.type;

    log('[AssetLoader]::_onXHRLoadError("' + path + '"")');

    this._pending--;

    var errorEvent = document.createEvent('CustomEvent');
    errorEvent.initCustomEvent(EventType.OBJECT.ERROR, true, true, {
      id: id,
      path: path,
      type: type,
      pending: this._pending,
      loaded: this.bytesLoaded,
      total: this.bytesTotal
    });

    this.dispatchEvent(errorEvent);

    if (this._pending === 0) {
      var loadEvent = document.createEvent('CustomEvent');
      loadEvent.initCustomEvent(EventType.OBJECT.LOAD, true, true, {
        id: id,
        path: path,
        type: type,
        pending: this._pending,
        loaded: this.bytesLoaded,
        total: this.bytesTotal
      });

      this.dispatchEvent(loadEvent);
    }
  };

  /**
   * @private
   *
   * Handler invoked when an XHR aborts its operation.
   *
   * @param {Object} event
   */
  AssetLoader.prototype._onXHRAbort = function(event) {
    var xhr = event.currentTarget;
    var id = xhr.data.id;
    var path = xhr.data.path;
    var type = xhr.data.type;

    log('[AssetLoader]::_onXHRLoadError("' + path + '"")');

    this._pending--;

    var abortEvent = document.createEvent('CustomEvent');
    abortEvent.initCustomEvent(EventType.OBJECT.ABORT, true, true, {
      id: id,
      path: path,
      type: type,
      pending: this._pending,
      loaded: this.bytesLoaded,
      total: this.bytesTotal
    });

    this.dispatchEvent(abortEvent);

    if (this._pending === 0) {
      var loadEvent = document.createEvent('CustomEvent');
      loadEvent.initCustomEvent(EventType.OBJECT.LOAD, true, true, {
        id: id,
        path: path,
        type: type,
        pending: this._pending,
        loaded: this.bytesLoaded,
        total: this.bytesTotal
      });

      this.dispatchEvent(loadEvent);
    }
  };

  /**
   * @inheritDoc
   */
  AssetLoader.prototype.__define_properties = function() {
    /**
     * @property
     *
     * Specifies the current state of this AssetLoader instance.
     *
     * @type {Number}
     */
    Object.defineProperty(this, 'state', {
      get: function() {
        if (!this._state) {
          Object.defineProperty(this, '_state', {
            value: AssetLoader.STATE.IDLE,
            writable: true
          });
        }

        return this._state;
      }
    });

    /**
     * @property
     *
     * View of this AssetLoader instance.
     *
     * @type {Object}
     */
    Object.defineProperty(this, 'queue', {
      get: function() {
        if (!this._queue) {
          Object.defineProperty(this, '_queue', {
            value: [],
            writable: true
          });
        }

        return this._queue;
      }
    });

    /**
     * @property
     *
     * Loaded assets.
     *
     * @type {Object}
     */
    Object.defineProperty(this, 'assets', {
      get: function() {
        if (!this._assets) {
          Object.defineProperty(this, '_assets', {
            value: {},
            writable: true
          });
        }

        return this._assets;
      }
    });

    /**
     * @property
     *
     * Specifies whether the XHR operations run in async.
     *
     * @type {Boolean}
     */
    Object.defineProperty(this, 'async', {
      get: function() {
        if (this._async === undefined) {
          return true;
        }
        else {
          return this._async;
        }
      },
      set: function(value) {
        assert(this.state !== AssetLoader.STATE.IN_PROGRESS, 'Cannot change the async mode while it is in progress.');

        if (this.state !== AssetLoader.STATE.IN_PROGRESS) {
          Object.defineProperty(this, '_async', {
            value: value,
            writable: true
          });
        }
      }
    });

    /**
     * @property
     *
     * Specifies the total bytes loaded for all assets in the queue.
     *
     * @type {Number}
     */
    Object.defineProperty(this, 'bytesLoaded', {
      get: function() {
        if (!this._bytesLoaded) {
          return 0.0;
        }
        else {
          var total = 0;
          var arrlen = this._bytesLoaded.length;

          for (var i = 0; i < arrlen; i++) {
            total += this._bytesLoaded[i];
          }

          return total;
        }
      }
    });

    /**
     * @property
     *
     * Specifies the total bytes for all assets in the queue.
     *
     * @type {Number}
     */
    Object.defineProperty(this, 'bytesTotal', {
      get: function() {
        if (!this._bytesTotal) {
          return 0.0;
        }
        else {
          var total = 0;
          var arrlen = this._bytesTotal.length;

          for (var i = 0; i < arrlen; i++) {
            total += this._bytesTotal[i];
          }

          return total;
        }
      }
    });

    /**
     * @property
     *
     * Specifies the current progress (in decimals) of the entire operation.
     *
     * @return {Number}
     */
    Object.defineProperty(this, 'progress', {
      get: function() {
        if (!this._bytesTotal || !this._bytesLoaded) return 0.0;
        if (this._bytesTotal.length !== this._bytesLoaded.length) return 0.0;

        var arrlen = this._bytesTotal.length;
        var sum = 0.0;

        for (var i = 0; i < arrlen; i++) {
          var loaded = this._bytesLoaded[i];
          var total = this._bytesTotal[i];

          if (total > 0.0) {
            sum += loaded / total;
          }
        }

        return sum / arrlen;
      }
    });

    AssetLoader.__super__.__define_properties.call(this);
  };

  return AssetLoader;
});

/**
 * Requiem
 * (c) VARIANTE (http://variante.io)
 *
 * This software is released under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Module of methods/classes related to networking.
 *
 * @type {Module}
 */



define('net', [
  'net/AssetLoader'
], function(
  AssetLoader
) {
  var api = {};

  Object.defineProperty(api, 'AssetLoader', { value: AssetLoader, writable: false, enumerable: true });

  return api;
});

/**
 * Requiem
 * (c) VARIANTE (http://variante.io)
 *
 * This software is released under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Universal keyboard key codes.
 *
 * @type {Object}
 */



define('types/KeyCode',{
  BACKSPACE:     8,
  TAB:           9,
  ENTER:         13,
  SHIFT:         16,
  CTRL:          17,
  ALT:           18,
  PAUSE_BREAK:   19,
  CAPS_LOCK:     20,
  ESCAPE:        27,
  PAGE_UP:       33,
  PAGE_DOWN:     34,
  END:           35,
  HOME:          36,
  LEFT_ARROW:    37,
  UP_ARROW:      38,
  RIGHT_ARROW:   39,
  DOWN_ARROW:    40,
  INSERT:        45,
  DELETE:        46,
  ZERO:          48,
  ONE:           49,
  TWO:           50,
  THREE:         51,
  FOUR:          52,
  FIVE:          53,
  SIX:           54,
  SEVEN:         55,
  EIGHT:         56,
  NINE:          57,
  A:             65,
  B:             66,
  C:             67,
  D:             68,
  E:             69,
  F:             70,
  G:             71,
  H:             72,
  I:             73,
  J:             74,
  K:             75,
  L:             76,
  M:             77,
  N:             78,
  O:             79,
  P:             80,
  Q:             81,
  R:             82,
  S:             83,
  T:             84,
  U:             85,
  V:             86,
  W:             87,
  X:             88,
  Y:             89,
  Z:             90,
  LEFT_CMD:      91,
  RIGHT_CMD:     92,
  SELECT:        93,
  NUMPAD_ZERO:   96,
  NUMPAD_ONE:    97,
  NUMPAD_TWO:    98,
  NUMPAD_THREE:  99,
  NUMPAD_FOUR:   100,
  NUMPAD_FIVE:   101,
  NUMPAD_SIX:    102,
  NUMPAD_SEVEN:  103,
  NUMPAD_EIGHT:  104,
  NUMPAD_NINE:   105,
  MULTIPLY:      106,
  ADD:           107,
  SUBTRACT:      109,
  DECIMAL:       110,
  DIVIDE:        111,
  F1:            112,
  F2:            113,
  F3:            114,
  F4:            115,
  F5:            116,
  F6:            117,
  F7:            118,
  F8:            119,
  F9:            120,
  F10:           121,
  F11:           122,
  F12:           123,
  NUM_LOCK:      144,
  SCROLL_LOCK:   145,
  SEMI_COLON:    186,
  EQUAL:         187,
  COMMA:         188,
  DASH:          189,
  PERIOD:        190,
  FORWARD_SLASH: 191,
  GRAVE_ACCENT:  192,
  OPEN_BRACKET:  219,
  BACK_SLASH:    220,
  CLOSE_BRACKET: 221,
  SINGLE_QUOTE:  222
});

/**
 * Requiem
 * (c) VARIANTE (http://variante.io)
 *
 * This software is released under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Module of global Requiem data types/definitions.
 *
 * @type {Module}
 */



define('types', [
  'types/Directives',
  'types/DirtyType',
  'types/EventType',
  'types/KeyCode',
  'types/NodeState'
], function(
  Directives,
  DirtyType,
  EventType,
  KeyCode,
  NodeState
) {
  var api = {};

  Object.defineProperty(api, 'Directives', { value: Directives, writable: false, enumerable: true });
  Object.defineProperty(api, 'DirtyType', { value: DirtyType, writable: false, enumerable: true });
  Object.defineProperty(api, 'EventType', { value: EventType, writable: false, enumerable: true });
  Object.defineProperty(api, 'KeyCode', { value: KeyCode, writable: false, enumerable: true });
  Object.defineProperty(api, 'NodeState', { value: NodeState, writable: false, enumerable: true });

  return api;
});

/**
 * Requiem
 * (c) VARIANTE (http://variante.io)
 *
 * This software is released under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Module of methods/classes related to UI elements.
 *
 * @type {Module}
 */



define('ui', [
  'ui/Element',
  'ui/ElementUpdateDelegate',
  'ui/Video'
], function(
  Element,
  ElementUpdateDelegate,
  Video
) {
  var api = {};

  Object.defineProperty(api, 'Element', { value: Element, writable: false, enumerable: true });
  Object.defineProperty(api, 'ElementUpdateDelegate', { value: ElementUpdateDelegate, writable: false, enumerable: true });
  Object.defineProperty(api, 'Video', { value: Video, writable: false, enumerable: true });

  return api;
});

/**
 * Requiem
 * (c) VARIANTE (http://variante.io)
 *
 * This software is released under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 *
 * @type {Function}
 */



define('utils/getClassIndex',[
  'helpers/assert',
  'ui/Element'
], function(
  assert,
  Element
) {
  /**
   * Gets the index of a specified class in a DOM element,
   *
   * @param {Object} element    HTMLElement, Requiem Element, or jQuery object.
   * @param {String} className
   *
   * @return {Number} Index of given class name. -1 if not found.
   */
  function getClassIndex(element, className) {
    if (!assert((element) && ((element instanceof HTMLElement) || (element instanceof Element) || (element.jquery)), 'Invalid element specified. Element must be an instance of HTMLElement or Element.')) return null;
    if (element instanceof Element) element = element.element;
    if (element.jquery) element = element.get(0);

    if (!assert(className && (typeof className === 'string'), 'Invalid class name: ' + className)) return -1;

    var classList = element.className.split(' ');

    return classList.indexOf(className);
  }

  return getClassIndex;
});

/**
 * Requiem
 * (c) VARIANTE (http://variante.io)
 *
 * This software is released under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 *
 * @type {Function}
 */



define('utils/hasClass',[
  'helpers/assert',
  'helpers/toElementArray',
  'ui/Element',
  'utils/getClassIndex',
], function(
  assert,
  toElementArray,
  Element,
  getClassIndex
) {
  /**
   * Verifies that the specified element(s) has the specified class.
   *
   * @param {*}      element    HTMLElement, Requiem Element, or jQuery object.
   * @param {String} className
   *
   * @return {Boolean} True if element(s) has given class, false otherwise.
   */
  function hasClass(element, className) {
    if (!assert(className && (typeof className === 'string'), 'Invalid class name: ' + className)) return false;

    var elements = toElementArray(element);
    var n = elements.length;

    for (var i = 0; i < n; i++) {
      var e = elements[i];
      if (getClassIndex(e, className) < 0) return false;
    }

    return true;
  }

  return hasClass;
});

/**
 * Requiem
 * (c) VARIANTE (http://variante.io)
 *
 * This software is released under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 *
 * @type {Function}
 */



define('utils/addClass',[
  'helpers/assert',
  'helpers/toElementArray',
  'utils/hasClass'
], function(
  assert,
  toElementArray,
  hasClass
) {
  /**
   * Adds a class(es) to DOM element(s).
   *
   * @param {Object/Array} element    HTMLElement, Requiem Element, or jQuery
   *                                 object.
   * @param {String/Array} className
   */
  function addClass(element, className) {
    var elements = toElementArray(element);
    var classes = [];
    var n = elements.length;

    if (!assert((typeof className === 'string') || (className instanceof Array), 'Invalid class name specified. Must be either a string or an array of strings.')) return;

    if (typeof className === 'string') {
      classes.push(className);
    }
    else {
      classes = className;
    }

    var nClasses = classes.length;

    for (var i = 0; i < n; i++) {
      var e = elements[i];

      for (var j = 0; j < nClasses; j++) {
        var c = classes[j];

        if (!assert(typeof c === 'string', 'Invalid class detected: ' + c)) continue;
        if (hasClass(e, c)) continue;

        e.className = e.className + ((e.className === '') ? '' : ' ') + c;
      }
    }
  }

  return addClass;
});

/**
 * Requiem
 * (c) VARIANTE (http://variante.io)
 *
 * This software is released under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 *
 * @type {Function}
 */



define('utils/getElementState',[
  'helpers/assert',
  'types/Directives',
  'ui/Element'
], function(
  assert,
  Directives,
  Element
) {
  /**
   * Gets the state of a DOM element, assumes that state classes are prefixed
   * with 'state-'.
   *
   * @param {Object} element  HTMLElement, Requiem Element, or jQuery object.
   *
   * @return {String} State of the given element ('state-' prefix is omitted).
   */
  function getElementState(element) {
    if (!assert((element) && ((element instanceof HTMLElement) || (element instanceof Element) || (element.jquery)), 'Invalid element specified.')) return null;

    if (element.jquery) element = element.get(0);

    var s;

    if (element instanceof Element) {
      s = element.state;
    }
    else {
      s = element.getAttribute(Directives.State) || element.getAttribute('data-' + Directives.State);
    }

    if (!s || s === '') {
      return null;
    }
    else {
      return s;
    }
  }

  return getElementState;
}
);

/**
 * Requiem
 * (c) VARIANTE (http://variante.io)
 *
 * This software is released under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 *
 * @type {Function}
 */



define('utils/changeElementState',[
  'helpers/assert',
  'helpers/toElementArray',
  'types/Directives',
  'ui/Element',
  'utils/getElementState'
], function(
  assert,
  toElementArray,
  Directives,
  Element,
  getElementState
) {
  /**
   * Changes the state of DOM element(s), assumes that state classes are
   * prefixed with 'state-'.
   *
   * @param {*}      element  HTMLElement, Requiem Element, or jQuery object.
   * @param {String} state
   */
  function changeElementState(element, state) {
    var elements = toElementArray(element, true);
    var n = elements.length;

    for (var i = 0; i < n; i++) {
      var e = elements[i];

      if (getElementState(e) === state) continue;

      if (e instanceof Element) {
        e.state = state;
      }
      else {
        e.setAttribute('data-' + Directives.State, state);
      }
    }
  }

  return changeElementState;
});

/**
 * Requiem
 * (c) VARIANTE (http://variante.io)
 *
 * This software is released under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 *
 * @type {Function}
 */



define('utils/getViewportRect',[
  'helpers/assert'
], function(
  assert
) {
  /**
   * Gets the rect of the viewport (FOV).
   *
   * @return {Object} Object containing top, left, bottom, right, width,
   *                 height.
   */
  function getViewportRect() {
    if (!assert(window && document, 'Window or document undefined.')) return null;

    var rect = {};

    rect.width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
    rect.height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    rect.top = (window.pageYOffset !== undefined) ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
    rect.left = (window.pageXOffset !== undefined) ? window.pageXOffset : (document.documentElement || document.body.parentNode || document.body).scrollLeft;
    rect.bottom = rect.top + rect.height;
    rect.right = rect.left + rect.width;

    return rect;
  }

  return getViewportRect;
});

/**
 * Requiem
 * (c) VARIANTE (http://variante.io)
 *
 * This software is released under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 *
 * @type {Function}
 */



define('utils/getRect',[
  'helpers/assert',
  'helpers/toElementArray',
  'ui/Element',
  'utils/getViewportRect'
], function(
  assert,
  toElementArray,
  Element,
  getViewportRect
) {
  /**
   * Gets the rect of a given element or the overall rect of an array of
   * elements.
   *
   * @param {*}      element    HTMLElement, Requiem Element, or jQuery object.
   * @param {Object} reference  The reference FOV, defaults to window.
   *
   * @return {Object} Object containing top, left, bottom, right, width,
   *                 height.
   */
  function getRect(element, reference) {
    if (!assert(window, 'This method relies on the window object, which is undefined.')) return null;
    if (element === window) return getViewportRect();

    if (!reference) reference = window;

    var elements = toElementArray(element);
    var n = elements.length;

    if (n <= 0) return null;

    var refRect = getRect(reference);

    if (!assert(refRect, 'Cannot determine reference FOV.')) return null;

    var winRect = getRect(window);
    var rect = {};

    for (var i = 0; i < n; i++) {
      var e = elements[i];
      var c = e.getBoundingClientRect();

      var w = c.width;
      var h = c.height;
      var t = c.top + winRect.top;
      if (reference !== window) t -= refRect.top;
      var l = c.left + winRect.left;
      if (reference !== window) l -= refRect.left;
      var b = t + h;
      var r = l + w;

      if (rect.left === undefined) {
        rect.left = l;
      }
      else {
        rect.left = Math.min(rect.left, l);
      }

      if (rect.right === undefined) {
        rect.right = r;
      }
      else {
        rect.right = Math.max(rect.right, r);
      }

      if (rect.top === undefined) {
        rect.top = t;
      }
      else {
        rect.top = Math.min(rect.top, t);
      }

      if (rect.bottom === undefined) {
        rect.bottom = b;
      }
      else {
        rect.bottom = Math.max(rect.bottom, b);
      }
    }

    rect.width = rect.right - rect.left;
    rect.height = rect.bottom - rect.top;

    return rect;
  }

  return getRect;
});

/**
 * Requiem
 * (c) VARIANTE (http://variante.io)
 *
 * This software is released under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 *
 * @type {Function}
 */



define('utils/getIntersectRect',[
  'helpers/assert',
  'ui/Element',
  'utils/getRect'
], function(
  assert,
  Element,
  getRect
) {
  /**
   * Computes the intersecting rect of 2 given elements. If only 1 element is
   * specified, the other element will default to the current viewport.
   *
   * @param {*} ...args  HTMLElement, Requiem Element, or jQuery object.
   *
   * @return {Object} Object containing width, height.
   */
  function getIntersectRect() {
    if (!assert(window, 'This method relies on the window object, which is undefined.')) return null;

    var n = arguments.length;

    if (!assert(n > 0, 'This method requires at least 1 argument specified.')) return null;

    var rect = {};
    var currRect, nextRect;

    for (var i = 0; i < n; i++) {
      if (!currRect) currRect = getRect(arguments[i]);

      if (!assert(currRect, 'Invalid computed rect.')) return null;

      if (i === 0 && ((i + 1) === n)) {
        nextRect = getRect(window);
      }
      else if ((i + 1) < n) {
        nextRect = getRect(arguments[i + 1]);
      }
      else {
        break;
      }

      if (!assert(nextRect, 'Invalid computed rect.')) return null;

      rect.width = Math.max(0.0, Math.min(currRect.right, nextRect.right) - Math.max(currRect.left, nextRect.left));
      rect.height = Math.max(0.0, Math.min(currRect.bottom, nextRect.bottom) - Math.max(currRect.top, nextRect.top));
      rect.top = Math.max(currRect.top, nextRect.top);
      rect.left = Math.max(currRect.left, nextRect.left);
      rect.bottom = rect.top + rect.height;
      rect.right = rect.left + rect.width;

      if (rect.width * rect.height === 0) {
        rect.width = 0;
        rect.height = 0;
        rect.top = 0;
        rect.left = 0;
        rect.bottom = 0;
        rect.right = 0;
      }

      currRect = rect;
    }

    return rect;
  }

  return getIntersectRect;
});

/**
 * Requiem
 * (c) VARIANTE (http://variante.io)
 *
 * This software is released under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 *
 * @type {Function}
 */



define('utils/hitTestElement',[
  'helpers/assert',
  'helpers/toElementArray',
  'utils/getIntersectRect',
  'utils/getRect'
], function(
  assert,
  toElementArray,
  getIntersectRect,
  getRect
) {
  /**
   * Hit tests a vector or element against other elements.
   *
   * @param {Object/Array}  Vector ({ x, y }), HTMLElement, Requiem Element, or
   *                       jQuery object.
   * @param {Object/Array}  HTMLElement, Requiem Element, or jQuery object.
   *
   * @return {Boolean} True if test passes, false otherwise.
   */
  function hitTestElement() {
    if (!assert(arguments.length > 1, 'Insufficient arguments. Expecting at least 2.')) return false;

    var args = Array.prototype.slice.call(arguments);
    var isVector = (typeof args[0] === 'object') && args[0].hasOwnProperty('x') && args[0].hasOwnProperty('y');

    if (isVector) {
      var vector = args.shift();
      var n = args.length;
      var pass = false;

      for (var i = 0; i < n; i++) {
        var rect = getRect(args[i]);
        var clampedX = ((vector.x >= rect.left) && (vector.x <= rect.right));
        var clampedY = ((vector.y >= rect.top) && (vector.x <= rect.bottom));

        if (clampedX && clampedY) {
          pass = true;
        }
      }

      return pass;
    }
    else {
      var intersectRect = getIntersectRect.apply(null, arguments);

      if (!assert(intersectRect, 'Invalid elements specified.')) return false;

      return (intersectRect.width * intersectRect.height !== 0);
    }
  }

  return hitTestElement;
});

/**
 * Requiem
 * (c) VARIANTE (http://variante.io)
 *
 * This software is released under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 *
 * @type {Function}
 */



define('utils/hitTestRect',[
  'helpers/assert',
  'helpers/toElementArray',
  'utils/getIntersectRect',
  'utils/getRect'
], function(
  assert,
  toElementArray,
  getIntersectRect,
  getRect
) {
  /**
   * Hit tests a vector or element against other elements.
   *
   * @param {Object/Array}  Vector ({ x, y }), HTMLElement, Requiem Element, or
   *                       jQuery object.
   * @param {Object/Array}  HTMLElement, Requiem Element, or jQuery object.
   *
   * @return {Boolean} True if test passes, false otherwise.
   */
  function hitTestRect() {
    if (!assert(arguments.length > 1, 'Insufficient arguments. Expecting at least 2.')) return false;

    var args = Array.prototype.slice.call(arguments);
    var isVector = (typeof args[0] === 'object') && args[0].hasOwnProperty('x') && args[0].hasOwnProperty('y');

    if (isVector) {
      var vector = args.shift();
      var n = args.length;
      var pass = false;

      for (var i = 0; i < n; i++) {
        var rect = args[i];

        if (!assert(rect.top !== undefined && !isNaN(rect.top) && rect.right !== undefined && !isNaN(rect.right) && rect.bottom !== undefined && !isNaN(rect.bottom) && rect.left !== undefined && !isNaN(rect.left), 'Invalid rect supplied. Rect must be an object containing "top", "right", "bottom", and "left" key values.')) return false;

        var clampedX = ((vector.x >= rect.left) && (vector.x <= rect.right));
        var clampedY = ((vector.y >= rect.top) && (vector.x <= rect.bottom));

        if (clampedX && clampedY) {
          pass = true;
        }
      }

      return pass;
    }
    else {
      var intersectRect = getIntersectRect.apply(null, arguments);

      if (!assert(intersectRect, 'Invalid elements specified.')) return false;

      return (intersectRect.width * intersectRect.height !== 0);
    }
  }

  return hitTestRect;
});

/**
 * Requiem
 * (c) VARIANTE (http://variante.io)
 *
 * This software is released under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 *
 * @type {Function}
 */



define('utils/removeClass',[
  'helpers/assert',
  'helpers/toElementArray'
], function(
  assert,
  toElementArray
) {
  /**
   * Removes a class(es) from DOM element(s).
   *
   * @param {Object/Array} element    HTMLElement, Requiem Element, or jQuery
   *                                 object.
   * @param {String/Array} className
   */
  function removeClass(element, className) {
    var elements = toElementArray(element);
    var classes = [];
    var n = elements.length;

    if (!assert((typeof className === 'string') || (className instanceof Array), 'Invalid class name specified. Must be either a string or an array of strings.')) return;

    if (typeof className === 'string') {
      classes.push(className);
    }
    else {
      classes = className;
    }

    var nClasses = classes.length;

    for (var i = 0; i < n; i++) {
      var e = elements[i];

      for (var j = 0; j < nClasses; j++) {
        var c = classes[j];

        if (!assert(typeof c === 'string', 'Invalid class detected: ' + c)) continue;

        var regex = new RegExp('^' + c + '\\s+|\\s+' + c, 'g');
        e.className = e.className.replace(regex, '');
      }
    }
  }

  return removeClass;
});

/**
 * Requiem
 * (c) VARIANTE (http://variante.io)
 *
 * This software is released under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 *
 * @type {Function}
 */



define('utils/transform',[
  'helpers/assert',
  'helpers/toElementArray',
  'utils/getRect'
], function(
  assert,
  toElementArray,
  getRect
) {
  /**
   * Transforms a DOM element.
   *
   * @param {*}      element      HTMLElement, Requiem Element, or jQuery object.
   *                             Array of the above is also accepted.
   * @param {Object} properties   Transformation properties: {
   *                               {Number} width           Target width of
   *                                                        the element
   *                             	{Number} height          Target height of
   *                                                        the element
   *                               {String} unit:px         Unit of width/
   *                                                        height values
   *                               {String} type:'default'  Resizing
   *                                                        constraint:
   *                                                        'default',
   *                                                        'contain',
   *                                                        'cover'
   *                             }
   *                             (if unspecified, all transformation styles
   *                             will be reset to 'initial')
   * @param {Object} constraints  Transformation constraints: {
   *                               {Number} width   Bounded width of the
   *                                                element.
   *                               {Number} height  Bounded height of the
   *                                                element.
   *                             }
   *
   * @return {Object} Transformed properties.
   */
  function transform(element, properties, constraints) {
    var elements = toElementArray(element);
    var n = elements.length;

    if (properties) {
      if (!assert((properties.width === undefined) || !isNaN(properties.width), 'Width property must be a number.')) return null;
      if (!assert((properties.height === undefined) || !isNaN(properties.height), 'Height property must be a number.')) return null;
      if (!assert((properties.aspectRatio === undefined) || !isNaN(properties.aspectRatio), 'Aspect ratio property must be a number.')) return null;

      var rect = getRect(element);
      var units = properties.units || 'px';
      var aspectRatio = (properties.aspectRatio !== undefined) ? Number(properties.aspectRatio) : rect.width / rect.height;
      var maxW = properties.width;
      var maxH = properties.height;
      var minW = properties.width;
      var minH = properties.height;
      var type = properties.type || 'default';

      if (constraints && type !== 'default') {
        assert((constraints.width === undefined) || !isNaN(constraints.width), 'Width constraint must be a number.');
        assert((constraints.height === undefined) || !isNaN(constraints.height), 'Height constraint must be a number.');

        if (type && type === 'cover') {
          if (constraints.width !== undefined) minW = Math.min(constraints.width, minW);
          if (constraints.width !== undefined) minH = Math.min(constraints.height, minH);
        }
        else {
          if (constraints.width !== undefined) maxW = Math.min(constraints.width, maxW);
          if (constraints.height !== undefined) maxH = Math.min(constraints.height, maxH);
        }
      }

      var w, h;

      if (type === 'contain') {
        w = (maxW > maxH) ? maxH * aspectRatio : maxW;
        h = (maxW > maxH) ? maxH : maxW / aspectRatio;

        if (w > maxW) {
          w = maxW;
          h = w / aspectRatio;
        }
        else if (h > maxH) {
          h = maxH;
          w = h * aspectRatio;
        }
      }
      else if (type === 'cover') {
        w = (minW > minH) ? minH * aspectRatio : minW;
        h = (minW > minH) ? minH : minW / aspectRatio;

        if (w < minW) {
          w = minW;
          h = w / aspectRatio;
        }
        else if (h < minH) {
          h = minH;
          w = h * aspectRatio;
        }
      }
      else {
        w = maxW;
        h = maxH;
      }

      for (var i = 0; i < n; i++) {
        var e = elements[i];

        if (properties.width !== undefined) e.style.width = String(w) + units;
        if (properties.height !== undefined) e.style.height = String(h) + units;
      }

      var t = {};

      if (properties.width !== undefined) t.width = w;
      if (properties.height !== undefined) t.height = h;

      return t;
    }
    else {
      for (var j = 0; j < n; j++) {
        elements[j].style.width = 'initial';
        elements[j].style.height = 'initial';
      }

      return {
        width: 'initial',
        height: 'initial'
      };
    }
  }

  return transform;
});

/**
 * Requiem
 * (c) VARIANTE (http://variante.io)
 *
 * This software is released under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 *
 * @type {Function}
 */



define('utils/translate',[
  'helpers/assert',
  'helpers/toElementArray'
], function(
  assert,
  toElementArray
) {
  /**
   * Translates a DOM element.
   *
   * @param {*} element           HTMLElement, Requiem Element, or jQuery object.
   *                             An array of the above is also accepted.
   * @param {Object} properties   Translation properties: {
   *                               {Number} top         Top translation value
   *                               {Number} right       Right translation value
   *                               {Number} bottom      Bottom translation value
   *                               {Number} left        Left translation value
   *                               {String} units:'px'  Unit of translation value
   *                             }
   *                             (if unspecified, all translation values will
   *                             be reset to 'initial')
   * @param {Object} constraints  Translation constraints: {
   *                               {Number} top     Bounded top translation value
   *                               {Number} right   Bounded right translation value
   *                               {Number} bottom  Bounded bottom translation value
   *                               {Number} left    Bounded left translation value
   *                             }
   *
   * @return {Object} Translated properties.
   */
  function translate(element, properties, constraints) {
    var elements = toElementArray(element);
    var n = elements.length;

    if (properties) {
      if (!assert((properties.top === undefined) || !isNaN(properties.top), 'Top property must be a number.')) return null;
      if (!assert((properties.right === undefined) || !isNaN(properties.right), 'Right property must be a number.')) return null;
      if (!assert((properties.bottom === undefined) || !isNaN(properties.bottom), 'Bottom property must be a number.')) return null;
      if (!assert((properties.left === undefined) || !isNaN(properties.left), 'Left property must be a number.')) return null;

      var units = properties.units || 'px';

      if (constraints) {
        if (!assert((constraints.top === undefined) || !isNaN(constraints.top), 'Top constraint must be a number.')) return null;
        if (!assert((constraints.right === undefined) || !isNaN(constraints.right), 'Right constraint must be a number.')) return null;
        if (!assert((constraints.bottom === undefined) || !isNaN(constraints.bottom), 'Bottom constraint must be a number.')) return null;
        if (!assert((constraints.left === undefined) || !isNaN(constraints.left), 'Left constraint must be a number.')) return null;
      }

      var top = (constraints && (constraints.top !== undefined)) ? Math.min(properties.top, constraints.top) : properties.top;
      var right = (constraints && (constraints.right !== undefined)) ? Math.min(properties.right, constraints.right) : properties.right;
      var bottom = (constraints && (constraints.bottom !== undefined)) ? Math.min(properties.bottom, constraints.bottom) : properties.bottom;
      var left = (constraints && (constraints.left !== undefined)) ? Math.min(properties.left, constraints.left) : properties.left;

      for (var i = 0; i < n; i++) {
        if (properties.top !== undefined) elements[i].style.top = String(top) + units;
        if (properties.right !== undefined) elements[i].style.right = String(right) + units;
        if (properties.bottom !== undefined) elements[i].style.bottom = String(bottom) + units;
        if (properties.left !== undefined) elements[i].style.left = String(left) + units;
      }

      var t = {};

      if (properties.top !== undefined) t.top = top;
      if (properties.right !== undefined) t.right = right;
      if (properties.bottom !== undefined) t.bottom = bottom;
      if (properties.left !== undefined) t.left = left;

      return t;
    }
    else {
      for (var j = 0; j < n; j++) {
        elements[j].style.top = 'initial';
        elements[j].style.right = 'initial';
        elements[j].style.bottom = 'initial';
        elements[j].style.left = 'initial';
      }

      return {
        top: 'initial',
        right: 'initial',
        bottom: 'initial',
        left: 'initial'
      };
    }
  }

  return translate;
});

/**
 * Requiem
 * (c) VARIANTE (http://variante.io)
 *
 * This software is released under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 *
 * @type {Function}
 */



define('utils/translate3d',[
  'helpers/assert',
  'helpers/toElementArray'
], function(
  assert,
  toElementArray
) {
  /**
   * Translates a DOM element.
   *
   * @param {*} element           HTMLElement, Requiem Element, or jQuery object.
   *                             An array of the above is also accepted.
   * @param {Object} properties   Translation properties: {
   *                               {Number} x           X-coordinate
   *                               {Number} y           Y-coordinate
   *                               {Number} z           Z-coordinate
   *                               {String} units:'px'  Unit of translations
   *                             }
   *                             (if unspecified, all translation coordinates
   *                             will be reset to 0)
   * @param {Object} constraints  Translation constraints: {
   *                               {Number} x  Bounded x-coordinate
   *                               {Number} y  Bounded y-coordinate
   *                               {Number} z  Bounded z-coordinate
   *                             }
   *
   * @return {Object} Translated properties.
   */
  function translate3d(element, properties, constraints) {
    var elements = toElementArray(element);
    var n = elements.length;

    if (properties) {
      if (!assert(properties.x === undefined || !isNaN(properties.x), 'X property must be a number.')) return null;
      if (!assert(properties.y === undefined || !isNaN(properties.y), 'Y property must be a number.')) return null;
      if (!assert(properties.z === undefined || !isNaN(properties.z), 'Z property must be a number.')) return null;

      var units = properties.units || 'px';

      if (constraints) {
        if (!assert(constraints.x === undefined || !isNaN(constraints.x), 'X constraint must be a number.')) return null;
        if (!assert(constraints.y === undefined || !isNaN(constraints.y), 'Y constraint must be a number.')) return null;
        if (!assert(constraints.z === undefined || !isNaN(constraints.z), 'Z constraint must be a number.')) return null;
      }

      var x = (constraints && (constraints.x !== undefined)) ? Math.min(properties.x, constraints.x) : properties.x;
      var y = (constraints && (constraints.y !== undefined)) ? Math.min(properties.y, constraints.y) : properties.y;
      var z = (constraints && (constraints.z !== undefined)) ? Math.min(properties.z, constraints.z) : properties.z;

      var translateX = (properties.x !== undefined) ? 'translateX(' + x + units + ')' : null;
      var translateY = (properties.y !== undefined) ? 'translateY(' + y + units + ')' : null;
      var translateZ = (properties.z !== undefined) ? 'translateZ(' + z + units + ')' : null;
      var transforms = '';

      if (translateX) transforms += (transforms === '') ? translateX : ' ' + translateX;
      if (translateY) transforms += (transforms === '') ? translateY : ' ' + translateY;
      if (translateZ) transforms += (transforms === '') ? translateZ : ' ' + translateZ;

      for (var i = 0; i < n; i++) {
        elements[i].style.transform = transforms;
      }

      var t = {};

      if (translateX) t.x = x;
      if (translateY) t.y = y;
      if (translateZ) t.z = z;

      return t;
    }
    else {
      for (var j = 0; j < n; j++) {
        elements[j].style.transform = 'translateX(0) translateY(0) translateZ(0)';
      }

      return {
        x: 0,
        y: 0,
        z: 0
      };
    }
  }

  return translate3d;
});

/**
 * Requiem
 * (c) VARIANTE (http://variante.io)
 *
 * This software is released under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Module of methods related to UI manipulation and
 * operations.
 *
 * @type {Module}
 */



define('utils', [
  'utils/addClass',
  'utils/changeElementState',
  'utils/getClassIndex',
  'utils/getElementState',
  'utils/getIntersectRect',
  'utils/getRect',
  'utils/getViewportRect',
  'utils/hasClass',
  'utils/hasChild',
  'utils/hitTestElement',
  'utils/hitTestRect',
  'utils/removeClass',
  'utils/transform',
  'utils/translate',
  'utils/translate3d'
], function(
  addClass,
  changeElementState,
  getClassIndex,
  getElementState,
  getIntersectRect,
  getRect,
  getViewportRect,
  hasClass,
  hasChild,
  hitTestElement,
  hitTestRect,
  removeClass,
  transform,
  translate,
  translate3d
) {
  var api = {};

  Object.defineProperty(api, 'addClass', { value: addClass, writable: false, enumerable: true });
  Object.defineProperty(api, 'changeElementState', { value: changeElementState, writable: false, enumerable: true });
  Object.defineProperty(api, 'hasClass', { value: hasClass, writable: false, enumerable: true });
  Object.defineProperty(api, 'hasChild', { value: hasChild, writable: false, enumerable: true });
  Object.defineProperty(api, 'getClassIndex', { value: getClassIndex, writable: false, enumerable: true });
  Object.defineProperty(api, 'getElementState', { value: getElementState, writable: false, enumerable: true });
  Object.defineProperty(api, 'getIntersectRect', { value: getIntersectRect, writable: false, enumerable: true });
  Object.defineProperty(api, 'getRect', { value: getRect, writable: false, enumerable: true });
  Object.defineProperty(api, 'getViewportRect', { value: getViewportRect, writable: false, enumerable: true });
  Object.defineProperty(api, 'hitTestElement', { value: hitTestElement, writable: false, enumerable: true });
  Object.defineProperty(api, 'hitTestRect', { value: hitTestRect, writable: false, enumerable: true });
  Object.defineProperty(api, 'removeClass', { value: removeClass, writable: false, enumerable: true });
  Object.defineProperty(api, 'translate', { value: translate, writable: false, enumerable: true });
  Object.defineProperty(api, 'translate3d', { value: translate3d, writable: false, enumerable: true });
  Object.defineProperty(api, 'transform', { value: transform, writable: false, enumerable: true });

  return api;
});

/**
 * Requiem
 * (c) VARIANTE (http://variante.io)
 *
 * This software is released under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Construction of the Requiem API.
 */



define('requiem', [
  'dom',
  'events',
  'net',
  'types',
  'ui',
  'utils'
], function(
  dom,
  events,
  net,
  types,
  ui,
  utils
) {
  var requiem = {};

  Object.defineProperty(requiem, 'name', { value: 'Requiem', writable: false });
  Object.defineProperty(requiem, 'version', { value: '0.4.1', writable: false });

  injectModule('dom', dom);
  injectModule('events', events);
  injectModule('net', net);
  injectModule('types', types);
  injectModule('ui', ui);
  injectModule('utils', utils);

  /**
   * @private
   *
   * Injects a module and all of its sub-modules into the core Requiem module.
   *
   * @param {String} name    Name of the module (used as the key for the
   *                        key-value pair in Requiem).
   * @param {Object} module  Module object (used as value for the key-value
   *                        pair in Requiem).
   */
  function injectModule(name, module) {
    Object.defineProperty(requiem, name, {
      value: module,
      writable: false
    });

    for (var key in module) {
      if (module.hasOwnProperty(key)) {
        Object.defineProperty(requiem, key, {
          value: module[key],
          writable: false
        });
      }
    }
  }

  return requiem;
});

/**
 * Requiem
 * (c) VARIANTE (http://variante.io)
 *
 * This software is released under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 *
 * End file for r.js.
 */
  return require('requiem');
}()));

//# sourceMappingURL=requiem.js.map