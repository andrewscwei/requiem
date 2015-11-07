
'use strict';

import { dom } from 'requiem';

dom.namespace().Playground = require('./components/Playground');
dom.namespace().Foo = require('./components/Foo');
dom.namespace().Bar = require('./components/Bar');

let nodes;

let e = dom.createElement('<div data-r-controller="Foo"></div>');

dom.ready(() => {
  nodes = dom.sightread();

  nodes.playground.addChild(e, 'foo');
  nodes.playground.removeChild(e);
});
