// (c) VARIANTE

'use strict';

/**
 * Enum for all supported event types.
 *
 * @readonly
 * @enum {string}
 * @alias module:requiem~enums.EventType
 */
const EventType = {
  NODE: {
    INITIALIZE: 'initialize', // Custom
    UPDATE: 'update', // Custom
    DESTROY: 'destroy', // Custom
    NODE_STATE: 'nodestate' // Custom
  },
  DATA: {
    DATA_CHANGE: 'datachange' // Custom
  },
  MOUSE: {
    CLICK: 'click',
    CONTEXT_MENU: 'contextmenu',
    CLICK_OUTSIDE: 'clickoutside', // Custom
    DOUBLE_CLICK: 'dblclick',
    MOUSE_DOWN: 'mousedown',
    MOUSE_ENTER: 'mouseenter',
    MOUSE_LEAVE: 'mouseleave',
    MOUSE_MOVE: 'mousemove',
    MOUSE_OVER: 'mouseover',
    MOUSE_OUT: 'mouseout',
    MOUSE_UP: 'mouseup'
  },
  KEYBOARD: {
    KEY_DOWN: 'keydown',
    KEY_PRESS: 'keypress',
    KEY_UP: 'keyup'
  },
  DEVICE: {
    DEVICE_ORIENTATION: 'deviceorientation',
    DEVICE_MOTION: 'devicemotion',
    ORIENTATION: 'MozOrientation',
    ORIENTATION_CHANGE: 'orientationchange'
  },
  OBJECT: {
    ABORT: 'abort',
    BEFORE_UNLOAD: 'beforeunload',
    ERROR: 'error',
    HASH_CHANGE: 'hashchange',
    LOAD: 'load',
    PAGE_SHOW: 'pageshow',
    PAGE_HIDE: 'pagehide',
    RESIZE: 'resize',
    SCROLL: 'scroll',
    UNLOAD: 'unload',
    PROGRESS: 'progress', // Custom
    STATE: 'state', // Custom
    COMPLETE: 'complete'
  },
  FORM: {
    BLUR: 'blur',
    CHANGE: 'change',
    FOCUS: 'focus',
    FOCUS_IN: 'focusin',
    FOCUS_OUT: 'focusout',
    INPUT: 'input',
    INVALID: 'invalid',
    RESET: 'reset',
    SEARCH: 'search',
    SELECT: 'select',
    SUBMIT: 'submit',
    CANCEL: 'cancel' // Custom
  },
  DRAG: {
    DRAG: 'drag',
    DRAG_END: 'dragend',
    DRAG_ENTER: 'dragenter',
    DRAG_LEAVE: 'dragleave',
    DRAG_OVER: 'dragover',
    DRAG_START: 'dragstart',
    DROP: 'drop'
  },
  CLIPBOARD: {
    COPY: 'copy',
    CUT: 'cut',
    PASTE: 'paste'
  },
  PRINT: {
    AFTER_PRINT: 'afterprint',
    BEFORE_PRINT: 'beforeprint'
  },
  MEDIA: {
    ABORT: 'abort',
    CAN_PLAY: 'canplay',
    CAN_PLAY_THROUGH: 'canplaythrough',
    DURATION_CHANGE: 'durationchange',
    EMPTIED: 'emptied',
    ENDED: 'ended',
    ERROR: 'error',
    LOADED_DATA: 'loadeddata',
    LOADED_METADATA: 'loadedmetadata',
    LOAD_START: 'loadstart',
    PAUSE: 'pause',
    PLAY: 'play',
    PLAYING: 'playing',
    PROGRESS: 'progress',
    RATE_CHANGE: 'ratechange',
    SEEKED: 'seeked',
    SEEKING: 'seeking',
    STALLED: 'stalled',
    SUSPEND: 'suspend',
    TIME_UPDATE: 'timeupdate',
    VOLUME_CHANGE: 'volumechange',
    WAITING: 'waiting'
  },
  ANIMATION: {
    ANIMATION_END: 'animationend',
    ANIMATION_ITERATION: 'animationiteration',
    ANIMATION_START: 'animationstart'
  },
  TRANSITION: {
    TRANSITION_END: 'transitionend'
  },
  SERVER_SENT: {
    ERROR: 'error',
    MESSAGE: 'message',
    OPEN: 'open'
  },
  MISC: {
    MESSAGE: 'message',
    ONLINE: 'online',
    OFFLINE: 'offline',
    POP_STATE: 'popstate',
    SHOW: 'show',
    STORAGE: 'storage',
    TOGGLE: 'toggle',
    WHEEL: 'wheel',
    ENTER_FRAME: 'enterframe' // Custom
  },
  TOUCH: {
    TOUCH_CANCEL: 'touchcancel',
    TOUCH_END: 'touchend',
    TOUCH_MOVE: 'touchmove',
    TOUCH_START: 'touchstart'
  }
};

export default EventType;
