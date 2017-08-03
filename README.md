# Requiem [![Circle CI](https://circleci.com/gh/andrewscwei/requiem/tree/master.svg?style=svg)](https://circleci.com/gh/andrewscwei/requiem/tree/master) [![npm version](https://badge.fury.io/js/requiem.svg)](https://badge.fury.io/js/requiem)

Requiem is a simple, component-based UI library (not framework) packaged with DOM utilities and leverages [WebComponents](http://webcomponents.org/) and ES6 standards. It is stand-alone, hence has no external dependencies (i.e. no jQuery required), and around `17kb` gzipped.

## Optional Requirements

1. [webcomponents-lite.js](http://webcomponents.org/polyfills/): You may need this polyfill to ensure cross browser support.
2. [Webpack](https://webpack.js.org/): For loading template files in JavaScript.
3. [Minuet](https://github.com/andrewscwei/minuet): Requiem's sister stylesheet library.

## Overview

Requiem crawls your HTML markup on runtime and turns every **marked** element into an **instance** of a component that is defined in JS. Hence, there are 3 parts to this:

### Part 1: Mark the Element in HTML

In your HTML, mark every element as an instance of a component by using the `is` tag. You can also use the `name` tag to specify the instance name.

```html
<div is='my-element' name='page'>
</div>
```

### Part 2: Create the Component

```js
import requiem, { ui, enums } from 'requiem';

const { DirtyType } = enums;

/**
 * This is the controller for the custom element. Requiem's `Element` class is an abstract 
 * class that extends `HTMLElement` and comes loaded with many built-in features, such as
 * handling states, data and render loops.
 */
class MyElement extends ui.Element() {
  /**
   * Specify the custom element tag.
   *
   * @inheritdoc 
   */
  static get tag() { return 'my-element'; }
  
  /**
   * Specify the base element tag that this element extends from. This defaults to `div`.
   *
   * @inheritdoc 
   */
  static get extends() { return 'div'; }
  
  /**
   * Invoked when this script is successfully bound to the markup.
   *
   * @inheritdoc
   */
  init() {
    // This is a good place to set up the element with initial properties.
    super.init();
  }
  
  /**
   * Invoked when the instance is destroyed or removed from the DOM.
   *
   * @inheritdoc
   */
  destroy() {
    // Perform any clean up tasks here.
    super.destroy();
  }
  
  /**
   * Invoked whenever this instance requires updates.
   *
   * @inheritdoc
   */
  update() {
    // Handle updates here. Every time `setDirty(DirtyType)` is called, this method
    // will trigger on the next browser animation frame. You can handle different
    // types of updates by checking for the `DirtyType` that triggered the update.
    
    if (isDirty(DirtyType.POSITION)) {  
    }
    
    if (isDirty(DirtyType.LAYOUT)) {
    }
    
    if (isDirty(DirtyType.DATA)) {
    }
    
    // There are more dirty types. See `enums.DirtyType`.
    
    super.update();
  }
  ...
}
```

### Part 3: Register the Component

You must first register the component and then tell Requiem to crawl the markup so it can look for the marked elements and properly instantiate the components. This process is called **sightreading**.

```js
import requiem, { dom } from 'requiem';

// Register the component.
requiem(MyElement);

// Begin sightreading.
dom.sightread();
```

## Optional: Define Your Own Shadow DOM for the Component

You can use the `template()` function in `Element` to define your own shadow DOM. Whenever `DirtyType.RENDER` is marked as dirty, the component will replace its body with the output markup of the `template()` function. This function should return a string containing the desired body markup. With Webpack, you can even load an external template file. In the following example, it is loading an external [Pug](https://pugjs.org/api/getting-started.html) file.

```js
import requiem, { ui } from 'requiem';

class MyElement extends ui.Element() {
  ...
  
  /**
   * This method is optional. Implement it if you want this component to manage its own 
   * shadow DOM.
   *
   * @inheritdoc 
   */
  template(data) {
    // The 'data' param here comes prepopulated with this.data.
    return require('components/my-element.pug')(data);
  }
  
  ...
}
```

And finally create `my-element.pug`:

```pug
template#my-element
  p= 'Hello, world!'
```

## Nesting Components

You can have an instance of a component inside another component. For example:

```html
<div is='my-element' name='page'>
  <div is='foo-element' name='foo'>
    <div is='bar-element' name='bar'>
    </div>
  </div>
</div>
```

Inside `MyElement.js`, you can refer to its child components by using the `getChild()` method and passing the child's instance name as its argument:

```js
import requiem, { ui } from 'requiem';

class MyElement extends ui.Element() {
  ...
  
  init() {
    let foo = this.getChild('foo'); // This returns the `foo` instance of `FooElement`
    let bar = this.getChild('foo.bar'); // This returns the `bar` instance of `BarElement`
    trace(bar === foo.getChild('bar')); // This will return `true`.
    super.init();
  }
  
  ...
}
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
