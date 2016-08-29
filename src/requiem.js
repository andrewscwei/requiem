/*! Requiem, @license MIT */
'use strict';

import assert from './helpers/assert';
import dom from './dom';
import enums from './enums';
import events from './events';
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
  if (arguments.length > 0)
    return dom.register.apply(null, arguments);
  else
    return dom.sightread.apply(null, arguments);
}

requiem.version = '0.56.0';
requiem.dom = dom;
requiem.enums = enums;
requiem.events = events;
requiem.ui = ui;
requiem.utils = utils;
requiem.register = function() { return dom.register.apply(null, arguments); }

requiem();

module.exports = requiem;
