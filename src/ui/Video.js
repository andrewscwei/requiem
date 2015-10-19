/**
 * Requiem
 * (c) VARIANTE (http://variante.io)
 *
 * This software is released under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Controller of a DOM 'video' element.
 *
 * @type {Class}
 */

'use strict';

define([
    'helpers/assert',
    'helpers/inherit',
    'helpers/log',
    'types/DirtyType',
    'ui/Element'
  ],
  function(
    assert,
    inherit,
    log,
    DirtyType,
    Element
  ) {
    inherit(Video, Element);

    /**
     * @constructor
     *
     * Creates a new Video instance.
     */
    function Video() {
      Video.__super__.constructor.apply(this, arguments);
    }

    /**
     * @static
     *
     * Constants for the 'preload' attribute.
     *
     * @type {Object}
     *
     * @see  http://www.w3schools.com/tags/tag_video.asp
     */
    Video.PRELOAD = {
      AUTO: 'auto',
      METADATA: 'metada',
      NONE: 'none'
    };

    /**
     * @inheritDoc
     */
    Video.prototype.update = function() {
      if (this.updateDelegate.isDirty(DirtyType.DATA)) {
        this._updateSource();
      }

      if (this.updateDelegate.isDirty(DirtyType.CUSTOM)) {

      }

      Video.__super__.update.call(this);
    };

    /**
     * @inheritDoc
     */
    Video.prototype.factory = function() {
      return document.createElement('video');
    };

    /**
     * @private
     *
     * Updates the sources in this Video instance.
     */
    Video.prototype._updateSource = function() {
      var i;
      var arrlen;

      // Update source(s).
      var oldSources = this.element.getElementsByTagName('source');

      arrlen = oldSources.length;

      for (i = 0; i < arrlen; i++) {
        var oldSource = oldSources[i];

        this.element.removeChild(oldSource);
      }

      if (!this.source) return;

      arrlen = this.source.length;

      for (i = 0; i < arrlen; i++) {
        var newSource = document.createElement('source');
        var path = this.source[i].src;
        var type = this.source[i].type;
        var ext = path.split('.').pop();

        newSource.setAttribute('src', path);
        newSource.setAttribute('type', type || 'video/' + ext);

        this.element.appendChild(newSource);
      }
    };

    /**
     * @inheritDoc
     */
    Video.prototype.toString = function() {
      return '[Video{' + this.name + '}]';
    };

    /**
     * @inheritDoc
     */
    Video.prototype.__define_properties = function() {
      /**
       * @property
       *
       * Specifies that the video will start playing as soon as it is ready.
       *
       * @type {Boolean}
       */
      Object.defineProperty(this, 'autoplay', {
        get: function() {
          return this.element.autoplay;
        },
        set: function(value) {
          this.element.autoplay = value;
          this.updateDelegate.setDirty(DirtyType.CUSTOM);
        }
      });

      /**
       * @property
       *
       * Specifies that video controls should be displayed (such as a play/pause
       * button etc).
       *
       * @type {Boolean}
       */
      Object.defineProperty(this, 'controls', {
        get: function() {
          return this.element.controls;
        },
        set: function(value) {
          this.element.controls = value;
          this.updateDelegate.setDirty(DirtyType.CUSTOM);
        }
      });

      /**
       * @property
       *
       * Specifies that the video will start over again, every time it is
       * finished.
       *
       * @type {Boolean}
       */
      Object.defineProperty(this, 'loop', {
        get: function() {
          return this.element.loop;
        },
        set: function(value) {
          this.element.loop = value;
          this.updateDelegate.setDirty(DirtyType.CUSTOM);
        }
      });

      /**
       * @property
       *
       * Specifies that the audio output of the video should be muted.
       *
       * @type {Boolean}
       */
      Object.defineProperty(this, 'muted', {
        get: function() {
          return this.element.muted;
        },
        set: function(value) {
          this.element.muted = value;
          this.updateDelegate.setDirty(DirtyType.CUSTOM);
        }
      });

      /**
       * @property
       *
       * Specifies an image to be shown while the video is downloading, or until
       * the user hits the play button.
       *
       * @type {String}   URL of image
       */
      Object.defineProperty(this, 'poster', {
        get: function() {
          return this.element.poster;
        },
        set: function(value) {
          this.element.poster = value;
          this.updateDelegate.setDirty(DirtyType.CUSTOM);
        }
      });

      /**
       * @property
       *
       * Specifies if and how the author thinks the video should be loaded when
       * the page loads
       *
       * @type {String}   See Video.AUTOPLAY
       */
      Object.defineProperty(this, 'preload', {
        get: function() {
          return this.element.preload;
        },
        set: function(value) {
          this.element.preload = value;
          this.updateDelegate.setDirty(DirtyType.CUSTOM);
        }
      });

      /**
       * @property
       *
       * Array of sources containing elements in the form of:
       *  Object {
       *    {String} src  Path of source.
       *    {String} type Type of source.
       *  }
       *
       * @type {Array}
       */
      Object.defineProperty(this, 'source', {
        get: function() {
          return this._source;
        },
        set: function(value) {
          Object.defineProperty(this, '_source', {
            value: value,
            writable: true
          });
          this.updateDelegate.setDirty(DirtyType.DATA);
        }
      });

      Video.__super__.__define_properties.call(this);
    };

    /**
     * @inheritDoc
     */
    Video.prototype.__set_element = function(value) {
      assert(value instanceof HTMLVideoElement, 'Invalid element type specified. Must be an instance of HTMLVideoElement.');
      Video.__super__.__set_element.call(this, value);
    };

    return Video;
  }
);
