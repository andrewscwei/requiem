
'use strict';

import { Element, EventType, DirtyType } from 'requiem';

import Foo from './Foo';

class Playground extends Element {
  init() {
    this.addChild(new Foo(), 'foo');
    console.log(this.disabled);

    super.init();
  }

  update() {
    super.update();
  }
}

export default Playground;
