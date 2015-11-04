
'use strict';

import { dom } from 'requiem';

dom.namespace().Playground = require('./components/Playground');
dom.namespace().Bar = require('./components/Bar');

let nodes;

dom.ready(() => {
  nodes = dom.sightread();
});
