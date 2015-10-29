
'use strict';

let r = require('requiem');
let namespace = r.namespace;

namespace().Playground = require('./components/Playground');
namespace().Bar = require('./components/Bar');

r.sightread(document.getElementById('playground'));
