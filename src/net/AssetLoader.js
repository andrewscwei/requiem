/**
 * Requiem
 * (c) VARIANTE (http://variante.io)
 *
 * This software is released under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 */

'use strict';

import assert from '../helpers/assert';
import inherit from '../helpers/inherit';
import log from '../helpers/log';
import EventDispatcher from '../events/EventDispatcher';
import EventType from '../types/EventType';

/**
 * Common image file extensions.
 *
 * @const
 * @memberof module:requiem~net.AssetLoader
 * @type {Array}
 * @default
 */
const IMAGE_EXTENSIONS = ['jpg', 'png', 'svg', 'jpeg', 'gif'];

/**
 * Common video file extensions.
 *
 * @const
 * @memberof module:requiem~net.AssetLoader
 * @type {Array}
 * @default
 */
const VIDEO_EXTENSIONS = ['mp4', 'mpeg', 'ogg', 'ogv', 'mov', 'avi', 'flv'];

/**
 * Common audio file extensions.
 *
 * @const
 * @memberof module:requiem~net.AssetLoader
 * @type {Array}
 * @default
 */
const AUDIO_EXTENSIONS = ['mp3', 'mp4', 'mpeg', 'flac', 'wav', 'ogg'];

/**
 * Mime type lookup.
 *
 * @const
 * @memberof module:requiem~net.AssetLoader
 * @enum {Object}
 * @default
 */
const MIME_TYPES = {
  IMAGE: {
    jpg: 'image/jpeg',
    jpeg: 'image/jpeg',
    gif: 'image/gif',
    png: 'image/png',
    svg: 'image/svg'
  },
  VIDEO: {
    mp4: 'video/mp4',
    mov: 'video/quicktime',
    mpeg: 'video/mpeg',
    ogg: 'video/ogg',
    ogv: 'video/ogg',
    avi: 'video/avi',
    flv: 'video/x-flv'
  },
  AUDIO: {
    mp3: 'audio/mpeg',
    mpeg: 'audio/mpeg',
    mp4: 'audio/mp4',
    flac: 'audio/flac',
    ogg: 'audio/ogg',
    wav: 'audio/vnd.wave'
  }
};

/**
 * @class
 *
 * Asset loader for images, videos, and audios.
 *
 * @extends module:requiem~events.EventDispatcher
 */
class AssetLoader extends EventDispatcher {
  constructor() {
    super();
  }

  /**
   * Initializes this AssetLoader instance and begins loading assets in the
   * queue.
   */
  init() {
    if (this.queue.length < 1) return;

    log('[AssetLoader]::init()');

    let arrlen = this.queue.length;

    this._xhrs = [];
    this._pending = arrlen;

    for (let i = 0; i < arrlen; i++) {
      let target = this.queue[i];

      log('[AssetLoader]::Started loading: ' + target.path);

      let xhr = this.getXHR({
        id: i,
        path: target.path,
        type: target.type
      });
      xhr.send();

      this._xhrs.push(xhr);
    }
  }

  /**
   * Destroys this AssetLoader instance and resets its state to idle for
   * recyclable use.
   */
  destroy() {
    if (this._xhrs) {
      let arrlen = this._xhrs.length;

      for (let i = 0; i < arrlen; i++) {
        let xhr = this._xhrs[i];
        xhr.abort();
        this._xhrs[i] = null;
      }

      this._queue = null;
      this._assets = null;
      this._bytesLoaded = null;
      this._bytesTotal = null;
    }

    this._state = AssetLoader.STATE.IDLE;
  }

  /**
   * Adds target loading assets to the queue. Assumes each parameter is as
   * follows:
   * Object {
   *  {string} path  Path of asset.
   *  {string} type  Type of asset (can only be 'image', 'video', or
   *                 'audio').
   * }
   */
  enqueue() {
    assert(arguments && arguments.length > 0, 'There are no arguments specified.');
    assert(this.state !== AssetLoader.STATE.IN_PROGRESS, 'Enqueueing is prohibited when the state is in progress.');

    if (!arguments) return;
    if (arguments.length <= 0) return;
    if (this.state === AssetLoader.STATE.IN_PROGRESS) return;

    log('[AssetLoader]::enqueue(' + arguments + ')');

    let arrlen = arguments.length;

    for (let i = 0; i < arrlen; i++) {
      let arg = arguments[i];

      assert(typeof arg === 'string' || typeof arg === 'object', 'Each item to be enqueued must be a string of the target path or an object containing a "path" key and/or a "type" key');
      assert(typeof arg === 'string' || typeof arg.path === 'string', 'Invalid path specified: ' + arg.path + '.');

      let path = (typeof arg === 'string') ? arg : arg.path;
      let type = arg.type;

      if (!type) {
        let ext = path.split('.').pop().toLowerCase();

        if (IMAGE_EXTENSIONS.indexOf(ext) > -1) {
          type = AssetLoader.TYPE.IMAGE;
        } else if (VIDEO_EXTENSIONS.indexOf(ext) > -1) {
          type = AssetLoader.TYPE.VIDEO;
        } else if (AUDIO_EXTENSIONS.indexOf(ext) > -1) {
          type = AssetLoader.TYPE.AUDIO;
        } else {
          throw '[AssetLoader]::Unsupported asset format: ' + path;
        }
      }

      if (type) {
        this.queue.push({
          path: path,
          type: type
        });

        if (!this._bytesLoaded) this._bytesLoaded = [];
        if (!this._bytesTotal) this._bytesTotal = [];

        this._bytesLoaded.push(0.0);
        this._bytesTotal.push(0.0);
      }
    }
  }

  /**
   * Removes loading targets from the queue. Each parameter is a path that
   * must match one that is already in the queue.
   */
  dequeue() {
    assert(arguments && arguments.length > 0, 'There are no arguments specified.');
    assert(this.state !== AssetLoader.STATE.IN_PROGRESS, 'Dequeueing is prohibited when the state is in progress.');

    if (!arguments) return;
    if (arguments.length <= 0) return;
    if (this.state === AssetLoader.STATE.IN_PROGRESS) return;

    let arrlen = arguments.length;

    for (let i = 0; i < arrlen; i++) {
      let arg = arguments[i];

      assert(typeof arg === 'string', 'Expecting path to be a string.');

      let n = this.queue.length;

      for (let j = 0; j < n; j++) {
        let target = this.queue[j];

        if (target.path === arg) {
          this.queue.splice(j, 1);
          this.bytesLoaded.splice(j, 1);
          this.bytesTotal.splice(j, 1);

          break;
        }
      }
    }
  }

  /**
   * Creates and returns a new XHR instance with prepopulated configurations.
   *
   * @param {Object} data
   *
   * @return {Object} XHR instance.
   */
  getXHR(data) {
    let ext = data.path.split('.').pop().toLowerCase();
    let mimeType = MIME_TYPES[data.type.toUpperCase()][ext];

    if (!mimeType) {
      throw '[AssetLoader]:: Unsupported asset format: ' + data.path;
    }

    let xhr = new XMLHttpRequest();
    xhr.addEventListener('progress', this._onXHRProgress.bind(this), false);
    xhr.addEventListener('load', this._onXHRLoadComplete.bind(this), false);
    xhr.addEventListener('error', this._onXHRLoadError.bind(this), false);
    xhr.addEventListener('abort', this._onXHRAbort.bind(this), false);

    xhr.open('GET', data.path, this.async);
    if (xhr.overrideMimeType) xhr.overrideMimeType(mimeType);
    xhr.data = data;

    return xhr;
  }

  /**
   * Handler invoked when an XHR instance is in progress.
   *
   * @param {Object} event
   *
   * @private
   */
  _onXHRProgress(event) {
    if (!event.lengthComputable) return;

    let xhr = event.currentTarget;
    let id = xhr.data.id;
    let path = xhr.data.path;
    let type = xhr.data.type;
    let bytesLoaded = event.loaded;
    let bytesTotal = event.total;

    // Hash progress into XHR data.
    xhr.data.bytesLoaded = bytesLoaded;
    xhr.data.bytesTotal = bytesTotal;

    this._bytesLoaded[id] = bytesLoaded;
    this._bytesTotal[id] = bytesTotal;

    if (!this._bytesLoaded) this._bytesLoaded = [];

    log('[AssetLoader]::_onXHRProgress("' + path + '":' + bytesLoaded + '/' + bytesTotal + ')');

    let progressEvent = new CustomEvent(EventType.OBJECT.PROGRESS, {
      bubbles: true,
      cancelable: true,
      detail: {
        id: id,
        path: path,
        type: type,
        pending: this._pending,
        loaded: this.bytesLoaded,
        total: this.bytesTotal
      }
    });

    this.dispatchEvent(progressEvent);
  }

  /**
   * Handler invoked when an XHR instance completes its operation.
   *
   * @param {Object} event
   *
   * @private
   */
  _onXHRLoadComplete(event) {
    let xhr = event.currentTarget;
    let id = xhr.data.id;
    let path = xhr.data.path;
    let type = xhr.data.type;

    log('[AssetLoader]::_onXHRLoadComplete("' + path + '"")');

    this._pending--;

    let loadEvent = new CustomEvent(EventType.OBJECT.LOAD, {
      bubbles: true,
      cancelable: true,
      detail: {
        id: id,
        path: path,
        type: type,
        pending: this._pending,
        loaded: this.bytesLoaded,
        total: this.bytesTotal
      }
    });

    this.dispatchEvent(loadEvent);
  }

  /**
   * Handler invoked when an XHR instance fails its operation.
   *
   * @param {Object} event
   *
   * @private
   */
  _onXHRLoadError(event) {
    let xhr = event.currentTarget;
    let id = xhr.data.id;
    let path = xhr.data.path;
    let type = xhr.data.type;

    log('[AssetLoader]::_onXHRLoadError("' + path + '"")');

    this._pending--;

    let errorEvent = new CustomEvent(EventType.OBJECT.ERROR, {
      bubbles: true,
      cancelable: true,
      detail: {
        id: id,
        path: path,
        type: type,
        pending: this._pending,
        loaded: this.bytesLoaded,
        total: this.bytesTotal
      }
    });

    this.dispatchEvent(errorEvent);

    if (this._pending === 0) {
      let loadEvent = new CustomEvent(EventType.OBJECT.LOAD, {
        bubbles: true,
        cancelable: true,
        detail: {
          id: id,
          path: path,
          type: type,
          pending: this._pending,
          loaded: this.bytesLoaded,
          total: this.bytesTotal
        }
      });

      this.dispatchEvent(loadEvent);
    }
  }

  /**
   * Handler invoked when an XHR aborts its operation.
   *
   * @param {Object} event
   *
   * @private
   */
  _onXHRAbort(event) {
    let xhr = event.currentTarget;
    let id = xhr.data.id;
    let path = xhr.data.path;
    let type = xhr.data.type;

    log('[AssetLoader]::_onXHRLoadError("' + path + '"")');

    this._pending--;

    let abortEvent = new CustomEvent(EventType.OBJECT.ABORT, {
      bubbles: true,
      cancelable: true,
      detail: {
        id: id,
        path: path,
        type: type,
        pending: this._pending,
        loaded: this.bytesLoaded,
        total: this.bytesTotal
      }
    });

    this.dispatchEvent(abortEvent);

    if (this._pending === 0) {
      let loadEvent = new CustomEvent(EventType.OBJECT.LOAD, {
        bubbles: true,
        cancelable: true,
        detail: {
          id: id,
          path: path,
          type: type,
          pending: this._pending,
          loaded: this.bytesLoaded,
          total: this.bytesTotal
        }
      });

      this.dispatchEvent(loadEvent);
    }
  }

  /**
   * @inheritdoc
   */
  __define_properties() {
    /**
     * @property
     *
     * Specifies the current state of this AssetLoader instance.
     *
     * @type {number}
     */
    Object.defineProperty(this, 'state', {
      get: function() {
        if (!this._state) {
          Object.defineProperty(this, '_state', {
            value: AssetLoader.STATE.IDLE,
            writable: true
          });
        }

        return this._state;
      }
    });

    /**
     * @property
     *
     * View of this AssetLoader instance.
     *
     * @type {Object}
     */
    Object.defineProperty(this, 'queue', {
      get: function() {
        if (!this._queue) {
          Object.defineProperty(this, '_queue', {
            value: [],
            writable: true
          });
        }

        return this._queue;
      }
    });

    /**
     * @property
     *
     * Loaded assets.
     *
     * @type {Object}
     */
    Object.defineProperty(this, 'assets', {
      get: function() {
        if (!this._assets) {
          Object.defineProperty(this, '_assets', {
            value: {},
            writable: true
          });
        }

        return this._assets;
      }
    });

    /**
     * @property
     *
     * Specifies whether the XHR operations run in async.
     *
     * @type {boolean}
     */
    Object.defineProperty(this, 'async', {
      get: function() {
        if (this._async === undefined) {
          return true;
        }
        else {
          return this._async;
        }
      },
      set: function(value) {
        assert(this.state !== AssetLoader.STATE.IN_PROGRESS, 'Cannot change the async mode while it is in progress.');

        if (this.state !== AssetLoader.STATE.IN_PROGRESS) {
          Object.defineProperty(this, '_async', {
            value: value,
            writable: true
          });
        }
      }
    });

    /**
     * @property
     *
     * Specifies the total bytes loaded for all assets in the queue.
     *
     * @type {number}
     */
    Object.defineProperty(this, 'bytesLoaded', {
      get: function() {
        if (!this._bytesLoaded) {
          return 0.0;
        }
        else {
          let total = 0;
          let arrlen = this._bytesLoaded.length;

          for (let i = 0; i < arrlen; i++) {
            total += this._bytesLoaded[i];
          }

          return total;
        }
      }
    });

    /**
     * @property
     *
     * Specifies the total bytes for all assets in the queue.
     *
     * @type {number}
     */
    Object.defineProperty(this, 'bytesTotal', {
      get: function() {
        if (!this._bytesTotal) {
          return 0.0;
        }
        else {
          let total = 0;
          let arrlen = this._bytesTotal.length;

          for (let i = 0; i < arrlen; i++) {
            total += this._bytesTotal[i];
          }

          return total;
        }
      }
    });

    /**
     * @property
     *
     * Specifies the current progress (in decimals) of the entire operation.
     *
     * @return {number}
     */
    Object.defineProperty(this, 'progress', {
      get: function() {
        if (!this._bytesTotal || !this._bytesLoaded) return 0.0;
        if (this._bytesTotal.length !== this._bytesLoaded.length) return 0.0;

        let arrlen = this._bytesTotal.length;
        let sum = 0.0;

        for (let i = 0; i < arrlen; i++) {
          let loaded = this._bytesLoaded[i];
          let total = this._bytesTotal[i];

          if (total > 0.0) {
            sum += loaded / total;
          }
        }

        return sum / arrlen;
      }
    });

    super.__define_properties();
  }
}

/**
 * @static
 *
 * Different states of AssetLoader.
 *
 * @enum {number}
 */
AssetLoader.STATE = {
  IDLE: 0,
  IN_PROGRESS: 1,
  COMPLETED: 2,
  FAILED: 3,
  ABORTED: 4
};

/**
 * @static
 *
 * Different supported asset types of AssetLoader.
 *
 * @enum {string}
 */
AssetLoader.TYPE = {
  IMAGE: 'image',
  VIDEO: 'video',
  AUDIO: 'audio'
};

module.exports = AssetLoader;
