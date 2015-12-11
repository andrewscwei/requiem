
'use strict';

import { Element, Video, EventType, DirtyType } from 'requiem';

import Foo from './Foo';


class Playground extends Element {
  init() {
    this.addChild(new Foo('foo'));

    let a = {
      a: 'asdf',
      b: 'qwer'
    };
    let b = JSON.stringify(a);
    let j = require('template-html?foos='+a+'!../../templates/components/Foo.jade');
    console.log(j);
    super.init();
  }

  update() {
    super.update();
  }
}

export default Playground;
