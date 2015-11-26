
'use strict';

import { dom, Element } from 'requiem';

class Foo extends Element {
  init() {
    this.setStyle('width', 100);
    this.setStyle('height', 50);
    this.setStyle('backgroundColor', '#000');
    super.init();
  }

  update() {
    super.update();
  }

  factory() {
    return dom.createElement('<div><div data-r-controller="Bar"></div></div>');
  }
}

export default Foo;
