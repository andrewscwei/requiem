
'use strict';

import { dom, Element } from 'requiem';

dom.namespace().Playground = require('./components/Playground');
dom.namespace().Foo = require('./components/Foo');
dom.namespace().Bar = require('./components/Bar');

let nodes;


dom.ready(() => {
  nodes = dom.sightread();

  for (let i = 0; i < 5; i++) {
    let e = new Element(document.createElement('a'));
    nodes.playground.addChild(e, 'foo');
  }
});
