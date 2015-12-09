
'use strict';

import { Element, Video, EventType, DirtyType } from 'requiem';

import Foo from './Foo';

class Playground extends Element {
  init() {
    console.log(this);
    super.init();
  }

  update() {
    super.update();
  }
}

export default Playground;
