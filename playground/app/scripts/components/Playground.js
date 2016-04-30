'use strict';

import { enums, ui, utils } from 'requiem';

class Playground extends ui.Element {
  static get tag() { return 'playground'; }
  static get extends() { return 'div'; }

  init() {
    this.respondsTo(10.0, enums.EventType.OBJECT.RESIZE);
    super.init();
  }

  render() {
    super.render();

    let grid = this.getChild('grid');
    grid.itemWidth = 100;
    grid.itemHeight = 50;
  }

  update() {
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
