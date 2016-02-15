/**
 * Requiem
 * (c) VARIANTE (http://variante.io)
 *
 * This software is released under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 */

'use strict';

import DirtyType from '../enums/DirtyType';
import Element from './Element';

/**
 * @class
 *
 * Controller of a DOM 'video' element.
 *
 * @extends module:requiem~ui.Element
 * @alias module:requiem~ui.Video
 */
class Video extends Element {
  /**
   * @inheritdoc
   */
  update() {
    if (this.updateDelegate.isDirty(DirtyType.DATA)) this.__update_source();
    super.update();
  }

  /**
   * @inheritdoc
   */
  render() {
    return document.createElement('video');
  }

  /**
   * Updates the sources in this Video instance.
   *
   * @private
   */
  __update_source() {
    let i;
    let arrlen;

    // Update source(s).
    let oldSources = this.element.getElementsByTagName('source');

    arrlen = oldSources.length;

    for (i = 0; i < arrlen; i++) {
      let oldSource = oldSources[i];

      this.element.removeChild(oldSource);
    }

    if (!this.source) return;

    arrlen = this.source.length;

    for (i = 0; i < arrlen; i++) {
      let newSource = document.createElement('source');
      let path = this.source[i].src;
      let type = this.source[i].type;
      let ext = path.split('.').pop();

      newSource.setAttribute('src', path);
      newSource.setAttribute('type', type || 'video/' + ext);

      this.element.appendChild(newSource);
    }
  }

  /**
   * @inheritdoc
   */
  __validate_element(element) {
    return true;
  }

  /**
   * @inheritdoc
   */
  __define_properties() {
    /**
     * Specifies that the video will start playing as soon as it is ready.
     *
     * @property {boolean}
     */
    Object.defineProperty(this, 'autoplay', {
      get: () => (this.element.autoplay),
      set: (value) => {
        this.element.autoplay = value;
        this.updateDelegate.setDirty(DirtyType.CUSTOM);
      }
    });

    /**
     * Specifies that video controls should be displayed (such as a play/pause
     * button etc).
     *
     * @property {boolean}
     */
    Object.defineProperty(this, 'controls', {
      get: () => (this.element.controls),
      set: (value) => {
        this.element.controls = value;
        this.updateDelegate.setDirty(DirtyType.CUSTOM);
      }
    });

    /**
     * Specifies that the video will start over again, every time it is
     * finished.
     *
     * @property {boolean}
     */
    Object.defineProperty(this, 'loop', {
      get: () => (this.element.loop),
      set: (value) => {
        this.element.loop = value;
        this.updateDelegate.setDirty(DirtyType.CUSTOM);
      }
    });

    /**
     * Specifies that the audio output of the video should be muted.
     *
     * @property {boolean}
     */
    Object.defineProperty(this, 'muted', {
      get: () => (this.element.muted),
      set: (value) => {
        this.element.muted = value;
        this.updateDelegate.setDirty(DirtyType.CUSTOM);
      }
    });

    /**
     * Specifies an image to be shown while the video is downloading, or until
     * the user hits the play button.
     *
     * @property {string}
     */
    Object.defineProperty(this, 'poster', {
      get: () => (this.element.poster),
      set: (value) => {
        this.element.poster = value;
        this.updateDelegate.setDirty(DirtyType.CUSTOM);
      }
    });

    /**
     * Specifies if and how the author thinks the video should be loaded when
     * the page loads
     *
     * @property {string}
     */
    Object.defineProperty(this, 'preload', {
      get: () => (this.element.preload),
      set: (value) => {
        this.element.preload = value;
        this.updateDelegate.setDirty(DirtyType.CUSTOM);
      }
    });

    /**
     * Array of sources containing elements in the form of:
     * Object {
     *   {string} src  - Path of source.
     *   {string} type - Type of source.
     * }
     *
     * @property {Object[]}
     */
    Element.defineProperty(this, 'source', {
      get: true,
      set: true,
      dirtyType: DirtyType.DATA
    });

    super.__define_properties();
  }
}

module.exports = Video;
