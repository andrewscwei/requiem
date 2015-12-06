
'use strict';

import { Element, Video, EventType, DirtyType } from 'requiem';

import Foo from './Foo';

class Playground extends Element {
  init() {
    let foo = new Foo('foo');
    foo.addEventListener(EventType.DATA.DATA_CHANGE, (event) => { this.setProperty('foo', 'abc'); });

    this.respondsTo(10.0, EventType.OBJECT.SCROLL);
    this.addChild(foo);

    this.setProperties({ foo: 'foo', bar: 'bar' });

    super.init();
  }

  update() {
    super.update();
  }
}

export default Playground;
