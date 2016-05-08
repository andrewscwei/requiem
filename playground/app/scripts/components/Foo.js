'use strict';

import { enums, dom, ui } from 'requiem';

class Foo extends ui.Element(HTMLButtonElement) {
  static get tag() { return 'foo'; }
  static get extends() { return 'button'; }

  init() {
    this.respondsTo(10.0, enums.EventType.OBJECT.RESIZE);
    super.init();
  }

  update() {
    super.update();
  }

  template(data) {
    return require('templates/components/foo.jade')(data);
  }
}

export default Foo;
