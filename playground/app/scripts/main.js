/**
 * Requiem
 * (c) VARIANTE (http://variante.io)
 *
 * This software is released under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 */

'use strict';

import Requiem, { dom } from 'requiem';
import Playground from 'components/Playground';

// Load all stylesheets.
function requireAll(ctx) { return ctx.keys().map(ctx); }
requireAll(require.context('stylesheets', false, /^\.\//));

// Register all components.
const req = require.context('./', true, /^((?!enums)(?!main).)*.js$/);
req.keys().forEach((path) => {
  let className = path.split('/').pop().replace('.js', '');
  Requiem.register(req(path).default, className);
});

Requiem.sightread();

dom.addChild(new Playground());

if (module.hot) module.hot.accept();
