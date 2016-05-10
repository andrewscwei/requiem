// (c) VARIANTE

'use strict';

import 'webcomponents.js/webcomponents-lite';
import requiem, { dom, enums, events } from 'requiem';

// Load all stylesheets.
function requireAll(ctx) { return ctx.keys().map(ctx); }
requireAll(require.context('stylesheets', false, /^\.\//));

// Register all components.
const req = require.context('./', true, /^((?!enums)(?!main).)*.js$/);
req.keys().forEach((path) => requiem(req(path).default));

let eq = new events.EventQueue();
eq.enqueue(dom.getChild('playground'), enums.EventType.NODE.UPDATE);
eq.enqueue(dom.getChild('playground.grid'), enums.EventType.NODE.UPDATE);
eq.start();

// if (module.hot) module.hot.accept();
