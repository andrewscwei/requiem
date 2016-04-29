/*! Requiem, @license MIT */
'use strict';

import assert from './helpers/assert';
import dom from './dom';
import enums from './enums';
import events from './events';
import net from './net';
import ui from './ui';
import utils from './utils';
import polyfillCustomEvent from './polyfills/polyfillCustomEvent';
import polyfillTimers from './polyfills/polyfillTimers';
import polyfillClassList from './polyfills/polyfillClassList';

assert(window && document, 'Requiem is a front-end web framework where \'window\' and \'document\' must be defined');

polyfillCustomEvent();
polyfillTimers();
polyfillClassList();

/**
 * @module requiem
 */
function requiem() {
  if (requiem.initialized === false) {
    dom.sightread();
    delete requiem.initialized;
  }

  if (arguments.length > 0)
    return dom.register.apply(null, arguments);
}

requiem.initialized = false;
requiem.version = '0.41.0';
requiem.dom = dom;
requiem.enums = enums;
requiem.events = events;
requiem.net = net;
requiem.ui = ui;
requiem.utils = utils;
requiem.register = function() { return dom.register.apply(null, arguments); }

module.exports = requiem;
