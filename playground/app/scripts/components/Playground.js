'use strict';

import { enums, ui, utils } from 'requiem';

class Playground extends ui.Element {
  init() {
    let grid = this.getChild('grid');
    grid.padding = 10;
    grid.itemWidth = 100;
    grid.itemHeight = 50;

    super.init();
  }

  update() {
    super.update();
  }

  render() {
    return require('templates/components/playground.jade')({ n: 200 });
  }
}

export default Playground;
