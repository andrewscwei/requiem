'use strict';

import { Element } from 'requiem';

class Foo extends Element {
  init() {
    super.init();
  }

  update() {
    super.update();
  }

  render() {
    return require('templates/components/foo.jade')();
  }
}

export default Foo;
