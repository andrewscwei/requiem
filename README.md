# Requiem [![Circle CI](https://circleci.com/gh/andrewscwei/requiem/tree/master.svg?style=svg)](https://circleci.com/gh/andrewscwei/requiem/tree/master) [![npm version](https://badge.fury.io/js/requiem.svg)](https://badge.fury.io/js/requiem)

Requiem is a simple, component-based UI library (not framework) packaged with DOM utilities and leverages [WebComponents](http://webcomponents.org/) and ES6 standards. It is stand-alone, hence has no external dependencies (i.e. no jQuery required), and around `17kb` gzipped.

Requiem is best paired with its sister stylesheet library [Minuet](https://github.com/andrewscwei/minuet).

## Polyfill

For cross browser support, the minimum required polyfill is [webcomponents-lite.js](http://webcomponents.org/polyfills/).

## Overview

Requiem leverages custom elements following the [WebComponents](http://webcomponents.org/) standard while keeping HTML markup, JavaScripts and stylesheets separate. Hence it is very easy to use your favorite preprocessor language alongside Requiem. [Webpack](https://webpack.js.org/) is recommended so you can load template files in JavaScript.

### Creating a Component

There are two parts to a Requiem component. The first part is the template, which is just HTML markup. The second part is its controller written in JavaScript. Requiem does not govern how you wish to style your components—it is entirely up to you.

#### Part 1: Creating the Template

The following example is shown using [Pug](https://pugjs.org/api/getting-started.html).

```pug
template#my-element
  p= 'Hello, world!'
```

#### Part 2: Creating the Controller

This controller will be controlling the template defined above.

```js
import requiem, { ui } from 'requiem';

/**
 * This is the controller for the custom element. Requiem's `Element` class is an abstract 
 * class that extends `HTMLElement` and comes loaded with many built-in features, such as
 * handling states, data and render loops.
 */
class MyElement extends ui.Element() {
  /**
   * Specify the custom element tag.
   * @inheritdoc 
   */
  static get tag() { return 'my-element'; }

  /**
   * This method is optional. Implement it if you want this component to manage its own 
   * shadow DOM.
   * @inheritdoc 
   */
  template(data) {
    // The 'data' param here comes prepopulated with this.data.
    return require('components/my-element.pug')(data);
  }
  ...
}
```

#### Part 3: Registering the Controller

You have a view, and you have a controller, so now you just have to bind them so they understand their relationship with each other.

```js
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
