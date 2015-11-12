
'use strict';

import { dom } from 'requiem';

dom.namespace().Playground = require('./components/Playground');
dom.namespace().Foo = require('./components/Foo');
dom.namespace().Bar = require('./components/Bar');

let nodes;


dom.ready(() => {
  nodes = dom.sightread();

  for (let i = 0; i < 5; i++) {
    let e = dom.createElement('<div data-r-controller="Foo"></div>');
    nodes.playground.addChild(e, 'foo');
  }
});
