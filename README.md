# Requiem

Requiem is VARIANTE's on-going experiment for exploring web UI building techniques. It is a stand-alone front-end framework that, at its current state, is not production ready, has an ever-changing API, and lacks proper documentation. It is meant for internal use only.

Requiem is the successor of [vars.web](https://github.com/VARIANTE/vars.web).

# Usage

With Requiem you can easily assign view controllers (JS classes) to DOM elements in a few simple steps.

1. Assign a view controller class to the DOM element in HTML via the custon `data-class` attribute.
  ```html
  <div data-class='Foo'></div>
  ```

1. Create and register the view controller class, extending Requiem's native `Element` which comes loaded with many built-in features. At the end, kick off a sight-read. Sight-reading is the process of crawling through the DOM tree and processing special attributes recognized by Requiem, such as the `data-class` attribute.
  ```js
  import Requiem, { Element } from 'requiem';

  class Foo extends Element {
    ...
  }

  Requiem.register(Foo, 'Foo');
  Requiem.sightread();
  ```

## License

This software is released under the [MIT License](http://opensource.org/licenses/MIT).
