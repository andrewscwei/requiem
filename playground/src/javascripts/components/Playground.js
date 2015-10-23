
'use strict';

let r = require('requiem');
let EventType = r.EventType;
let DirtyType = r.DirtyType;
let KeyCode = r.KeyCode;

class Playground extends r.Element {
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
