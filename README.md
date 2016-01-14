# Requiem

Requiem is VARIANTE's on-going project for experimenting with web UI building techniques. It is a stand-alone front-end framework that, at its current state, is not production ready, has an ever-changing API, and lacks proper documentation. Its features are driven by internal requirements and is meant for internal use only.

Requiem is packaged with UI utilities and base wrapper classes for common DOM elements. It is a stand-alone, hence has no external dependencies, around `17kb` gzipped.

Requiem is best paired with its sister stylesheet library [requiem-styles](https://github.com/VARIANTE/requiem-styles).

# Overview

With Requiem you can easily assign view controllers (JS classes) to DOM elements in a couple simple steps.

1. Assign a view controller class to the DOM element in HTML via the custon `data-class` attribute.
  ```html
  <div data-class='Foo'></div>
  ```

2. Create and register the view controller class, extending Requiem's native `Element` which comes loaded with many built-in features. At the end, kick off a sight-read. Sight-reading is the process of crawling through the DOM tree and processing special attributes recognized by Requiem, such as the `data-class` attribute. Sight-reading only needs to be done once on page load.
  ```js
  import Requiem, { Element } from 'requiem';

  class Foo extends Element {
    ...
  }

  Requiem.register(Foo, 'Foo');
  Requiem.sightread();
  ```

# API

Raw documentation is generated using JSDoc avaiable in the `docs` directory.

## License

This software is released under the [MIT License](http://opensource.org/licenses/MIT).
