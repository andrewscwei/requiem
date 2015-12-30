
'use strict';

import Requiem, { dom, Element } from 'requiem';
import Playground from './components/Playground';
import Foo from './components/Foo';
import Bar from './components/Bar';

Requiem.register(Playground);
Requiem.register(Foo);
Requiem.register(Bar);
Requiem.sightread();
