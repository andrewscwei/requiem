
'use strict';

import { dom, Element, EventType } from 'requiem';

class Foo extends Element {
  init() {
    this.setStyle('width', 100);
    this.setStyle('height', 50);
    this.setStyle('backgroundColor', '#000');

    this.addEventListener(EventType.MOUSE.CLICK, (event) => this.dispatchEvent(new Event(EventType.DATA.DATA_CHANGE)));
    super.init();
  }

  update() {
    super.update();
  }

  render() {
    return dom.createElement('<div><div data-r-controller="Bar"></div></div>');
  }
}

export default Foo;
