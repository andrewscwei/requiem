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

/**
 * @module requiem
 */
const requiem = {
  name: 'Requiem',
  version: '0.40.3',
  dom: dom,
  enums: enums,
  events: events,
  net: net,
  ui: ui,
  utils: utils
};

polyfillCustomEvent();
polyfillTimers();

assert(window && document, 'Requiem is a front-end web framework where \'window\' and \'document\' must be defined');

module.exports = requiem;
