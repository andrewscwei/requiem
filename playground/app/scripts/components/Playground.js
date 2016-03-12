/**
 * Requiem
 * (c) VARIANTE (http://variante.io)
 *
 * This software is released under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 */

'use strict';

import { Element, Video, EventType, DirtyType, utils } from 'requiem';

import Foo from './Foo';

class Playground extends Element {
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
}

export default Playground;
