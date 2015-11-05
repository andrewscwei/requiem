
'use strict';

let requiem = require('requiem');
let Element = requiem.Element;
let EventType = requiem.EventType;
let DirtyType = requiem.DirtyType;
let KeyCode = requiem.KeyCode;

class Bar extends Element {
  init() {
    this.bar = 'hello';

    Element.defineProperty(this, 'foo', {
      defaultValue: 0,
      dirtyType: DirtyType.DATA,
      eventType: EventType.DATA.CHANGE,
      attribute: 'data-foo',
      get: true,
      set: true
    });

    let b = this.getChild('button');
    b.setStyle('width', 50);
    b.setStyle('height', 30);
    b.setStyle('backgroundColor', '#ff0');
    b.addEventListener(EventType.MOUSE.CLICK, (event) => {
      this.foo++;
    });

    super.init();
  }

  update() {
    if (this.isDirty(DirtyType.DATA)) {

    }

    super.update();
  }

  destroy() {
    super.destroy();
  }
}

module.exports = Bar;
