
'use strict';

import { Element, Video, EventType, DirtyType } from 'requiem';

import Foo from './Foo';

class Playground extends Element {
  init() {
    this.addChild(new Foo('foo'));
    super.init();
  }

  update() {
    super.update();
  }
}

export default Playground;
