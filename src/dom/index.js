// (c) VARIANTE

'use strict';

import addChild from './addChild';
import removeChild from './removeChild';
import getChild from './getChild';
import hasChild from './hasChild';
import addClass from './addClass';
import removeClass from './removeClass';
import hasClass from './hasClass';
import getClassIndex from './getClassIndex';
import getAttribute from './getAttribute';
import setAttribute from './setAttribute';
import hasAttribute from './hasAttribute';
import getStyle from './getStyle';
import setStyle from './setStyle';
import hasStyle from './hasStyle';
import getState from './getState';
import setState from './setState';
import namespace from './namespace';
import createElement from './createElement';
import getElementRegistry from './getElementRegistry';
import getDataRegistry from './getDataRegistry';
import setDataRegistry from './setDataRegistry';
import getChildRegistry from './getChildRegistry';
import addToChildRegistry from './addToChildRegistry';
import removeFromChildRegistry from './removeFromChildRegistry';
import ready from './ready';
import register from './register';
import sightread from './sightread';

/**
 * Collection of DOM manipulation methods.
 *
 * @namespace module:requiem~dom
 */
const dom = {
  addChild: addChild,
  removeChild: removeChild,
  getChild: getChild,
  hasChild: hasChild,
  addClass: addClass,
  removeClass: removeClass,
  hasClass: hasClass,
  getClassIndex: getClassIndex,
  getAttribute: getAttribute,
  setAttribute: setAttribute,
  hasAttribute: hasAttribute,
  getStyle: getStyle,
  setStyle: setStyle,
  hasStyle: hasStyle,
  getState: getState,
  setState: setState,
  createElement: createElement,
  getElementRegistry: getElementRegistry,
  getDataRegistry: getDataRegistry,
  setDataRegistry: setDataRegistry,
  getChildRegistry: getChildRegistry,
  addToChildRegistry: addToChildRegistry,
  removeFromChildRegistry: removeFromChildRegistry,
  namespace: namespace,
  ready: ready,
  register: register,
  sightread: sightread
};

export default dom;
