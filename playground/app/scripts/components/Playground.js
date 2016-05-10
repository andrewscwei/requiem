'use strict';

import { dom, enums, ui, utils } from 'requiem';

class Playground extends ui.Element(HTMLElement) {
  static get tag() { return 'playground'; }
  static get extends() { return 'div'; }

  init() {
    this.respondsTo(10.0, enums.EventType.OBJECT.RESIZE);

    let grid = this.getChild('grid');
    grid.itemWidth = 100;
    grid.itemHeight = 50;

    super.init();
  }

  update() {
    if (this.nodeState < enums.NodeState.UPDATED) {
      this.dispatchEvent(new CustomEvent('foo'));
    }

    if (this.nodeState === enums.NodeState.UPDATED && this.isDirty(enums.DirtyType.SIZE)) {
      this.render();
    }

    super.update();
  }

  template(data) {
    return require('templates/components/playground.jade')({ n: Math.floor(Math.random() * (200 - 10)) + 10 });
  }
}

export default Playground;
