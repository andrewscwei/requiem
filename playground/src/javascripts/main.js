
'use strict';

let r = require('requiem');

console.log(r);
let namespace = r.namespace;

namespace().Playground = require('./components/Playground');
namespace().Bar = require('./components/Bar');

let nodes;

r.ready(() => {
  nodes = r.sightread(document.getElementById('playground'));
});
