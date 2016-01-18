
'use strict';

import Requiem, { dom, Element, EventTimer } from 'requiem';
import Playground from './components/Playground';
import Foo from './components/Foo';
import Bar from './components/Bar';

Requiem.register(Playground);
Requiem.register(Foo);
Requiem.register(Bar);
Requiem.sightread();

EventTimer.addEvent('foo', () => {
  console.log('foo');
}, 1000, 2, true, 'foo');

EventTimer.addEventListener('foo', (event) => {
  console.log(event.detail);
});
