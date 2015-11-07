
'use strict';

import { dom } from 'requiem';

dom.namespace().Playground = require('./components/Playground');
dom.namespace().Foo = require('./components/Foo');
dom.namespace().Bar = require('./components/Bar');

let nodes;

let e = dom.createElement('<div data-r-controller="Foo" data-r-instance="foo"></div>');

dom.ready(() => {
  nodes = dom.sightread();

  nodes.playground.addChild(e);
  nodes.playground.removeChild(e);
});
