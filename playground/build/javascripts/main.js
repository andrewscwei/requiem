/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "javascripts/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	
	'use strict';
	
	var _requiem = __webpack_require__(1);
	
	var _requiem2 = _interopRequireDefault(_requiem);
	
	var _Playground = __webpack_require__(2);
	
	var _Playground2 = _interopRequireDefault(_Playground);
	
	var _Foo = __webpack_require__(3);
	
	var _Foo2 = _interopRequireDefault(_Foo);
	
	var _Bar = __webpack_require__(4);
	
	var _Bar2 = _interopRequireDefault(_Bar);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	_requiem2.default.register(_Playground2.default);
	_requiem2.default.register(_Foo2.default);
	_requiem2.default.register(_Bar2.default);
	_requiem2.default.sightread();

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	(function webpackUniversalModuleDefinition(root, factory) {
		if(true)
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
	/******/
	/******/ 	// The require function
	/******/ 	function __webpack_require__(moduleId) {
	/******/
	/******/ 		// Check if module is in cache
	/******/ 		if(installedModules[moduleId])
	/******/ 			return installedModules[moduleId].exports;
	/******/
	/******/ 		// Create a new module (and put it into the cache)
	/******/ 		var module = installedModules[moduleId] = {
	/******/ 			exports: {},
	/******/ 			id: moduleId,
	/******/ 			loaded: false
	/******/ 		};
	/******/
	/******/ 		// Execute the module function
	/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
	/******/
	/******/ 		// Flag the module as loaded
	/******/ 		module.loaded = true;
	/******/
	/******/ 		// Return the exports of the module
	/******/ 		return module.exports;
	/******/ 	}
	/******/
	/******/
	/******/ 	// expose the modules object (__webpack_modules__)
	/******/ 	__webpack_require__.m = modules;
	/******/
	/******/ 	// expose the module cache
	/******/ 	__webpack_require__.c = installedModules;
	/******/
	/******/ 	// __webpack_public_path__
	/******/ 	__webpack_require__.p = "";
	/******/
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
		
		var _injectModule = __webpack_require__(1);
		
		var _injectModule2 = _interopRequireDefault(_injectModule);
		
		var _polyfill = __webpack_require__(2);
		
		var _polyfill2 = _interopRequireDefault(_polyfill);
		
		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
		
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
		Object.defineProperty(requiem, 'version', { value: '0.27.3', writable: false });
		
		(0, _injectModule2.default)(requiem, 'dom', __webpack_require__(3));
		(0, _injectModule2.default)(requiem, 'events', __webpack_require__(37));
		(0, _injectModule2.default)(requiem, 'net', __webpack_require__(39));
		(0, _injectModule2.default)(requiem, 'enums', __webpack_require__(42));
		(0, _injectModule2.default)(requiem, 'ui', __webpack_require__(45));
		(0, _injectModule2.default)(requiem, 'utils', __webpack_require__(46));
		
		(0, _polyfill2.default)();
		
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
		
		'use strict';
		
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
		
		'use strict';
		
		/**
		 * Applies special polyfills to the browser window (i.e. IE happiness).
		 *
		 * @alias module:requiem~helpers.polyfill
		 */
		
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
		
		'use strict';
		
		/**
		 * Collection of DOM manipulation methods.
		 *
		 * @namespace module:requiem~dom
		 */
		
		var dom = {};
		
		Object.defineProperty(dom, 'createElement', { value: __webpack_require__(4), writable: false, enumerable: true });
		Object.defineProperty(dom, 'getClassRegistry', { value: __webpack_require__(8), writable: false, enumerable: true });
		Object.defineProperty(dom, 'getDataRegistry', { value: __webpack_require__(9), writable: false, enumerable: true });
		Object.defineProperty(dom, 'namespace', { value: __webpack_require__(10), writable: false, enumerable: true });
		Object.defineProperty(dom, 'ready', { value: __webpack_require__(11), writable: false, enumerable: true });
		Object.defineProperty(dom, 'register', { value: __webpack_require__(12), writable: false, enumerable: true });
		Object.defineProperty(dom, 'sightread', { value: __webpack_require__(14), writable: false, enumerable: true });
		
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
		
		var _assertType = __webpack_require__(5);
		
		var _assertType2 = _interopRequireDefault(_assertType);
		
		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
		
		/**
		 * Creates a DOM element from the provided string.
		 *
		 * @param {string} value - String describing the DOM element.
		 *
		 * @return {Node} DOM element.
		 *
		 * @alias module:requiem~dom.createElement
		 */
		function createElement(value) {
		  if (!document) return null;
		
		  (0, _assertType2.default)(value, 'string', true, 'Value must be a string');
		
		  var div = document.createElement('div');
		  div.innerHTML = value;
		  return div.firstChild;
		}
		
		module.exports = createElement;
	
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
		  } else if (type instanceof Array) {
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
		
		'use strict';
		
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
		
		'use strict';
		
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
		        return value.constructor === Array;
		
		      default:
		        return false;
		    }
		  } else {
		    return value instanceof type;
		  }
		}
		
		module.exports = checkType;
	
	/***/ },
	/* 8 */
	/***/ function(module, exports) {
	
		/**
		 * Requiem
		 * (c) VARIANTE (http://variante.io)
		 *
		 * This software is released under the MIT License:
		 * http://www.opensource.org/licenses/mit-license.php
		 */
		
		'use strict';
		
		/**
		 * Gets the class registry.
		 *
		 * @return {Object} The class registry.
		 *
		 * @alias module:requiem~dom.getClassRegistry
		 */
		
		function getClassRegistry() {
		  if (window._classRegistry === undefined) window._classRegistry = {};
		  return window._classRegistry;
		}
		
		module.exports = getClassRegistry;
	
	/***/ },
	/* 9 */
	/***/ function(module, exports) {
	
		/**
		 * Requiem
		 * (c) VARIANTE (http://variante.io)
		 *
		 * This software is released under the MIT License:
		 * http://www.opensource.org/licenses/mit-license.php
		 */
		
		'use strict';
		
		/**
		 * Gets the data registry.
		 *
		 * @return {Object} The data registry.
		 *
		 * @alias module:requiem~dom.getDataRegistry
		 */
		
		function getDataRegistry() {
		  if (window._dataRegistry === undefined) window._dataRegistry = {};
		  return window._dataRegistry;
		}
		
		module.exports = getDataRegistry;
	
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
		
		var _assertType = __webpack_require__(5);
		
		var _assertType2 = _interopRequireDefault(_assertType);
		
		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
		
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
		  (0, _assertType2.default)(path, 'string', true, 'Invalid parameter: path');
		  (0, _assertType2.default)(scope, 'object', true, 'Invalid optional parameter: scope');
		
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
	/* 11 */
	/***/ function(module, exports, __webpack_require__) {
	
		/**
		 * Requiem
		 * (c) VARIANTE (http://variante.io)
		 *
		 * This software is released under the MIT License:
		 * http://www.opensource.org/licenses/mit-license.php
		 */
		
		'use strict';
		
		var _assertType = __webpack_require__(5);
		
		var _assertType2 = _interopRequireDefault(_assertType);
		
		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
		
		/**
		 * Invokes a callback when the DOM is ready.
		 *
		 * @param {Function} callback - Function invoked when the DOM is ready.
		 *
		 * @alias module:requiem~dom.ready
		 */
		function ready(callback) {
		  (0, _assertType2.default)(callback, 'function', false, 'Invalid parameter: callback');
		
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
		
		var _getClassRegistry = __webpack_require__(8);
		
		var _getClassRegistry2 = _interopRequireDefault(_getClassRegistry);
		
		var _namespace = __webpack_require__(10);
		
		var _namespace2 = _interopRequireDefault(_namespace);
		
		var _assert = __webpack_require__(6);
		
		var _assert2 = _interopRequireDefault(_assert);
		
		var _assertType = __webpack_require__(5);
		
		var _assertType2 = _interopRequireDefault(_assertType);
		
		var _getFunctionName = __webpack_require__(13);
		
		var _getFunctionName2 = _interopRequireDefault(_getFunctionName);
		
		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
		
		/**
		 * Registers a controller class with Requiem to be used for instantiating
		 * custom elements during the sighreading process.
		 *
		 * @param {Class}  c   - Class to be registered.
		 * @param {string} [n] - Namespace of class.
		 *
		 * @return {Class} The registered class.
		 *
		 * @alias module:requiem~dom.register
		 */
		function register(c, n) {
		  (0, _assertType2.default)(c, 'function', false, 'Invalid class provided');
		  (0, _assertType2.default)(n, 'string', true, 'Invalid optional parameter: namespace');
		
		  var className = (0, _getFunctionName2.default)(c);
		
		  if (typeof n === 'string') {
		    var groups = n.split('.');
		    className = groups.pop();
		    n = groups.join('.');
		  }
		
		  if (!(0, _assert2.default)((0, _namespace2.default)(n, (0, _getClassRegistry2.default)())[className] === undefined, 'Class name ' + className + ' is already registered')) return;
		  (0, _namespace2.default)(n, (0, _getClassRegistry2.default)())[className] = c;
		
		  return c;
		}
		
		module.exports = register;
	
	/***/ },
	/* 13 */
	/***/ function(module, exports) {
	
		/**
		 * Requiem
		 * (c) VARIANTE (http://variante.io)
		 *
		 * This software is released under the MIT License:
		 * http://www.opensource.org/licenses/mit-license.php
		 */
		
		'use strict';
		
		/**
		 * Gets the name of a function/class.
		 *
		 * @param  {Function} f - The function/class.
		 *
		 * @return {string} Name of the function/class.
		 *
		 * @alias module:requiem~helpers.getFunctionName
		 */
		
		function getFunctionName(f) {
		  if (!f) return;
		  if (f.name) return f.name;
		
		  var regex = /function\s([^(]{1,})\(/;
		  var name = regex.exec(f.toString());
		
		  return name && name.length > 1 ? name[1].trim() : '';
		}
		
		module.exports = getFunctionName;
	
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
		
		var _getClassRegistry = __webpack_require__(8);
		
		var _getClassRegistry2 = _interopRequireDefault(_getClassRegistry);
		
		var _assert = __webpack_require__(6);
		
		var _assert2 = _interopRequireDefault(_assert);
		
		var _assertType = __webpack_require__(5);
		
		var _assertType2 = _interopRequireDefault(_assertType);
		
		var _getInstanceNameFromElement = __webpack_require__(15);
		
		var _getInstanceNameFromElement2 = _interopRequireDefault(_getInstanceNameFromElement);
		
		var _getControllerClassFromElement = __webpack_require__(17);
		
		var _getControllerClassFromElement2 = _interopRequireDefault(_getControllerClassFromElement);
		
		var _getControllerClassNameFromElement = __webpack_require__(18);
		
		var _getControllerClassNameFromElement2 = _interopRequireDefault(_getControllerClassNameFromElement);
		
		var _Directive = __webpack_require__(16);
		
		var _Directive2 = _interopRequireDefault(_Directive);
		
		var _hasChild = __webpack_require__(36);
		
		var _hasChild2 = _interopRequireDefault(_hasChild);
		
		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
		
		/**
		 * Crawls a DOM node and performs transformations on child nodes marked with
		 * Requiem attributes, such as instantiating controller classes and assigning
		 * instance names. Transformations are also applied to the specified DOM node,
		 * not just its children.
		 *
		 * @param {Node}   [element=document] - Target element for sightreading. By
		 *                                      default this will be the document.
		 * @param {Object} [exclusive=false]  - Specifies whether the root node should
		 *                                      be excluded from the sightread.
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
		  var classRegistry = (0, _getClassRegistry2.default)();
		  var exclusive = false;
		
		  if (arguments.length === 1) {
		    var arg = arguments[0];
		    (0, _assertType2.default)(arg, [Node, 'boolean'], true);
		
		    if (arg instanceof Node) {
		      element = arg;
		    } else if (typeof obj === 'boolean') {
		      exclusive = arg;
		    }
		  } else if (arguments.length === 2) {
		    var arg1 = arguments[0];
		    var arg2 = arguments[1];
		
		    (0, _assertType2.default)(arg1, Node, true);
		    (0, _assertType2.default)(arg2, 'boolean', true);
		
		    if (arg1 !== undefined) element = arg1;
		    if (arg2 !== undefined) exclusive = arg2;
		  }
		
		  if (element === document) exclusive = true;
		
		  if (!exclusive) {
		    var instanceName = (0, _getInstanceNameFromElement2.default)(element);
		    var ControllerClass = (0, _getControllerClassFromElement2.default)(element);
		
		    (0, _assertType2.default)(ControllerClass, 'function', false, 'Class \'' + (0, _getControllerClassNameFromElement2.default)(element) + '\' is not found in specified controller scope: ' + classRegistry);
		
		    return new ControllerClass({
		      element: element,
		      name: instanceName,
		      children: sightread(element, true)
		    });
		  } else {
		    var Element = __webpack_require__(19);
		    var children = null;
		
		    if (!(0, _assert2.default)(element instanceof Node || element instanceof Element || document && element === document, 'Element must be an instance of an Node or the DOM itself.')) return null;
		    if (element instanceof Element) element = element.element;
		
		    var nodeList = element.querySelectorAll('[' + _Directive2.default.CLASS + '], [' + _Directive2.default.INSTANCE + ']');
		    var qualifiedChildren = _filterParentElements(nodeList);
		    var n = qualifiedChildren.length;
		
		    for (var i = 0; i < n; i++) {
		      var child = qualifiedChildren[i];
		      var instanceName = (0, _getInstanceNameFromElement2.default)(child);
		      var ControllerClass = (0, _getControllerClassFromElement2.default)(child, classRegistry);
		
		      (0, _assertType2.default)(ControllerClass, 'function', false, 'Class \'' + (0, _getControllerClassNameFromElement2.default)(child) + '\' is not found in specified controller scope: ' + classRegistry);
		
		      var m = new ControllerClass({
		        element: child,
		        name: instanceName,
		        children: sightread(child, true)
		      });
		
		      if (instanceName && instanceName.length > 0) {
		        if (!children) children = {};
		
		        if (!children[instanceName]) {
		          children[instanceName] = m;
		        } else {
		          if (children[instanceName] instanceof Array) {
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
		
		      if ((0, _hasChild2.default)(parent, child)) {
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
		
		var Directive = __webpack_require__(16);
		
		/**
		 * Gets the instance name from a DOM element.
		 *
		 * @param  {Node} element - The DOM element.
		 *
		 * @return {string} The instance name.
		 *
		 * @alias module:requiem~helpers.getInstanceNameFromElement
		 */
		function getInstanceNameFromElement(element) {
		  return element.getAttribute(Directive.INSTANCE);
		}
		
		module.exports = getInstanceNameFromElement;
	
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
		
		'use strict';
		
		/**
		 * Enum for custom DOM directives/attributes.
		 *
		 * @readonly
		 * @enum {string}
		 * @alias module:requiem~enums.Directive
		 * @see {@link module:requiem~dom.sightread}
		 */
		
		var Directive = {
		  /**
		   * Use this directive for attaching a controller class to a DOM element.
		   * Controller classes are automatically instantiated during the sightreading
		   * process.
		   */
		  CLASS: 'data-class',
		
		  /**
		   * Use this directive for assigning an instance name to a DOM element.
		   */
		  INSTANCE: 'data-instance',
		
		  /**
		   * Use this directive for managing DOM element states.
		   */
		  STATE: 'data-state',
		
		  /**
		   * Use this directive for referencing global shared data.
		   */
		  REF: 'data-ref',
		
		  /**
		   * Use this directive to map any property from the DOM to the controller.
		   */
		  PROPERTY: 'data-'
		};
		
		module.exports = Directive;
	
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
		
		var getControllerClassNameFromElement = __webpack_require__(18);
		var getInstanceNameFromElement = __webpack_require__(15);
		var getClassRegistry = __webpack_require__(8);
		var namespace = __webpack_require__(10);
		
		/**
		 * Gets the controller class from the DOM element.
		 *
		 * @param  {Node}   element
		 *
		 * @return {Class} The controller class.
		 *
		 * @alias module:requiem~helpers.getControllerClassFromElement
		 */
		function getControllerClassFromElement(element) {
		  var classRegistry = getClassRegistry();
		
		  var controllerClassName = getControllerClassNameFromElement(element);
		  var instanceName = getInstanceNameFromElement(element);
		  var controllerClass = controllerClassName ? namespace(controllerClassName, classRegistry) : undefined;
		
		  // If no controller class is specified but element is marked as an instance,
		  // default the controller class to Element.
		  if (!controllerClass && instanceName && instanceName.length > 0) {
		    controllerClass = __webpack_require__(19);
		  } else if (typeof controllerClass !== 'function') {
		    switch (controllerClassName) {
		      case 'Video':
		        controllerClass = __webpack_require__(31);
		        break;
		
		      case 'Element':
		        controllerClass = __webpack_require__(19);
		        break;
		
		      case 'Grid':
		        controllerClass = __webpack_require__(32);
		        break;
		
		      default:
		        controllerClass = null;
		    }
		  }
		
		  return controllerClass;
		}
		
		module.exports = getControllerClassFromElement;
	
	/***/ },
	/* 18 */
	/***/ function(module, exports, __webpack_require__) {
	
		/**
		 * Requiem
		 * (c) VARIANTE (http://variante.io)
		 *
		 * This software is released under the MIT License:
		 * http://www.opensource.org/licenses/mit-license.php
		 */
		
		'use strict';
		
		var Directive = __webpack_require__(16);
		
		/**
		 * Gets the controller class name from the DOM element.
		 *
		 * @param  {Node} element - The DOM element.
		 *
		 * @return {string} The controller class name.
		 *
		 * @alias module:requiem~helpers.getControllerClassNameFromElement
		 */
		function getControllerClassNameFromElement(element) {
		  return element.getAttribute(Directive.CLASS);
		}
		
		module.exports = getControllerClassNameFromElement;
	
	/***/ },
	/* 19 */
	/***/ function(module, exports, __webpack_require__) {
	
		/**
		 * Requiem
		 * (c) VARIANTE (http://variante.io)
		 *
		 * This software is released under the MIT License:
		 * http://www.opensource.org/licenses/mit-license.php
		 */
		
		'use strict';
		
		var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
		
		var _getDataRegistry = __webpack_require__(9);
		
		var _getDataRegistry2 = _interopRequireDefault(_getDataRegistry);
		
		var _assert = __webpack_require__(6);
		
		var _assert2 = _interopRequireDefault(_assert);
		
		var _assertType = __webpack_require__(5);
		
		var _assertType2 = _interopRequireDefault(_assertType);
		
		var _noval = __webpack_require__(20);
		
		var _noval2 = _interopRequireDefault(_noval);
		
		var _getFunctionName = __webpack_require__(13);
		
		var _getFunctionName2 = _interopRequireDefault(_getFunctionName);
		
		var _log = __webpack_require__(21);
		
		var _log2 = _interopRequireDefault(_log);
		
		var _validateAttribute = __webpack_require__(22);
		
		var _validateAttribute2 = _interopRequireDefault(_validateAttribute);
		
		var _getInstanceNameFromElement = __webpack_require__(15);
		
		var _getInstanceNameFromElement2 = _interopRequireDefault(_getInstanceNameFromElement);
		
		var _DirtyType = __webpack_require__(23);
		
		var _DirtyType2 = _interopRequireDefault(_DirtyType);
		
		var _NodeState = __webpack_require__(24);
		
		var _NodeState2 = _interopRequireDefault(_NodeState);
		
		var _EventType = __webpack_require__(25);
		
		var _EventType2 = _interopRequireDefault(_EventType);
		
		var _Directive = __webpack_require__(16);
		
		var _Directive2 = _interopRequireDefault(_Directive);
		
		var _ElementUpdateDelegate = __webpack_require__(26);
		
		var _ElementUpdateDelegate2 = _interopRequireDefault(_ElementUpdateDelegate);
		
		var _getRect = __webpack_require__(28);
		
		var _getRect2 = _interopRequireDefault(_getRect);
		
		var _sightread = __webpack_require__(14);
		
		var _sightread2 = _interopRequireDefault(_sightread);
		
		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
		
		function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }
		
		function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
		
		/**
		 * @class
		 *
		 * Generic DOM element wrapper.
		 *
		 * @alias module:requiem~ui.Element
		 */
		
		var Element = (function () {
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
		
		  function Element(init) {
		    _classCallCheck(this, Element);
		
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
		        else if ((typeof init === 'undefined' ? 'undefined' : _typeof(init)) === 'object') {
		            for (var key in init) {
		              if (this.hasOwnProperty(key)) {
		                switch (key) {
		                  case 'children':
		                    var children = init.children;
		                    for (var name in children) {
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
		    if (this.hasAttribute(_Directive2.default.REF)) {
		      var ref = this.getAttribute(_Directive2.default.REF);
		      var data = (0, _getDataRegistry2.default)()[ref];
		
		      if (data) this.setProperties(data);
		    }
		
		    // Scan for internal DOM element attributes prefixed with Directive.PROPERTY
		    // and generate properties from them.
		    var attributes = this.element.attributes;
		    var nAtributes = attributes.length;
		    var regex = new RegExp('^' + _Directive2.default.PROPERTY, 'i');
		
		    for (var i = 0; i < nAtributes; i++) {
		      var attribute = attributes[i];
		
		      if (!(0, _validateAttribute2.default)(attribute.name) || !regex.test(attribute.name)) continue;
		
		      // Generate camel case property name from the attribute.
		      var propertyName = attribute.name.replace(regex, '').replace(/-([a-z])/g, function (g) {
		        return g[1].toUpperCase();
		      });
		
		      Element.defineProperty(this, propertyName, {
		        defaultValue: this.getAttribute(attribute.name),
		        attribute: true,
		        dirtyType: _DirtyType2.default.DATA,
		        get: true,
		        set: true
		      }, 'properties');
		    }
		
		    (0, _log2.default)(this.toString() + ':new(', init, ')');
		
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
		
		  _createClass(Element, [{
		    key: 'init',
		
		    /**
		     * Initializes this Element instance. Must manually invoke.
		     */
		    value: function init() {
		      (0, _log2.default)(this.toString() + '::init()');
		
		      this.__set_node_state(_NodeState2.default.INITIALIZED);
		      this.updateDelegate.init();
		
		      for (var key in this.children) {
		        var child = this.children[key];
		
		        if (child instanceof Array) {
		          var n = child.length;
		
		          for (var i = 0; i < n; i++) {
		            var c = child[i];
		
		            if (c.nodeState === _NodeState2.default.IDLE || c.nodeState === _NodeState2.default.DESTROYED) {
		              c.init();
		            }
		          }
		        } else {
		          if (child.nodeState === _NodeState2.default.IDLE || child.nodeState === _NodeState2.default.DESTROYED) {
		            child.init();
		          }
		        }
		      }
		    }
		
		    /**
		     * Destroys this Element instance.
		     */
		
		  }, {
		    key: 'destroy',
		    value: function destroy() {
		      (0, _log2.default)(this.toString() + '::destroy()');
		
		      // Destroy all children first.
		      for (var key in this.children) {
		        var child = this.children[key];
		
		        if (child instanceof Array) {
		          var n = child.length;
		
		          for (var i = 0; i < n; i++) {
		            var c = child[i];
		
		            if (c.nodeState !== _NodeState2.default.DESTROYED) {
		              c.destroy();
		            }
		          }
		        } else {
		          if (child.nodeState !== _NodeState2.default.DESTROYED) {
		            child.destroy();
		          }
		        }
		      }
		
		      this.removeAllEventListeners();
		      this.updateDelegate.destroy();
		
		      this.__set_node_state(_NodeState2.default.DESTROYED);
		    }
		
		    /**
		     * Handler invoked whenever a visual update is required.
		     */
		
		  }, {
		    key: 'update',
		    value: function update() {
		      this.__set_node_state(_NodeState2.default.UPDATED);
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
		
		  }, {
		    key: 'respondsTo',
		    value: function respondsTo() {
		      var args = Array.prototype.slice.call(arguments);
		      var n = args.length;
		
		      if (!(0, _assert2.default)(n > 0, 'Too few arguments')) return;
		      if (!(0, _assert2.default)(this.nodeState === _NodeState2.default.IDLE, 'Responsiveness must be defined when the node state of this element is IDLE')) return;
		
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
		     *                                                 Requiem Elements or Nodes.
		     * @param {string} [name] - The name of the child/children to be added.
		     *                          Typically a name is required. If it is not
		     *                          specified, this method will attempt to deduct the
		     *                          name from the provided child/children. This method
		     *                          fails if no name is specified or deducted. If there
		     *                          exists another child with the same name, the added
		     *                          child will be grouped together with the existing
		     *                          child.
		     * @param {boolean} [prepend=false] - Specifies whether the child is prepended
		     *                                    to this element instead of appended.
		     *
		     * @return {Element|Element[]} The added element(s).
		     */
		
		  }, {
		    key: 'addChild',
		    value: function addChild(child, name, prepend) {
		      if (!(0, _assert2.default)(child !== undefined, 'Parameter \'child\' must be specified')) return null;
		      if (typeof prepend !== 'boolean') prepend = false;
		
		      if (child instanceof Array) {
		        var n = child.length;
		        var children = [];
		
		        if (prepend) {
		          for (var i = n - 1; i >= 0; i--) {
		            var c = child[i];
		            children.push(this.addChild(c, name, true));
		          }
		        } else {
		          for (var i = 0; i < n; i++) {
		            var c = child[i];
		            children.push(this.addChild(c, name));
		          }
		        }
		
		        return children;
		      } else {
		        if (!(0, _assertType2.default)(child, [Node, Element], false, 'Invalid child specified. Child must be an instance of Node or Requiem Element.')) return null;
		
		        if (child instanceof Node) {
		          if ((0, _noval2.default)(name)) name = (0, _getInstanceNameFromElement2.default)(child);
		          if (!(0, _assert2.default)(!(0, _noval2.default)(name), 'Either child name was unprovided or it cannot be deducted from the specified child')) return null;
		
		          child.removeAttribute(_Directive2.default.INSTANCE);
		          child.setAttribute(_Directive2.default.INSTANCE, name);
		          child = (0, _sightread2.default)(child);
		        } else {
		          if ((0, _noval2.default)(name)) name = child.name;
		          if (!(0, _assert2.default)(!(0, _noval2.default)(name), 'Either child name was unprovided or it cannot be deducted from the specified child')) return null;
		
		          child.name = name;
		        }
		
		        if (this.children[name]) {
		          if (this.children[name] instanceof Array) {
		            this.children[name].push(child);
		          } else {
		            var a = [this.children[name]];
		            a.push(child);
		            this.children[name] = a;
		          }
		        } else {
		          this.children[name] = child;
		        }
		
		        if (child.nodeState === _NodeState2.default.IDLE || child.nodeState === _NodeState2.default.DESTROYED) {
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
		          if (prepend) {
		            this.element.insertBefore(child.element, this.element.firstChild);
		          } else {
		            this.element.appendChild(child.element);
		          }
		        }
		
		        return child;
		      }
		    }
		
		    /**
		     * Determines if this Element instance contains the specified child.
		     *
		     * @param {Element|Node|string} child - A child is a Requiem Element, or Node.
		     *                                      It can also be a string of child
		     *                                      name(s) separated by '.'.
		     *
		     * @return {boolean} True if this Element instance has the specified child,
		     *                   false otherwise.
		     */
		
		  }, {
		    key: 'hasChild',
		    value: function hasChild(child) {
		      if (!(0, _assert2.default)(child !== undefined, 'Child is undefined')) return false;
		
		      if (typeof child === 'string') {
		        return !(0, _noval2.default)(this.getChild(child));
		      } else {
		        var node = child instanceof Element ? child.element : child;
		
		        while (!(0, _noval2.default)(node) && node !== document) {
		          node = node.parentNode;
		          if (node === this.element) return true;
		        }
		
		        return false;
		      }
		    }
		
		    /**
		     * Removes a child or multiple children from this Element instance.
		     *
		     * @param {Node|Element|Array|string} child - Child/children to be removed.
		     *                                            This can either be an Element or
		     *                                            Node instance or array. It can
		     *                                            also be a string namespace of
		     *                                            the target child/children.
		     *
		     * @return {Element|Element[]} The removed element(s).
		     */
		
		  }, {
		    key: 'removeChild',
		    value: function removeChild(child) {
		      if (!(0, _assert2.default)(!(0, _noval2.default)(child, true), 'No valid child specified')) return;
		
		      // If child is a string, treat each entry separated by '.' as a child name.
		      if (typeof child === 'string') {
		        this.removeChild(this.getChild(child));
		      }
		      // If child is an array, remove each element inside recursively.
		      else if (child instanceof Array) {
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
		
		            if (child instanceof Element) {
		              e = child.element;
		            } else if (child instanceof Node) {
		              e = child;
		            }
		
		            // No valid DOM element found? Terminate.
		            if ((0, _noval2.default)(e)) return null;
		
		            for (var key in this.children) {
		              var c = this.children[key];
		
		              if (c instanceof Array) {
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
		              } else if (c instanceof Element) {
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
		
		  }, {
		    key: 'getChild',
		    value: function getChild(name, recursive) {
		      if (!(0, _assertType2.default)(name, 'string', false, 'Child name must be specified')) return null;
		      if (!(0, _assertType2.default)(recursive, 'boolean', true, 'Parameter \'recursive\', if specified, must be a boolean')) return null;
		
		      recursive = recursive === undefined ? true : recursive;
		
		      var targets = name.split('.');
		      var currentTarget = targets.shift();
		      var child = this.children[currentTarget];
		
		      if (recursive && targets.length > 0) {
		        if (child instanceof Array) {
		          var children = [];
		          var n = child.length;
		
		          for (var i = 0; i < n; i++) {
		            var c = child[i];
		
		            if (c instanceof Element) {
		              children.push(c.getChild(targets.join('.')));
		            } else {
		              children.push(null);
		            }
		          }
		
		          if (!(0, _noval2.default)(children, true)) {
		            return children;
		          } else {
		            return null;
		          }
		        } else if (child instanceof Element) {
		          return child.getChild(targets.join('.'));
		        } else {
		          return null;
		        }
		      } else if (child instanceof Element) {
		        return child;
		      } else if (!(0, _noval2.default)(child, true)) {
		        return child;
		      } else {
		        return null;
		      }
		    }
		
		    /**
		     * @see Node#addEventListener
		     */
		
		  }, {
		    key: 'addEventListener',
		    value: function addEventListener() {
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
		
		        if (event === _EventType2.default.MOUSE.CLICK_OUTSIDE) {
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
		
		      if (window && event === _EventType2.default.MOUSE.CLICK_OUTSIDE) {
		        window.addEventListener(_EventType2.default.MOUSE.CLICK, listener, useCapture);
		      } else {
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
		
		  }, {
		    key: 'hasEventListener',
		    value: function hasEventListener(event, listener) {
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
		    }
		
		    /**
		     * @see Node#removeEventListener
		     */
		
		  }, {
		    key: 'removeEventListener',
		    value: function removeEventListener() {
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
		        if (window && event === _EventType2.default.MOUSE.CLICK_OUTSIDE) {
		          window.removeEventListener(_EventType2.default.MOUSE.CLICK, listener, useCapture);
		        } else {
		          this.element.removeEventListener.apply(this.element, arguments);
		        }
		      }
		    }
		
		    /**
		     * Removes all cached event listeners from this Element instance.
		     */
		
		  }, {
		    key: 'removeAllEventListeners',
		    value: function removeAllEventListeners() {
		      if (this._listenerMap) {
		        for (var event in this._listenerMap) {
		          this.removeEventListener(event);
		        }
		      }
		    }
		
		    /**
		     * Dispatches an event.
		     *
		     * @param {Event} event
		     */
		
		  }, {
		    key: 'dispatchEvent',
		    value: function dispatchEvent(event) {
		      this.element.dispatchEvent(event);
		    }
		
		    /**
		     * Adds class(es) to this Element instance.
		     *
		     * @param {Stirng|Array} className
		     */
		
		  }, {
		    key: 'addClass',
		    value: function addClass(className) {
		      var classes = [];
		
		      if (!(0, _assert2.default)(typeof className === 'string' || className instanceof Array, 'Invalid class name specified. Must be either a string or an array of strings.')) return;
		
		      if (typeof className === 'string') {
		        classes.push(className);
		      } else {
		        classes = className;
		      }
		
		      var n = classes.length;
		
		      for (var i = 0; i < n; i++) {
		        var c = classes[i];
		
		        if (!(0, _assert2.default)(typeof c === 'string', 'Invalid class detected: ' + c)) continue;
		        if (this.hasClass(c)) continue;
		
		        this.element.className = this.element.className + (this.element.className === '' ? '' : ' ') + c;
		      }
		    }
		
		    /**
		     * Removes class(es) from this Element instance.
		     *
		     * @param {Stirng|Array} className
		     */
		
		  }, {
		    key: 'removeClass',
		    value: function removeClass(className) {
		      var classes = [];
		
		      if (!(0, _assert2.default)(typeof className === 'string' || className instanceof Array, 'Invalid class name specified. Must be either a string or an array of strings.')) return;
		
		      if (typeof className === 'string') {
		        classes.push(className);
		      } else {
		        classes = className;
		      }
		
		      var n = classes.length;
		
		      for (var i = 0; i < n; i++) {
		        var c = classes[i];
		
		        if (!(0, _assert2.default)(typeof c === 'string', 'Invalid class detected: ' + c)) continue;
		        var regex = new RegExp('^' + c + '\\s+|\\s+' + c + '|^' + c + '$', 'g');
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
		
		  }, {
		    key: 'hasClass',
		    value: function hasClass(className) {
		      if (!(0, _assert2.default)(typeof className === 'string', 'Invalid class detected: ' + className)) return false;
		
		      return this.classes.indexOf(className) > -1;
		    }
		
		    /**
		     * Gets the value of the property with the specified name.
		     *
		     * @param {string} key - Name of the property.
		     *
		     * @return {*} Value of the property.
		     */
		
		  }, {
		    key: 'getProperty',
		    value: function getProperty(key) {
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
		
		  }, {
		    key: 'hasProperty',
		    value: function hasProperty(key) {
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
		
		  }, {
		    key: 'setProperty',
		    value: function setProperty(key, value, attributed) {
		      if (this.hasProperty(key)) {
		        this.properties[key] = value;
		      } else {
		        Element.defineProperty(this, key, {
		          defaultValue: value,
		          dirtyType: _DirtyType2.default.DATA,
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
		
		  }, {
		    key: 'setProperties',
		    value: function setProperties(descriptor) {
		      (0, _assertType2.default)(descriptor, 'object', false);
		
		      if (!descriptor) return;
		
		      for (var key in descriptor) {
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
		
		  }, {
		    key: 'getAttribute',
		    value: function getAttribute(key) {
		      var value = this.element.getAttribute(key);
		
		      if (value === '') return true;
		      if (value === undefined || value === null) return null;
		
		      try {
		        return JSON.parse(value);
		      } catch (err) {
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
		
		  }, {
		    key: 'setAttribute',
		    value: function setAttribute(key, value) {
		      if (!(0, _assert2.default)((0, _validateAttribute2.default)(key), 'Attribute \'' + key + '\' is reserved')) return;
		
		      if (value === undefined || value === null || value === false) {
		        this.element.removeAttribute(key);
		      } else if (value === true) {
		        this.element.setAttribute(key, '');
		      } else {
		        this.element.setAttribute(key, value);
		      }
		
		      if (key === 'disabled') {
		        this.setDirty(_DirtyType2.default.STATE);
		      }
		    }
		
		    /**
		     * Removes an attribute from this Element instance.
		     *
		     * @param {string} key - Name of the attribute.
		     */
		
		  }, {
		    key: 'removeAttribute',
		    value: function removeAttribute(key) {
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
		
		  }, {
		    key: 'hasAttribute',
		    value: function hasAttribute(key) {
		      var value = this.element.getAttribute(key);
		
		      if (value === '') return true;
		      return !(0, _noval2.default)(value);
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
		
		  }, {
		    key: 'getStyle',
		    value: function getStyle(key, isComputed, isolateUnits) {
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
		
		  }, {
		    key: 'setStyle',
		    value: function setStyle(key, value) {
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
		
		  }, {
		    key: 'removeStyle',
		    value: function removeStyle(key) {
		      return Element.removeStyle(this, key);
		    }
		
		    /**
		     * Checks to see if this Element instance has the specified inline CSS rule.
		     *
		     * @param {string} key - Name of the style.
		     *
		     * @return {boolean}
		     */
		
		  }, {
		    key: 'hasStyle',
		    value: function hasStyle(key) {
		      return Element.hasStyle(this, key);
		    }
		
		    /**
		     * Creates the associated DOM element from scratch.
		     *
		     * @return {Element}
		     */
		
		  }, {
		    key: 'render',
		    value: function render() {
		      return document.createElement('div');
		    }
		
		    /**
		     * @see ElementUpdateDelegate#isDirty
		     */
		
		  }, {
		    key: 'isDirty',
		    value: function isDirty() {
		      return this.updateDelegate.isDirty.apply(this.updateDelegate, arguments);
		    }
		
		    /**
		     * @see ElementUpdateDelegate#setDirty
		     */
		
		  }, {
		    key: 'setDirty',
		    value: function setDirty() {
		      return this.updateDelegate.setDirty.apply(this.updateDelegate, arguments);
		    }
		
		    /**
		     * Gets the string representation of this Element instance.
		     *
		     * @return {string}
		     */
		
		  }, {
		    key: 'toString',
		    value: function toString() {
		      return '[' + (0, _getFunctionName2.default)(this.constructor) + '{' + this.name + '}]';
		    }
		
		    /**
		     * Defines all properties.
		     *
		     * @protected
		     */
		
		  }, {
		    key: '__define_properties',
		    value: function __define_properties() {
		      var _this2 = this;
		
		      /**
		       * Internal DOM element.
		       *
		       * @property {Node}
		       */
		      Element.defineProperty(this, 'element', {
		        get: function get(value) {
		          if (!_this2.__private__.element) {
		            var e = _this2.render();
		
		            if (_this2.__validate_element(e)) _this2.__private__.element = e;
		
		            var children = (0, _sightread2.default)(e, true);
		
		            for (var childName in children) {
		              _this2.addChild(children[childName], childName);
		            }
		          }
		          return _this2.__private__.element;
		        },
		        set: function set(value) {
		          if (_this2.__private__.element) return _this2.__private__.element;
		          if (_this2.__validate_element(value)) return value;
		          return null;
		        }
		      });
		
		      /**
		       * ID of this Element instance.
		       *
		       * @property {string}
		       */
		      Object.defineProperty(this, 'id', {
		        get: function get() {
		          return _this2.element.id;
		        },
		        set: function set(value) {
		          return _this2.element.setAttribute('id', value);
		        }
		      });
		
		      /**
		       * Instance name of this Element instance. Once set, it cannot be changed.
		       *
		       * @property {string}
		       */
		      Object.defineProperty(this, 'name', {
		        get: function get() {
		          var s = _this2.element.getAttribute(_Directive2.default.INSTANCE);
		          if (!s || s === '') return null;
		          return s;
		        },
		        set: function set(value) {
		          if (!value || value === '') return;
		          if (!_this2.name) _this2.element.setAttribute(_Directive2.default.INSTANCE, value);
		        }
		      });
		
		      /**
		       * Class list of this Element instance.
		       *
		       * @property {Array}
		       */
		      Object.defineProperty(this, 'classes', {
		        get: function get() {
		          return _this2.element.className.split(' ');
		        },
		        set: function set(value) {
		          return _this2.element.className = value.join(' ');
		        }
		      });
		
		      /**
		       * Gets the attributes of this Element instance.
		       *
		       * @property {NamedNodeMap}
		       */
		      Object.defineProperty(this, 'attributes', { get: function get() {
		          return _this2.element.attributes;
		        } });
		
		      /**
		       * Gets the CSS styles of this Element instance.
		       *
		       * @property {ElementCSSInlineStyle}
		       */
		      Object.defineProperty(this, 'styles', { get: function get() {
		          return _this2.element.style;
		        } });
		
		      /**
		       * Current node state of this Element instance.
		       *
		       * @property {NodeState}
		       */
		      Element.defineProperty(this, 'nodeState', { defaultValue: _NodeState2.default.IDLE, get: true });
		
		      /**
		       * State of this Element instance (depicted by Directive.State).
		       *
		       * @property {string}
		       */
		      Object.defineProperty(this, 'state', {
		        get: function get() {
		          var s = _this2.element.getAttribute(_Directive2.default.STATE);
		          if (!s || s === '') return null;
		          return s;
		        },
		        set: function set(value) {
		          if (_this2.state === value) return;
		
		          var oldValue = _this2.state;
		
		          if (value === null || value === undefined) {
		            _this2.element.removeAttribute(_Directive2.default.STATE);
		          } else {
		            _this2.element.setAttribute(_Directive2.default.STATE, value);
		          }
		
		          _this2.updateDelegate.setDirty(_DirtyType2.default.STATE);
		
		          var event = new CustomEvent(_EventType2.default.OBJECT.STATE, {
		            detail: {
		              property: 'state',
		              oldValue: oldValue,
		              newValue: value
		            }
		          });
		
		          _this2.dispatchEvent(event);
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
		        dirtyType: _DirtyType2.default.DATA,
		        eventType: _EventType2.default.DATA.DATA_CHANGE
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
		      Element.defineProperty(this, 'updateDelegate', { defaultValue: new _ElementUpdateDelegate2.default(this), get: true });
		
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
		        get: function get() {
		          var count = 0;
		
		          for (var k in _this2.children) {
		            var child = _this2.children[k];
		
		            if (child instanceof Element) {
		              count += 1;
		            } else if (child instanceof Array) {
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
		        get: function get() {
		          return _this2.element.innerHTML;
		        },
		        set: function set(value) {
		          return _this2.element.innerHTML = value;
		        }
		      });
		
		      /**
		       * Gets the rect of this Element instance.
		       *
		       * @property {Object}
		       */
		      Object.defineProperty(this, 'rect', {
		        get: function get() {
		          return (0, _getRect2.default)(_this2);
		        }
		      });
		
		      /**
		       * Gets/sets the opacity of this Element instance.
		       */
		      Object.defineProperty(this, 'opacity', {
		        get: function get() {
		          return _this2.getStyle('opacity', true);
		        },
		        set: function set(value) {
		          return _this2.setStyle('opacity', value);
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
		        set: function set(value) {
		          (0, _assertType2.default)(value, 'boolean', true);
		
		          if (value) {
		            _this2.setStyle('display', 'none');
		          } else {
		            if (_this2.getStyle('display') === 'none') {
		              _this2.removeStyle('display');
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
		        set: function set(value) {
		          (0, _assertType2.default)(value, 'boolean', false);
		
		          if (value) {
		            _this2.setStyle('visibility', 'hidden');
		          } else {
		            if (_this2.getStyle('visibility') === 'hidden') {
		              _this2.removeStyle('visibility');
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
		        get: function get() {
		          return _this2.hasAttribute('disabled') ? _this2.getAttribute('disabled') : false;
		        },
		        set: function set(value) {
		          return _this2.setAttribute('disabled', value ? true : false);
		        }
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
		
		  }, {
		    key: '__validate_element',
		    value: function __validate_element(element) {
		      return true;
		      // return assert(element instanceof Node, 'Element validation failed');
		    }
		
		    /**
		     * Sets the Element's node state.
		     *
		     * @param  {NodeState} nodeState - Node state.
		     *
		     * @private
		     */
		
		  }, {
		    key: '__set_node_state',
		    value: function __set_node_state(nodeState) {
		      this.__private__.nodeState = nodeState;
		    }
		  }], [{
		    key: 'defineProperty',
		    value: function defineProperty(element, propertyName, descriptor, scope) {
		      (0, _assertType2.default)(element, Element, false, 'Parameter \'element\' must be an Element instance');
		      (0, _assertType2.default)(descriptor, 'object', false, 'Parameter \'descriptor\' must be an object literal');
		      (0, _assertType2.default)(descriptor.configurable, 'boolean', true, 'Optional configurable key in descriptor must be a boolean');
		      (0, _assertType2.default)(descriptor.enumerable, 'boolean', true, 'Optional enumerable key in descriptor must be a boolean');
		      (0, _assertType2.default)(descriptor.writable, 'boolean', true, 'Optional writable key in descriptor must be a boolean');
		      (0, _assertType2.default)(descriptor.unique, 'boolean', true, 'Optional unique key in descriptor must be a boolean');
		      (0, _assertType2.default)(descriptor.dirtyType, 'number', true, 'Optional dirty type must be of DirtyType enum (number)');
		      (0, _assertType2.default)(descriptor.eventType, 'string', true, 'Optional event type must be a string');
		      (0, _assertType2.default)(descriptor.attribute, 'boolean', true, 'Optional attribute must be a boolean');
		      (0, _assertType2.default)(descriptor.onChange, 'function', true, 'Optional change handler must be a function');
		      (0, _assertType2.default)(scope, 'string', true, 'Optional parameter \'scope\' must be a string');
		      (0, _assert2.default)((0, _validateAttribute2.default)(descriptor.attribute), 'Attribute \'' + descriptor.attribute + '\' is reserved');
		
		      var dirtyType = descriptor.dirtyType;
		      var defaultValue = descriptor.defaultValue;
		      var attribute = descriptor.attribute;
		      var attributeName = _Directive2.default.PROPERTY + propertyName.replace(/([A-Z])/g, function ($1) {
		        return '-' + $1.toLowerCase();
		      });
		      var eventType = descriptor.eventType;
		      var unique = descriptor.unique;
		
		      if (unique === undefined) unique = true;
		
		      if (scope === undefined) {
		        scope = element;
		      } else {
		        (0, _assert2.default)(element.hasOwnProperty(scope), 'The specified Element instance does not have a property called \'' + scope + '\'');
		        scope = element[scope];
		      }
		
		      if (defaultValue !== undefined) {
		        scope.__private__ = scope.__private__ || {};
		        Object.defineProperty(scope.__private__, propertyName, { value: defaultValue, writable: true });
		      }
		
		      var newDescriptor = {};
		
		      if (descriptor.configurable !== undefined) newDescriptor.configurable = descriptor.configurable;
		      if (descriptor.enumerable !== undefined) newDescriptor.enumerable = descriptor.enumerable;
		      if (descriptor.value !== undefined) newDescriptor.value = descriptor.value;
		      if (descriptor.writable !== undefined) newDescriptor.writable = descriptor.writable;
		
		      if (descriptor.get) {
		        newDescriptor.get = function () {
		          return typeof descriptor.get === 'function' ? descriptor.get(scope.__private__[propertyName]) : scope.__private__[propertyName];
		        };
		      }
		
		      if (descriptor.set) {
		        newDescriptor.set = function (val) {
		          var oldVal = scope.__private__[propertyName];
		
		          if (typeof descriptor.set === 'function') val = descriptor.set(val);
		
		          if (unique && oldVal === val) return;
		
		          if (oldVal === undefined) {
		            scope.__private__ = scope.__private__ || {};
		            Object.defineProperty(scope.__private__, propertyName, { value: val, writable: true });
		          } else {
		            scope.__private__[propertyName] = val;
		          }
		
		          if (descriptor.onChange !== undefined) descriptor.onChange(oldVal, val);
		          if (attribute === true) element.setAttribute(attributeName, val);
		          if (dirtyType !== undefined) element.setDirty(dirtyType);
		
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
		        };
		      }
		
		      Object.defineProperty(scope, propertyName, newDescriptor);
		
		      if (defaultValue !== undefined && attribute === true) {
		        element.setAttribute(attributeName, defaultValue);
		      }
		
		      if (defaultValue !== undefined && dirtyType !== undefined && element.nodeState >= _NodeState2.default.UPDATED) {
		        element.setDirty(dirtyType);
		      }
		    }
		
		    /**
		     * Adds an event listener to an Element instance.
		     *
		     * @see module:requiem~ui.Element#addEventListener
		     */
		
		  }, {
		    key: 'addEventListener',
		    value: function addEventListener() {
		      var element = arguments[0];
		      var event = arguments[1];
		      var listener = arguments[2];
		      var useCapture = arguments[3] || false;
		
		      (0, _assert2.default)(!element || element instanceof Element);
		
		      if ((0, _noval2.default)(element)) return;
		
		      element.addEventListener(event, listener, useCapture);
		    }
		
		    /**
		     * Removes an event listener from an Element instance.
		     *
		     * @see module:requiem~ui.Element#removeEventListener
		     */
		
		  }, {
		    key: 'removeEventListener',
		    value: function removeEventListener() {
		      var element = arguments[0];
		      var event = arguments[1];
		      var listener = arguments[2];
		      var useCapture = arguments[3] || false;
		
		      (0, _assert2.default)(!element || element instanceof Element);
		
		      if ((0, _noval2.default)(element)) return;
		
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
		
		  }, {
		    key: 'getStyle',
		    value: function getStyle(element, key, isComputed, isolateUnits) {
		      (0, _assertType2.default)(element, [Node, Element], false, 'Invalid element specified');
		      if (element instanceof Element) element = element.element;
		      if (typeof isComputed !== 'boolean') isComputed = false;
		      if (typeof isolateUnits !== 'boolean') isolateUnits = false;
		
		      var value = isComputed ? window.getComputedStyle(element, null).getPropertyValue(key) : element.style[key];
		      var regex = new RegExp('^[+-]?[0-9]+.?([0-9]+)?(px|em|ex|%|in|cm|mm|pt|pc)$', 'i');
		
		      if (value === '') return isolateUnits ? { value: null, unit: null } : null;
		      if (!isNaN(Number(value))) return isolateUnits ? { value: Number(value), unit: null } : Number(value);
		
		      if (regex.test(value)) {
		        if (isolateUnits) {
		          if (value.charAt(value.length - 1) === '%') return { value: Number(value.substr(0, value.length - 1)), unit: value.slice(-1) };
		          return { value: Number(value.substr(0, value.length - 2)), unit: value.slice(-2) };
		        } else {
		          return value;
		        }
		      }
		
		      return isolateUnits ? { value: value, units: null } : value;
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
		
		  }, {
		    key: 'setStyle',
		    value: function setStyle(element, key, value) {
		      (0, _assertType2.default)(element, [Node, Element], false, 'Invalid element specified');
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
		
		  }, {
		    key: 'removeStyle',
		    value: function removeStyle(element, key) {
		      (0, _assertType2.default)(element, [Node, Element], false, 'Invalid element specified');
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
		
		  }, {
		    key: 'hasStyle',
		    value: function hasStyle(element, key) {
		      (0, _assertType2.default)(element, [Node, Element], false, 'Invalid element specified');
		      if (element instanceof Element) element = element.element;
		      return element.style[key] !== '';
		    }
		  }]);
		
		  return Element;
		})();
		
		module.exports = Element;
	
	/***/ },
	/* 20 */
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
		  } else if (recursive && value instanceof Array) {
		    var n = value.length;
		
		    for (var i = 0; i < n; i++) {
		      if (!noval(value[i], true)) return false;
		    }
		
		    return true;
		  } else if (recursive && (typeof value === 'undefined' ? 'undefined' : _typeof(value)) === 'object' && value.constructor === Object) {
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
	/* 21 */
	/***/ function(module, exports) {
	
		/**
		 * Requiem
		 * (c) VARIANTE (http://variante.io)
		 *
		 * This software is released under the MIT License:
		 * http://www.opensource.org/licenses/mit-license.php
		 */
		
		'use strict';
		
		/**
		 * Internal console logger that activates only when VARS_DEBUG flag is present
		 * in the window.
		 *
		 * @param {...String} message - Message to log.
		 *
		 * @alias module:requiem~helpers.log
		 */
		
		function log(message) {
		  if (window && window.REQUIEM_DEBUG && window.console && console.log) {
		    Function.apply.call(console.log, console, arguments);
		  }
		}
		
		module.exports = log;
	
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
		
		var Directive = __webpack_require__(16);
		
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
		    if (attribute === Directive[d]) return false;
		  }
		
		  return true;
		}
		
		module.exports = validateAttribute;
	
	/***/ },
	/* 23 */
	/***/ function(module, exports) {
	
		/**
		 * Requiem
		 * (c) VARIANTE (http://variante.io)
		 *
		 * This software is released under the MIT License:
		 * http://www.opensource.org/licenses/mit-license.php
		 */
		
		'use strict';
		
		/**
		 * Enum for custom UI dirty types. Dirty types help identify what needs to be
		 * redrawn/updated in the UI.
		 *
		 * @readonly
		 * @enum {number}
		 * @alias module:requiem~enums.DirtyType
		 */
		
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
		  ALL: 0xFFFFFFFF,
		
		  /**
		   * Gets the name of the dirty type.
		   *
		   * @param  {DirtyType} dirtyType - Dirty type.
		   *
		   * @return {string} - Name of the dirty type.
		   */
		  toString: function toString(dirtyType) {
		    if (dirtyType === DirtyType.NONE) return 'NONE';
		    if (dirtyType >= DirtyType.ALL) return 'ALL';
		
		    var o = '';
		    var n = 8 * 4;
		
		    for (var i = 0; i < n; i++) {
		      var bit = dirtyType >> i & 1;
		
		      if (bit === 0) continue;
		
		      switch (1 << i) {
		        case DirtyType.POSITION:
		          o += 'POSITION';break;
		        case DirtyType.SIZE:
		          o += 'SIZE';break;
		        case DirtyType.LAYOUT:
		          o += 'LAYOUT';break;
		        case DirtyType.STATE:
		          o += 'STATE';break;
		        case DirtyType.DATA:
		          o += 'DATA';break;
		        case DirtyType.LOCALE:
		          o += 'LOCALE';break;
		        case DirtyType.DEPTH:
		          o += 'DEPTH';break;
		        case DirtyType.CONFIG:
		          o += 'CONFIG';break;
		        case DirtyType.STYLE:
		          o += 'STYLE';break;
		        case DirtyType.INPUT:
		          o += 'INPUT';break;
		        case DirtyType.ORIENTATION:
		          o += 'ORIENTATION';break;
		        default:
		          o += String(1 << i);
		      }
		    }
		
		    return o;
		  }
		};
		
		module.exports = DirtyType;
	
	/***/ },
	/* 24 */
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
		
		'use strict';
		
		/**
		 * Enum for all node states.
		 *
		 * @readonly
		 * @enum {number}
		 * @alias module:requiem~enums.NodeState
		 */
		
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
		  DESTROYED: 3,
		
		  /**
		   * Gets the name of a node state.
		   *
		   * @param  {NodeState} nodeState - Node state.
		   *
		   * @return {string} Name of the node state.
		   */
		  toString: function toString(nodeState) {
		    switch (nodeState) {
		      case NodeState.IDLE:
		        return 'IDLE';
		      case NodeState.INITIALIZED:
		        return 'INITIALIZED';
		      case NodeState.UPDATED:
		        return 'UPDATED';
		      case NodeState.DESTROYED:
		        return 'DESTROYED';
		      default:
		        return 'UNKNOWN';
		    }
		  }
		};
		
		module.exports = NodeState;
	
	/***/ },
	/* 25 */
	/***/ function(module, exports) {
	
		/**
		 * Requiem
		 * (c) VARIANTE (http://variante.io)
		 *
		 * This software is released under the MIT License:
		 * http://www.opensource.org/licenses/mit-license.php
		 */
		
		'use strict';
		
		/**
		 * Enum for all supported event types.
		 *
		 * @readonly
		 * @enum {string}
		 * @alias module:requiem~enums.EventType
		 */
		
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
		    PROGRESS: 'progress', // Custom
		    STATE: 'state' // Custom
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
		
		var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
		
		var _debounce = __webpack_require__(27);
		
		var _debounce2 = _interopRequireDefault(_debounce);
		
		var _log = __webpack_require__(21);
		
		var _log2 = _interopRequireDefault(_log);
		
		var _DirtyType = __webpack_require__(23);
		
		var _DirtyType2 = _interopRequireDefault(_DirtyType);
		
		var _EventType = __webpack_require__(25);
		
		var _EventType2 = _interopRequireDefault(_EventType);
		
		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
		
		function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
		
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
		 * Delegate for managing update calls of a Requiem Element.
		 *
		 * @alias module:requiem~ui.ElementUpdateDelegate
		 */
		
		var ElementUpdateDelegate = (function () {
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
		
		  function ElementUpdateDelegate(delegate) {
		    _classCallCheck(this, ElementUpdateDelegate);
		
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
		      this.setDirty(_DirtyType2.default.SIZE);
		    };
		
		    /**
		     * Handler invoked when the window scrolls.
		     *
		     * @param {Event} event
		     *
		     * @private
		     */
		    var _onWindowScroll = function _onWindowScroll(event) {
		      this.setDirty(_DirtyType2.default.POSITION);
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
		
		      this.setDirty(_DirtyType2.default.INPUT);
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
		
		      this.setDirty(_DirtyType2.default.INPUT);
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
		
		      if (event instanceof window.DeviceOrientationEvent) {
		        x = event.beta;
		        y = event.gamma;
		        z = event.alpha;
		      } else if (event instanceof window.DeviceMotionEvent) {
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
		
		      this.setDirty(_DirtyType2.default.ORIENTATION);
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
		
		      this.setDirty(_DirtyType2.default.INPUT);
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
		
		      this.setDirty(_DirtyType2.default.INPUT);
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
		
		      this.setDirty(_DirtyType2.default.INPUT);
		    };
		
		    /**
		     * Sets a dirty type as dirty.
		     *
		     * @param {number} dirtyType
		     */
		    this.setDirty = function (dirtyType, validateNow) {
		      if (this.transmissive !== _DirtyType2.default.NONE) {
		        if (this.delegate.children) {
		          for (var name in this.delegate.children) {
		            var children = undefined;
		
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
		
		                if (transmitted !== _DirtyType2.default.NONE) {
		                  child.updateDelegate.setDirty(transmitted, validateNow);
		                }
		              }
		            }
		          }
		        }
		      }
		
		      if (this.isDirty(dirtyType) && !validateNow) return;
		
		      switch (dirtyType) {
		        case _DirtyType2.default.NONE:
		        case _DirtyType2.default.ALL:
		          mDirtyTable = dirtyType;
		          break;
		
		        default:
		          mDirtyTable |= dirtyType;
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
		      switch (dirtyType) {
		        case _DirtyType2.default.NONE:
		        case _DirtyType2.default.ALL:
		          return mDirtyTable === dirtyType;
		
		        default:
		          return (dirtyType & mDirtyTable) !== 0;
		      }
		    };
		
		    /**
		     * Initializes this ElementUpdateDelegate instance. Must manually invoke.
		     */
		    this.init = function () {
		      var conductor = this.conductor || window;
		
		      if (window && conductor && conductor.addEventListener && (this.responsive === true || this.responsive instanceof Array)) {
		        if (this.responsive === true || this.responsive.indexOf(_EventType2.default.OBJECT.RESIZE) > -1 || this.responsive.indexOf(_EventType2.default.DEVICE.ORIENTATION_CHANGE) > -1) {
		          mResizeHandler = this.refreshRate === 0.0 ? _onWindowResize.bind(this) : (0, _debounce2.default)(_onWindowResize.bind(this), this.refreshRate);
		        }
		
		        if (this.responsive === true || this.responsive.indexOf(_EventType2.default.OBJECT.SCROLL) > -1) {
		          mScrollHandler = this.refreshRate === 0.0 ? _onWindowScroll.bind(this) : (0, _debounce2.default)(_onWindowScroll.bind(this), this.refreshRate);
		        }
		
		        if (this.responsive === true || this.responsive.indexOf(_EventType2.default.MISC.WHEEL) > -1) {
		          mMouseWheelHandler = this.refreshRate === 0.0 ? _onWindowMouseWheel.bind(this) : (0, _debounce2.default)(_onWindowMouseWheel.bind(this), this.refreshRate);
		        }
		
		        if (this.responsive === true || this.responsive.indexOf(_EventType2.default.MOUSE.MOUSE_MOVE) > -1) {
		          mMouseMoveHandler = this.refreshRate === 0.0 ? _onWindowMouseMove.bind(this) : (0, _debounce2.default)(_onWindowMouseMove.bind(this), this.refreshRate);
		        }
		
		        if (this.responsive === true || this.responsive.indexOf(_EventType2.default.DEVICE.DEVICE_ORIENTATION) > -1 || this.responsive.indexOf(_EventType2.default.DEVICE.DEVICE_MOTION) > -1 || this.responsive.indexOf(_EventType2.default.DEVICE.ORIENTATION) > -1) {
		          mOrientationChangeHandler = this.refreshRate === 0.0 ? _onWindowOrientationChange.bind(this) : (0, _debounce2.default)(_onWindowOrientationChange.bind(this), this.refreshRate);
		        }
		
		        if (this.responsive === true || this.responsive.indexOf(_EventType2.default.KEYBOARD.KEY_DOWN) > -1) {
		          mKeyDownHandler = _onWindowKeyDown.bind(this);
		        }
		
		        if (this.responsive === true || this.responsive.indexOf(_EventType2.default.KEYBOARD.KEY_PRESS) > -1) {
		          mKeyPressHandler = _onWindowKeyPress.bind(this);
		        }
		
		        if (this.responsive === true || this.responsive.indexOf(_EventType2.default.KEYBOARD.KEY_UP) > -1) {
		          mKeyUpHandler = _onWindowKeyUp.bind(this);
		        }
		
		        if (mResizeHandler) {
		          window.addEventListener(_EventType2.default.OBJECT.RESIZE, mResizeHandler);
		          window.addEventListener(_EventType2.default.DEVICE.ORIENTATION_CHANGE, mResizeHandler);
		        }
		
		        if (mScrollHandler) {
		          conductor.addEventListener(_EventType2.default.OBJECT.SCROLL, mScrollHandler);
		        }
		
		        if (mMouseWheelHandler) {
		          conductor.addEventListener(_EventType2.default.MISC.WHEEL, mMouseWheelHandler);
		        }
		
		        if (mMouseMoveHandler) {
		          conductor.addEventListener(_EventType2.default.MOUSE.MOUSE_MOVE, mMouseMoveHandler);
		        }
		
		        if (mOrientationChangeHandler) {
		          if (window.DeviceOrientationEvent) {
		            window.addEventListener(_EventType2.default.DEVICE.DEVICE_ORIENTATION, mOrientationChangeHandler);
		          } else if (window.DeviceMotionEvent) {
		            window.addEventListener(_EventType2.default.DEVICE.DEVICE_MOTION, mOrientationChangeHandler);
		          }
		        }
		
		        if (mKeyDownHandler) {
		          window.addEventListener(_EventType2.default.KEYBOARD.KEY_DOWN, mKeyDownHandler);
		        }
		
		        if (mKeyPressHandler) {
		          window.addEventListener(_EventType2.default.KEYBOARD.KEY_PRESS, mKeyPressHandler);
		        }
		
		        if (mKeyUpHandler) {
		          window.addEventListener(_EventType2.default.KEYBOARD.KEY_UP, mKeyUpHandler);
		        }
		      }
		
		      this.setDirty(_DirtyType2.default.ALL);
		    };
		
		    /**
		     * Destroys this ElementUpdateDelegate instance.
		     */
		    this.destroy = function () {
		      _cancelAnimationFrame();
		
		      var conductor = this.conductor || window;
		
		      if (window && conductor && conductor.removeEventListener) {
		        if (mResizeHandler) {
		          window.removeEventListener(_EventType2.default.OBJECT.RESIZE, mResizeHandler);
		          window.removeEventListener(_EventType2.default.DEVICE.ORIENTATION_CHANGE, mResizeHandler);
		        }
		
		        if (mScrollHandler) {
		          conductor.removeEventListener(_EventType2.default.OBJECT.SCROLL, mScrollHandler);
		        }
		
		        if (mMouseWheelHandler) {
		          conductor.removeEventListener(_EventType2.default.MISC.WHEEL, mMouseWheelHandler);
		        }
		
		        if (mMouseMoveHandler) {
		          conductor.removeEventListener(_EventType2.default.MOUSE.MOUSE_MOVE, mMouseMoveHandler);
		        }
		
		        if (mOrientationChangeHandler) {
		          if (window.DeviceOrientationEvent) {
		            window.removeEventListener(_EventType2.default.DEVICE.DEVICE_ORIENTATION, mOrientationChangeHandler);
		          } else if (window.DeviceMotionEvent) {
		            window.removeEventListener(_EventType2.default.DEVICE.DEVICE_MOTION, mOrientationChangeHandler);
		          }
		        }
		
		        if (mKeyDownHandler) {
		          window.removeEventListener(_EventType2.default.KEYBOARD.KEY_DOWN, mKeyDownHandler);
		        }
		
		        if (mKeyPressHandler) {
		          window.removeEventListener(_EventType2.default.KEYBOARD.KEY_PRESS, mKeyPressHandler);
		        }
		
		        if (mKeyUpHandler) {
		          window.removeEventListener(_EventType2.default.KEYBOARD.KEY_UP, mKeyUpHandler);
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
		      _cancelAnimationFrame(this._pendingAnimationFrame);
		
		      if (this.delegate && this.delegate.update) {
		        (0, _log2.default)(this.toString() + '::update(', _DirtyType2.default.toString(mDirtyTable), ')');
		        this.delegate.update.call(this.delegate);
		      }
		
		      // Reset the dirty status of all types.
		      this.setDirty(_DirtyType2.default.NONE);
		
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
		
		  _createClass(ElementUpdateDelegate, [{
		    key: 'toString',
		    value: function toString() {
		      return '[ElementUpdateDelegate{' + (this.delegate && this.delegate.name || 'undefined') + '}]';
		    }
		
		    /**
		     * Defines all properties.
		     *
		     * @private
		     */
		
		  }, {
		    key: '__define_properties',
		    value: function __define_properties() {
		      /**
		       * Delegate of this ElementUpdateDelegate instance.
		       *
		       * @property {Element}
		       */
		      Object.defineProperty(this, 'delegate', { value: null, writable: true });
		
		      /**
		       * Indicates whether this ElementUpdateDelegate auto responds to window
		       * behaviors (i.e. resizing, scrolling).
		       *
		       * @property {boolean}
		       */
		      Object.defineProperty(this, 'responsive', { value: false, writable: true });
		
		      /**
		       * Indicates the debounce rate of this ElementUpdateDelegate instance.
		       *
		       * @property {number}
		       */
		      Object.defineProperty(this, 'refreshRate', { value: DEFAULT_REFRESH_RATE, writable: true });
		
		      /**
		       * Indicates the dirty flags in which ElementUpdateDelgate instance will
		       * transmit to its child Elements.
		       *
		       * @property {number}
		       */
		      Object.defineProperty(this, 'transmissive', { value: _DirtyType2.default.NONE, writable: true });
		
		      /**
		       * Indicates the dirty flags in which this ElementUpdateDelegate is capable
		       * of receiving from parent Elements.
		       *
		       * @property {number}
		       */
		      Object.defineProperty(this, 'receptive', { value: _DirtyType2.default.NONE, writable: true });
		
		      /**
		       * Indicates the conductor in which this ElementUpdateDelegate responds to
		       * (defaults to window).
		       *
		       * @property {Node|window}
		       */
		      Object.defineProperty(this, 'conductor', { value: window, writable: true });
		
		      /**
		       * Stores mouse properties if this ElementUpdateDelegate responds to mouse
		       * events.
		       *
		       * @property {Object}
		       */
		      Object.defineProperty(this, 'mouse', { value: {}, writable: false });
		
		      /**
		       * Stores orientation properties if this ElementUpdateDelgate responds to
		       * device orientations (i.e. device accelerometer).
		       *
		       * @property {Object}
		       */
		      Object.defineProperty(this, 'orientation', { value: {}, writable: false });
		
		      /**
		       * Stores pressed keycodes if this ElementUpdateDelegate responds to
		       * keyboard events.
		       *
		       * @property {Object}
		       */
		      Object.defineProperty(this, 'keyCode', { value: {}, writable: false });
		    }
		  }]);
		
		  return ElementUpdateDelegate;
		})();
		
		module.exports = ElementUpdateDelegate;
	
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
	/* 28 */
	/***/ function(module, exports, __webpack_require__) {
	
		/**
		 * Requiem
		 * (c) VARIANTE (http://variante.io)
		 *
		 * This software is released under the MIT License:
		 * http://www.opensource.org/licenses/mit-license.php
		 */
		
		'use strict';
		
		var _assert = __webpack_require__(6);
		
		var _assert2 = _interopRequireDefault(_assert);
		
		var _toElementArray = __webpack_require__(29);
		
		var _toElementArray2 = _interopRequireDefault(_toElementArray);
		
		var _getViewportRect = __webpack_require__(30);
		
		var _getViewportRect2 = _interopRequireDefault(_getViewportRect);
		
		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
		
		/**
		 * Gets the rect of a given element or the overall rect of an array of elements.
		 *
		 * @param {Node|Node[]|Element|Element[]} element
		 * @param {Object}                                      [reference=window]
		 *
		 * @return {Object} Object containing top, left, bottom, right, width, height.
		 *
		 * @alias module:requiem~utils.getRect
		 */
		function getRect(element, reference) {
		  if (!(0, _assert2.default)(window, 'This method relies on the window object, which is undefined.')) return null;
		  if (element === window) return (0, _getViewportRect2.default)();
		
		  if (!reference) reference = window;
		
		  var elements = (0, _toElementArray2.default)(element);
		  var n = elements.length;
		
		  if (n <= 0) return null;
		
		  var refRect = getRect(reference);
		
		  if (!(0, _assert2.default)(refRect, 'Cannot determine reference FOV.')) return null;
		
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
		
		// let assert = require('./assert');
		
		/**
		 * Transforms given element(s) to an element array.
		 *
		 * @param {*}       element
		 * @param {boolean} [keepElement=false]
		 *
		 * @alias module:requiem~helpers.toElementArray
		 */
		
		function toElementArray(element, keepElement) {
		  var Element = __webpack_require__(19);
		
		  if (!element) return null;
		
		  var elements = undefined;
		
		  if (element instanceof Array) {
		    elements = element;
		  } else if (element instanceof NodeList) {
		    elements = Array.prototype.slice.call(element);
		  } else {
		    // if (!assert((element instanceof Node) || (element instanceof Element), 'Invalid element specified. Element must be an instance of Node or Requiem Element.')) return null;
		
		    if (element instanceof Element) {
		      elements = [element.element];
		    } else {
		      elements = [element];
		    }
		  }
		
		  var n = elements.length;
		
		  for (var i = 0; i < n; i++) {
		    var e = elements[i];
		
		    // if (!assert((e instanceof Node) || (e instanceof Element), 'Element array contains invalid element(s). Each element must be an instance of Node or Requiem Element.')) return null;
		
		    if (!keepElement && e instanceof Element) {
		      elements[i] = e.element;
		    }
		  }
		
		  return elements;
		}
		
		module.exports = toElementArray;
	
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
		
		'use strict';
		
		var _assert = __webpack_require__(6);
		
		var _assert2 = _interopRequireDefault(_assert);
		
		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
		
		/**
		 * Gets the rect of the viewport (FOV).
		 *
		 * @return {Object} Object containing top, left, bottom, right, width,
		 *                  height.
		 *
		 * @alias module:requiem~utils.getViewportRect
		 */
		function getViewportRect() {
		  if (!(0, _assert2.default)(window && document, 'Window or document undefined.')) return null;
		
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
		
		var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
		
		var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
		
		var _assert = __webpack_require__(6);
		
		var _assert2 = _interopRequireDefault(_assert);
		
		var _DirtyType = __webpack_require__(23);
		
		var _DirtyType2 = _interopRequireDefault(_DirtyType);
		
		var _Element2 = __webpack_require__(19);
		
		var _Element3 = _interopRequireDefault(_Element2);
		
		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
		
		function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
		
		function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
		
		function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
		
		/**
		 * @class
		 *
		 * Controller of a DOM 'video' element.
		 *
		 * @extends module:requiem~ui.Element
		 * @alias module:requiem~ui.Video
		 */
		
		var Video = (function (_Element) {
		  _inherits(Video, _Element);
		
		  function Video() {
		    _classCallCheck(this, Video);
		
		    return _possibleConstructorReturn(this, Object.getPrototypeOf(Video).apply(this, arguments));
		  }
		
		  _createClass(Video, [{
		    key: 'update',
		
		    /**
		     * @inheritdoc
		     */
		    value: function update() {
		      if (this.updateDelegate.isDirty(_DirtyType2.default.DATA)) this.__update_source();
		      _get(Object.getPrototypeOf(Video.prototype), 'update', this).call(this);
		    }
		
		    /**
		     * @inheritdoc
		     */
		
		  }, {
		    key: 'render',
		    value: function render() {
		      return document.createElement('video');
		    }
		
		    /**
		     * Updates the sources in this Video instance.
		     *
		     * @private
		     */
		
		  }, {
		    key: '__update_source',
		    value: function __update_source() {
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
		    }
		
		    /**
		     * @inheritdoc
		     */
		
		  }, {
		    key: '__validate_element',
		    value: function __validate_element(element) {
		      return true;
		      // return assert(element instanceof HTMLVideoElement, 'Element validation failed');
		    }
		
		    /**
		     * @inheritdoc
		     */
		
		  }, {
		    key: '__define_properties',
		    value: function __define_properties() {
		      var _this2 = this;
		
		      /**
		       * Specifies that the video will start playing as soon as it is ready.
		       *
		       * @property {boolean}
		       */
		      Object.defineProperty(this, 'autoplay', {
		        get: function get() {
		          return _this2.element.autoplay;
		        },
		        set: function set(value) {
		          _this2.element.autoplay = value;
		          _this2.updateDelegate.setDirty(_DirtyType2.default.CUSTOM);
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
		          return _this2.element.controls;
		        },
		        set: function set(value) {
		          _this2.element.controls = value;
		          _this2.updateDelegate.setDirty(_DirtyType2.default.CUSTOM);
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
		          return _this2.element.loop;
		        },
		        set: function set(value) {
		          _this2.element.loop = value;
		          _this2.updateDelegate.setDirty(_DirtyType2.default.CUSTOM);
		        }
		      });
		
		      /**
		       * Specifies that the audio output of the video should be muted.
		       *
		       * @property {boolean}
		       */
		      Object.defineProperty(this, 'muted', {
		        get: function get() {
		          return _this2.element.muted;
		        },
		        set: function set(value) {
		          _this2.element.muted = value;
		          _this2.updateDelegate.setDirty(_DirtyType2.default.CUSTOM);
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
		          return _this2.element.poster;
		        },
		        set: function set(value) {
		          _this2.element.poster = value;
		          _this2.updateDelegate.setDirty(_DirtyType2.default.CUSTOM);
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
		          return _this2.element.preload;
		        },
		        set: function set(value) {
		          _this2.element.preload = value;
		          _this2.updateDelegate.setDirty(_DirtyType2.default.CUSTOM);
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
		      _Element3.default.defineProperty(this, 'source', {
		        get: true,
		        set: true,
		        dirtyType: _DirtyType2.default.DATA
		      });
		
		      _get(Object.getPrototypeOf(Video.prototype), '__define_properties', this).call(this);
		    }
		  }]);
		
		  return Video;
		})(_Element3.default);
		
		module.exports = Video;
	
	/***/ },
	/* 32 */
	/***/ function(module, exports, __webpack_require__) {
	
		'use strict';
		
		var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
		
		var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
		
		var _getRect = __webpack_require__(28);
		
		var _getRect2 = _interopRequireDefault(_getRect);
		
		var _translate3d = __webpack_require__(33);
		
		var _translate3d2 = _interopRequireDefault(_translate3d);
		
		var _transform = __webpack_require__(34);
		
		var _transform2 = _interopRequireDefault(_transform);
		
		var _Element2 = __webpack_require__(19);
		
		var _Element3 = _interopRequireDefault(_Element2);
		
		var _DirtyType = __webpack_require__(23);
		
		var _DirtyType2 = _interopRequireDefault(_DirtyType);
		
		var _EventType = __webpack_require__(25);
		
		var _EventType2 = _interopRequireDefault(_EventType);
		
		var _Orientation = __webpack_require__(35);
		
		var _Orientation2 = _interopRequireDefault(_Orientation);
		
		var _assertType = __webpack_require__(5);
		
		var _assertType2 = _interopRequireDefault(_assertType);
		
		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
		
		function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
		
		function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
		
		function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; } // © Grubbb
		
		/**
		 * @class
		 *
		 * Masonry grid element.
		 *
		 * @alias module:requiem~ui.Grid
		 */
		
		var Grid = (function (_Element) {
		  _inherits(Grid, _Element);
		
		  function Grid() {
		    _classCallCheck(this, Grid);
		
		    return _possibleConstructorReturn(this, Object.getPrototypeOf(Grid).apply(this, arguments));
		  }
		
		  _createClass(Grid, [{
		    key: 'init',
		
		    /** @inheritdoc */
		    value: function init() {
		      this.respondsTo(10.0, _EventType2.default.OBJECT.RESIZE);
		
		      _get(Object.getPrototypeOf(Grid.prototype), 'init', this).call(this);
		    }
		
		    /** @inheritdoc */
		
		  }, {
		    key: 'update',
		    value: function update() {
		      if (this.isDirty(_DirtyType2.default.SIZE | _DirtyType2.default.LAYOUT)) {
		        this.reposition();
		      }
		
		      _get(Object.getPrototypeOf(Grid.prototype), 'update', this).call(this);
		    }
		
		    /**
		     * Repositions invidual child item.
		     */
		
		  }, {
		    key: 'reposition',
		    value: function reposition() {
		      var l = this.length;
		      if (this.length < 2) return;
		
		      var map = [{ x: 0, y: 0, width: this.maxWidth, height: this.maxHeight }];
		      var w = 0;
		      var h = 0;
		      var mw = NaN;
		      var mh = NaN;
		
		      for (var i = 0; i < l; i++) {
		        var item = this.getChild('item')[i];
		
		        if (!isNaN(this.itemWidth)) (0, _transform2.default)(item, { width: this.itemWidth });
		        if (!isNaN(this.itemHeight)) (0, _transform2.default)(item, { height: this.itemHeight });
		
		        var slot = this.__computeItemPosition(item, map);
		
		        if (!slot) continue;
		
		        item.setStyle('position', 'absolute');
		        (0, _translate3d2.default)(item, { x: slot.x, y: slot.y });
		
		        var rect = (0, _getRect2.default)(item);
		
		        if (slot.x + rect.width > w) w = slot.x + rect.width;
		        if (slot.y + rect.height > h) h = slot.y + rect.height;
		
		        if (isNaN(mw) || rect.width < mw) mw = rect.width;
		        if (isNaN(mh) || rect.height < mh) mh = rect.height;
		      }
		
		      if (!this.autoResize) {
		        if (!isNaN(mw) && this.orientation === _Orientation2.default.PORTRAIT) {
		          w = this.maxWidth - (this.maxWidth - w) % (mw + this.padding);
		        } else if (!isNaN(mh)) {
		          h = this.maxHeight - (this.maxHeight - h) % (mh + this.padding);
		        }
		      }
		
		      (0, _transform2.default)(this, { width: w, height: h });
		    }
		
		    /**
		     * Computes the position of the specified children according to a vacancy
		     * map.
		     * @param  {Element} item      - Target item.
		     * @param  {Array}   vacancies - Array of open slots.
		     *
		     * @return {Object} Hash describing the computed position of the target item.
		     *
		     * @private
		     */
		
		  }, {
		    key: '__computeItemPosition',
		    value: function __computeItemPosition(item, vacancies) {
		      var rect = item.rect;
		      var slot = null;
		      var index = -1;
		      var n = vacancies.length;
		
		      for (var i = 0; i < n; i++) {
		        var vacancy = vacancies[i];
		
		        if (this.orientation === _Orientation2.default.PORTRAIT) {
		          if (vacancy.width >= rect.width) {
		            if (!slot || vacancy.y < slot.y || vacancy.y === slot.y && vacancy.x < slot.x) {
		              slot = vacancy;
		              index = i;
		            }
		          }
		        } else {
		          if (vacancy.height >= rect.height) {
		            if (!slot || vacancy.x < slot.x || vacancy.x === slot.x && vacancy.y < slot.y) {
		              slot = vacancy;
		              index = i;
		            }
		          }
		        }
		      }
		
		      if (slot && index > -1) {
		        if (this.orientation === _Orientation2.default.PORTRAIT) {
		          if (slot.width - rect.width - this.padding > 0) {
		            vacancies[index] = {
		              x: slot.x + rect.width + this.padding,
		              y: slot.y,
		              width: slot.width - rect.width - this.padding
		            };
		          } else {
		            vacancies.splice(index, 1);
		          }
		
		          vacancies.push({
		            x: slot.x,
		            y: slot.y + rect.height + this.padding,
		            width: rect.width
		          });
		        } else {
		          if (slot.height - rect.height - this.padding > 0) {
		            vacancies[index] = {
		              x: slot.x,
		              y: slot.y + rect.height + this.padding,
		              height: slot.height - rect.height - this.padding
		            };
		          } else {
		            vacancies.splice(index, 1);
		          }
		
		          vacancies.push({
		            x: slot.x + rect.width + this.padding,
		            y: slot.y,
		            height: rect.height
		          });
		        }
		      }
		
		      return slot;
		    }
		  }, {
		    key: 'padding',
		
		    /**
		     * Uniform padding between each grid item. This padding can be defined as
		     * a member or a DOM attribute, prioritized respectively.
		     *
		     * @type {number}
		     */
		    get: function get() {
		      var v1 = this.__private__.padding;
		      var v2 = this.getProperty('padding');
		      if (!isNaN(v1)) return v1;
		      if (!isNaN(v2)) return v2;
		      return 0;
		    },
		    set: function set(value) {
		      (0, _assertType2.default)(value, 'number', false, 'Padding must be a number in pixels');
		      if (value === this.padding) return;
		      this.__private__.padding = value;
		      this.setDirty(_DirtyType2.default.LAYOUT);
		    }
		
		    /**
		     * Max width of this grid. Max width can be defined as a member, a CSS style
		     * rule, or a DOM attribute, prioritized respectively.
		     *
		     * @type {number}
		     */
		
		  }, {
		    key: 'maxWidth',
		    get: function get() {
		      var refPadding = _Element3.default.getStyle(this.element.parentNode, 'padding-left', true, true).value + _Element3.default.getStyle(this.element.parentNode, 'padding-right', true, true).value;
		      var ref = (0, _getRect2.default)(this.element.parentNode).width - refPadding;
		      var v1 = this.__private__.maxWidth;
		      var v2 = this.getStyle('max-width', true);
		      var v3 = this.getProperty('maxWidth');
		      var v = undefined;
		
		      if (v3 !== null && v3 !== undefined) v = v3;
		      if (v2 !== null && v2 !== undefined) v = v2;
		      if (v1 !== null && v1 !== undefined) v = v1;
		      if (v === null || v === undefined) v = ref;
		
		      (0, _assertType2.default)(v, ['number', 'string'], false, 'Invalid max width provided');
		
		      if (typeof v === 'number') return v;
		      if (v.indexOf('px') > -1) return Number(v.substring(0, v.length - 2));
		      if (v.indexOf('%') > -1) return Number(v.substring(0, v.length - 1)) / 100 * ref;
		      return ref;
		    },
		    set: function set(value) {
		      (0, _assertType2.default)(value, 'number', false, 'Max width must be a number in pixels');
		      if (value === this.maxWidth) return;
		      this.__private__.maxWidth = value;
		      this.setDirty(_DirtyType2.default.SIZE);
		    }
		
		    /**
		     * Max height of this grid. Max height can be defined as a member, a CSS style
		     * rule, or a DOM attribute, prioritized respectively.
		     *
		     * @type {number}
		     */
		
		  }, {
		    key: 'maxHeight',
		    get: function get() {
		      var ref = (0, _getRect2.default)(this.element.parentNode).height;
		      var v1 = this.__private__.maxHeight;
		      var v2 = this.getStyle('max-height', true);
		      var v3 = this.getProperty('maxHeight');
		      var v = undefined;
		
		      if (v3 !== null && v3 !== undefined) v = v3;
		      if (v2 !== null && v2 !== undefined) v = v2;
		      if (v1 !== null && v1 !== undefined) v = v1;
		      if (v === null || v === undefined) v = ref;
		
		      (0, _assertType2.default)(v, ['number', 'string'], false, 'Invalid max height provided');
		
		      if (typeof v === 'number') return v;
		      if (v.indexOf('px') > -1) return Number(v.substring(0, v.length - 2));
		      if (v.indexOf('%') > -1) return Number(v.substring(0, v.length - 1)) / 100 * ref;
		      return ref;
		    },
		    set: function set(value) {
		      (0, _assertType2.default)(value, 'number', false, 'Max height must be a number in pixels');
		      if (value === this.maxHeight) return;
		      this.__private__.maxHeight = value;
		      this.setDirty(_DirtyType2.default.SIZE);
		    }
		
		    /**
		     * Orientation of the grid, either portrait or landscape.
		     *
		     * @type {Orientation}
		     * @see module:requiem~enums.Orientation
		     */
		
		  }, {
		    key: 'orientation',
		    get: function get() {
		      var v1 = this.__private__.orientation;
		      var v2 = this.getProperty('orientation');
		
		      if (!isNaN(v1)) return v1;
		      if (!isNaN(v2)) return v2;
		      return _Orientation2.default.PORTRAIT;
		    },
		    set: function set(value) {
		      (0, _assertType2.default)(value, 'number', false, 'Invalid orientation provided');
		      if (value === this.orientation) return;
		      this.__private__.orientation = value;
		      this.setDirty(_DirtyType2.default.LAYOUT);
		    }
		
		    /**
		     * Number of items in this grid.
		     *
		     * @type {number}
		     * @readonly
		     */
		
		  }, {
		    key: 'length',
		    get: function get() {
		      var items = this.items;
		      if (items) return items.length;
		      return 0;
		    }
		
		    /**
		     * Array of items in this grid.
		     *
		     * @type {Array}
		     * @readonly
		     */
		
		  }, {
		    key: 'items',
		    get: function get() {
		      var children = this.getChild('item');
		      if (children instanceof Array) return children;
		      if (children instanceof _Element3.default) return [children];
		      return null;
		    }
		
		    /**
		     * Individual item width. This can either be specified as a member or as a
		     * DOM attribute, prioritized respectively. If unspecified or set as NaN, the
		     * width will be derived naturally from individual child item.
		     *
		     * @type {number}
		     */
		
		  }, {
		    key: 'itemWidth',
		    get: function get() {
		      var v1 = this.__private__.itemWidth;
		      var v2 = this.getProperty('itemWidth');
		
		      if (!isNaN(v1)) return v1;
		      if (!isNaN(v2)) return v2;
		      return NaN;
		    },
		    set: function set(value) {
		      if (value === this.itemWidth) return;
		
		      if (value === null) {
		        this.__private__.itemWidth = NaN;
		      } else {
		        (0, _assertType2.default)(value, 'number', false);
		        this.__private__.itemWidth = value;
		      }
		
		      this.setDirty(_DirtyType2.default.SIZE);
		    }
		
		    /**
		     * Individual item height. This can either be specified as a member or as a
		     * DOM attribute, prioritized respectively. If unspecified or set as NaN, the
		     * height will be derived naturally from individual child item.
		     *
		     * @type {number}
		     */
		
		  }, {
		    key: 'itemHeight',
		    get: function get() {
		      var v1 = this.__private__.itemHeight;
		      var v2 = this.getProperty('itemHeight');
		
		      if (!isNaN(v1)) return v1;
		      if (!isNaN(v2)) return v2;
		      return NaN;
		    },
		    set: function set(value) {
		      if (value === this.itemHeight) return;
		
		      if (value === null) {
		        this.__private__.itemHeight = NaN;
		      } else {
		        (0, _assertType2.default)(value, 'number', false);
		        this.__private__.itemHeight = value;
		      }
		
		      this.setDirty(_DirtyType2.default.SIZE);
		    }
		
		    /**
		     * Specifies whether this grid will auto resize itself to fit child items.
		     *
		     * @type {boolean}
		     */
		
		  }, {
		    key: 'autoResize',
		    get: function get() {
		      var v1 = this.__private__.autoResize;
		      var v2 = this.getProperty('autoResize');
		      var v = undefined;
		
		      if (v1 !== null && v1 !== undefined) {
		        v = v1;
		      } else if (v2 !== null && v2 !== undefined) {
		        v = v2;
		      } else {
		        v = false;
		      }
		
		      (0, _assertType2.default)(v, 'boolean', false);
		
		      return v;
		    },
		    set: function set(value) {
		      if (value === this.autoResize) return;
		      this.__private__.autoResize = value;
		      this.setDirty(_DirtyType2.default.SIZE);
		    }
		  }]);
		
		  return Grid;
		})(_Element3.default);
		
		module.exports = Grid;
	
	/***/ },
	/* 33 */
	/***/ function(module, exports, __webpack_require__) {
	
		/**
		 * Requiem
		 * (c) VARIANTE (http://variante.io)
		 *
		 * This software is released under the MIT License:
		 * http://www.opensource.org/licenses/mit-license.php
		 */
		
		'use strict';
		
		var _assert = __webpack_require__(6);
		
		var _assert2 = _interopRequireDefault(_assert);
		
		var _toElementArray = __webpack_require__(29);
		
		var _toElementArray2 = _interopRequireDefault(_toElementArray);
		
		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
		
		/**
		 * Translates a DOM element.
		 *
		 * @param {Node|Node[]|Element|Element[]} element - Element(s) to
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
		  var elements = (0, _toElementArray2.default)(element);
		  var n = elements.length;
		
		  if (properties) {
		    if (!(0, _assert2.default)(properties.x === undefined || !isNaN(properties.x), 'X property must be a number.')) return null;
		    if (!(0, _assert2.default)(properties.y === undefined || !isNaN(properties.y), 'Y property must be a number.')) return null;
		    if (!(0, _assert2.default)(properties.z === undefined || !isNaN(properties.z), 'Z property must be a number.')) return null;
		
		    var units = properties.units || 'px';
		
		    if (constraints) {
		      if (!(0, _assert2.default)(constraints.x === undefined || !isNaN(constraints.x), 'X constraint must be a number.')) return null;
		      if (!(0, _assert2.default)(constraints.y === undefined || !isNaN(constraints.y), 'Y constraint must be a number.')) return null;
		      if (!(0, _assert2.default)(constraints.z === undefined || !isNaN(constraints.z), 'Z constraint must be a number.')) return null;
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
	/* 34 */
	/***/ function(module, exports, __webpack_require__) {
	
		/**
		 * Requiem
		 * (c) VARIANTE (http://variante.io)
		 *
		 * This software is released under the MIT License:
		 * http://www.opensource.org/licenses/mit-license.php
		 */
		
		'use strict';
		
		var _assert = __webpack_require__(6);
		
		var _assert2 = _interopRequireDefault(_assert);
		
		var _toElementArray = __webpack_require__(29);
		
		var _toElementArray2 = _interopRequireDefault(_toElementArray);
		
		var _getRect = __webpack_require__(28);
		
		var _getRect2 = _interopRequireDefault(_getRect);
		
		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
		
		/**
		 * Transforms a DOM element.
		 *
		 * @param {Node|Node[]|Element|Element[]} element - Element(s) to
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
		  var elements = (0, _toElementArray2.default)(element);
		  var n = elements.length;
		
		  if (properties) {
		    if (!(0, _assert2.default)(properties.width === undefined || !isNaN(properties.width), 'Width property must be a number.')) return null;
		    if (!(0, _assert2.default)(properties.height === undefined || !isNaN(properties.height), 'Height property must be a number.')) return null;
		    if (!(0, _assert2.default)(properties.aspectRatio === undefined || !isNaN(properties.aspectRatio), 'Aspect ratio property must be a number.')) return null;
		
		    var rect = (0, _getRect2.default)(element);
		    var units = properties.units || 'px';
		    var aspectRatio = properties.aspectRatio !== undefined ? Number(properties.aspectRatio) : rect.width / rect.height;
		    var maxW = properties.width;
		    var maxH = properties.height;
		    var minW = properties.width;
		    var minH = properties.height;
		    var type = properties.type || 'default';
		
		    if (constraints && type !== 'default') {
		      (0, _assert2.default)(constraints.width === undefined || !isNaN(constraints.width), 'Width constraint must be a number.');
		      (0, _assert2.default)(constraints.height === undefined || !isNaN(constraints.height), 'Height constraint must be a number.');
		
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
	
	/***/ },
	/* 35 */
	/***/ function(module, exports) {
	
		/**
		 * Requiem
		 * (c) VARIANTE (http://variante.io)
		 *
		 * This software is released under the MIT License:
		 * http://www.opensource.org/licenses/mit-license.php
		 *
		 * Orientation types.
		 *
		 * @type {Object}
		 */
		
		'use strict';
		
		/**
		 * Enum for all orientation types.
		 *
		 * @readonly
		 * @enum {number}
		 * @alias module:requiem~enums.Orientation
		 */
		
		var Orientation = {
		  /**
		   * Portrait orientation, where height > width.
		   */
		  PORTRAIT: 0,
		
		  /**
		   * Landscape orientation, where width > height.
		   */
		  LANDSCAPE: 1,
		
		  /**
		   * Gets the name of an orientation enum.
		   *
		   * @param  {Orientation} orientation - Orientation.
		   *
		   * @return {string} Name of the orientation.
		   */
		  toString: function toString(orientation) {
		    switch (orientation) {
		      case Orientation.PORTRAIT:
		        return 'PORTRAIT';
		      case Orientation.LANDSCAPE:
		        return 'LANDSCAPE';
		      default:
		        return 'UNKNOWN';
		    }
		  }
		};
		
		module.exports = Orientation;
	
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
		
		var _assert = __webpack_require__(6);
		
		var _assert2 = _interopRequireDefault(_assert);
		
		var _toElementArray = __webpack_require__(29);
		
		var _toElementArray2 = _interopRequireDefault(_toElementArray);
		
		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
		
		/**
		 * Checks if specified parent contains specified child.
		 *
		 * @param {Node|Element} parent - Node or Element instance.
		 * @param {Node|Element} child  - Node or Element instance.
		 *
		 * @return {boolean} True if parent has given child, false otherwise.
		 *
		 * @alias module:requiem~utils.hasChild
		 */
		function hasChild(parent, child) {
		  var ps = (0, _toElementArray2.default)(parent);
		  var cs = (0, _toElementArray2.default)(child);
		
		  if (!(0, _assert2.default)(ps.length === 1, 'Invalid parent specified. Parent must be a single Node or Element instance.')) return false;
		  if (!(0, _assert2.default)(cs.length === 1, 'Invalid child specified. Child must be a single Node or Element instance.')) return false;
		  if (!(0, _assert2.default)(document, 'Document not found. This method requires document to be valid.')) return false;
		
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
		
		/**
		 * Collection of event related classes/methods.
		 *
		 * @namespace module:requiem~events
		 */
		
		var events = {};
		
		Object.defineProperty(events, 'EventDispatcher', { value: __webpack_require__(38), writable: false, enumerable: true });
		
		module.exports = events;
	
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
		
		var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
		
		var _assert = __webpack_require__(6);
		
		var _assert2 = _interopRequireDefault(_assert);
		
		var _assertType = __webpack_require__(5);
		
		var _assertType2 = _interopRequireDefault(_assertType);
		
		var _log = __webpack_require__(21);
		
		var _log2 = _interopRequireDefault(_log);
		
		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
		
		function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
		
		/**
		 * @class
		 *
		 * Custom event dispatcher object.
		 *
		 * @alias module:requiem~events.EventDispatcher
		 */
		
		var EventDispatcher = (function () {
		  /**
		   * Creates a new EventDispatcher instance.
		   *
		   * @return {EventDispatcher} A new EventDispatcher instance.
		   */
		
		  function EventDispatcher() {
		    _classCallCheck(this, EventDispatcher);
		
		    this.__define_properties();
		  }
		
		  /**
		   * Adds an event listener to this EventDispatcher instance.
		   *
		   * @param {string}   type
		   * @param {Function} listener
		   */
		
		  _createClass(EventDispatcher, [{
		    key: 'addEventListener',
		    value: function addEventListener(type, listener) {
		      if (!(0, _assertType2.default)(type, 'string', false, 'Invalid parameter: type')) return;
		      if (!(0, _assertType2.default)(listener, 'function', false, 'Invalid parameter: listener')) return;
		
		      (0, _log2.default)('[EventDispatcher]::addEventListener(' + type + ')');
		
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
		    }
		
		    /**
		     * Removes an event listener from this EventDispatcher instance. If no
		     * listener method is specified, all the listeners of the specified type
		     * will be removed.
		     *
		     * @param {string}   type
		     * @param {Function} listener:undefined
		     */
		
		  }, {
		    key: 'removeEventListener',
		    value: function removeEventListener(type, listener) {
		      if (!(0, _assertType2.default)(type, 'string', false, 'Invalid parameter: type')) return;
		      if (!(0, _assertType2.default)(listener, 'function', true, 'Invalid parameter: listener')) return;
		      if (!(0, _assert2.default)(this._listenerMap, 'Listener map is null.')) return;
		      if (!(0, _assert2.default)(this._listenerMap[type], 'There are no listeners registered for event type: ' + type)) return;
		
		      (0, _log2.default)('[EventDispatcher]::removeEventListener(' + type + ')');
		
		      if (listener) {
		        var index = this._listenerMap[type].indexOf(listener);
		
		        if (index > -1) {
		          this._listenerMap[type].splice(index, 1);
		        }
		      } else {
		        delete this._listenerMap[type];
		      }
		    }
		
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
		
		  }, {
		    key: 'hasEventListener',
		    value: function hasEventListener(type, listener) {
		      if (!(0, _assertType2.default)(type, 'string', false, 'Invalid parameter: type')) return;
		      if (!(0, _assertType2.default)(listener, 'function', true, 'Invalid parameter: listener')) return;
		      if (!(0, _assert2.default)(this._listenerMap, 'Listener map is null.')) return;
		      if (!(0, _assert2.default)(this._listenerMap[type], 'There are no listeners registered for event type: ' + type)) return;
		
		      if (listener) {
		        var index = this._listenerMap[type].indexOf(listener);
		
		        return index > -1;
		      } else {
		        return true;
		      }
		    }
		
		    /**
		     * Dispatches the specified event.
		     *
		     * @param {Event} event
		     */
		
		  }, {
		    key: 'dispatchEvent',
		    value: function dispatchEvent(event) {
		      if (!(0, _assertType2.default)(event, Event, false, 'Event must be specified.')) return;
		      if (!(0, _assert2.default)(this._listenerMap, 'Listener map is null.')) return;
		
		      if (!this._listenerMap[event.type]) return;
		
		      (0, _log2.default)('[EventDispatcher]::dispatchEvent(' + event.type + ')');
		
		      var arrlen = this._listenerMap[event.type].length;
		
		      for (var i = 0; i < arrlen; i++) {
		        var listener = this._listenerMap[event.type][i];
		
		        listener.call(this, event);
		      }
		    }
		
		    /**
		     * Defines all properties.
		     *
		     * @private
		     */
		
		  }, {
		    key: '__define_properties',
		    value: function __define_properties() {}
		  }]);
		
		  return EventDispatcher;
		})();
		
		module.exports = EventDispatcher;
	
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
		
		/**
		 * Collection of network related methods/classes.
		 *
		 * @namespace module:requiem~net
		 */
		
		var net = {};
		
		Object.defineProperty(net, 'AssetLoader', { value: __webpack_require__(40), writable: false, enumerable: true });
		
		module.exports = net;
	
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
		
		var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
		
		var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
		
		var _assert = __webpack_require__(6);
		
		var _assert2 = _interopRequireDefault(_assert);
		
		var _inherit = __webpack_require__(41);
		
		var _inherit2 = _interopRequireDefault(_inherit);
		
		var _log = __webpack_require__(21);
		
		var _log2 = _interopRequireDefault(_log);
		
		var _EventDispatcher2 = __webpack_require__(38);
		
		var _EventDispatcher3 = _interopRequireDefault(_EventDispatcher2);
		
		var _EventType = __webpack_require__(25);
		
		var _EventType2 = _interopRequireDefault(_EventType);
		
		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
		
		function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }
		
		function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
		
		function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
		
		function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
		
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
		
		var AssetLoader = (function (_EventDispatcher) {
		  _inherits(AssetLoader, _EventDispatcher);
		
		  function AssetLoader() {
		    _classCallCheck(this, AssetLoader);
		
		    return _possibleConstructorReturn(this, Object.getPrototypeOf(AssetLoader).call(this));
		  }
		
		  /**
		   * Initializes this AssetLoader instance and begins loading assets in the
		   * queue.
		   */
		
		  _createClass(AssetLoader, [{
		    key: 'init',
		    value: function init() {
		      if (this.queue.length < 1) return;
		
		      (0, _log2.default)('[AssetLoader]::init()');
		
		      var arrlen = this.queue.length;
		
		      this._xhrs = [];
		      this._pending = arrlen;
		
		      for (var i = 0; i < arrlen; i++) {
		        var target = this.queue[i];
		
		        (0, _log2.default)('[AssetLoader]::Started loading: ' + target.path);
		
		        var xhr = this.getXHR({
		          id: i,
		          path: target.path,
		          type: target.type
		        });
		        xhr.send();
		
		        this._xhrs.push(xhr);
		      }
		    }
		
		    /**
		     * Destroys this AssetLoader instance and resets its state to idle for
		     * recyclable use.
		     */
		
		  }, {
		    key: 'destroy',
		    value: function destroy() {
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
		    }
		
		    /**
		     * Adds target loading assets to the queue. Assumes each parameter is as
		     * follows:
		     * Object {
		     *  {string} path  Path of asset.
		     *  {string} type  Type of asset (can only be 'image', 'video', or
		     *                 'audio').
		     * }
		     */
		
		  }, {
		    key: 'enqueue',
		    value: function enqueue() {
		      (0, _assert2.default)(arguments && arguments.length > 0, 'There are no arguments specified.');
		      (0, _assert2.default)(this.state !== AssetLoader.STATE.IN_PROGRESS, 'Enqueueing is prohibited when the state is in progress.');
		
		      if (!arguments) return;
		      if (arguments.length <= 0) return;
		      if (this.state === AssetLoader.STATE.IN_PROGRESS) return;
		
		      (0, _log2.default)('[AssetLoader]::enqueue(' + arguments + ')');
		
		      var arrlen = arguments.length;
		
		      for (var i = 0; i < arrlen; i++) {
		        var arg = arguments[i];
		
		        (0, _assert2.default)(typeof arg === 'string' || (typeof arg === 'undefined' ? 'undefined' : _typeof(arg)) === 'object', 'Each item to be enqueued must be a string of the target path or an object containing a "path" key and/or a "type" key');
		        (0, _assert2.default)(typeof arg === 'string' || typeof arg.path === 'string', 'Invalid path specified: ' + arg.path + '.');
		
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
		    }
		
		    /**
		     * Removes loading targets from the queue. Each parameter is a path that
		     * must match one that is already in the queue.
		     */
		
		  }, {
		    key: 'dequeue',
		    value: function dequeue() {
		      (0, _assert2.default)(arguments && arguments.length > 0, 'There are no arguments specified.');
		      (0, _assert2.default)(this.state !== AssetLoader.STATE.IN_PROGRESS, 'Dequeueing is prohibited when the state is in progress.');
		
		      if (!arguments) return;
		      if (arguments.length <= 0) return;
		      if (this.state === AssetLoader.STATE.IN_PROGRESS) return;
		
		      var arrlen = arguments.length;
		
		      for (var i = 0; i < arrlen; i++) {
		        var arg = arguments[i];
		
		        (0, _assert2.default)(typeof arg === 'string', 'Expecting path to be a string.');
		
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
		    }
		
		    /**
		     * Creates and returns a new XHR instance with prepopulated configurations.
		     *
		     * @param {Object} data
		     *
		     * @return {Object} XHR instance.
		     */
		
		  }, {
		    key: 'getXHR',
		    value: function getXHR(data) {
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
		    }
		
		    /**
		     * Handler invoked when an XHR instance is in progress.
		     *
		     * @param {Object} event
		     *
		     * @private
		     */
		
		  }, {
		    key: '_onXHRProgress',
		    value: function _onXHRProgress(event) {
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
		
		      (0, _log2.default)('[AssetLoader]::_onXHRProgress("' + path + '":' + bytesLoaded + '/' + bytesTotal + ')');
		
		      var progressEvent = new CustomEvent(_EventType2.default.OBJECT.PROGRESS, {
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
		    }
		
		    /**
		     * Handler invoked when an XHR instance completes its operation.
		     *
		     * @param {Object} event
		     *
		     * @private
		     */
		
		  }, {
		    key: '_onXHRLoadComplete',
		    value: function _onXHRLoadComplete(event) {
		      var xhr = event.currentTarget;
		      var id = xhr.data.id;
		      var path = xhr.data.path;
		      var type = xhr.data.type;
		
		      (0, _log2.default)('[AssetLoader]::_onXHRLoadComplete("' + path + '"")');
		
		      this._pending--;
		
		      var loadEvent = new CustomEvent(_EventType2.default.OBJECT.LOAD, {
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
		
		    /**
		     * Handler invoked when an XHR instance fails its operation.
		     *
		     * @param {Object} event
		     *
		     * @private
		     */
		
		  }, {
		    key: '_onXHRLoadError',
		    value: function _onXHRLoadError(event) {
		      var xhr = event.currentTarget;
		      var id = xhr.data.id;
		      var path = xhr.data.path;
		      var type = xhr.data.type;
		
		      (0, _log2.default)('[AssetLoader]::_onXHRLoadError("' + path + '"")');
		
		      this._pending--;
		
		      var errorEvent = new CustomEvent(_EventType2.default.OBJECT.ERROR, {
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
		        var loadEvent = new CustomEvent(_EventType2.default.OBJECT.LOAD, {
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
		    }
		
		    /**
		     * Handler invoked when an XHR aborts its operation.
		     *
		     * @param {Object} event
		     *
		     * @private
		     */
		
		  }, {
		    key: '_onXHRAbort',
		    value: function _onXHRAbort(event) {
		      var xhr = event.currentTarget;
		      var id = xhr.data.id;
		      var path = xhr.data.path;
		      var type = xhr.data.type;
		
		      (0, _log2.default)('[AssetLoader]::_onXHRLoadError("' + path + '"")');
		
		      this._pending--;
		
		      var abortEvent = new CustomEvent(_EventType2.default.OBJECT.ABORT, {
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
		        var loadEvent = new CustomEvent(_EventType2.default.OBJECT.LOAD, {
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
		    }
		
		    /**
		     * @inheritdoc
		     */
		
		  }, {
		    key: '__define_properties',
		    value: function __define_properties() {
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
		          (0, _assert2.default)(this.state !== AssetLoader.STATE.IN_PROGRESS, 'Cannot change the async mode while it is in progress.');
		
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
		
		      _get(Object.getPrototypeOf(AssetLoader.prototype), '__define_properties', this).call(this);
		    }
		  }]);
		
		  return AssetLoader;
		})(_EventDispatcher3.default);
		
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
		
		module.exports = AssetLoader;
	
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
		
		/**
		 * Collection of Requiem enums and types.
		 *
		 * @namespace module:requiem~enums
		 */
		
		var enums = {};
		
		Object.defineProperty(enums, 'Directive', { value: __webpack_require__(16), writable: false, enumerable: true });
		Object.defineProperty(enums, 'DirtyType', { value: __webpack_require__(23), writable: false, enumerable: true });
		Object.defineProperty(enums, 'EventType', { value: __webpack_require__(25), writable: false, enumerable: true });
		Object.defineProperty(enums, 'KeyCode', { value: __webpack_require__(43), writable: false, enumerable: true });
		Object.defineProperty(enums, 'NodeState', { value: __webpack_require__(24), writable: false, enumerable: true });
		Object.defineProperty(enums, 'Orientation', { value: __webpack_require__(35), writable: false, enumerable: true });
		Object.defineProperty(enums, 'ViewportSizeClass', { value: __webpack_require__(44), writable: false, enumerable: true });
		
		module.exports = enums;
	
	/***/ },
	/* 43 */
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
		
		'use strict';
		
		/**
		 * Enum for universal key codes.
		 *
		 * @readonly
		 * @enum {number}
		 * @alias module:requiem~enums.KeyCode
		 */
		
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
		  SINGLE_QUOTE: 222,
		
		  /**
		   * Gets the name of a key code.
		   *
		   * @param  {KeyCode} keyCode - Key code.
		   *
		   * @return {string} Name of the key code.
		   */
		  toString: function toString(keyCode) {
		    switch (keyCode) {
		      case KeyCode.BACKSPACE:
		        return 'BACKSPACE';
		      case KeyCode.TAB:
		        return 'TAB';
		      case KeyCode.ENTER:
		        return 'ENTER';
		      case KeyCode.SHIFT:
		        return 'SHIFT';
		      case KeyCode.CTRL:
		        return 'CTRL';
		      case KeyCode.ALT:
		        return 'ALT';
		      case KeyCode.PAUSE_BREAK:
		        return 'PAUSE_BREAK';
		      case KeyCode.CAPS_LOCK:
		        return 'CAPS_LOCK';
		      case KeyCode.ESCAPE:
		        return 'ESCAPE';
		      case KeyCode.PAGE_UP:
		        return 'PAGE_UP';
		      case KeyCode.PAGE_DOWN:
		        return 'PAGE_DOWN';
		      case KeyCode.END:
		        return 'END';
		      case KeyCode.HOME:
		        return 'HOME';
		      case KeyCode.LEFT_ARROW:
		        return 'LEFT_ARROW';
		      case KeyCode.UP_ARROW:
		        return 'UP_ARROW';
		      case KeyCode.RIGHT_ARROW:
		        return 'RIGHT_ARROW';
		      case KeyCode.DOWN_ARROW:
		        return 'DOWN_ARROW';
		      case KeyCode.INSERT:
		        return 'INSERT';
		      case KeyCode.DELETE:
		        return 'DELETE';
		      case KeyCode.ZERO:
		        return 'ZERO';
		      case KeyCode.ONE:
		        return 'ONE';
		      case KeyCode.TWO:
		        return 'TWO';
		      case KeyCode.THREE:
		        return 'THREE';
		      case KeyCode.FOUR:
		        return 'FOUR';
		      case KeyCode.FIVE:
		        return 'FIVE';
		      case KeyCode.SIX:
		        return 'SIX';
		      case KeyCode.SEVEN:
		        return 'SEVEN';
		      case KeyCode.EIGHT:
		        return 'EIGHT';
		      case KeyCode.NINE:
		        return 'NINE';
		      case KeyCode.A:
		        return 'A';
		      case KeyCode.B:
		        return 'B';
		      case KeyCode.C:
		        return 'C';
		      case KeyCode.D:
		        return 'D';
		      case KeyCode.E:
		        return 'E';
		      case KeyCode.F:
		        return 'F';
		      case KeyCode.G:
		        return 'G';
		      case KeyCode.H:
		        return 'H';
		      case KeyCode.I:
		        return 'I';
		      case KeyCode.J:
		        return 'J';
		      case KeyCode.K:
		        return 'K';
		      case KeyCode.L:
		        return 'L';
		      case KeyCode.M:
		        return 'M';
		      case KeyCode.N:
		        return 'N';
		      case KeyCode.O:
		        return 'O';
		      case KeyCode.P:
		        return 'P';
		      case KeyCode.Q:
		        return 'Q';
		      case KeyCode.R:
		        return 'R';
		      case KeyCode.S:
		        return 'S';
		      case KeyCode.T:
		        return 'T';
		      case KeyCode.U:
		        return 'U';
		      case KeyCode.V:
		        return 'V';
		      case KeyCode.W:
		        return 'W';
		      case KeyCode.X:
		        return 'X';
		      case KeyCode.Y:
		        return 'Y';
		      case KeyCode.Z:
		        return 'Z';
		      case KeyCode.LEFT_CMD:
		        return 'LEFT_CMD';
		      case KeyCode.RIGHT_CMD:
		        return 'RIGHT_CMD';
		      case KeyCode.SELECT:
		        return 'SELECT';
		      case KeyCode.NUMPAD_ZERO:
		        return 'NUMPAD_ZERO';
		      case KeyCode.NUMPAD_ONE:
		        return 'NUMPAD_ONE';
		      case KeyCode.NUMPAD_TWO:
		        return 'NUMPAD_TWO';
		      case KeyCode.NUMPAD_THREE:
		        return 'NUMPAD_THREE';
		      case KeyCode.NUMPAD_FOUR:
		        return 'NUMPAD_FOUR';
		      case KeyCode.NUMPAD_FIVE:
		        return 'NUMPAD_FIVE';
		      case KeyCode.NUMPAD_SIX:
		        return 'NUMPAD_SIX';
		      case KeyCode.NUMPAD_SEVEN:
		        return 'NUMPAD_SEVEN';
		      case KeyCode.NUMPAD_EIGHT:
		        return 'NUMPAD_EIGHT';
		      case KeyCode.NUMPAD_NINE:
		        return 'NUMPAD_NINE';
		      case KeyCode.MULTIPLY:
		        return 'MULTIPLY';
		      case KeyCode.ADD:
		        return 'ADD';
		      case KeyCode.SUBTRACT:
		        return 'SUBTRACT';
		      case KeyCode.DECIMAL:
		        return 'DECIMAL';
		      case KeyCode.DIVIDE:
		        return 'DIVIDE';
		      case KeyCode.F1:
		        return 'F1';
		      case KeyCode.F2:
		        return 'F2';
		      case KeyCode.F3:
		        return 'F3';
		      case KeyCode.F4:
		        return 'F4';
		      case KeyCode.F5:
		        return 'F5';
		      case KeyCode.F6:
		        return 'F6';
		      case KeyCode.F7:
		        return 'F7';
		      case KeyCode.F8:
		        return 'F8';
		      case KeyCode.F9:
		        return 'F9';
		      case KeyCode.F10:
		        return 'F10';
		      case KeyCode.F11:
		        return 'F11';
		      case KeyCode.F12:
		        return 'F12';
		      case KeyCode.NUM_LOCK:
		        return 'NUM_LOCK';
		      case KeyCode.SCROLL_LOCK:
		        return 'SCROLL_LOCK';
		      case KeyCode.SEMI_COLON:
		        return 'SEMI_COLON';
		      case KeyCode.EQUAL:
		        return 'EQUAL';
		      case KeyCode.COMMA:
		        return 'COMMA';
		      case KeyCode.DASH:
		        return 'DASH';
		      case KeyCode.PERIOD:
		        return 'PERIOD';
		      case KeyCode.FORWARD_SLASH:
		        return 'FORWARD_SLASH';
		      case KeyCode.GRAVE_ACCENT:
		        return 'GRAVE_ACCENT';
		      case KeyCode.OPEN_BRACKET:
		        return 'OPEN_BRACKET';
		      case KeyCode.BACK_SLASH:
		        return 'BACK_SLASH';
		      case KeyCode.CLOSE_BRACKET:
		        return 'CLOSE_BRACKET';
		      case KeyCode.SINGLE_QUOTE:
		        return 'SINGLE_QUOTE';
		      default:
		        return 'UNKNOWN';
		    }
		  }
		};
		
		module.exports = KeyCode;
	
	/***/ },
	/* 44 */
	/***/ function(module, exports, __webpack_require__) {
	
		/**
		 * Requiem
		 * (c) VARIANTE (http://variante.io)
		 *
		 * This software is released under the MIT License:
		 * http://www.opensource.org/licenses/mit-license.php
		 *
		 * Viewport types.
		 *
		 * @type {Object}
		 */
		
		'use strict';
		
		/**
		 * Enum for all viewport size classes (defaults to portrait).
		 *
		 * @readonly
		 * @enum {number}
		 * @alias module:requiem~enums.NodeState
		 */
		
		var ViewportSizeClass = {
		  /**
		   * Mobile devices.
		   */
		  MOBILE: {
		    id: 0,
		    min: 0,
		    max: 599
		  },
		
		  /**
		   * Phablet devices
		   */
		  PHABLET: {
		    id: 1,
		    min: 600,
		    max: 767
		  },
		
		  /**
		   * Tablet devices.
		   */
		  TABLET: {
		    id: 2,
		    min: 768,
		    max: 1024
		  },
		
		  /**
		   * Desktop devices.
		   */
		  DESKTOP: {
		    id: 3,
		    min: 1025,
		    max: 100000
		  },
		
		  /**
		   * Gets the viewport size class.
		   *
		   * @param {string} [measurement='width'] - Specifies whether to use a specific
		   *                                         measurement to determine the size
		   *                                         class ('width', 'height', 'min' or
		   *                                         'max').
		   *
		   * @return {ViewportSizeClass} The viewport size class enum.
		   */
		  get: function get(measurement) {
		    if (typeof measurement !== 'string') measurement = 'width';
		
		    var rect = __webpack_require__(30)();
		    var t = undefined;
		
		    if (measurement === 'height') {
		      t = rect.height;
		    } else if (measurement === 'max') {
		      t = Math.max(rect.width, rect.height);
		    } else if (measurement === 'min') {
		      t = Math.min(rect.width, rect.height);
		    } else {
		      t = rect.width;
		    }
		
		    if (t >= ViewportSizeClass.MOBILE.min && t <= ViewportSizeClass.MOBILE.max) return ViewportSizeClass.MOBILE;
		    if (t >= ViewportSizeClass.PHABLET.min && t <= ViewportSizeClass.PHABLET.max) return ViewportSizeClass.PHABLET;
		    if (t >= ViewportSizeClass.TABLET.min && t <= ViewportSizeClass.TABLET.max) return ViewportSizeClass.TABLET;
		    if (t >= ViewportSizeClass.DESKTOP.min && t <= ViewportSizeClass.DESKTOP.max) return ViewportSizeClass.DESKTOP;
		    return null;
		  }
		};
		
		module.exports = ViewportSizeClass;
	
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
		
		/**
		 * Collection of UI related methods/classes.
		 *
		 * @namespace module:requiem~ui
		 */
		
		var ui = {};
		
		Object.defineProperty(ui, 'Element', { value: __webpack_require__(19), writable: false, enumerable: true });
		Object.defineProperty(ui, 'ElementUpdateDelegate', { value: __webpack_require__(26), writable: false, enumerable: true });
		Object.defineProperty(ui, 'Video', { value: __webpack_require__(31), writable: false, enumerable: true });
		Object.defineProperty(ui, 'Grid', { value: __webpack_require__(32), writable: false, enumerable: true });
		
		module.exports = ui;
	
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
		
		/**
		 * Utility methods.
		 *
		 * @namespace module:requiem~utils
		 */
		
		var utils = {};
		
		Object.defineProperty(utils, 'addClass', { value: __webpack_require__(47), writable: false, enumerable: true });
		Object.defineProperty(utils, 'changeElementState', { value: __webpack_require__(50), writable: false, enumerable: true });
		Object.defineProperty(utils, 'hasClass', { value: __webpack_require__(48), writable: false, enumerable: true });
		Object.defineProperty(utils, 'hasChild', { value: __webpack_require__(36), writable: false, enumerable: true });
		Object.defineProperty(utils, 'getClassIndex', { value: __webpack_require__(49), writable: false, enumerable: true });
		Object.defineProperty(utils, 'getElementState', { value: __webpack_require__(51), writable: false, enumerable: true });
		Object.defineProperty(utils, 'getIntersectRect', { value: __webpack_require__(52), writable: false, enumerable: true });
		Object.defineProperty(utils, 'getRect', { value: __webpack_require__(28), writable: false, enumerable: true });
		Object.defineProperty(utils, 'getViewportRect', { value: __webpack_require__(30), writable: false, enumerable: true });
		Object.defineProperty(utils, 'hitTestElement', { value: __webpack_require__(53), writable: false, enumerable: true });
		Object.defineProperty(utils, 'hitTestRect', { value: __webpack_require__(54), writable: false, enumerable: true });
		Object.defineProperty(utils, 'removeClass', { value: __webpack_require__(55), writable: false, enumerable: true });
		Object.defineProperty(utils, 'translate', { value: __webpack_require__(56), writable: false, enumerable: true });
		Object.defineProperty(utils, 'translate3d', { value: __webpack_require__(33), writable: false, enumerable: true });
		Object.defineProperty(utils, 'transform', { value: __webpack_require__(34), writable: false, enumerable: true });
		
		module.exports = utils;
	
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
		
		var _assert = __webpack_require__(6);
		
		var _assert2 = _interopRequireDefault(_assert);
		
		var _toElementArray = __webpack_require__(29);
		
		var _toElementArray2 = _interopRequireDefault(_toElementArray);
		
		var _hasClass = __webpack_require__(48);
		
		var _hasClass2 = _interopRequireDefault(_hasClass);
		
		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
		
		/**
		 * Adds a class(es) to DOM element(s).
		 *
		 * @param {Node|Node[]|Element|Element[]} element
		 * @param {string|string[]}                             className
		 *
		 * @alias module:requiem~utils.addClass
		 */
		function addClass(element, className) {
		  var elements = (0, _toElementArray2.default)(element);
		  var classes = [];
		  var n = elements.length;
		
		  if (!(0, _assert2.default)(typeof className === 'string' || className instanceof Array, 'Invalid class name specified. Must be either a string or an array of strings.')) return;
		
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
		
		      if (!(0, _assert2.default)(typeof c === 'string', 'Invalid class detected: ' + c)) continue;
		      if ((0, _hasClass2.default)(e, c)) continue;
		
		      e.className = e.className + (e.className === '' ? '' : ' ') + c;
		    }
		  }
		}
		
		module.exports = addClass;
	
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
		
		var _assert = __webpack_require__(6);
		
		var _assert2 = _interopRequireDefault(_assert);
		
		var _toElementArray = __webpack_require__(29);
		
		var _toElementArray2 = _interopRequireDefault(_toElementArray);
		
		var _getClassIndex = __webpack_require__(49);
		
		var _getClassIndex2 = _interopRequireDefault(_getClassIndex);
		
		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
		
		/**
		 * Verifies that the specified element(s) has the specified class.
		 *
		 * @param {Node|Node[]|Element|Element[]} element
		 * @param {string}                                      className
		 *
		 * @return {boolean} True if element(s) has given class, false otherwise.
		 *
		 * @alias module:requiem~utils.hasClass
		 */
		function hasClass(element, className) {
		  if (!(0, _assert2.default)(className && typeof className === 'string', 'Invalid class name: ' + className)) return false;
		
		  var elements = (0, _toElementArray2.default)(element);
		  var n = elements.length;
		
		  for (var i = 0; i < n; i++) {
		    var e = elements[i];
		    if ((0, _getClassIndex2.default)(e, className) < 0) return false;
		  }
		
		  return true;
		}
		
		module.exports = hasClass;
	
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
		
		var _assert = __webpack_require__(6);
		
		var _assert2 = _interopRequireDefault(_assert);
		
		var _Element = __webpack_require__(19);
		
		var _Element2 = _interopRequireDefault(_Element);
		
		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
		
		/**
		 * Gets the index of a specified class in a DOM element,
		 *
		 * @param {Node|Element} element
		 * @param {string}       className
		 *
		 * @return {number} Index of given class name. -1 if not found.
		 *
		 * @alias module:requiem~utils.getClassIndex
		 */
		function getClassIndex(element, className) {
		  if (!(0, _assert2.default)(element && (element instanceof Node || element instanceof _Element2.default), 'Invalid element specified. Element must be an instance of Node or Element.')) return null;
		  if (element instanceof _Element2.default) element = element.element;
		
		  if (!(0, _assert2.default)(className && typeof className === 'string', 'Invalid class name: ' + className)) return -1;
		
		  var classList = element.className.split(' ');
		
		  return classList.indexOf(className);
		}
		
		module.exports = getClassIndex;
	
	/***/ },
	/* 50 */
	/***/ function(module, exports, __webpack_require__) {
	
		/**
		 * Requiem
		 * (c) VARIANTE (http://variante.io)
		 *
		 * This software is released under the MIT License:
		 * http://www.opensource.org/licenses/mit-license.php
		 */
		
		'use strict';
		
		var _toElementArray = __webpack_require__(29);
		
		var _toElementArray2 = _interopRequireDefault(_toElementArray);
		
		var _getElementState = __webpack_require__(51);
		
		var _getElementState2 = _interopRequireDefault(_getElementState);
		
		var _Directive = __webpack_require__(16);
		
		var _Directive2 = _interopRequireDefault(_Directive);
		
		var _Element = __webpack_require__(19);
		
		var _Element2 = _interopRequireDefault(_Element);
		
		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
		
		/**
		 * Changes the state of DOM element(s), assumes that state classes are prefixed
		 * with 'state-'.
		 *
		 * @param {Node|Node[]|Element|Element[]} element
		 * @param {string}                                      state
		 *
		 * @alias module:requiem~utils.changeElementState
		 */
		function changeElementState(element, state) {
		  var elements = (0, _toElementArray2.default)(element, true);
		
		  if (!elements) return;
		
		  var n = elements.length;
		
		  for (var i = 0; i < n; i++) {
		    var e = elements[i];
		
		    if ((0, _getElementState2.default)(e) === state) continue;
		
		    if (e instanceof _Element2.default) {
		      e.state = state;
		    } else {
		      e.setAttribute(_Directive2.default.STATE, state);
		    }
		  }
		}
		
		module.exports = changeElementState;
	
	/***/ },
	/* 51 */
	/***/ function(module, exports, __webpack_require__) {
	
		/**
		 * Requiem
		 * (c) VARIANTE (http://variante.io)
		 *
		 * This software is released under the MIT License:
		 * http://www.opensource.org/licenses/mit-license.php
		 */
		
		'use strict';
		
		var _assert = __webpack_require__(6);
		
		var _assert2 = _interopRequireDefault(_assert);
		
		var _Directive = __webpack_require__(16);
		
		var _Directive2 = _interopRequireDefault(_Directive);
		
		var _Element = __webpack_require__(19);
		
		var _Element2 = _interopRequireDefault(_Element);
		
		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
		
		/**
		 * Gets the state of a DOM element, assumes that state classes are prefixed with
		 * 'state-'.
		 *
		 * @param {Node|Element} element
		 *
		 * @return {string} State of the given element ('state-' prefix is omitted).
		 *
		 * @alias module:requiem~utils.getElementState
		 */
		function getElementState(element) {
		  if (!(0, _assert2.default)(element && (element instanceof Node || element instanceof _Element2.default), 'Invalid element specified.')) return null;
		
		  var s = undefined;
		
		  if (element instanceof _Element2.default) {
		    s = element.state;
		  } else {
		    s = element.getAttribute(_Directive2.default.STATE);
		  }
		
		  if (!s || s === '') {
		    return null;
		  } else {
		    return s;
		  }
		}
		
		module.exports = getElementState;
	
	/***/ },
	/* 52 */
	/***/ function(module, exports, __webpack_require__) {
	
		/**
		 * Requiem
		 * (c) VARIANTE (http://variante.io)
		 *
		 * This software is released under the MIT License:
		 * http://www.opensource.org/licenses/mit-license.php
		 */
		
		'use strict';
		
		var _assert = __webpack_require__(6);
		
		var _assert2 = _interopRequireDefault(_assert);
		
		var _getRect = __webpack_require__(28);
		
		var _getRect2 = _interopRequireDefault(_getRect);
		
		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
		
		/**
		 * Computes the intersecting rect of 2 given elements. If only 1 element is
		 * specified, the other element will default to the current viewport.
		 *
		 * @param {...Node|...Element} element
		 *
		 * @return {Object} Object containing width, height.
		 *
		 * @alias module:requiem~utils.getIntersectRect
		 */
		function getIntersectRect(element) {
		  if (!(0, _assert2.default)(window, 'This method relies on the window object, which is undefined.')) return null;
		
		  var n = arguments.length;
		
		  if (!(0, _assert2.default)(n > 0, 'This method requires at least 1 argument specified.')) return null;
		
		  var rect = {};
		  var currRect = undefined,
		      nextRect = undefined;
		
		  for (var i = 0; i < n; i++) {
		    if (!currRect) currRect = (0, _getRect2.default)(arguments[i]);
		
		    if (!(0, _assert2.default)(currRect, 'Invalid computed rect.')) return null;
		
		    if (i === 0 && i + 1 === n) {
		      nextRect = (0, _getRect2.default)(window);
		    } else if (i + 1 < n) {
		      nextRect = (0, _getRect2.default)(arguments[i + 1]);
		    } else {
		      break;
		    }
		
		    if (!(0, _assert2.default)(nextRect, 'Invalid computed rect.')) return null;
		
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
	/* 53 */
	/***/ function(module, exports, __webpack_require__) {
	
		/**
		 * Requiem
		 * (c) VARIANTE (http://variante.io)
		 *
		 * This software is released under the MIT License:
		 * http://www.opensource.org/licenses/mit-license.php
		 */
		
		'use strict';
		
		var _assert = __webpack_require__(6);
		
		var _assert2 = _interopRequireDefault(_assert);
		
		var _getIntersectRect = __webpack_require__(52);
		
		var _getIntersectRect2 = _interopRequireDefault(_getIntersectRect);
		
		var _getRect = __webpack_require__(28);
		
		var _getRect2 = _interopRequireDefault(_getRect);
		
		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
		
		function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }
		
		/**
		 * Hit tests a vector or element against other elements.
		 *
		 * @param {Object|Node|Element} obj
		 * @param {number}                     obj.x
		 * @param {number}                     obj.y
		 * @param {...(Node|Element)}   elements
		 *
		 * @return {boolean} True if test passes, false otherwise.
		 *
		 * @alias module:requiem~utils.hitTestElement
		 */
		function hitTestElement(obj, elements) {
		  if (!(0, _assert2.default)(arguments.length > 1, 'Insufficient arguments. Expecting at least 2.')) return false;
		
		  var args = Array.prototype.slice.call(arguments);
		  var isVector = _typeof(args[0]) === 'object' && args[0].hasOwnProperty('x') && args[0].hasOwnProperty('y');
		
		  if (isVector) {
		    var vector = args.shift();
		    var n = args.length;
		    var pass = false;
		
		    for (var i = 0; i < n; i++) {
		      var rect = (0, _getRect2.default)(args[i]);
		      var clampedX = vector.x >= rect.left && vector.x <= rect.right;
		      var clampedY = vector.y >= rect.top && vector.x <= rect.bottom;
		
		      if (clampedX && clampedY) {
		        pass = true;
		      }
		    }
		
		    return pass;
		  } else {
		    var intersectRect = _getIntersectRect2.default.apply(null, arguments);
		
		    if (!(0, _assert2.default)(intersectRect, 'Invalid elements specified.')) return false;
		
		    return intersectRect.width * intersectRect.height !== 0;
		  }
		}
		
		module.exports = hitTestElement;
	
	/***/ },
	/* 54 */
	/***/ function(module, exports, __webpack_require__) {
	
		/**
		 * Requiem
		 * (c) VARIANTE (http://variante.io)
		 *
		 * This software is released under the MIT License:
		 * http://www.opensource.org/licenses/mit-license.php
		 */
		
		'use strict';
		
		var _assert = __webpack_require__(6);
		
		var _assert2 = _interopRequireDefault(_assert);
		
		var _getIntersectRect = __webpack_require__(52);
		
		var _getIntersectRect2 = _interopRequireDefault(_getIntersectRect);
		
		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
		
		function _typeof(obj) { return obj && typeof Symbol !== "undefined" && obj.constructor === Symbol ? "symbol" : typeof obj; }
		
		/**
		 * Hit tests a vector or element against other elements.
		 *
		 * @param {Object|Node|Element} obj
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
		  if (!(0, _assert2.default)(arguments.length > 1, 'Insufficient arguments. Expecting at least 2.')) return false;
		
		  var args = Array.prototype.slice.call(arguments);
		  var isVector = _typeof(args[0]) === 'object' && args[0].hasOwnProperty('x') && args[0].hasOwnProperty('y');
		
		  if (isVector) {
		    var vector = args.shift();
		    var n = args.length;
		    var pass = false;
		
		    for (var i = 0; i < n; i++) {
		      var rect = args[i];
		
		      if (!(0, _assert2.default)(rect.top !== undefined && !isNaN(rect.top) && rect.right !== undefined && !isNaN(rect.right) && rect.bottom !== undefined && !isNaN(rect.bottom) && rect.left !== undefined && !isNaN(rect.left), 'Invalid rect supplied. Rect must be an object containing "top", "right", "bottom", and "left" key values.')) return false;
		
		      var clampedX = vector.x >= rect.left && vector.x <= rect.right;
		      var clampedY = vector.y >= rect.top && vector.x <= rect.bottom;
		
		      if (clampedX && clampedY) {
		        pass = true;
		      }
		    }
		
		    return pass;
		  } else {
		    var intersectRect = _getIntersectRect2.default.apply(null, arguments);
		
		    if (!(0, _assert2.default)(intersectRect, 'Invalid elements specified.')) return false;
		
		    return intersectRect.width * intersectRect.height !== 0;
		  }
		}
		
		module.exports = hitTestRect;
	
	/***/ },
	/* 55 */
	/***/ function(module, exports, __webpack_require__) {
	
		/**
		 * Requiem
		 * (c) VARIANTE (http://variante.io)
		 *
		 * This software is released under the MIT License:
		 * http://www.opensource.org/licenses/mit-license.php
		 */
		
		'use strict';
		
		var _assert = __webpack_require__(6);
		
		var _assert2 = _interopRequireDefault(_assert);
		
		var _toElementArray = __webpack_require__(29);
		
		var _toElementArray2 = _interopRequireDefault(_toElementArray);
		
		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
		
		/**
		 * Removes a class(es) from DOM element(s).
		 *
		 * @param {Node|Node[]|Element|Element[]} element
		 * @param {string|string[]}                             className
		 *
		 * @alias module:requiem~utils.removeClass
		 */
		function removeClass(element, className) {
		  var elements = (0, _toElementArray2.default)(element);
		  var classes = [];
		  var n = elements.length;
		
		  if (!(0, _assert2.default)(typeof className === 'string' || className instanceof Array, 'Invalid class name specified. Must be either a string or an array of strings.')) return;
		
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
		
		      if (!(0, _assert2.default)(typeof c === 'string', 'Invalid class detected: ' + c)) continue;
		
		      var regex = new RegExp('^' + c + '\\s+|\\s+' + c + '|^' + c + '$', 'g');
		      e.className = e.className.replace(regex, '');
		    }
		
		    if (e.className === '') {
		      e.removeAttribute('class');
		    }
		  }
		}
		
		module.exports = removeClass;
	
	/***/ },
	/* 56 */
	/***/ function(module, exports, __webpack_require__) {
	
		/**
		 * Requiem
		 * (c) VARIANTE (http://variante.io)
		 *
		 * This software is released under the MIT License:
		 * http://www.opensource.org/licenses/mit-license.php
		 */
		
		'use strict';
		
		var _assert = __webpack_require__(6);
		
		var _assert2 = _interopRequireDefault(_assert);
		
		var _toElementArray = __webpack_require__(29);
		
		var _toElementArray2 = _interopRequireDefault(_toElementArray);
		
		function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
		
		/**
		 * Translates a DOM element.
		 *
		 * @param {Node|Node[]|Element|Element[]} element - Element(s) to
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
		  var elements = (0, _toElementArray2.default)(element);
		  var n = elements.length;
		
		  if (properties) {
		    if (!(0, _assert2.default)(properties.top === undefined || !isNaN(properties.top), 'Top property must be a number.')) return null;
		    if (!(0, _assert2.default)(properties.right === undefined || !isNaN(properties.right), 'Right property must be a number.')) return null;
		    if (!(0, _assert2.default)(properties.bottom === undefined || !isNaN(properties.bottom), 'Bottom property must be a number.')) return null;
		    if (!(0, _assert2.default)(properties.left === undefined || !isNaN(properties.left), 'Left property must be a number.')) return null;
		
		    var units = properties.units || 'px';
		
		    if (constraints) {
		      if (!(0, _assert2.default)(constraints.top === undefined || !isNaN(constraints.top), 'Top constraint must be a number.')) return null;
		      if (!(0, _assert2.default)(constraints.right === undefined || !isNaN(constraints.right), 'Right constraint must be a number.')) return null;
		      if (!(0, _assert2.default)(constraints.bottom === undefined || !isNaN(constraints.bottom), 'Bottom constraint must be a number.')) return null;
		      if (!(0, _assert2.default)(constraints.left === undefined || !isNaN(constraints.left), 'Left constraint must be a number.')) return null;
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
	
	/***/ }
	/******/ ])
	});
	;
	//# sourceMappingURL=requiem.js.map

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	
	'use strict';
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _requiem = __webpack_require__(1);
	
	var _Foo = __webpack_require__(3);
	
	var _Foo2 = _interopRequireDefault(_Foo);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Playground = (function (_Element) {
	  _inherits(Playground, _Element);
	
	  function Playground() {
	    _classCallCheck(this, Playground);
	
	    return _possibleConstructorReturn(this, Object.getPrototypeOf(Playground).apply(this, arguments));
	  }
	
	  _createClass(Playground, [{
	    key: 'init',
	    value: function init() {
	      var grid = this.getChild('grid');
	      grid.padding = 10;
	      grid.itemWidth = 100;
	      grid.itemHeight = 50;
	
	      _get(Object.getPrototypeOf(Playground.prototype), 'init', this).call(this);
	    }
	  }, {
	    key: 'update',
	    value: function update() {
	      _get(Object.getPrototypeOf(Playground.prototype), 'update', this).call(this);
	    }
	  }]);
	
	  return Playground;
	})(_requiem.Element);
	
	exports.default = Playground;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	
	'use strict';
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _requiem = __webpack_require__(1);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Foo = (function (_Element) {
	  _inherits(Foo, _Element);
	
	  function Foo() {
	    _classCallCheck(this, Foo);
	
	    return _possibleConstructorReturn(this, Object.getPrototypeOf(Foo).apply(this, arguments));
	  }
	
	  _createClass(Foo, [{
	    key: 'init',
	    value: function init() {
	      var _this2 = this;
	
	      this.setStyle('width', 100);
	      this.setStyle('height', 50);
	      this.setStyle('backgroundColor', '#000');
	
	      this.addEventListener(_requiem.EventType.MOUSE.CLICK, function (event) {
	        return _this2.dispatchEvent(new Event(_requiem.EventType.DATA.DATA_CHANGE));
	      });
	
	      _get(Object.getPrototypeOf(Foo.prototype), 'init', this).call(this);
	    }
	  }, {
	    key: 'update',
	    value: function update() {
	      _get(Object.getPrototypeOf(Foo.prototype), 'update', this).call(this);
	    }
	  }, {
	    key: 'render',
	    value: function render() {
	      return _requiem.dom.createElement('<div><div data-class="Bar"></div></div>');
	    }
	  }]);
	
	  return Foo;
	})(_requiem.Element);
	
	exports.default = Foo;

/***/ },
/* 4 */
/***/ function(module, exports, __webpack_require__) {

	
	'use strict';
	
	var _createClass = (function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; })();
	
	var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };
	
	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	
	var _requiem = __webpack_require__(1);
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }
	
	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	
	var Bar = (function (_Element) {
	  _inherits(Bar, _Element);
	
	  function Bar() {
	    _classCallCheck(this, Bar);
	
	    return _possibleConstructorReturn(this, Object.getPrototypeOf(Bar).apply(this, arguments));
	  }
	
	  _createClass(Bar, [{
	    key: 'init',
	    value: function init() {
	      this.setStyle('width', 100);
	      this.setStyle('height', 50);
	      this.setStyle('backgroundColor', '#ff0');
	      _get(Object.getPrototypeOf(Bar.prototype), 'init', this).call(this);
	    }
	  }, {
	    key: 'update',
	    value: function update() {
	      _get(Object.getPrototypeOf(Bar.prototype), 'update', this).call(this);
	    }
	  }]);
	
	  return Bar;
	})(_requiem.Element);
	
	exports.default = Bar;

/***/ }
/******/ ]);
//# sourceMappingURL=main.js.map