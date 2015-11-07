
'use strict';

import { Element, EventType, DirtyType } from 'requiem';

class Playground extends Element {
  init() {
    let bar = this.getChild('bar');
    bar.addEventListener(EventType.DATA.CHANGE, (event) => {
      console.log(this.properties);
      this.properties.bar++;
      this.properties.foo--;
    });

    super.init();
  }

  update() {
    super.update();
  }

  destroy() {
    super.destroy();
  }
}

module.exports = Playground;
