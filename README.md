# Requiem [![Circle CI](https://circleci.com/gh/andrewscwei/requiem/tree/master.svg?style=svg)](https://circleci.com/gh/andrewscwei/requiem/tree/master) [![npm version](https://badge.fury.io/js/requiem.svg)](https://badge.fury.io/js/requiem)

Requiem is a UI framework packaged with DOM utilities and leverages [WebComponents](http://webcomponents.org/) and ES6 standards. It is a stand-alone framework, hence has no external dependencies (i.e. no jQuery required), and around `17kb` gzipped.

Requiem is best paired with its sister stylesheet library [Minuet](https://github.com/andrewscwei/minuet).

# Polyfill

If needed for cross browser support, the minimum required polyfill is [webcomponents-lite.js](http://webcomponents.org/polyfills/).

# Overview

Requiem leverages custom elements following the [WebComponents](http://webcomponents.org/) standard while keeping HTML markup, JavaScripts and stylesheets separate. Hence it is very easy to use your favorite preprocessor language alongside Requiem.

1. Create a custom element in HTML or any template engine of your choice. If you have a build tool like [Webpack](https://webpack.github.io/) you can even make this template a separate file and later load it in JavaScript. The following example uses [Jade](http://jade-lang.com/):

  ```jade
  template#my-element
    p= 'Hello, world!'
  ```

2. Create a JavaScript class for the custom element, extending any HTMLElement classes wrapped by Requiem's native `Element` abstract class which comes loaded with many built-in features. Override the static getter `tag()` and the instance method `template()` to specify your custom elemen tag name and template markup respectively. After that, register it somewhere in your scripts. The following example assumes you have Webpack to load an external template into JavaScript. All it matters is that `template()` returns a string containing HTML markup or a DOM `Node`.

  ```js
  import requiem, { ui } from 'requiem';

  class MyElement extends ui.Element(HTMLElement) {
    /** @inheritdoc */
    static get tag() { return 'my-element'; }

    /** @inheritdoc */
    template(data) {
      // The 'data' param here comes prepopulated with this.data.
      return require('components/my-element.jade')(data);
    }
    ...
  }

  // Register it.
  requiem(MyElement);
  ```

# Usage

```
$ npm install requiem
```

# API

Raw documentation is available [here](http://andrewscwei.github.io/requiem).

## Disclaimer

Requiem is an on-going pet project for experimenting with web UI building techniques. It is a stand-alone front-end framework that, at its current state, is not production ready, has an ever-changing API, and lacks proper documentation. Its features are driven by internal requirements and is meant for internal use only.

## License

This software is released under the [MIT License](http://opensource.org/licenses/MIT).
