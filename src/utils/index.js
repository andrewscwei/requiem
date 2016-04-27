/**
 * Requiem
 * (c) VARIANTE (http://variante.io)
 *
 * This software is released under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 */

'use strict';

import addClass from './addClass';
import changeElementState from './changeElementState';
import hasClass from './hasClass';
import getClassIndex from './getClassIndex';
import getElementState from './getElementState';
import getIntersectRect from './getIntersectRect';
import getRect from './getRect';
import getViewportRect from './getViewportRect';
import hitTestElement from './hitTestElement';
import hitTestRect from './hitTestRect';
import removeClass from './removeClass';
import translate from './translate';
import translate3d from './translate3d';
import transform from './transform';

/**
 * Utility methods.
 *
 * @namespace module:requiem~utils
 */
const utils = {
  addClass: addClass,
  changeElementState: changeElementState,
  hasClass: hasClass,
  getClassIndex: getClassIndex,
  getElementState: getElementState,
  getIntersectRect: getIntersectRect,
  getRect: getRect,
  getViewportRect: getViewportRect,
  hitTestElement: hitTestElement,
  hitTestRect: hitTestRect,
  removeClass: removeClass,
  translate: translate,
  translate3d: translate3d,
  transform: transform
};

export default utils;
