// (c) VARIANTE

'use strict';

/**
 * Polyfill to support HTMLElements as classes in Safari. In Safari, typeof
 * HTMLElement === 'object'.
 *
 * @alias module:requiem~polyfills.polyfillHTMLElements
 *
 * @see {@link https://phabricator.babeljs.io/T1548}
 * @see {@link https://bugs.webkit.org/show_bug.cgi?id=74193}
 */
function polyfillHTMLElements() {
  if (typeof HTMLElement !== 'function') {
    var _HTMLElement = function(){};
    _HTMLElement.prototype = HTMLElement.prototype;
    HTMLElement = _HTMLElement;
  }

  if (typeof HTMLButtonElement !== 'function') {
    var _HTMLButtonElement = function(){};
    _HTMLButtonElement.prototype = HTMLButtonElement.prototype;
    HTMLButtonElement = _HTMLButtonElement;
  }

  if (typeof HTMLAnchorElement !== 'function') {
    var _HTMLAnchorElement = function(){};
    _HTMLAnchorElement.prototype = HTMLAnchorElement.prototype;
    HTMLAnchorElement = _HTMLAnchorElement;
  }

  if (typeof HTMLCanvasElement !== 'function') {
    var _HTMLCanvasElement = function(){};
    _HTMLCanvasElement.prototype = HTMLCanvasElement.prototype;
    HTMLCanvasElement = _HTMLCanvasElement;
  }
}

export default polyfillHTMLElements;
