// (c) VARIANTE

'use strict';

import getIntersectRect from './getIntersectRect';
import getRect from './getRect';
import getViewportRect from './getViewportRect';
import hitTestElement from './hitTestElement';
import hitTestRect from './hitTestRect';
import transform from './transform';
import translate from './translate';

/**
 * Utility methods.
 *
 * @namespace module:requiem~utils
 */
const utils = {
  getIntersectRect: getIntersectRect,
  getRect: getRect,
  getViewportRect: getViewportRect,
  hitTestElement: hitTestElement,
  hitTestRect: hitTestRect,
  transform: transform,
  translate: translate
};

export default utils;
