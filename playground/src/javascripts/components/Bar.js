
'use strict';

let r = require('requiem');
let EventType = r.EventType;
let DirtyType = r.DirtyType;
let KeyCode = r.KeyCode;

class Bar extends r.Element {
  init() {
    this.bar = 'hello';

    r.Element.defineProperty(this, 'foo', {
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
    b.setStyle('backgroundColor', '#000');
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
