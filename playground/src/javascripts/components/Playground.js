
'use strict';

let r = require('requiem');
let EventType = r.EventType;
let DirtyType = r.DirtyType;
let KeyCode = r.KeyCode;

class Playground extends r.Element {
  init() {
    console.log('Property foo:', this.properties.foo);
    let bar = this.getChild('bar');
    bar.addEventListener(EventType.DATA.CHANGE, (event) => {
      this.data.bar++;
      this.data.foo--;
      console.log('Received event!');
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
