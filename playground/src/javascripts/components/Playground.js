
'use strict';

import { Element, Video, EventType, DirtyType } from 'requiem';

import Foo from './Foo';

class Playground extends Element {
  init() {
    this.addChild(new Foo('foo'));

    console.log(this.getStyle('margin-right', true));

    super.init();
  }

  update() {
    super.update();
  }
}

export default Playground;
