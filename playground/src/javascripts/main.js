
'use strict';

import Requiem, { dom, Element } from 'requiem';
import Playground from './components/Playground';
import Foo from './components/Foo';
import Bar from './components/Bar';

dom.getDataRegistry().playground = {
  foo: '1',
  bar: '2'
};

Requiem.register(Playground);
Requiem.register(Foo);
Requiem.register(Bar);

Requiem.sightread();
