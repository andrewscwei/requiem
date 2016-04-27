'use strict';

import { ui } from 'requiem';

class Foo extends ui.Element {
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
