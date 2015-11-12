(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["requiem"] = factory();
	else
		root["requiem"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	/*!
	 * Requiem
	 * (c) VARIANTE (http://variante.io)
	 *
	 * This software is released under the MIT License:
	 * http://www.opensource.org/licenses/mit-license.php
	 */

	'use strict';

	var injectModule = __webpack_require__(1);
	var polyfill = __webpack_require__(2);

	/**
	 * @module requiem
	 */
	var requiem = {};

	/**
	 * @property {string} name - Module name.
	 */
	Object.defineProperty(requiem, 'name', { value: 'Requiem', writable: false });

	/**
	 * @property {string} version - Version number.
	 */
	Object.defineProperty(requiem, 'version', { value: '0.15.5', writable: false });

	injectModule(requiem, 'dom', __webpack_require__(3));
	injectModule(requiem, 'events', __webpack_require__(28));
	injectModule(requiem, 'net', __webpack_require__(30));
	injectModule(requiem, 'types', __webpack_require__(32));
	injectModule(requiem, 'ui', __webpack_require__(34));
	injectModule(requiem, 'utils', __webpack_require__(35));

	polyfill();

	module.exports = requiem;

/***/ },
/* 1 */
/***/ function(module, exports) {

	/**
	 * Requiem
	 * (c) VARIANTE (http://variante.io)
	 *
	 * This software is released under the MIT License:
	 * http://www.opensource.org/licenses/mit-license.php
	 */

	'use strict'

	/**
	 * Injects a module and all of its sub-modules into a target module.
	 *
	 * @param {Object} target     - Target module for injecting a module into.
	 * @param {string} moduleName - Name of the module to be injected (used as the
	 *                              key for the key-value pair in target module).
	 * @param {Object} module     - Module object (used as value for the key-value
	 *                              pair in target module).
	 *
	 * @alias module:requiem~helpers.injectModule
	 */
	;
	function injectModule(target, moduleName, module) {
	  Object.defineProperty(target, moduleName, {
	    value: module,
	    writable: false
	  });

	  for (var key in module) {
	    if (module.hasOwnProperty(key)) {
	      Object.defineProperty(target, key, {
	        value: module[key],
	        writable: false
	      });
	    }
	  }
	}

	module.exports = injectModule;

/***/ },
/* 2 */
/***/ function(module, exports) {

	/**
	 * Requiem
	 * (c) VARIANTE (http://variante.io)
	 *
	 * This software is released under the MIT License:
	 * http://www.opensource.org/licenses/mit-license.php
	 */

	'use strict'

	/**
	 * Applies special polyfills to the browser window (i.e. IE happiness).
	 *
	 * @alias module:requiem~helpers.polyfill
	 */
	;
	function polyfill() {
	  if (!window) return;

	  // Create CustomEvent class.
	  function CustomEvent(event, params) {
	    params = params || { bubbles: false, cancelable: false, detail: undefined };
	    var evt = document.createEvent('CustomEvent');
	    evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
	    return evt;
	  }

	  CustomEvent.prototype = window.Event.prototype;

	  window.CustomEvent = CustomEvent;
	}

	module.exports = polyfill;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Requiem
	 * (c) VARIANTE (http://variante.io)
	 *
	 * This software is released under the MIT License:
	 * http://www.opensource.org/licenses/mit-license.php
	 */

	'use strict'

	/**
	 * Collection of DOM manipulation methods.
	 *
	 * @namespace module:requiem~dom
	 */
	;
	var dom = {};

	Object.defineProperty(dom, 'namespace', { value: __webpack_require__(4), writable: false, enumerable: true });
	Object.defineProperty(dom, 'ready', { value: __webpack_require__(8), writable: false, enumerable: true });
	Object.defineProperty(dom, 'sightread', { value: __webpack_require__(9), writable: false, enumerable: true });
	Object.defineProperty(dom, 'createElement', { value: __webpack_require__(27), writable: false, enumerable: true });

	module.exports = dom;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Requiem
	 * (c) VARIANTE (http://variante.io)
	 *
	 * This software is released under the MIT License:
	 * http://www.opensource.org/licenses/mit-license.php
	 */

	'use strict';

	var assertType = __webpack_require__(5);

	/**
	 * Generates a nested namespace in the specified scope, as described by the dot-
	 * notated namespace path.
	 *
	 * @param {string}        [path]            - Namespace path with keywords
	 *                                            separated by dots.
	 * @param {Object|window} [scope=window|{}] - Scope/object to create the nested
	 *                                            namespace in. If browser
	 *                                            environment is detected, this
	 *                                            param will default to window.
	 *                                            Otherwise it will be an empty
	 *                                            object literal.
	 *
	 * @return {Object} The generated namespace.
	 *
	 * @alias module:requiem~dom.namespace
	 */
	function namespace(path, scope) {
	  assertType(path, 'string', true, 'Invalid parameter: path');
	  assertType(scope, 'object', true, 'Invalid optional parameter: scope');

	  if (!scope) scope = window ? window : {};
	  if (path === undefined || path === '') return scope;

	  var groups = path.split('.');
	  var currentScope = scope;

	  for (var i = 0; i < groups.length; i++) {
	    currentScope = currentScope[groups[i]] || (currentScope[groups[i]] = {});
	  }

	  return currentScope;
	}

	module.exports = namespace;

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Requiem
	 * (c) VARIANTE (http://variante.io)
	 *
	 * This software is released under the MIT License:
	 * http://www.opensource.org/licenses/mit-license.php
	 */

	'use strict';

	function _instanceof(left, right) { if (right != null && right[Symbol.hasInstance]) { return right[Symbol.hasInstance](left); } else { return left instanceof right; } }

	var assert = __webpack_require__(6);
	var checkType = __webpack_require__(7);

	/**
	 * Asserts the specified condition and throws a warning if assertion fails.
	 * Internal use only.
	 *
	 * @param {*}            value                  - Value used for the assertion.
	 * @param {String|Class} type                   - Type(s) to evaluate against.
	 *                                                If this is a string, this
	 *                                                method will use 'typeof'
	 *                                                operator. Otherwise
	 *                                                'instanceof' operator will be
	 *                                                used. If this parameter is an
	 *                                                array, all elements in the
	 *                                                array will be evaluated
	 *                                                against.
	 * @param {boolean}      [allowUndefined=false] - Specifies whether assertion
	 *                                                should pass if the supplied
	 *                                                value is undefined.
	 * @param {string}       [message]              - Message to be displayed when
	 *                                                assertion fails.
	 *
	 * @return {boolean} True if assert passed, false otherwise.
	 *
	 * @throws Error if assert fails.
	 *
	 * @alias module:requiem~helpers.assertType
	 */
	function assertType(value, type, allowUndefined, message) {
	  if (!assert(type !== undefined, 'Paremeter \'type\' must be a string or a class')) return;
	  if (!assert(allowUndefined === undefined || typeof allowUndefined === 'boolean', 'Paremeter \'allowUndefined\', if specified, must be a boolean')) return;
	  if (!assert(message === undefined || typeof message === 'string', 'Parameter \'message\', if specified, must be a string')) return;

	  allowUndefined = allowUndefined === undefined ? false : allowUndefined;

	  var ok = false;

	  if (allowUndefined && value === undefined) {
	    ok = true;
	  } else if (_instanceof(type, Array)) {
	    var n = type.length;

	    for (var i = 0; i < n; i++) {
	      if (checkType(value, type[i])) {
	        ok = true;
	        break;
	      }
	    }
	  } else {
	    ok = checkType(value, type);
	  }

	  if (!ok) {
	    throw new Error(message || 'AssertType failed');
	  }

	  return ok;
	}

	module.exports = assertType;

/***/ },
/* 6 */
/***/ function(module, exports) {

	/**
	 * Requiem
	 * (c) VARIANTE (http://variante.io)
	 *
	 * This software is released under the MIT License:
	 * http://www.opensource.org/licenses/mit-license.php
	 */

	'use strict'

	/**
	 * Asserts the specified condition and throws a warning if assertion fails.
	 *
	 * @param {boolean} condition - Condition to validate against.
	 * @param {string}  [message] - Message to be displayed when assertion fails.
	 *
	 * @return {boolean} True if assert passed, false otherwise.
	 *
	 * @throws Error is assert fails.
	 *
	 * @alias module:requiem~helpers.assert
	 */
	;
	function assert(condition, message) {
	  if (!condition) throw new Error(message || 'Assert failed');
	  return condition;
	}

	module.exports = assert;

/***/ },
/* 7 */
/***/ function(module, exports) {

	/**
	 * Requiem
	 * (c) VARIANTE (http://variante.io)
	 *
	 * This software is released under the MIT License:
	 * http://www.opensource.org/licenses/mit-license.php
	 */

	'use strict'

	/**
	 * Verifies that a given is of the given type.
	 *
	 * @param {*} value - Any value.
	 * @param {*} type  - Any class or string that describes a type.
	 *
	 * @return {boolean} True if validation passes, false otherwise.
	 *
	 * @alias module:requiem~helpers.checkType
	 */
	;

	function _instanceof(left, right) { if (right != null && right[Symbol.hasInstance]) { return right[Symbol.hasInstance](left); } else { return left instanceof right; } }

	function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

	function checkType(value, type) {
	  if (typeof type === 'string') {
	    switch (type) {
	      case 'string':
	      case 'object':
	      case 'number':
	      case 'boolean':
	      case 'function':
	        return (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === type;

	      case 'class':
	        return typeof value === 'function';

	      case 'array':
	        return _instanceof(value, Array);

	      default:
	        return false;
	    }
	  } else {
	    return _instanceof(value, type);
	  }
	}

	module.exports = checkType;

/***/ },
/* 8 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Requiem
	 * (c) VARIANTE (http://variante.io)
	 *
	 * This software is released under the MIT License:
	 * http://www.opensource.org/licenses/mit-license.php
	 */

	'use strict';

	var assertType = __webpack_require__(5);

	/**
	 * Invokes a callback when the DOM is ready.
	 *
	 * @param {Function} callback - Function invoked when the DOM is ready.
	 *
	 * @alias module:requiem~dom.ready
	 */
	function ready(callback) {
	  assertType(callback, 'function', false, 'Invalid parameter: callback');

	  if (!document) return null;

	  var onLoaded = function onLoaded(event) {
	    if (document.addEventListener) {
	      document.removeEventListener('DOMContentLoaded', onLoaded, false);
	      window.removeEventListener('load', onLoaded, false);
	    } else if (document.attachEvent) {
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
	  } else if (document.attachEvent) {
	    document.attachEvent('onreadystatechange', onLoaded);
	    window.attachEvent('onload', onLoaded);
	  }

	  return null;
	}

	module.exports = ready;

/***/ },
/* 9 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Requiem
	 * (c) VARIANTE (http://variante.io)
	 *
	 * This software is released under the MIT License:
	 * http://www.opensource.org/licenses/mit-license.php
	 */

	'use strict';

	function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

	function _instanceof(left, right) { if (right != null && right[Symbol.hasInstance]) { return right[Symbol.hasInstance](left); } else { return left instanceof right; } }

	var assert = __webpack_require__(6);
	var assertType = __webpack_require__(5);
	var getInstanceNameFromElement = __webpack_require__(10);
	var getControllerClassFromElement = __webpack_require__(12);
	var getControllerClassNameFromElement = __webpack_require__(13);
	var Directive = __webpack_require__(11);
	var hasChild = __webpack_require__(25);

	/**
	 * Crawls a DOM node and performs transformations on child nodes marked with
	 * Requiem attributes, such as instantiating controller classes and assigning
	 * instance names.
	 *
	 * @param {HTMLElement} [element=document]      - Target element for
	 *                                                sightreading. By default this
	 *                                                will be the document.
	 * @param {Object}      [controllerDict=window] - Look-up dictionary (object
	 *                                                literal) that provides all
	 *                                                controller classes when
	 *                                                sightreading encounters a
	 *                                                controller marked element.
	 *
	 * @return {Object|Element} Either a dictionary (object literal) containing
	 *                          all instantiated Requiem Element instances (if the
	 *                          target element was the entire document) or a
	 *                          single Requiem Element instance representing to
	 *                          the single target element.
	 *
	 * @alias module:requiem~dom.sightread
	 */
	function sightread() {
	  var element = document;
	  var controllerDict = window;

	  if (arguments.length === 1) {
	    var obj = arguments[0];

	    if (_instanceof(obj, HTMLElement)) {
	      element = obj;
	    } else if ((typeof obj === 'undefined' ? 'undefined' : _typeof(obj)) === 'object') {
	      controllerDict = obj;
	    }
	  } else if (arguments.length === 2) {
	    var arg1 = arguments[0];
	    var arg2 = arguments[1];

	    if (arg1) element = arg1;
	    if (arg2) controllerDict = arg2;
	  }

	  if (element === document) {
	    return _getChildElements(element, controllerDict);
	  } else {
	    var instanceName = getInstanceNameFromElement(element);
	    var ControllerClass = getControllerClassFromElement(element, controllerDict);

	    assertType(ControllerClass, 'function', false, 'Class \'' + getControllerClassNameFromElement(element) + '\' is not found in specified controller scope: ' + controllerDict);

	    return new ControllerClass({
	      element: element,
	      name: instanceName,
	      children: _getChildElements(element, controllerDict)
	    });
	  }
	}

	/**
	 * Transforms all the DOM elements inside the specified element marked with
	 * custom Requiem attributes into an instance of either its specified controller
	 * class or a generic Requiem Element. If a marked DOM element is a child of
	 * another marked DOM element, it will be passed into the parent element's
	 * children tree as its specified controller class instance or a generic Requiem
	 * Element.
	 *
	 * @param {HTMLElement|Element} [element=document]
	 * @param {Object}              [controllerDict=window]
	 *
	 * @private
	 * @alias module:requiem~dom._getChildElements
	 */
	function _getChildElements(element, controllerDict) {
	  var Element = __webpack_require__(14);
	  var children = null;

	  if (!element) element = document;
	  if (element.jquery) element = element.get(0);
	  if (!assert(_instanceof(element, HTMLElement) || _instanceof(element, Element) || document && element === document, 'Element must be an instance of an HTMLElement or the DOM itself.')) return null;
	  if (_instanceof(element, Element)) element = element.element;

	  var nodeList = element.querySelectorAll('[' + Directive.CONTROLLER + '], [data-' + Directive.CONTROLLER + '], [' + Directive.INSTANCE + '], [data-' + Directive.INSTANCE + ']');
	  var qualifiedChildren = _filterParentElements(nodeList);
	  var n = qualifiedChildren.length;

	  for (var i = 0; i < n; i++) {
	    var child = qualifiedChildren[i];
	    var instanceName = getInstanceNameFromElement(child);
	    var ControllerClass = getControllerClassFromElement(child, controllerDict);

	    assertType(ControllerClass, 'function', false, 'Class \'' + getControllerClassNameFromElement(child) + '\' is not found in specified controller scope: ' + controllerDict);

	    var m = new ControllerClass({
	      element: child,
	      name: instanceName,
	      children: _getChildElements(child, controllerDict)
	    });

	    if (instanceName && instanceName.length > 0) {
	      if (!children) children = {};

	      if (!children[instanceName]) {
	        children[instanceName] = m;
	      } else {
	        if (_instanceof(children[instanceName], Array)) {
	          children[instanceName].push(m);
	        } else {
	          var a = [children[instanceName]];
	          a.push(m);
	          children[instanceName] = a;
	        }
	      }
	    }
	  }

	  return children;
	}

	/**
	 * Scans the provided node list and returns a new node list with only parent
	 * nodes.
	 *
	 * @param  {NodeList} nodeList - The node list.
	 *
	 * @return {NodeList} The filtered node list containing only parent nodes.
	 *
	 * @private
	 * @alias module:requiem~dom._filterParentElements
	 */
	function _filterParentElements(nodeList) {
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

	module.exports = sightread;

/***/ },
/* 10 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Requiem
	 * (c) VARIANTE (http://variante.io)
	 *
	 * This software is released under the MIT License:
	 * http://www.opensource.org/licenses/mit-license.php
	 */

	'use strict';

	var Directive = __webpack_require__(11);

	/**
	 * Gets the instance name from a DOM element.
	 *
	 * @param  {HTMLElement} element - The DOM element.
	 *
	 * @return {string} The instance name.
	 *
	 * @alias module:requiem~helpers.getInstanceNameFromElement
	 */
	function getInstanceNameFromElement(element) {
	  return element.getAttribute(Directive.INSTANCE) || element.getAttribute('data-' + Directive.INSTANCE);
	}

	module.exports = getInstanceNameFromElement;

/***/ },
/* 11 */
/***/ function(module, exports) {

	/**
	 * Requiem
	 * (c) VARIANTE (http://variante.io)
	 *
	 * This software is released under the MIT License:
	 * http://www.opensource.org/licenses/mit-license.php
	 */

	'use strict'

	/**
	 * Enum for custom DOM directives/attributes.
	 *
	 * @readonly
	 * @enum {string}
	 * @alias module:requiem~types.Directive
	 * @see {@link module:requiem~dom.sightread}
	 */
	;
	var Directive = {
	  /**
	   * Use this directive for attaching a controller class to a DOM element.
	   * Controller classes are automatically instantiated during the sightreading
	   * process.
	   */
	  CONTROLLER: 'r-controller',

	  /**
	   * Use this directive for assigning an instance name to a DOM element.
	   */
	  INSTANCE: 'r-instance',

	  /**
	   * Use this directive for managing DOM element states.
	   */
	  STATE: 'r-state',

	  /**
	   * Use this directive to map any property from the DOM to the controller.
	   */
	  PROPERTY: 'r'
	};

	module.exports = Directive;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Requiem
	 * (c) VARIANTE (http://variante.io)
	 *
	 * This software is released under the MIT License:
	 * http://www.opensource.org/licenses/mit-license.php
	 */

	'use strict';

	var getControllerClassNameFromElement = __webpack_require__(13);
	var getInstanceNameFromElement = __webpack_require__(10);
	var namespace = __webpack_require__(4);

	/**
	 * Gets the controller class from the DOM element.
	 *
	 * @param  {HTMLElement} element
	 * @param  {Object}      [controllerDict] - Look-up dictionary (object literal)
	 *                                          that provides all controller classes
	 *                                          when sightreading encounters a
	 *                                          controller marked element.
	 *
	 * @return {Class} The controller class.
	 *
	 * @alias module:requiem~helpers.getControllerClassFromElement
	 */
	function getControllerClassFromElement(element, controllerDict) {
	  var controllerClassName = getControllerClassNameFromElement(element);
	  var instanceName = getInstanceNameFromElement(element);
	  var controllerClass = controllerClassName ? namespace(controllerClassName, controllerDict) : undefined;

	  // If no controller class is specified but element is marked as an instance,
	  // default the controller class to Element.
	  if (!controllerClass && instanceName && instanceName.length > 0) {
	    controllerClass = __webpack_require__(14);
	  } else if (typeof controllerClass !== 'function') {
	    switch (controllerClassName) {
	      case 'Video':
	        {
	          controllerClass = __webpack_require__(23);
	          break;
	        }
	      case 'Element':
	        {
	          controllerClass = __webpack_require__(14);
	          break;
	        }
	      default:
	        {
	          controllerClass = null;
	          break;
	        }
	    }
	  }

	  return controllerClass;
	}

	module.exports = getControllerClassFromElement;

/***/ },
/* 13 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Requiem
	 * (c) VARIANTE (http://variante.io)
	 *
	 * This software is released under the MIT License:
	 * http://www.opensource.org/licenses/mit-license.php
	 */

	'use strict';

	var Directive = __webpack_require__(11);

	/**
	 * Gets the controller class name from the DOM element.
	 *
	 * @param  {HTMLElement} element - The DOM element.
	 *
	 * @return {string} The controller class name.
	 *
	 * @alias module:requiem~helpers.getControllerClassNameFromElement
	 */
	function getControllerClassNameFromElement(element) {
	  return element.getAttribute(Directive.CONTROLLER) || element.getAttribute('data-' + Directive.CONTROLLER);
	}

	module.exports = getControllerClassNameFromElement;

/***/ },
/* 14 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Requiem
	 * (c) VARIANTE (http://variante.io)
	 *
	 * This software is released under the MIT License:
	 * http://www.opensource.org/licenses/mit-license.php
	 */

	'use strict';

	function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

	function _instanceof(left, right) { if (right != null && right[Symbol.hasInstance]) { return right[Symbol.hasInstance](left); } else { return left instanceof right; } }

	var assert = __webpack_require__(6);
	var assertType = __webpack_require__(5);
	var noval = __webpack_require__(15);
	var log = __webpack_require__(16);
	var validateAttribute = __webpack_require__(17);
	var getInstanceNameFromElement = __webpack_require__(10);
	var DirtyType = __webpack_require__(18);
	var NodeState = __webpack_require__(19);
	var EventType = __webpack_require__(20);
	var Directive = __webpack_require__(11);
	var ElementUpdateDelegate = __webpack_require__(21);
	var sightread = __webpack_require__(9);

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
	    if (_instanceof(init, HTMLElement)) {
	      this.element = init;
	    }
	    // If init value is a string, assign it to the name of this instance.
	    else if (typeof init === 'string') {
	        this.name = init;
	      }
	      // If init value is a hash object, assign each value in the hash to the
	      // corresponding property of this Element instance with te same name
	      // as the key of the value.
	      else if ((typeof init === 'undefined' ? 'undefined' : _typeof(init)) === 'object') {
	          for (var property in init) {
	            if (this.hasOwnProperty(property)) {
	              if (property === 'children') {
	                var children = init.children;

	                for (var childName in children) {
	                  this.addChild(children[childName], childName);
	                }
	              } else {
	                this[property] = init[property];
	              }
	            }
	          }
	        }
	  }

	  // Further extend data/properties per custom attribute.
	  var attributes = this.element.attributes;
	  var nAtributes = attributes.length;
	  var regex = new RegExp('^' + Directive.PROPERTY + '-' + '|^data-' + Directive.PROPERTY + '-', 'i');

	  for (var i = 0; i < nAtributes; i++) {
	    var a = attributes[i];

	    if (!validateAttribute(a.name)) {
	      continue;
	    }

	    if (regex.test(a.name)) {
	      var propertyName = a.name.replace(regex, '').replace(/-([a-z])/g, function (g) {
	        return g[1].toUpperCase();
	      });

	      Element.defineProperty(this, propertyName, {
	        defaultValue: a.value === '' ? true : a.value,
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
	Element.defineProperty = function (element, propertyName, descriptor, scope) {
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
	  } else {
	    assert(element.hasOwnProperty(scope), 'The specified Element instance does not have a property called \'' + scope + '\'');
	    scope = element[scope];
	  }

	  if (defaultValue !== undefined) {
	    Object.defineProperty(scope, '__' + propertyName, { value: defaultValue, writable: true });
	  }

	  var newDescriptor = {};

	  if (descriptor.configurable !== undefined) newDescriptor.configurable = descriptor.configurable;
	  if (descriptor.enumerable !== undefined) newDescriptor.enumerable = descriptor.enumerable;
	  if (descriptor.value !== undefined) newDescriptor.value = descriptor.value;
	  if (descriptor.writable !== undefined) newDescriptor.writable = descriptor.writable;

	  if (descriptor.get) {
	    newDescriptor.get = (function () {
	      if (typeof descriptor.get === 'function') {
	        return descriptor.get(this['__' + propertyName]);
	      } else {
	        return this['__' + propertyName];
	      }
	    }).bind(scope);
	  }

	  if (descriptor.set) {
	    newDescriptor.set = (function (val) {
	      var oldVal = this['__' + propertyName];

	      if (unique && oldVal === val) return;

	      if (typeof descriptor.set === 'function') {
	        val = descriptor.set(val);
	      }

	      if (oldVal === undefined) {
	        Object.defineProperty(this, '__' + propertyName, { value: val, writable: true });
	      } else {
	        this['__' + propertyName] = val;
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
	    }).bind(scope);
	  }

	  Object.defineProperty(scope, propertyName, newDescriptor);

	  if (defaultValue !== undefined && attribute !== undefined) {
	    element.setAttribute(attribute, defaultValue);
	  }
	};

	/**
	 * Initializes this Element instance. Must manually invoke.
	 */
	Element.prototype.init = function () {
	  log(this.toString() + '::init()');

	  this._nodeState = NodeState.INITIALIZED;
	  this.updateDelegate.init();

	  for (var key in this.children) {
	    var child = this.children[key];

	    if (_instanceof(child, Array)) {
	      var n = child.length;

	      for (var i = 0; i < n; i++) {
	        var c = child[i];

	        if (c.nodeState === NodeState.IDLE || c.nodeState === NodeState.DESTROYED) {
	          c.init();
	        }
	      }
	    } else {
	      if (child.nodeState === NodeState.IDLE || child.nodeState === NodeState.DESTROYED) {
	        child.init();
	      }
	    }
	  }
	};

	/**
	 * Destroys this Element instance.
	 */
	Element.prototype.destroy = function () {
	  log(this.toString() + '::destroy()');

	  // Destroy all children first.
	  for (var key in this.children) {
	    var child = this.children[key];

	    if (_instanceof(child, Array)) {
	      var n = child.length;

	      for (var i = 0; i < n; i++) {
	        var c = child[i];

	        if (c.nodeState !== NodeState.DESTROYED) {
	          c.destroy();
	        }
	      }
	    } else {
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
	Element.prototype.update = function () {
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
	Element.prototype.respondsTo = function () {
	  var args = Array.prototype.slice.call(arguments);
	  var n = args.length;

	  if (!assert(n > 0, 'Too few arguments')) return;
	  if (!assert(this.nodeState === NodeState.IDLE, 'Responsiveness must be defined when the node state of this element is IDLE')) return;

	  if (isNaN(args[0])) {
	    this.updateDelegate.conductor = args.shift();
	    this.updateDelegate.refreshRate = args.shift();
	  } else {
	    this.updateDelegate.refreshRate = args.shift();
	  }

	  if (args.length === 0) {
	    this.updateDelegate.responsive = true;
	  } else {
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
	Element.prototype.addChild = function (child, name, controllerDict) {
	  if (!assert(child !== undefined, 'Parameter \'child\' must be specified')) return null;
	  if (!assertType(controllerDict, 'object', true, 'Parameter \'controllerDict\' is invalid')) return null;

	  if (!controllerDict) controllerDict = window;

	  if (child.jquery) {
	    return this.addChild(child.get(), name);
	  } else if (_instanceof(child, Array)) {
	    var n = child.length;
	    var children = [];

	    for (var i = 0; i < n; i++) {
	      var c = child[i];

	      children.push(this.addChild(c, name));
	    }

	    return children;
	  } else {
	    if (!assertType(child, [HTMLElement, Element], false, 'Invalid child specified. Child must be an instance of HTMLElement or Requiem Element.')) return null;

	    if (_instanceof(child, HTMLElement)) {
	      if (noval(name)) name = getInstanceNameFromElement(child);
	      if (!assert(!noval(name), 'Either child name was unprovided or it cannot be deducted from the specified child')) return null;

	      child.removeAttribute(Directive.INSTANCE);
	      child.removeAttribute('data-' + Directive.INSTANCE);
	      child.setAttribute('data-' + Directive.INSTANCE, name);
	      child = sightread(child, controllerDict);
	    } else {
	      if (noval(name)) name = child.name;
	      if (!assert(!noval(name), 'Either child name was unprovided or it cannot be deducted from the specified child')) return null;

	      child.name = name;
	    }

	    if (this.children[name]) {
	      if (_instanceof(this.children[name], Array)) {
	        this.children[name].push(child);
	      } else {
	        var a = [this.children[name]];
	        a.push(child);
	        this.children[name] = a;
	      }
	    } else {
	      this.children[name] = child;
	    }

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
	Element.prototype.hasChild = function (child) {
	  if (!assert(child !== undefined, 'Child is undefined')) return false;

	  if (typeof child === 'string') {
	    return !noval(this.getChild(child));
	  } else {
	    var e = undefined;

	    if (child.jquery && child.length === 1) {
	      e = child.get(0);
	    } else if (_instanceof(child, Element)) {
	      e = child.element;
	    } else if (_instanceof(child, HTMLElement)) {
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
	Element.prototype.removeChild = function (child) {
	  if (!assert(!noval(child, true), 'No valid child specified')) return;

	  // If child is a string, treat each entry separated by '.' as a child name.
	  if (typeof child === 'string') {
	    this.removeChild(this.getChild(child));
	  }
	  // If child is an array, remove each element inside recursively.
	  else if (_instanceof(child, Array) || child.jquery && child.length > 1) {
	      while (child.length > 0) {
	        this.removeChild(child[0]);
	      }
	    }
	    // If child is not an array, assume that it is an object that equates or
	    // contains a valid DOM element. Remove it accordingly if this Element
	    // instance is indeed its parent/ancestor.
	    else if (this.hasChild(child)) {
	        // First extract the DOM element.
	        var e = undefined;
	        var a = [];

	        if (child.jquery && child.length === 1) {
	          e = child.get(0);
	        } else if (_instanceof(child, Element)) {
	          e = child.element;
	        } else if (_instanceof(child, HTMLElement)) {
	          e = child;
	        }

	        // No valid DOM element found? Terminate.
	        if (noval(e)) return null;

	        for (var key in this.children) {
	          var c = this.children[key];

	          if (_instanceof(c, Array)) {
	            var n = c.length;
	            var t = 0;

	            for (var i = 0; i < n; i++) {
	              var element = c[i];
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
	          } else if (_instanceof(c, Element)) {
	            if (c.element === e) {
	              a.push(c);
	              c.destroy();
	              e.parentNode.removeChild(e);
	              delete this.children[key];
	            } else {
	              a.push(c.removeChild(child));
	            }
	          }
	        }

	        if (a.length === 0) {
	          return null;
	        } else if (a.length === 1) {
	          return a[0];
	        } else {
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
	Element.prototype.getChild = function (name, recursive) {
	  if (!assertType(name, 'string', false, 'Child name must be specified')) return null;
	  if (!assertType(recursive, 'boolean', true, 'Parameter \'recursive\', if specified, must be a boolean')) return null;

	  recursive = recursive === undefined ? true : recursive;

	  var targets = name.split('.');
	  var currentTarget = targets.shift();
	  var child = this.children[currentTarget];

	  if (recursive && targets.length > 0) {
	    if (_instanceof(child, Array)) {
	      var children = [];
	      var n = child.length;

	      for (var i = 0; i < n; i++) {
	        var c = child[i];

	        if (_instanceof(c, Element)) {
	          children.push(c.getChild(targets.join('.')));
	        } else {
	          children.push(null);
	        }
	      }

	      if (!noval(children, true)) {
	        return children;
	      } else {
	        return null;
	      }
	    } else if (_instanceof(child, Element)) {
	      return child.getChild(targets.join('.'));
	    } else {
	      return null;
	    }
	  } else if (!noval(child, true)) {
	    return child;
	  } else {
	    return null;
	  }
	};

	/**
	 * @see HTMLElement#addEventListener
	 */
	Element.prototype.addEventListener = function () {
	  var _this = this;

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
	      (function () {
	        var _listener = listener;
	        listener = (function (event) {
	          if (event.target !== this.element && !this.hasChild(event.target)) {
	            _listener(event);
	          }
	        }).bind(_this);
	      })();
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
	  } else {
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
	Element.prototype.hasEventListener = function (event, listener) {
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
	  } else {
	    return true;
	  }
	};

	/**
	 * @see HTMLElement#removeEventListener
	 */
	Element.prototype.removeEventListener = function () {
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
	    } else {
	      while (this._listenerMap[event] !== undefined) {
	        this.removeEventListener(event, this._listenerMap[event][0].listener, this._listenerMap[event][0].useCapture);
	      }
	    }
	  }

	  if (listener) {
	    if (window && event === EventType.MOUSE.CLICK_OUTSIDE) {
	      window.removeEventListener(EventType.MOUSE.CLICK, listener, useCapture);
	    } else {
	      this.element.removeEventListener.apply(this.element, arguments);
	    }
	  }
	};

	/**
	 * Removes all cached event listeners from this Element instance.
	 */
	Element.prototype.removeAllEventListeners = function () {
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
	Element.prototype.dispatchEvent = function (event) {
	  this.element.dispatchEvent(event);
	};

	/**
	 * Adds class(es) to this Element instance.
	 *
	 * @param {Stirng|Array} className
	 */
	Element.prototype.addClass = function (className) {
	  var classes = [];

	  if (!assert(typeof className === 'string' || _instanceof(className, Array), 'Invalid class name specified. Must be either a string or an array of strings.')) return;

	  if (typeof className === 'string') {
	    classes.push(className);
	  } else {
	    classes = className;
	  }

	  var n = classes.length;

	  for (var i = 0; i < n; i++) {
	    var c = classes[i];

	    if (!assert(typeof c === 'string', 'Invalid class detected: ' + c)) continue;
	    if (this.hasClass(c)) continue;

	    this.element.className = this.element.className + (this.element.className === '' ? '' : ' ') + c;
	  }
	};

	/**
	 * Removes class(es) from this Element instance.
	 *
	 * @param {Stirng|Array} className
	 */
	Element.prototype.removeClass = function (className) {
	  var classes = [];

	  if (!assert(typeof className === 'string' || _instanceof(className, Array), 'Invalid class name specified. Must be either a string or an array of strings.')) return;

	  if (typeof className === 'string') {
	    classes.push(className);
	  } else {
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
	 * @param {string} className
	 *
	 * @return {boolean}
	 */
	Element.prototype.hasClass = function (className) {
	  if (!assert(typeof className === 'string', 'Invalid class detected: ' + className)) return false;

	  return this.classes.indexOf(className) > -1;
	};

	/**
	 * Gets the value of the attribute with the specified name.
	 *
	 * @param  {string} key - Name of the attribute.
	 *
	 * @return {*} Value of the attribute.
	 */
	Element.prototype.getAttribute = function (key) {
	  return this.element.getAttribute(key);
	};

	/**
	 * Sets an attribute of this Element instance.
	 *
	 * @param {string} key     - Name of the attribute.
	 * @param {*}      [value] - Value of the attribute. If unspecified, the
	 *                           attribute will still be present but have no value.
	 */
	Element.prototype.setAttribute = function (key, value) {
	  if (!assert(validateAttribute(key), 'Attribute \'' + key + '\' is reserved')) return;

	  if (value === undefined || value === null) {
	    this.element.setAttribute(key, '');
	  } else {
	    this.element.setAttribute(key, value);
	  }
	};

	/**
	 * Removes an attribute from this Element instance.
	 *
	 * @param {string} key - Name of the attribute.
	 */
	Element.prototype.removeAttribute = function (key) {
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
	Element.prototype.hasAttribute = function (key) {
	  return !noval(this.element.getAttribute(key));
	};

	/**
	 * Gets the value of an inline CSS rule of this Element instance by its name.
	 *
	 * @param {string} key - Name of the CSS rule in camelCase.
	 *
	 * @return {string} Value of the style.
	 */
	Element.prototype.getStyle = function (key) {
	  var value = this.element.style[key];

	  if (value === '') {
	    return null;
	  } else {
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
	Element.prototype.setStyle = function (key, value) {
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
	Element.prototype.removeStyle = function (key) {
	  this.element.style[key] = '';
	};

	/**
	 * Checks to see if this Element instance has the specified inline CSS rule.
	 * @param {string} key - Name of the style.
	 *
	 * @return {boolean}
	 */
	Element.prototype.hasStyle = function (key) {
	  return this.element.style[key] !== '';
	};

	/**
	 * Creates the associated DOM element from scratch.
	 *
	 * @return {Element}
	 */
	Element.prototype.factory = function () {
	  return document.createElement('div');
	};

	/**
	 * @see ElementUpdateDelegate#isDirty
	 */
	Element.prototype.isDirty = function () {
	  return this.updateDelegate.isDirty.apply(this.updateDelegate, arguments);
	};

	/**
	 * @see ElementUpdateDelegate#setDirty
	 */
	Element.prototype.setDirty = function () {
	  return this.updateDelegate.setDirty.apply(this.updateDelegate, arguments);
	};

	/**
	 * Gets the string representation of this Element instance.
	 *
	 * @return {string}
	 */
	Element.prototype.toString = function () {
	  return '[Element{' + this.name + '}]';
	};

	/**
	 * Defines all properties.
	 *
	 * @protected
	 */
	Element.prototype.__define_properties = function () {
	  /**
	   * View of this Element instance.
	   *
	   * @property {HTMLElement}
	   */
	  Object.defineProperty(this, 'element', {
	    get: function get() {
	      if (!this._element) {
	        Object.defineProperty(this, '_element', {
	          value: this.factory(),
	          writable: true
	        });
	      }

	      return this._element;
	    },
	    set: function set(value) {
	      this.__set_element(value);
	    }
	  });

	  /**
	   * ID of this Element instance.
	   *
	   * @property {string}
	   */
	  Object.defineProperty(this, 'id', {
	    get: function get() {
	      return this.element.id;
	    },
	    set: function set(value) {
	      this.element.setAttribute('id', value);
	    }
	  });

	  /**
	   * Instance name of this Element instance. Once set, it cannot be changed.
	   *
	   * @property {string}
	   */
	  Object.defineProperty(this, 'name', {
	    get: function get() {
	      var s = this.element.getAttribute(Directive.INSTANCE) || this.element.getAttribute('data-' + Directive.INSTANCE);

	      if (!s || s === '') {
	        return null;
	      } else {
	        return s;
	      }
	    },
	    set: function set(value) {
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
	    get: function get() {
	      return this.element.className.split(' ');
	    },
	    set: function set(value) {
	      this.element.className = value.join(' ');
	    }
	  });

	  /**
	   * Gets the attributes of this Element instance.
	   *
	   * @property {NamedNodeMap}
	   */
	  Object.defineProperty(this, 'attributes', {
	    get: function get() {
	      return this.element.attributes;
	    }
	  });

	  /**
	   * Gets the CSS styles of this Element instance.
	   *
	   * @property {ElementCSSInlineStyle}
	   */
	  Object.defineProperty(this, 'styles', {
	    get: function get() {
	      return this.element.style;
	    }
	  });

	  /**
	   * Current node state of this Element instance.
	   *
	   * @property {NodeState}
	   */
	  Object.defineProperty(this, 'nodeState', {
	    get: function get() {
	      return this._nodeState || NodeState.IDLE;
	    }
	  });

	  /**
	   * State of this Element instance (depicted by Directive.State).
	   *
	   * @property {string}
	   */
	  Object.defineProperty(this, 'state', {
	    get: function get() {
	      var s = this.element.getAttribute(Directive.STATE) || this.element.getAttribute('data-' + Directive.STATE);

	      if (!s || s === '') {
	        return null;
	      } else {
	        return s;
	      }
	    },
	    set: function set(value) {
	      if (this.state === value) return;

	      if (value === null || value === undefined) {
	        this.element.removeAttribute(Directive.STATE);
	        this.element.removeAttribute('data-' + Directive.STATE);
	      } else {
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
	    get: function get() {
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
	    get: function get() {
	      return this.element.innerHTML;
	    },
	    set: function set(value) {
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
	    set: (function (value) {
	      assertType(value, 'boolean', false);

	      if (value) {
	        this.setStyle('display', 'none');
	      } else {
	        if (this.getStyle('display') === 'none') {
	          this.removeStyle('display');
	        }
	      }

	      return value;
	    }).bind(this)
	  });

	  /**
	   * Specifies whether this Element instance is invisible. This property follows
	   * the rules of the CSS rule 'visibility: hidden'.
	   *
	   * @property {boolean}
	   */
	  Element.defineProperty(this, 'invisible', {
	    get: true,
	    set: (function (value) {
	      assertType(value, 'boolean', false);

	      if (value) {
	        this.setStyle('visibility', 'hidden');
	      } else {
	        if (this.getStyle('visibility') === 'hidden') {
	          this.removeStyle('visibility');
	        }
	      }

	      return value;
	    }).bind(this)
	  });
	};

	/**
	 * Stubbed out setter for element property (for overriding purposes).
	 *
	 * @param {HTMLElement} value The DOM element.
	 *
	 * @protected
	 */
	Element.prototype.__set_element = function (value) {
	  // Ensure that this is not overwritable.
	  assert(!this._element, 'Element cannot be overwritten.');
	  assert(_instanceof(value, HTMLElement) || _instanceof(value, Element), 'Invalid element type specified. Must be an instance of HTMLElement or Element.');

	  if (_instanceof(value, Element)) {
	    Object.defineProperty(this, '_element', {
	      value: value.element,
	      writable: true
	    });
	  } else {
	    Object.defineProperty(this, '_element', {
	      value: value,
	      writable: true
	    });
	  }
	};

	module.exports = Element;

/***/ },
/* 15 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Requiem
	 * (c) VARIANTE (http://variante.io)
	 *
	 * This software is released under the MIT License:
	 * http://www.opensource.org/licenses/mit-license.php
	 */

	'use strict';

	function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

	function _instanceof(left, right) { if (right != null && right[Symbol.hasInstance]) { return right[Symbol.hasInstance](left); } else { return left instanceof right; } }

	var assertType = __webpack_require__(5);

	/**
	 * Checks if a given value is equal to null. Option to specify recursion, which
	 * would further evaluate inner elements, such as when an Array or Object is
	 * specified.
	 *
	 * @param {*}       value              - Value to evaluate.
	 * @param {boolean} [recursive=false]  - Specifies whether to recursively
	 *                                       evaluate the supplied value's inner
	 *                                       values (i.e. an Array or Object).
	 *
	 * @return {boolean} True if null, false otherwise.
	 *
	 * @alias module:requiem~helpers.noval
	 */
	function noval(value, recursive) {
	  assertType(recursive, 'boolean', true, 'Invalid parameter: recursive');

	  if (recursive === undefined) recursive = false;

	  if (value === undefined || value === null) {
	    return true;
	  } else if (typeof value === 'string') {
	    if (value === '') {
	      return true;
	    } else {
	      return false;
	    }
	  } else if (recursive && _instanceof(value, Array)) {
	    var n = value.length;

	    for (var i = 0; i < n; i++) {
	      if (!noval(value[i], true)) return false;
	    }

	    return true;
	  } else if (recursive && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object') {
	    for (var p in value) {
	      if (!noval(value[p], true)) return false;
	    }

	    return true;
	  } else {
	    return false;
	  }
	}

	module.exports = noval;

/***/ },
/* 16 */
/***/ function(module, exports) {

	/**
	 * Requiem
	 * (c) VARIANTE (http://variante.io)
	 *
	 * This software is released under the MIT License:
	 * http://www.opensource.org/licenses/mit-license.php
	 */

	'use strict'

	/**
	 * Internal console logger that activates only when VARS_DEBUG flag is present
	 * in the window.
	 *
	 * @param {...String} message - Message to log.
	 *
	 * @alias module:requiem~helpers.log
	 */
	;
	function log(message) {
	  if (window && window.VARS_DEBUG && window.console && console.log) {
	    Function.apply.call(console.log, console, arguments);
	  }
	}

	module.exports = log;

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Requiem
	 * (c) VARIANTE (http://variante.io)
	 *
	 * This software is released under the MIT License:
	 * http://www.opensource.org/licenses/mit-license.php
	 */

	'use strict';

	var Directive = __webpack_require__(11);

	/**
	 * Validates whether an attribute can be used (could be reserved by Requiem).
	 *
	 * @param {string} attribute - Name of the attribute.
	 *
	 * @return {boolean} True if attribute is OK to be used, false otherwise.
	 *
	 * @alias module:requiem~helpers.validateAttribute
	 */
	function validateAttribute(attribute) {
	  for (var d in Directive) {
	    if (attribute === d) return false;
	    if (attribute === 'data-' + d) return false;
	  }

	  return true;
	}

	module.exports = validateAttribute;

/***/ },
/* 18 */
/***/ function(module, exports) {

	/**
	 * Requiem
	 * (c) VARIANTE (http://variante.io)
	 *
	 * This software is released under the MIT License:
	 * http://www.opensource.org/licenses/mit-license.php
	 */

	'use strict'

	/**
	 * Enum for custom UI dirty types. Dirty types help identify what needs to be
	 * redrawn/updated in the UI.
	 *
	 * @readonly
	 * @enum {number}
	 * @alias module:requiem~types.DirtyType
	 */
	;
	var DirtyType = {
	  /**
	   * Indicates that nothing in the UI has changed.
	   */
	  NONE: 0x00000000,

	  /**
	   * Indicates that UI element positions have changed.
	   */
	  POSITION: 1 << 0,

	  /**
	   * Indicates that UI element sizes have changed.
	   */
	  SIZE: 1 << 1,
	  /**
	   * Indicates that UI element layouts have changed.
	   */
	  LAYOUT: 1 << 2,

	  /**
	   * Indicates that UI element states have changed.
	   */
	  STATE: 1 << 3,

	  /**
	   * Indicates that UI element data has changed.
	   */
	  DATA: 1 << 4,

	  /**
	   * Indicates that UI element locale has changed.
	   */
	  LOCALE: 1 << 5,

	  /**
	   * Indicates that UI element depths have changed.
	   */
	  DEPTH: 1 << 6,

	  /**
	   * Indicates that UI element configurations have changed.
	   */
	  CONFIG: 1 << 7,

	  /**
	   * Indicates that UI element styles have changed.
	   */
	  STYLE: 1 << 8,

	  /**
	   * Indicates that UI input elements have changed.
	   */
	  INPUT: 1 << 9,

	  /**
	   * Indicates that UI element orientations have changed.
	   */
	  ORIENTATION: 1 << 10,

	  /**
	   * Custom type used as a base for creating new types.
	   */
	  CUSTOM: 1 << 11,

	  /**
	   * Indicates that everything has changed in the UI.
	   */
	  ALL: 0xFFFFFFFF
	};

	module.exports = DirtyType;

/***/ },
/* 19 */
/***/ function(module, exports) {

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

	'use strict'

	/**
	 * Enum for all node states.
	 *
	 * @readonly
	 * @enum {number}
	 * @alias module:requiem~types.NodeState
	 */
	;
	var NodeState = {
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
	};

	module.exports = NodeState;

/***/ },
/* 20 */
/***/ function(module, exports) {

	/**
	 * Requiem
	 * (c) VARIANTE (http://variante.io)
	 *
	 * This software is released under the MIT License:
	 * http://www.opensource.org/licenses/mit-license.php
	 */

	'use strict'

	/**
	 * Enum for all supported event types.
	 *
	 * @readonly
	 * @enum {string}
	 * @alias module:requiem~types.EventType
	 */
	;
	var EventType = {
	  DATA: {
	    DATA_CHANGE: 'datachange' // Custom
	  },
	  MOUSE: {
	    CLICK: 'click',
	    CONTEXT_MENU: 'contextmenu',
	    CLICK_OUTSIDE: 'clickoutside', // Custom
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
	    PROGRESS: 'progress' // Custom
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
	    SUBMIT: 'submit',
	    CANCEL: 'cancel' // Custom
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
	};

	module.exports = EventType;

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Requiem
	 * (c) VARIANTE (http://variante.io)
	 *
	 * This software is released under the MIT License:
	 * http://www.opensource.org/licenses/mit-license.php
	 */

	'use strict';

	function _instanceof(left, right) { if (right != null && right[Symbol.hasInstance]) { return right[Symbol.hasInstance](left); } else { return left instanceof right; } }

	var debounce = __webpack_require__(22);
	var log = __webpack_require__(16);
	var DirtyType = __webpack_require__(18);
	var EventType = __webpack_require__(20);

	/**
	 * Default refresh (debounce) rate in milliseconds.
	 *
	 * @const
	 * @memberof module:requiem~ui.ElementUpdateDelegate
	 * @type {number}
	 * @default
	 */
	var DEFAULT_REFRESH_RATE = 0.0;

	/**
	 * @class
	 *
	 * Delegate for managing update calls of a Requiem modeled element.
	 *
	 * @param {Element} delegate - The Requiem Element instance of which this
	 *                             ElementUpdateDelgate instance will delegate its
	 *                             methods to.
	 *
	 * @alias module:requiem~ui.ElementUpdateDelegate
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
	   * Sets a dirty type as dirty.
	   *
	   * @param {number} dirtyType
	   */
	  this.setDirty = function (dirtyType, validateNow) {
	    log('[ElementUpdateDelegate]::setDirty(', dirtyType, validateNow, ')');

	    if (this.transmissive !== DirtyType.NONE) {
	      if (this.delegate.children) {
	        for (var name in this.delegate.children) {
	          var children = undefined;

	          if (_instanceof(this.delegate.children[name], Array)) {
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
	   * Checks dirty status of a given dirty type.
	   *
	   * @param {number} dirtyType [description]
	   *
	   * @return {boolean}
	   */
	  this.isDirty = function (dirtyType) {
	    log('[ElementUpdateDelegate]::isDirty(', dirtyType, mDirtyTable, ')');

	    switch (dirtyType) {
	      case DirtyType.NONE:
	      case DirtyType.ALL:
	        return mDirtyTable === dirtyType;

	      default:
	        return (dirtyType & mDirtyTable) !== 0;
	    }
	  };

	  /**
	   * Initializes this ElementUpdateDelegate instance. Must manually invoke.
	   */
	  this.init = function () {
	    log('[ElementUpdateDelegate]::init()');

	    var conductor = this.conductor || window;

	    if (window && conductor && conductor.addEventListener && (this.responsive === true || _instanceof(this.responsive, Array))) {
	      if (this.responsive === true || this.responsive.indexOf(EventType.OBJECT.RESIZE) > -1 || this.responsive.indexOf(EventType.DEVICE.ORIENTATION_CHANGE) > -1) {
	        mResizeHandler = this.refreshRate === 0.0 ? _onWindowResize.bind(this) : debounce(_onWindowResize.bind(this), this.refreshRate);
	      }

	      if (this.responsive === true || this.responsive.indexOf(EventType.OBJECT.SCROLL) > -1) {
	        mScrollHandler = this.refreshRate === 0.0 ? _onWindowScroll.bind(this) : debounce(_onWindowScroll.bind(this), this.refreshRate);
	      }

	      if (this.responsive === true || this.responsive.indexOf(EventType.MISC.WHEEL) > -1) {
	        mMouseWheelHandler = this.refreshRate === 0.0 ? _onWindowMouseWheel.bind(this) : debounce(_onWindowMouseWheel.bind(this), this.refreshRate);
	      }

	      if (this.responsive === true || this.responsive.indexOf(EventType.MOUSE.MOUSE_MOVE) > -1) {
	        mMouseMoveHandler = this.refreshRate === 0.0 ? _onWindowMouseMove.bind(this) : debounce(_onWindowMouseMove.bind(this), this.refreshRate);
	      }

	      if (this.responsive === true || this.responsive.indexOf(EventType.DEVICE.DEVICE_ORIENTATION) > -1 || this.responsive.indexOf(EventType.DEVICE.DEVICE_MOTION) > -1 || this.responsive.indexOf(EventType.DEVICE.ORIENTATION) > -1) {
	        mOrientationChangeHandler = this.refreshRate === 0.0 ? _onWindowOrientationChange.bind(this) : debounce(_onWindowOrientationChange.bind(this), this.refreshRate);
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
	        } else if (window.DeviceMotionEvent) {
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
	   * Destroys this ElementUpdateDelegate instance.
	   */
	  this.destroy = function () {
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
	        } else if (window.DeviceMotionEvent) {
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
	   * Handler invoked whenever a visual update is required.
	   */
	  this.update = function () {
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
	   * Custom requestAnimationFrame implementation.
	   *
	   * @param {Function} callback
	   *
	   * @private
	   */
	  var _requestAnimationFrame = function _requestAnimationFrame(callback) {
	    var raf = window && (window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame) || null;

	    if (!raf) {
	      raf = function (callback) {
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
	   * Custom cancelAnimationFrame implementation.
	   *
	   * @return {Function} callback
	   *
	   * @private
	   */
	  var _cancelAnimationFrame = function _cancelAnimationFrame(callback) {
	    var caf = window && (window.requestAnimationFrame || window.webkitCancelAnimationFrame || window.mozCancelAnimationFrame || window.oCancelAnimationFrame || window.msCancelAnimationFrame) || null;

	    if (!caf) {
	      caf = function (callback) {
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
	   * Handler invoked when the window resizes.
	   *
	   * @param {Event} event
	   *
	   * @private
	   */
	  var _onWindowResize = function _onWindowResize(event) {
	    this.setDirty(DirtyType.SIZE);
	  };

	  /**
	   * Handler invoked when the window scrolls.
	   *
	   * @param {Event} event
	   *
	   * @private
	   */
	  var _onWindowScroll = function _onWindowScroll(event) {
	    this.setDirty(DirtyType.POSITION);
	  };

	  /**
	   * Handler invoked when mouse moves in the window.
	   *
	   * @param {Event} event
	   *
	   * @private
	   */
	  var _onWindowMouseMove = function _onWindowMouseMove(event) {
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
	  var _onWindowMouseWheel = function _onWindowMouseWheel(event) {
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
	  var _onWindowOrientationChange = function _onWindowOrientationChange(event) {
	    if (!window) return;

	    var x = undefined,
	        y = undefined,
	        z = undefined;

	    if (_instanceof(event, window.DeviceOrientationEvent)) {
	      x = event.beta;
	      y = event.gamma;
	      z = event.alpha;
	    } else if (_instanceof(event, window.DeviceMotionEvent)) {
	      x = event.acceleration.x * 2;
	      y = event.acceleration.y * 2;
	      z = event.acceleration.z * 2;
	    } else {
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
	  var _onWindowKeyDown = function _onWindowKeyDown(event) {
	    if (!window) return;

	    if (this.keyCode.down === undefined) {
	      this.keyCode.down = [];
	    }

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
	  var _onWindowKeyPress = function _onWindowKeyPress(event) {
	    if (!window) return;

	    if (this.keyCode.press === undefined) {
	      this.keyCode.press = [];
	    }

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
	  var _onWindowKeyUp = function _onWindowKeyUp(event) {
	    if (!window) return;

	    if (this.keyCode.up === undefined) {
	      this.keyCode.up = [];
	    }

	    this.keyCode.up.push(event.keyCode);

	    this.setDirty(DirtyType.INPUT);
	  };
	}

	/**
	 * Defines all properties.
	 *
	 * @protected
	 */
	ElementUpdateDelegate.prototype.__define_properties = function () {
	  /**
	   * Delegate of this ElementUpdateDelegate instance.
	   *
	   * @property {Element}
	   */
	  Object.defineProperty(this, 'delegate', {
	    value: null,
	    writable: true
	  });

	  /**
	   * Indicates whether this ElementUpdateDelegate auto responds to window
	   * behaviors (i.e. resizing, scrolling).
	   *
	   * @property {boolean}
	   */
	  Object.defineProperty(this, 'responsive', {
	    value: false,
	    writable: true
	  });

	  /**
	   * Indicates the debounce rate of this ElementUpdateDelegate instance.
	   *
	   * @property {number}
	   */
	  Object.defineProperty(this, 'refreshRate', {
	    value: DEFAULT_REFRESH_RATE,
	    writable: true
	  });

	  /**
	   * Indicates the dirty flags in which ElementUpdateDelgate instance will
	   * transmit to its child Elements.
	   *
	   * @property {number}
	   */
	  Object.defineProperty(this, 'transmissive', {
	    value: DirtyType.NONE,
	    writable: true
	  });

	  /**
	   * Indicates the dirty flags in which this ElementUpdateDelegate is capable
	   * of receiving from parent Elements.
	   *
	   * @property {number}
	   */
	  Object.defineProperty(this, 'receptive', {
	    value: DirtyType.NONE,
	    writable: true
	  });

	  /**
	   * Indicates the conductor in which this ElementUpdateDelegate responds to
	   * (defaults to window).
	   *
	   * @property {HTMLElement|window}
	   */
	  Object.defineProperty(this, 'conductor', {
	    value: window,
	    writable: true
	  });

	  /**
	   * Stores mouse properties if this ElementUpdateDelegate responds to mouse
	   * events.
	   *
	   * @property {Object}
	   */
	  Object.defineProperty(this, 'mouse', {
	    value: {},
	    writable: false
	  });

	  /**
	   * Stores orientation properties if this ElementUpdateDelgate responds to
	   * device orientations (i.e. device accelerometer).
	   *
	   * @property {Object}
	   */
	  Object.defineProperty(this, 'orientation', {
	    value: {},
	    writable: false
	  });

	  /**
	   * Stores pressed keycodes if this ElementUpdateDelegate responds to
	   * keyboard events.
	   *
	   * @property {Object}
	   */
	  Object.defineProperty(this, 'keyCode', {
	    value: {},
	    writable: false
	  });
	};

	/**
	 * Gets the string representation of this ElementUpdateDelegate instance.
	 *
	 * @return {string}
	 */
	ElementUpdateDelegate.prototype.toString = function () {
	  return '[ElementUpdateDelegate{' + (this.delegate && this.delegate.name || 'undefined') + '}]';
	};

	module.exports = ElementUpdateDelegate;

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Requiem
	 * (c) VARIANTE (http://variante.io)
	 *
	 * This software is released under the MIT License:
	 * http://www.opensource.org/licenses/mit-license.php
	 */

	'use strict';

	var assertType = __webpack_require__(5);

	/**
	 * Returns a function that, as long as it continues to be invoked, will not
	 * be triggered. The function will be called after it stops being called for
	 * N milliseconds. If 'leading' is passed, the function will be triggered on
	 * the leading edge instead of the trailing.
	 *
	 * @param {Function} method          - Method to be debounced.
	 * @param {number}   [delay=0]       - Debounce rate in milliseconds.
	 * @param {boolean}  [leading=false] - Indicates whether the method is triggered
	 *                                     on the leading edge instead of the
	 *                                     trailing.
	 *
	 * @return {Function} The debounced method.
	 *
	 * @alias module:requiem~helpers.debounce
	 */
	function debounce(method, delay, leading) {
	  assertType(method, 'function', false, 'Invalid parameter: method');
	  assertType(delay, 'number', true, 'Invalid optional parameter: delay');
	  assertType(leading, 'boolean', true, 'Invalid optional parameter: leading');

	  if (delay === undefined) delay = 0;
	  if (leading === undefined) leading = false;

	  var timeout = undefined;

	  return function () {
	    var context = this;
	    var args = arguments;

	    var later = function later() {
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

	module.exports = debounce;

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Requiem
	 * (c) VARIANTE (http://variante.io)
	 *
	 * This software is released under the MIT License:
	 * http://www.opensource.org/licenses/mit-license.php
	 */

	'use strict';

	function _instanceof(left, right) { if (right != null && right[Symbol.hasInstance]) { return right[Symbol.hasInstance](left); } else { return left instanceof right; } }

	var assert = __webpack_require__(6);
	var inherit = __webpack_require__(24);
	var DirtyType = __webpack_require__(18);
	var Element = __webpack_require__(14);

	/**
	 * @class
	 *
	 * Controller of a DOM 'video' element.
	 *
	 * @extends module:requiem~ui.Element
	 * @alias module:requiem~ui.Video
	 */
	function Video() {
	  Video.__super__.constructor.apply(this, arguments);
	}inherit(Video, Element);

	/**
	 * @static
	 *
	 * Constants for the 'preload' attribute.
	 *
	 * @type {Object}
	 *
	 * @see {@link http://www.w3schools.com/tags/tag_video.asp}
	 */
	Video.PRELOAD = {
	  AUTO: 'auto',
	  METADATA: 'metada',
	  NONE: 'none'
	};

	/**
	 * @inheritdoc
	 */
	Video.prototype.update = function () {
	  if (this.updateDelegate.isDirty(DirtyType.DATA)) {
	    this._updateSource();
	  }

	  if (this.updateDelegate.isDirty(DirtyType.CUSTOM)) {}

	  Video.__super__.update.call(this);
	};

	/**
	 * @inheritdoc
	 */
	Video.prototype.factory = function () {
	  return document.createElement('video');
	};

	/**
	 * Updates the sources in this Video instance.
	 *
	 * @private
	 */
	Video.prototype._updateSource = function () {
	  var i = undefined;
	  var arrlen = undefined;

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
	 * @inheritdoc
	 */
	Video.prototype.toString = function () {
	  return '[Video{' + this.name + '}]';
	};

	/**
	 * @inheritdoc
	 */
	Video.prototype.__define_properties = function () {
	  /**
	   * Specifies that the video will start playing as soon as it is ready.
	   *
	   * @property {boolean}
	   */
	  Object.defineProperty(this, 'autoplay', {
	    get: function get() {
	      return this.element.autoplay;
	    },
	    set: function set(value) {
	      this.element.autoplay = value;
	      this.updateDelegate.setDirty(DirtyType.CUSTOM);
	    }
	  });

	  /**
	   * Specifies that video controls should be displayed (such as a play/pause
	   * button etc).
	   *
	   * @property {boolean}
	   */
	  Object.defineProperty(this, 'controls', {
	    get: function get() {
	      return this.element.controls;
	    },
	    set: function set(value) {
	      this.element.controls = value;
	      this.updateDelegate.setDirty(DirtyType.CUSTOM);
	    }
	  });

	  /**
	   * Specifies that the video will start over again, every time it is
	   * finished.
	   *
	   * @property {boolean}
	   */
	  Object.defineProperty(this, 'loop', {
	    get: function get() {
	      return this.element.loop;
	    },
	    set: function set(value) {
	      this.element.loop = value;
	      this.updateDelegate.setDirty(DirtyType.CUSTOM);
	    }
	  });

	  /**
	   * Specifies that the audio output of the video should be muted.
	   *
	   * @property {boolean}
	   */
	  Object.defineProperty(this, 'muted', {
	    get: function get() {
	      return this.element.muted;
	    },
	    set: function set(value) {
	      this.element.muted = value;
	      this.updateDelegate.setDirty(DirtyType.CUSTOM);
	    }
	  });

	  /**
	   * Specifies an image to be shown while the video is downloading, or until
	   * the user hits the play button.
	   *
	   * @property {string}
	   */
	  Object.defineProperty(this, 'poster', {
	    get: function get() {
	      return this.element.poster;
	    },
	    set: function set(value) {
	      this.element.poster = value;
	      this.updateDelegate.setDirty(DirtyType.CUSTOM);
	    }
	  });

	  /**
	   * Specifies if and how the author thinks the video should be loaded when
	   * the page loads
	   *
	   * @property {string}
	   */
	  Object.defineProperty(this, 'preload', {
	    get: function get() {
	      return this.element.preload;
	    },
	    set: function set(value) {
	      this.element.preload = value;
	      this.updateDelegate.setDirty(DirtyType.CUSTOM);
	    }
	  });

	  /**
	   * Array of sources containing elements in the form of:
	   * Object {
	   *   {string} src  - Path of source.
	   *   {string} type - Type of source.
	   * }
	   *
	   * @property {Object[]}
	   */
	  Object.defineProperty(this, 'source', {
	    get: function get() {
	      return this._source;
	    },
	    set: function set(value) {
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
	 * @inheritdoc
	 */
	Video.prototype.__set_element = function (value) {
	  assert(_instanceof(value, HTMLVideoElement), 'Invalid element type specified. Must be an instance of HTMLVideoElement.');
	  Video.__super__.__set_element.call(this, value);
	};

	module.exports = Video;

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Requiem
	 * (c) VARIANTE (http://variante.io)
	 *
	 * This software is released under the MIT License:
	 * http://www.opensource.org/licenses/mit-license.php
	 */

	'use strict';

	var assertType = __webpack_require__(5);

	/**
	 * Sets up prototypal inheritance between a child class and a parent class.
	 *
	 * @param {Class} childClass  - Child class.
	 * @param {Class} parentClass - Parent class.
	 *
	 * @return {Class} Extended child class.
	 *
	 * @alias module:requiem~helpers.inherit
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

	module.exports = inherit;

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Requiem
	 * (c) VARIANTE (http://variante.io)
	 *
	 * This software is released under the MIT License:
	 * http://www.opensource.org/licenses/mit-license.php
	 */

	'use strict';

	var assert = __webpack_require__(6);
	var toElementArray = __webpack_require__(26);

	/**
	 * Checks if specified parent contains specified child.
	 *
	 * @param {HTMLElement|Element} parent - HTMLElement, Requiem Element, or jQuery
	 *                                       object.
	 * @param {HTMLElement|Element} child  - HTMLElement, Requiem Element, or jQuery
	 *                                       object.
	 *
	 * @return {boolean} True if parent has given child, false otherwise.
	 *
	 * @alias module:requiem~utils.hasChild
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

	module.exports = hasChild;

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Requiem
	 * (c) VARIANTE (http://variante.io)
	 *
	 * This software is released under the MIT License:
	 * http://www.opensource.org/licenses/mit-license.php
	 */

	'use strict';

	function _instanceof(left, right) { if (right != null && right[Symbol.hasInstance]) { return right[Symbol.hasInstance](left); } else { return left instanceof right; } }

	var assert = __webpack_require__(6);

	/**
	 * Transforms given element(s) to an element array.
	 *
	 * @param {*}       element
	 * @param {boolean} [keepElement=false]
	 *
	 * @alias module:requiem~helpers.toElementArray
	 */
	function toElementArray(element, keepElement) {
	  var Element = __webpack_require__(14);

	  if (!element) return null;

	  var elements = undefined;

	  if (_instanceof(element, Array)) {
	    elements = element;
	  } else if (_instanceof(element, NodeList)) {
	    elements = Array.prototype.slice.call(element);
	  } else if (element.jquery) {
	    elements = element.get();
	  } else {
	    if (!assert(_instanceof(element, HTMLElement) || _instanceof(element, Element), 'Invalid element specified. Element must be an instance of HTMLElement or Requiem Element.')) return null;

	    if (_instanceof(element, HTMLElement)) {
	      elements = [element];
	    } else if (_instanceof(element, Element)) {
	      elements = [element.element];
	    }
	  }

	  var n = elements.length;

	  for (var i = 0; i < n; i++) {
	    var e = elements[i];

	    if (!assert(_instanceof(e, HTMLElement) || _instanceof(e, Element), 'Element array contains invalid element(s). Each element must be an instance of HTMLElement or Requiem Element.')) return null;

	    if (!keepElement && _instanceof(e, Element)) {
	      elements[i] = e.element;
	    }
	  }

	  return elements;
	}

	module.exports = toElementArray;

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Requiem
	 * (c) VARIANTE (http://variante.io)
	 *
	 * This software is released under the MIT License:
	 * http://www.opensource.org/licenses/mit-license.php
	 */

	'use strict';

	var assertType = __webpack_require__(5);

	/**
	 * Creates a DOM element from the provided string.
	 *
	 * @param {string} value - String describing the DOM element.
	 *
	 * @return {HTMLElement} DOM element.
	 *
	 * @alias module:requiem~dom.createElement
	 */
	function createElement(value) {
	  if (!document) return null;

	  assertType(value, 'string', true, 'Value must be a string');

	  var div = document.createElement('div');
	  div.innerHTML = value;
	  return div.firstChild;
	}

	module.exports = createElement;

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Requiem
	 * (c) VARIANTE (http://variante.io)
	 *
	 * This software is released under the MIT License:
	 * http://www.opensource.org/licenses/mit-license.php
	 */

	'use strict'

	/**
	 * Collection of event related classes/methods.
	 *
	 * @namespace module:requiem~events
	 */
	;
	var events = {};

	Object.defineProperty(events, 'EventDispatcher', { value: __webpack_require__(29), writable: false, enumerable: true });

	module.exports = events;

/***/ },
/* 29 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Requiem
	 * (c) VARIANTE (http://variante.io)
	 *
	 * This software is released under the MIT License:
	 * http://www.opensource.org/licenses/mit-license.php
	 */

	'use strict';

	var assert = __webpack_require__(6);
	var assertType = __webpack_require__(5);
	var log = __webpack_require__(16);

	/**
	 * @class
	 *
	 * Creates a new EventDispatcher instance.
	 *
	 * @alias module:requiem~events.EventDispatcher
	 */
	function EventDispatcher() {
	  this.__define_properties();
	}

	/**
	 * Adds an event listener to this EventDispatcher instance.
	 *
	 * @param {string}   type
	 * @param {Function} listener
	 */
	EventDispatcher.prototype.addEventListener = function (type, listener) {
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
	 * @param {string}   type
	 * @param {Function} listener:undefined
	 */
	EventDispatcher.prototype.removeEventListener = function (type, listener) {
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
	 * @param {string}   type
	 * @param {Function} [listener]
	 *
	 * @return {boolean}
	 */
	EventDispatcher.prototype.hasEventListener = function (type, listener) {
	  if (!assertType(type, 'string', false, 'Invalid parameter: type')) return;
	  if (!assertType(listener, 'function', true, 'Invalid parameter: listener')) return;
	  if (!assert(this._listenerMap, 'Listener map is null.')) return;
	  if (!assert(this._listenerMap[type], 'There are no listeners registered for event type: ' + type)) return;

	  if (listener) {
	    var index = this._listenerMap[type].indexOf(listener);

	    return index > -1;
	  } else {
	    return true;
	  }
	};

	/**
	 * Dispatches the specified event.
	 *
	 * @param {Event} event
	 */
	EventDispatcher.prototype.dispatchEvent = function (event) {
	  if (!assertType(event, Event, false, 'Event must be specified.')) return;
	  if (!assert(this._listenerMap, 'Listener map is null.')) return;

	  if (!this._listenerMap[event.type]) return;

	  log('[EventDispatcher]::dispatchEvent(' + event.type + ')');

	  var arrlen = this._listenerMap[event.type].length;

	  for (var i = 0; i < arrlen; i++) {
	    var listener = this._listenerMap[event.type][i];

	    listener.call(this, event);
	  }
	};

	/**
	 * Defines all properties.
	 *
	 * @private
	 */
	EventDispatcher.prototype.__define_properties = function () {};

	module.exports = EventDispatcher;

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Requiem
	 * (c) VARIANTE (http://variante.io)
	 *
	 * This software is released under the MIT License:
	 * http://www.opensource.org/licenses/mit-license.php
	 */

	'use strict'

	/**
	 * Collection of network related methods/classes.
	 *
	 * @namespace module:requiem~net
	 */
	;
	var net = {};

	Object.defineProperty(net, 'AssetLoader', { value: __webpack_require__(31), writable: false, enumerable: true });

	module.exports = net;

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Requiem
	 * (c) VARIANTE (http://variante.io)
	 *
	 * This software is released under the MIT License:
	 * http://www.opensource.org/licenses/mit-license.php
	 */

	'use strict';

	function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

	var assert = __webpack_require__(6);
	var inherit = __webpack_require__(24);
	var log = __webpack_require__(16);
	var EventDispatcher = __webpack_require__(29);
	var EventType = __webpack_require__(20);

	/**
	 * Common image file extensions.
	 *
	 * @const
	 * @memberof module:requiem~net.AssetLoader
	 * @type {Array}
	 * @default
	 */
	var IMAGE_EXTENSIONS = ['jpg', 'png', 'svg', 'jpeg', 'gif'];

	/**
	 * Common video file extensions.
	 *
	 * @const
	 * @memberof module:requiem~net.AssetLoader
	 * @type {Array}
	 * @default
	 */
	var VIDEO_EXTENSIONS = ['mp4', 'mpeg', 'ogg', 'ogv', 'mov', 'avi', 'flv'];

	/**
	 * Common audio file extensions.
	 *
	 * @const
	 * @memberof module:requiem~net.AssetLoader
	 * @type {Array}
	 * @default
	 */
	var AUDIO_EXTENSIONS = ['mp3', 'mp4', 'mpeg', 'flac', 'wav', 'ogg'];

	/**
	 * Mime type lookup.
	 *
	 * @const
	 * @memberof module:requiem~net.AssetLoader
	 * @enum {Object}
	 * @default
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
	 * @class
	 *
	 * Asset loader for images, videos, and audios.
	 *
	 * @extends module:requiem~events.EventDispatcher
	 */
	function AssetLoader() {
	  AssetLoader.__super__.constructor.apply(this, arguments);
	}inherit(AssetLoader, EventDispatcher);

	/**
	 * @static
	 *
	 * Different states of AssetLoader.
	 *
	 * @enum {number}
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
	 * @enum {string}
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
	AssetLoader.prototype.init = function () {
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
	AssetLoader.prototype.destroy = function () {
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
	 *  {string} path  Path of asset.
	 *  {string} type  Type of asset (can only be 'image', 'video', or
	 *                 'audio').
	 * }
	 */
	AssetLoader.prototype.enqueue = function () {
	  assert(arguments && arguments.length > 0, 'There are no arguments specified.');
	  assert(this.state !== AssetLoader.STATE.IN_PROGRESS, 'Enqueueing is prohibited when the state is in progress.');

	  if (!arguments) return;
	  if (arguments.length <= 0) return;
	  if (this.state === AssetLoader.STATE.IN_PROGRESS) return;

	  log('[AssetLoader]::enqueue(' + arguments + ')');

	  var arrlen = arguments.length;

	  for (var i = 0; i < arrlen; i++) {
	    var arg = arguments[i];

	    assert(typeof arg === 'string' || (typeof arg === 'undefined' ? 'undefined' : _typeof(arg)) === 'object', 'Each item to be enqueued must be a string of the target path or an object containing a "path" key and/or a "type" key');
	    assert(typeof arg === 'string' || typeof arg.path === 'string', 'Invalid path specified: ' + arg.path + '.');

	    var path = typeof arg === 'string' ? arg : arg.path;
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
	AssetLoader.prototype.dequeue = function () {
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
	AssetLoader.prototype.getXHR = function (data) {
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
	 * Handler invoked when an XHR instance is in progress.
	 *
	 * @param {Object} event
	 *
	 * @private
	 */
	AssetLoader.prototype._onXHRProgress = function (event) {
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

	  var progressEvent = new CustomEvent(EventType.OBJECT.PROGRESS, {
	    bubbles: true,
	    cancelable: true,
	    detail: {
	      id: id,
	      path: path,
	      type: type,
	      pending: this._pending,
	      loaded: this.bytesLoaded,
	      total: this.bytesTotal
	    }
	  });

	  this.dispatchEvent(progressEvent);
	};

	/**
	 * Handler invoked when an XHR instance completes its operation.
	 *
	 * @param {Object} event
	 *
	 * @private
	 */
	AssetLoader.prototype._onXHRLoadComplete = function (event) {
	  var xhr = event.currentTarget;
	  var id = xhr.data.id;
	  var path = xhr.data.path;
	  var type = xhr.data.type;

	  log('[AssetLoader]::_onXHRLoadComplete("' + path + '"")');

	  this._pending--;

	  var loadEvent = new CustomEvent(EventType.OBJECT.LOAD, {
	    bubbles: true,
	    cancelable: true,
	    detail: {
	      id: id,
	      path: path,
	      type: type,
	      pending: this._pending,
	      loaded: this.bytesLoaded,
	      total: this.bytesTotal
	    }
	  });

	  this.dispatchEvent(loadEvent);
	};

	/**
	 * Handler invoked when an XHR instance fails its operation.
	 *
	 * @param {Object} event
	 *
	 * @private
	 */
	AssetLoader.prototype._onXHRLoadError = function (event) {
	  var xhr = event.currentTarget;
	  var id = xhr.data.id;
	  var path = xhr.data.path;
	  var type = xhr.data.type;

	  log('[AssetLoader]::_onXHRLoadError("' + path + '"")');

	  this._pending--;

	  var errorEvent = new CustomEvent(EventType.OBJECT.ERROR, {
	    bubbles: true,
	    cancelable: true,
	    detail: {
	      id: id,
	      path: path,
	      type: type,
	      pending: this._pending,
	      loaded: this.bytesLoaded,
	      total: this.bytesTotal
	    }
	  });

	  this.dispatchEvent(errorEvent);

	  if (this._pending === 0) {
	    var loadEvent = new CustomEvent(EventType.OBJECT.LOAD, {
	      bubbles: true,
	      cancelable: true,
	      detail: {
	        id: id,
	        path: path,
	        type: type,
	        pending: this._pending,
	        loaded: this.bytesLoaded,
	        total: this.bytesTotal
	      }
	    });

	    this.dispatchEvent(loadEvent);
	  }
	};

	/**
	 * Handler invoked when an XHR aborts its operation.
	 *
	 * @param {Object} event
	 *
	 * @private
	 */
	AssetLoader.prototype._onXHRAbort = function (event) {
	  var xhr = event.currentTarget;
	  var id = xhr.data.id;
	  var path = xhr.data.path;
	  var type = xhr.data.type;

	  log('[AssetLoader]::_onXHRLoadError("' + path + '"")');

	  this._pending--;

	  var abortEvent = new CustomEvent(EventType.OBJECT.ABORT, {
	    bubbles: true,
	    cancelable: true,
	    detail: {
	      id: id,
	      path: path,
	      type: type,
	      pending: this._pending,
	      loaded: this.bytesLoaded,
	      total: this.bytesTotal
	    }
	  });

	  this.dispatchEvent(abortEvent);

	  if (this._pending === 0) {
	    var loadEvent = new CustomEvent(EventType.OBJECT.LOAD, {
	      bubbles: true,
	      cancelable: true,
	      detail: {
	        id: id,
	        path: path,
	        type: type,
	        pending: this._pending,
	        loaded: this.bytesLoaded,
	        total: this.bytesTotal
	      }
	    });

	    this.dispatchEvent(loadEvent);
	  }
	};

	/**
	 * @inheritdoc
	 */
	AssetLoader.prototype.__define_properties = function () {
	  /**
	   * @property
	   *
	   * Specifies the current state of this AssetLoader instance.
	   *
	   * @type {number}
	   */
	  Object.defineProperty(this, 'state', {
	    get: function get() {
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
	    get: function get() {
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
	    get: function get() {
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
	   * @type {boolean}
	   */
	  Object.defineProperty(this, 'async', {
	    get: function get() {
	      if (this._async === undefined) {
	        return true;
	      } else {
	        return this._async;
	      }
	    },
	    set: function set(value) {
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
	   * @type {number}
	   */
	  Object.defineProperty(this, 'bytesLoaded', {
	    get: function get() {
	      if (!this._bytesLoaded) {
	        return 0.0;
	      } else {
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
	   * @type {number}
	   */
	  Object.defineProperty(this, 'bytesTotal', {
	    get: function get() {
	      if (!this._bytesTotal) {
	        return 0.0;
	      } else {
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
	   * @return {number}
	   */
	  Object.defineProperty(this, 'progress', {
	    get: function get() {
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

	module.exports = AssetLoader;

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Requiem
	 * (c) VARIANTE (http://variante.io)
	 *
	 * This software is released under the MIT License:
	 * http://www.opensource.org/licenses/mit-license.php
	 */

	'use strict'

	/**
	 * Collection of Requiem data-types and definitions.
	 *
	 * @namespace module:requiem~types
	 */
	;
	var types = {};

	Object.defineProperty(types, 'Directive', { value: __webpack_require__(11), writable: false, enumerable: true });
	Object.defineProperty(types, 'DirtyType', { value: __webpack_require__(18), writable: false, enumerable: true });
	Object.defineProperty(types, 'EventType', { value: __webpack_require__(20), writable: false, enumerable: true });
	Object.defineProperty(types, 'KeyCode', { value: __webpack_require__(33), writable: false, enumerable: true });
	Object.defineProperty(types, 'NodeState', { value: __webpack_require__(19), writable: false, enumerable: true });

	module.exports = types;

/***/ },
/* 33 */
/***/ function(module, exports) {

	/**
	 * Requiem
	 * (c) VARIANTE (http://variante.io)
	 *
	 * This software is released under the MIT License:
	 * http://www.opensource.org/licenses/mit-license.php
	 *
	 * @type {Object}
	 */

	'use strict'

	/**
	 * Enum for universal key codes.
	 *
	 * @readonly
	 * @enum {number}
	 * @alias module:requiem~types.KeyCode
	 */
	;
	var KeyCode = {
	  BACKSPACE: 8,
	  TAB: 9,
	  ENTER: 13,
	  SHIFT: 16,
	  CTRL: 17,
	  ALT: 18,
	  PAUSE_BREAK: 19,
	  CAPS_LOCK: 20,
	  ESCAPE: 27,
	  PAGE_UP: 33,
	  PAGE_DOWN: 34,
	  END: 35,
	  HOME: 36,
	  LEFT_ARROW: 37,
	  UP_ARROW: 38,
	  RIGHT_ARROW: 39,
	  DOWN_ARROW: 40,
	  INSERT: 45,
	  DELETE: 46,
	  ZERO: 48,
	  ONE: 49,
	  TWO: 50,
	  THREE: 51,
	  FOUR: 52,
	  FIVE: 53,
	  SIX: 54,
	  SEVEN: 55,
	  EIGHT: 56,
	  NINE: 57,
	  A: 65,
	  B: 66,
	  C: 67,
	  D: 68,
	  E: 69,
	  F: 70,
	  G: 71,
	  H: 72,
	  I: 73,
	  J: 74,
	  K: 75,
	  L: 76,
	  M: 77,
	  N: 78,
	  O: 79,
	  P: 80,
	  Q: 81,
	  R: 82,
	  S: 83,
	  T: 84,
	  U: 85,
	  V: 86,
	  W: 87,
	  X: 88,
	  Y: 89,
	  Z: 90,
	  LEFT_CMD: 91,
	  RIGHT_CMD: 92,
	  SELECT: 93,
	  NUMPAD_ZERO: 96,
	  NUMPAD_ONE: 97,
	  NUMPAD_TWO: 98,
	  NUMPAD_THREE: 99,
	  NUMPAD_FOUR: 100,
	  NUMPAD_FIVE: 101,
	  NUMPAD_SIX: 102,
	  NUMPAD_SEVEN: 103,
	  NUMPAD_EIGHT: 104,
	  NUMPAD_NINE: 105,
	  MULTIPLY: 106,
	  ADD: 107,
	  SUBTRACT: 109,
	  DECIMAL: 110,
	  DIVIDE: 111,
	  F1: 112,
	  F2: 113,
	  F3: 114,
	  F4: 115,
	  F5: 116,
	  F6: 117,
	  F7: 118,
	  F8: 119,
	  F9: 120,
	  F10: 121,
	  F11: 122,
	  F12: 123,
	  NUM_LOCK: 144,
	  SCROLL_LOCK: 145,
	  SEMI_COLON: 186,
	  EQUAL: 187,
	  COMMA: 188,
	  DASH: 189,
	  PERIOD: 190,
	  FORWARD_SLASH: 191,
	  GRAVE_ACCENT: 192,
	  OPEN_BRACKET: 219,
	  BACK_SLASH: 220,
	  CLOSE_BRACKET: 221,
	  SINGLE_QUOTE: 222
	};

	module.exports = KeyCode;

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Requiem
	 * (c) VARIANTE (http://variante.io)
	 *
	 * This software is released under the MIT License:
	 * http://www.opensource.org/licenses/mit-license.php
	 */

	'use strict'

	/**
	 * Collection of UI related methods/classes.
	 *
	 * @namespace module:requiem~ui
	 */
	;
	var ui = {};

	Object.defineProperty(ui, 'Element', { value: __webpack_require__(14), writable: false, enumerable: true });
	Object.defineProperty(ui, 'ElementUpdateDelegate', { value: __webpack_require__(21), writable: false, enumerable: true });
	Object.defineProperty(ui, 'Video', { value: __webpack_require__(23), writable: false, enumerable: true });

	module.exports = ui;

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Requiem
	 * (c) VARIANTE (http://variante.io)
	 *
	 * This software is released under the MIT License:
	 * http://www.opensource.org/licenses/mit-license.php
	 */

	'use strict'

	/**
	 * Utility methods.
	 *
	 * @namespace module:requiem~utils
	 */
	;
	var utils = {};

	Object.defineProperty(utils, 'addClass', { value: __webpack_require__(36), writable: false, enumerable: true });
	Object.defineProperty(utils, 'changeElementState', { value: __webpack_require__(39), writable: false, enumerable: true });
	Object.defineProperty(utils, 'hasClass', { value: __webpack_require__(37), writable: false, enumerable: true });
	Object.defineProperty(utils, 'hasChild', { value: __webpack_require__(25), writable: false, enumerable: true });
	Object.defineProperty(utils, 'getClassIndex', { value: __webpack_require__(38), writable: false, enumerable: true });
	Object.defineProperty(utils, 'getElementState', { value: __webpack_require__(40), writable: false, enumerable: true });
	Object.defineProperty(utils, 'getIntersectRect', { value: __webpack_require__(41), writable: false, enumerable: true });
	Object.defineProperty(utils, 'getRect', { value: __webpack_require__(42), writable: false, enumerable: true });
	Object.defineProperty(utils, 'getViewportRect', { value: __webpack_require__(43), writable: false, enumerable: true });
	Object.defineProperty(utils, 'hitTestElement', { value: __webpack_require__(44), writable: false, enumerable: true });
	Object.defineProperty(utils, 'hitTestRect', { value: __webpack_require__(45), writable: false, enumerable: true });
	Object.defineProperty(utils, 'removeClass', { value: __webpack_require__(46), writable: false, enumerable: true });
	Object.defineProperty(utils, 'translate', { value: __webpack_require__(47), writable: false, enumerable: true });
	Object.defineProperty(utils, 'translate3d', { value: __webpack_require__(48), writable: false, enumerable: true });
	Object.defineProperty(utils, 'transform', { value: __webpack_require__(49), writable: false, enumerable: true });

	module.exports = utils;

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Requiem
	 * (c) VARIANTE (http://variante.io)
	 *
	 * This software is released under the MIT License:
	 * http://www.opensource.org/licenses/mit-license.php
	 */

	'use strict';

	function _instanceof(left, right) { if (right != null && right[Symbol.hasInstance]) { return right[Symbol.hasInstance](left); } else { return left instanceof right; } }

	var assert = __webpack_require__(6);
	var toElementArray = __webpack_require__(26);
	var hasClass = __webpack_require__(37);

	/**
	 * Adds a class(es) to DOM element(s).
	 *
	 * @param {HTMLElement|HTMLElement[]|Element|Element[]} element
	 * @param {string|string[]}                             className
	 *
	 * @alias module:requiem~utils.addClass
	 */
	function addClass(element, className) {
	  var elements = toElementArray(element);
	  var classes = [];
	  var n = elements.length;

	  if (!assert(typeof className === 'string' || _instanceof(className, Array), 'Invalid class name specified. Must be either a string or an array of strings.')) return;

	  if (typeof className === 'string') {
	    classes.push(className);
	  } else {
	    classes = className;
	  }

	  var nClasses = classes.length;

	  for (var i = 0; i < n; i++) {
	    var e = elements[i];

	    for (var j = 0; j < nClasses; j++) {
	      var c = classes[j];

	      if (!assert(typeof c === 'string', 'Invalid class detected: ' + c)) continue;
	      if (hasClass(e, c)) continue;

	      e.className = e.className + (e.className === '' ? '' : ' ') + c;
	    }
	  }
	}

	module.exports = addClass;

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Requiem
	 * (c) VARIANTE (http://variante.io)
	 *
	 * This software is released under the MIT License:
	 * http://www.opensource.org/licenses/mit-license.php
	 */

	'use strict';

	var assert = __webpack_require__(6);
	var toElementArray = __webpack_require__(26);
	var getClassIndex = __webpack_require__(38);

	/**
	 * Verifies that the specified element(s) has the specified class.
	 *
	 * @param {HTMLElement|HTMLElement[]|Element|Element[]} element
	 * @param {string}                                      className
	 *
	 * @return {boolean} True if element(s) has given class, false otherwise.
	 *
	 * @alias module:requiem~utils.hasClass
	 */
	function hasClass(element, className) {
	  if (!assert(className && typeof className === 'string', 'Invalid class name: ' + className)) return false;

	  var elements = toElementArray(element);
	  var n = elements.length;

	  for (var i = 0; i < n; i++) {
	    var e = elements[i];
	    if (getClassIndex(e, className) < 0) return false;
	  }

	  return true;
	}

	module.exports = hasClass;

/***/ },
/* 38 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Requiem
	 * (c) VARIANTE (http://variante.io)
	 *
	 * This software is released under the MIT License:
	 * http://www.opensource.org/licenses/mit-license.php
	 */

	'use strict';

	function _instanceof(left, right) { if (right != null && right[Symbol.hasInstance]) { return right[Symbol.hasInstance](left); } else { return left instanceof right; } }

	var assert = __webpack_require__(6);
	var Element = __webpack_require__(14);

	/**
	 * Gets the index of a specified class in a DOM element,
	 *
	 * @param {HTMLElement|Element} element
	 * @param {string}              className
	 *
	 * @return {number} Index of given class name. -1 if not found.
	 *
	 * @alias module:requiem~utils.getClassIndex
	 */
	function getClassIndex(element, className) {
	  if (!assert(element && (_instanceof(element, HTMLElement) || _instanceof(element, Element) || element.jquery), 'Invalid element specified. Element must be an instance of HTMLElement or Element.')) return null;
	  if (_instanceof(element, Element)) element = element.element;
	  if (element.jquery) element = element.get(0);

	  if (!assert(className && typeof className === 'string', 'Invalid class name: ' + className)) return -1;

	  var classList = element.className.split(' ');

	  return classList.indexOf(className);
	}

	module.exports = getClassIndex;

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Requiem
	 * (c) VARIANTE (http://variante.io)
	 *
	 * This software is released under the MIT License:
	 * http://www.opensource.org/licenses/mit-license.php
	 */

	'use strict';

	function _instanceof(left, right) { if (right != null && right[Symbol.hasInstance]) { return right[Symbol.hasInstance](left); } else { return left instanceof right; } }

	var toElementArray = __webpack_require__(26);
	var getElementState = __webpack_require__(40);
	var Directive = __webpack_require__(11);
	var Element = __webpack_require__(14);

	/**
	 * Changes the state of DOM element(s), assumes that state classes are prefixed
	 * with 'state-'.
	 *
	 * @param {HTMLElement|HTMLElement[]|Element|Element[]} element
	 * @param {string}                                      state
	 *
	 * @alias module:requiem~utils.changeElementState
	 */
	function changeElementState(element, state) {
	  var elements = toElementArray(element, true);

	  if (!elements) return;

	  var n = elements.length;

	  for (var i = 0; i < n; i++) {
	    var e = elements[i];

	    if (getElementState(e) === state) continue;

	    if (_instanceof(e, Element)) {
	      e.state = state;
	    } else {
	      e.setAttribute('data-' + Directive.STATE, state);
	    }
	  }
	}

	module.exports = changeElementState;

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Requiem
	 * (c) VARIANTE (http://variante.io)
	 *
	 * This software is released under the MIT License:
	 * http://www.opensource.org/licenses/mit-license.php
	 */

	'use strict';

	function _instanceof(left, right) { if (right != null && right[Symbol.hasInstance]) { return right[Symbol.hasInstance](left); } else { return left instanceof right; } }

	var assert = __webpack_require__(6);
	var Directive = __webpack_require__(11);
	var Element = __webpack_require__(14);

	/**
	 * Gets the state of a DOM element, assumes that state classes are prefixed with
	 * 'state-'.
	 *
	 * @param {HTMLElement|Element} element
	 *
	 * @return {string} State of the given element ('state-' prefix is omitted).
	 *
	 * @alias module:requiem~utils.getElementState
	 */
	function getElementState(element) {
	  if (!assert(element && (_instanceof(element, HTMLElement) || _instanceof(element, Element) || element.jquery), 'Invalid element specified.')) return null;

	  if (element.jquery) element = element.get(0);

	  var s = undefined;

	  if (_instanceof(element, Element)) {
	    s = element.state;
	  } else {
	    s = element.getAttribute(Directive.STATE) || element.getAttribute('data-' + Directive.STATE);
	  }

	  if (!s || s === '') {
	    return null;
	  } else {
	    return s;
	  }
	}

	module.exports = getElementState;

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Requiem
	 * (c) VARIANTE (http://variante.io)
	 *
	 * This software is released under the MIT License:
	 * http://www.opensource.org/licenses/mit-license.php
	 */

	'use strict';

	var assert = __webpack_require__(6);
	var getRect = __webpack_require__(42);

	/**
	 * Computes the intersecting rect of 2 given elements. If only 1 element is
	 * specified, the other element will default to the current viewport.
	 *
	 * @param {...HTMLElement|...Element} element
	 *
	 * @return {Object} Object containing width, height.
	 *
	 * @alias module:requiem~utils.getIntersectRect
	 */
	function getIntersectRect(element) {
	  if (!assert(window, 'This method relies on the window object, which is undefined.')) return null;

	  var n = arguments.length;

	  if (!assert(n > 0, 'This method requires at least 1 argument specified.')) return null;

	  var rect = {};
	  var currRect = undefined,
	      nextRect = undefined;

	  for (var i = 0; i < n; i++) {
	    if (!currRect) currRect = getRect(arguments[i]);

	    if (!assert(currRect, 'Invalid computed rect.')) return null;

	    if (i === 0 && i + 1 === n) {
	      nextRect = getRect(window);
	    } else if (i + 1 < n) {
	      nextRect = getRect(arguments[i + 1]);
	    } else {
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

	module.exports = getIntersectRect;

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Requiem
	 * (c) VARIANTE (http://variante.io)
	 *
	 * This software is released under the MIT License:
	 * http://www.opensource.org/licenses/mit-license.php
	 */

	'use strict';

	var assert = __webpack_require__(6);
	var toElementArray = __webpack_require__(26);
	var getViewportRect = __webpack_require__(43);

	/**
	 * Gets the rect of a given element or the overall rect of an array of elements.
	 *
	 * @param {HTMLElement|HTMLElement[]|Element|Element[]} element
	 * @param {Object}                                      [reference=window]
	 *
	 * @return {Object} Object containing top, left, bottom, right, width, height.
	 *
	 * @alias module:requiem~utils.getRect
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
	    } else {
	      rect.left = Math.min(rect.left, l);
	    }

	    if (rect.right === undefined) {
	      rect.right = r;
	    } else {
	      rect.right = Math.max(rect.right, r);
	    }

	    if (rect.top === undefined) {
	      rect.top = t;
	    } else {
	      rect.top = Math.min(rect.top, t);
	    }

	    if (rect.bottom === undefined) {
	      rect.bottom = b;
	    } else {
	      rect.bottom = Math.max(rect.bottom, b);
	    }
	  }

	  rect.width = rect.right - rect.left;
	  rect.height = rect.bottom - rect.top;

	  return rect;
	}

	module.exports = getRect;

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Requiem
	 * (c) VARIANTE (http://variante.io)
	 *
	 * This software is released under the MIT License:
	 * http://www.opensource.org/licenses/mit-license.php
	 */

	'use strict';

	var assert = __webpack_require__(6);

	/**
	 * Gets the rect of the viewport (FOV).
	 *
	 * @return {Object} Object containing top, left, bottom, right, width,
	 *                  height.
	 *
	 * @alias module:requiem~utils.getViewportRect
	 */
	function getViewportRect() {
	  if (!assert(window && document, 'Window or document undefined.')) return null;

	  var rect = {};

	  rect.width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
	  rect.height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
	  rect.top = window.pageYOffset !== undefined ? window.pageYOffset : (document.documentElement || document.body.parentNode || document.body).scrollTop;
	  rect.left = window.pageXOffset !== undefined ? window.pageXOffset : (document.documentElement || document.body.parentNode || document.body).scrollLeft;
	  rect.bottom = rect.top + rect.height;
	  rect.right = rect.left + rect.width;

	  return rect;
	}

	module.exports = getViewportRect;

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Requiem
	 * (c) VARIANTE (http://variante.io)
	 *
	 * This software is released under the MIT License:
	 * http://www.opensource.org/licenses/mit-license.php
	 */

	'use strict';

	function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

	var assert = __webpack_require__(6);
	var getIntersectRect = __webpack_require__(41);
	var getRect = __webpack_require__(42);

	/**
	 * Hit tests a vector or element against other elements.
	 *
	 * @param {Object|HTMLElement|Element} obj
	 * @param {number}                     obj.x
	 * @param {number}                     obj.y
	 * @param {...(HTMLElement|Element)}   elements
	 *
	 * @return {boolean} True if test passes, false otherwise.
	 *
	 * @alias module:requiem~utils.hitTestElement
	 */
	function hitTestElement(obj, elements) {
	  if (!assert(arguments.length > 1, 'Insufficient arguments. Expecting at least 2.')) return false;

	  var args = Array.prototype.slice.call(arguments);
	  var isVector = _typeof(args[0]) === 'object' && args[0].hasOwnProperty('x') && args[0].hasOwnProperty('y');

	  if (isVector) {
	    var vector = args.shift();
	    var n = args.length;
	    var pass = false;

	    for (var i = 0; i < n; i++) {
	      var rect = getRect(args[i]);
	      var clampedX = vector.x >= rect.left && vector.x <= rect.right;
	      var clampedY = vector.y >= rect.top && vector.x <= rect.bottom;

	      if (clampedX && clampedY) {
	        pass = true;
	      }
	    }

	    return pass;
	  } else {
	    var intersectRect = getIntersectRect.apply(null, arguments);

	    if (!assert(intersectRect, 'Invalid elements specified.')) return false;

	    return intersectRect.width * intersectRect.height !== 0;
	  }
	}

	module.exports = hitTestElement;

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Requiem
	 * (c) VARIANTE (http://variante.io)
	 *
	 * This software is released under the MIT License:
	 * http://www.opensource.org/licenses/mit-license.php
	 */

	'use strict';

	function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }

	var assert = __webpack_require__(6);
	var getIntersectRect = __webpack_require__(41);

	/**
	 * Hit tests a vector or element against other elements.
	 *
	 * @param {Object|HTMLElement|Element} obj
	 * @param {number}                     obj.x
	 * @param {number}                     obj.y
	 * @param {...Object}                  rects
	 * @param {number}                     rects.top
	 * @param {number}                     rects.right
	 * @param {number}                     rects.bottom
	 * @param {number}                     rects.left
	 *
	 * @return {boolean} True if test passes, false otherwise.
	 *
	 * @alias module:requiem~utils.hitTestRect
	 */
	function hitTestRect(obj, rects) {
	  if (!assert(arguments.length > 1, 'Insufficient arguments. Expecting at least 2.')) return false;

	  var args = Array.prototype.slice.call(arguments);
	  var isVector = _typeof(args[0]) === 'object' && args[0].hasOwnProperty('x') && args[0].hasOwnProperty('y');

	  if (isVector) {
	    var vector = args.shift();
	    var n = args.length;
	    var pass = false;

	    for (var i = 0; i < n; i++) {
	      var rect = args[i];

	      if (!assert(rect.top !== undefined && !isNaN(rect.top) && rect.right !== undefined && !isNaN(rect.right) && rect.bottom !== undefined && !isNaN(rect.bottom) && rect.left !== undefined && !isNaN(rect.left), 'Invalid rect supplied. Rect must be an object containing "top", "right", "bottom", and "left" key values.')) return false;

	      var clampedX = vector.x >= rect.left && vector.x <= rect.right;
	      var clampedY = vector.y >= rect.top && vector.x <= rect.bottom;

	      if (clampedX && clampedY) {
	        pass = true;
	      }
	    }

	    return pass;
	  } else {
	    var intersectRect = getIntersectRect.apply(null, arguments);

	    if (!assert(intersectRect, 'Invalid elements specified.')) return false;

	    return intersectRect.width * intersectRect.height !== 0;
	  }
	}

	module.exports = hitTestRect;

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Requiem
	 * (c) VARIANTE (http://variante.io)
	 *
	 * This software is released under the MIT License:
	 * http://www.opensource.org/licenses/mit-license.php
	 */

	'use strict';

	function _instanceof(left, right) { if (right != null && right[Symbol.hasInstance]) { return right[Symbol.hasInstance](left); } else { return left instanceof right; } }

	var assert = __webpack_require__(6);
	var toElementArray = __webpack_require__(26);

	/**
	 * Removes a class(es) from DOM element(s).
	 *
	 * @param {HTMLElement|HTMLElement[]|Element|Element[]} element
	 * @param {string|string[]}                             className
	 *
	 * @alias module:requiem~utils.removeClass
	 */
	function removeClass(element, className) {
	  var elements = toElementArray(element);
	  var classes = [];
	  var n = elements.length;

	  if (!assert(typeof className === 'string' || _instanceof(className, Array), 'Invalid class name specified. Must be either a string or an array of strings.')) return;

	  if (typeof className === 'string') {
	    classes.push(className);
	  } else {
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

	module.exports = removeClass;

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Requiem
	 * (c) VARIANTE (http://variante.io)
	 *
	 * This software is released under the MIT License:
	 * http://www.opensource.org/licenses/mit-license.php
	 */

	'use strict';

	var assert = __webpack_require__(6);
	var toElementArray = __webpack_require__(26);

	/**
	 * Translates a DOM element.
	 *
	 * @param {HTMLElement|HTMLElement[]|Element|Element[]} element - Element(s) to
	 *                                                                perform the
	 *                                                                translate on.
	 * @param {Object} [properties] - Translation properties. (if unspecified, all
	 *                                translation values will be reset to 'initial').
	 * @param {number} [properties.top] - Top translation value.
	 * @param {number} [properties.right] - Right translation value.
	 * @param {number} [properties.bottom] - Bottom translation value.
	 * @param {number} [properties.left] - Left translation value.
	 * @param {number} [properties.units='px'] - Unit of translation value.
	 * @param {Object} [constraints] - Translation constraints.
	 * @param {number} [constraints.top] - Bounded top translation value.
	 * @param {number} [constraints.right] - Bounded right translation value.
	 * @param {number} [constraints.bottom] - Bounded bottom translation value.
	 * @param {number} [constraints.left] - Bounded left translation value.
	 *
	 * @return {Object} Translated properties.
	 *
	 * @alias module:requiem~utils.translate
	 */
	function translate(element, properties, constraints) {
	  var elements = toElementArray(element);
	  var n = elements.length;

	  if (properties) {
	    if (!assert(properties.top === undefined || !isNaN(properties.top), 'Top property must be a number.')) return null;
	    if (!assert(properties.right === undefined || !isNaN(properties.right), 'Right property must be a number.')) return null;
	    if (!assert(properties.bottom === undefined || !isNaN(properties.bottom), 'Bottom property must be a number.')) return null;
	    if (!assert(properties.left === undefined || !isNaN(properties.left), 'Left property must be a number.')) return null;

	    var units = properties.units || 'px';

	    if (constraints) {
	      if (!assert(constraints.top === undefined || !isNaN(constraints.top), 'Top constraint must be a number.')) return null;
	      if (!assert(constraints.right === undefined || !isNaN(constraints.right), 'Right constraint must be a number.')) return null;
	      if (!assert(constraints.bottom === undefined || !isNaN(constraints.bottom), 'Bottom constraint must be a number.')) return null;
	      if (!assert(constraints.left === undefined || !isNaN(constraints.left), 'Left constraint must be a number.')) return null;
	    }

	    var top = constraints && constraints.top !== undefined ? Math.min(properties.top, constraints.top) : properties.top;
	    var right = constraints && constraints.right !== undefined ? Math.min(properties.right, constraints.right) : properties.right;
	    var bottom = constraints && constraints.bottom !== undefined ? Math.min(properties.bottom, constraints.bottom) : properties.bottom;
	    var left = constraints && constraints.left !== undefined ? Math.min(properties.left, constraints.left) : properties.left;

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
	  } else {
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

	module.exports = translate;

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Requiem
	 * (c) VARIANTE (http://variante.io)
	 *
	 * This software is released under the MIT License:
	 * http://www.opensource.org/licenses/mit-license.php
	 */

	'use strict';

	var assert = __webpack_require__(6);
	var toElementArray = __webpack_require__(26);

	/**
	 * Translates a DOM element.
	 *
	 * @param {HTMLElement|HTMLElement[]|Element|Element[]} element - Element(s) to
	 *                                                                perform the
	 *                                                                3D translation.
	 * @param {Object} [properties] - Translation properties (if unspecified, all
	 *                                translation coordinates will be reset to 0).
	 * @param {number} [properties.x] - X-coordinate.
	 * @param {number} [properties.y] - Y-coordinate.
	 * @param {number} [properties.z] - Z-coordinate.
	 * @param {string} [properties.units='px'] - Unit of translations.
	 * @param {Object} [constraints] - Translation constraints.
	 * @param {number} [constraints.x] - Bounded x-coordinate.
	 * @param {number} [constraints.y] - Bounded y-coordinate.
	 * @param {number} [constraints.z] - Bounded z-coordinate.
	 *
	 * @return {Object} Translated properties.
	 *
	 * @alias module:requiem~utils.translate3d
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

	    var x = constraints && constraints.x !== undefined ? Math.min(properties.x, constraints.x) : properties.x;
	    var y = constraints && constraints.y !== undefined ? Math.min(properties.y, constraints.y) : properties.y;
	    var z = constraints && constraints.z !== undefined ? Math.min(properties.z, constraints.z) : properties.z;

	    var translateX = properties.x !== undefined ? 'translateX(' + x + units + ')' : null;
	    var translateY = properties.y !== undefined ? 'translateY(' + y + units + ')' : null;
	    var translateZ = properties.z !== undefined ? 'translateZ(' + z + units + ')' : null;
	    var transforms = '';

	    if (translateX) transforms += transforms === '' ? translateX : ' ' + translateX;
	    if (translateY) transforms += transforms === '' ? translateY : ' ' + translateY;
	    if (translateZ) transforms += transforms === '' ? translateZ : ' ' + translateZ;

	    for (var i = 0; i < n; i++) {
	      elements[i].style.transform = transforms;
	    }

	    var t = {};

	    if (translateX) t.x = x;
	    if (translateY) t.y = y;
	    if (translateZ) t.z = z;

	    return t;
	  } else {
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

	module.exports = translate3d;

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	/**
	 * Requiem
	 * (c) VARIANTE (http://variante.io)
	 *
	 * This software is released under the MIT License:
	 * http://www.opensource.org/licenses/mit-license.php
	 */

	'use strict';

	var assert = __webpack_require__(6);
	var toElementArray = __webpack_require__(26);
	var getRect = __webpack_require__(42);

	/**
	 * Transforms a DOM element.
	 *
	 * @param {HTMLElement|HTMLElement[]|Element|Element[]} element - Element(s) to
	 *                                                                perform the
	 *                                                                transform on.
	 * @param {Object} [properties] - Transformation properties. (If unspecified,
	 *                                all transformation styles will be reset to
	 *                                'initial').
	 * @param {number} properties.width - Target width of the element.
	 * @param {number} properties.height - Target height of the element.
	 * @param {number} properties.aspectRatio - Target aspect ratio of the element.
	 *                                          If unspecified, it will be inferred
	 *                                          from the original element.
	 * @param {string} [properties.unit='px'] - Unit of width/height values.
	 * @param {string} [properties.type='default'] - Resizing constraint: 'default',
	 *                                               'contain', 'cover'.
	 * @param {Object} [constraints] - Transformation constraints.
	 * @param {number} [contraints.width] - Bounded width of the element.
	 * @param {number} [contraints.height] - Bounded height of the element.
	 *
	 * @return {Object} Transformed properties.
	 *
	 * @alias module:requiem~utils.transform
	 */
	function transform(element, properties, constraints) {
	  var elements = toElementArray(element);
	  var n = elements.length;

	  if (properties) {
	    if (!assert(properties.width === undefined || !isNaN(properties.width), 'Width property must be a number.')) return null;
	    if (!assert(properties.height === undefined || !isNaN(properties.height), 'Height property must be a number.')) return null;
	    if (!assert(properties.aspectRatio === undefined || !isNaN(properties.aspectRatio), 'Aspect ratio property must be a number.')) return null;

	    var rect = getRect(element);
	    var units = properties.units || 'px';
	    var aspectRatio = properties.aspectRatio !== undefined ? Number(properties.aspectRatio) : rect.width / rect.height;
	    var maxW = properties.width;
	    var maxH = properties.height;
	    var minW = properties.width;
	    var minH = properties.height;
	    var type = properties.type || 'default';

	    if (constraints && type !== 'default') {
	      assert(constraints.width === undefined || !isNaN(constraints.width), 'Width constraint must be a number.');
	      assert(constraints.height === undefined || !isNaN(constraints.height), 'Height constraint must be a number.');

	      if (type && type === 'cover') {
	        if (constraints.width !== undefined) minW = Math.min(constraints.width, minW);
	        if (constraints.width !== undefined) minH = Math.min(constraints.height, minH);
	      } else {
	        if (constraints.width !== undefined) maxW = Math.min(constraints.width, maxW);
	        if (constraints.height !== undefined) maxH = Math.min(constraints.height, maxH);
	      }
	    }

	    var w = undefined,
	        h = undefined;

	    if (type === 'contain') {
	      w = maxW > maxH ? maxH * aspectRatio : maxW;
	      h = maxW > maxH ? maxH : maxW / aspectRatio;

	      if (w > maxW) {
	        w = maxW;
	        h = w / aspectRatio;
	      } else if (h > maxH) {
	        h = maxH;
	        w = h * aspectRatio;
	      }
	    } else if (type === 'cover') {
	      w = minW > minH ? minH * aspectRatio : minW;
	      h = minW > minH ? minH : minW / aspectRatio;

	      if (w < minW) {
	        w = minW;
	        h = w / aspectRatio;
	      } else if (h < minH) {
	        h = minH;
	        w = h * aspectRatio;
	      }
	    } else {
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
	  } else {
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

	module.exports = transform;

/***/ }
/******/ ])
});
;