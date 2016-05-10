'use strict';

import { dom, enums, ui, utils } from 'requiem';

class Playground extends ui.Element(HTMLElement) {
  static get tag() { return 'playground'; }
  static get extends() { return 'div'; }

  init() {
    this.respondsTo(10.0, enums.EventType.OBJECT.RESIZE, enums.EventType.MISC.ENTER_FRAME);

    // let grid = this.getChild('grid');
    // grid.itemWidth = 100;
    // grid.itemHeight = 50;

    this.__foo = 1;
    super.init();
  }

  update() {
    if (this.nodeState === enums.NodeState.UPDATED && this.isDirty(enums.DirtyType.SIZE)) {
      this.render();
    }

    if (this.isDirty(enums.DirtyType.FRAME)) {
      let foo = document.getElementById('background');
      dom.setStyle(foo, 'transform', `translate3d(0, 0, 0) scale(${this.__foo})`);
      this.__foo += .01;
      console.log(this.__foo);
    }

    super.update();
  }

  template(data) {
    return require('templates/components/playground.jade')({ n: Math.floor(Math.random() * (200 - 10)) + 10 });
  }
}

export default Playground;
