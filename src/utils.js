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

'use strict';

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
