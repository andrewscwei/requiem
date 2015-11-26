
'use strict';

import { Element, EventType, DirtyType, KeyCode } from 'requiem';

class Bar extends Element {
  init() {
    this.setStyle('width', 100);
    this.setStyle('height', 50);
    this.setStyle('backgroundColor', '#ff0');

    console.log('Bar');
    super.init();
  }

  update() {
    super.update();
  }
}

export default Bar;
