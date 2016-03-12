/**
 * Requiem
 * (c) VARIANTE (http://variante.io)
 *
 * This software is released under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 */

'use strict';

import { dom, Element, EventType } from 'requiem';

class Foo extends Element {
  init() {
    this.setStyle('width', 100);
    this.setStyle('height', 50);
    this.setStyle('backgroundColor', '#000');

    this.addEventListener(EventType.MOUSE.CLICK, (event) => this.dispatchEvent(new Event(EventType.DATA.DATA_CHANGE)));

    super.init();
  }

  update() {
    super.update();
  }

  render() {
    return dom.createElement(require('templates/components/Foo'));
  }
}

export default Foo;