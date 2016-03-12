/**
 * Requiem
 * (c) VARIANTE (http://variante.io)
 *
 * This software is released under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 */

'use strict';

import { Element, EventType, DirtyType, KeyCode } from 'requiem';

class Bar extends Element {
  init() {
    this.setStyle('width', 100);
    this.setStyle('height', 50);
    this.setStyle('backgroundColor', '#ff0');
    super.init();
  }

  update() {
    super.update();
  }
}

export default Bar;
