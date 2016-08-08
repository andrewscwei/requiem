// (c) Andrew Wei

'use strict';

import 'webcomponents.js/webcomponents-lite';
import requiem from 'requiem';

// Load all stylesheets.
function requireAll(ctx) { return ctx.keys().map(ctx); }
requireAll(require.context('stylesheets', false, /^\.\//));

// Register all components.
const req = require.context('./', true, /^((?!main).)*.js$/);
req.keys().forEach((path) => requiem(req(path).default));

if (module.hot) module.hot.accept();
