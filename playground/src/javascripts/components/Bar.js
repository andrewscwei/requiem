
'use strict';

let r = require('requiem');

class Bar extends r.Element {
  init() {
    this.interval = setInterval(function() {
      console.log('foo');
    }, 5000);
    super.init();
  }

  destroy() {
    clearInterval(this.interval);
    super.destroy();
  }
}

module.exports = Bar;
