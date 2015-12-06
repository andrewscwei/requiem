
'use strict';

import Requiem, { dom, Element } from 'requiem';

import Playground from './components/Playground';
import Foo from './components/Foo';
import Bar from './components/Bar';

dom.ready(() => {
  dom.namespace().Playground = Playground;
  dom.namespace().Foo = Foo;
  dom.namespace().Bar = Bar;

  let nodes = dom.sightread();
});
