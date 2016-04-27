/**
 * Requiem
 * (c) VARIANTE (http://variante.io)
 *
 * This software is released under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 */

'use strict';

import addChild from './addChild';
import createElement from './createElement';
import getChild from './getChild';
import getClassRegistry from './getClassRegistry';
import getDataRegistry from './getDataRegistry';
import hasChild from './hasChild';
import namespace from './namespace';
import ready from './ready';
import register from './register';
import removeChild from './removeChild';
import sightread from './sightread';

/**
 * Collection of DOM manipulation methods.
 *
 * @namespace module:requiem~dom
 */
const dom = {
  addChild: addChild,
  createElement: createElement,
  getChild: getChild,
  getClassRegistry: getClassRegistry,
  getDataRegistry: getDataRegistry,
  hasChild: hasChild,
  namespace: namespace,
  ready: ready,
  register: register,
  removeChild: removeChild,
  sightread: sightread
};

export default dom;
