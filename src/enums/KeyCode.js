/**
 * Requiem
 * (c) VARIANTE (http://variante.io)
 *
 * This software is released under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 *
 * @type {Object}
 */

'use strict';

/**
 * Enum for universal key codes.
 *
 * @readonly
 * @enum {number}
 * @alias module:requiem~enums.KeyCode
 */
let KeyCode = {
  BACKSPACE:     8,
  TAB:           9,
  ENTER:         13,
  SHIFT:         16,
  CTRL:          17,
  ALT:           18,
  PAUSE_BREAK:   19,
  CAPS_LOCK:     20,
  ESCAPE:        27,
  PAGE_UP:       33,
  PAGE_DOWN:     34,
  END:           35,
  HOME:          36,
  LEFT_ARROW:    37,
  UP_ARROW:      38,
  RIGHT_ARROW:   39,
  DOWN_ARROW:    40,
  INSERT:        45,
  DELETE:        46,
  ZERO:          48,
  ONE:           49,
  TWO:           50,
  THREE:         51,
  FOUR:          52,
  FIVE:          53,
  SIX:           54,
  SEVEN:         55,
  EIGHT:         56,
  NINE:          57,
  A:             65,
  B:             66,
  C:             67,
  D:             68,
  E:             69,
  F:             70,
  G:             71,
  H:             72,
  I:             73,
  J:             74,
  K:             75,
  L:             76,
  M:             77,
  N:             78,
  O:             79,
  P:             80,
  Q:             81,
  R:             82,
  S:             83,
  T:             84,
  U:             85,
  V:             86,
  W:             87,
  X:             88,
  Y:             89,
  Z:             90,
  LEFT_CMD:      91,
  RIGHT_CMD:     92,
  SELECT:        93,
  NUMPAD_ZERO:   96,
  NUMPAD_ONE:    97,
  NUMPAD_TWO:    98,
  NUMPAD_THREE:  99,
  NUMPAD_FOUR:   100,
  NUMPAD_FIVE:   101,
  NUMPAD_SIX:    102,
  NUMPAD_SEVEN:  103,
  NUMPAD_EIGHT:  104,
  NUMPAD_NINE:   105,
  MULTIPLY:      106,
  ADD:           107,
  SUBTRACT:      109,
  DECIMAL:       110,
  DIVIDE:        111,
  F1:            112,
  F2:            113,
  F3:            114,
  F4:            115,
  F5:            116,
  F6:            117,
  F7:            118,
  F8:            119,
  F9:            120,
  F10:           121,
  F11:           122,
  F12:           123,
  NUM_LOCK:      144,
  SCROLL_LOCK:   145,
  SEMI_COLON:    186,
  EQUAL:         187,
  COMMA:         188,
  DASH:          189,
  PERIOD:        190,
  FORWARD_SLASH: 191,
  GRAVE_ACCENT:  192,
  OPEN_BRACKET:  219,
  BACK_SLASH:    220,
  CLOSE_BRACKET: 221,
  SINGLE_QUOTE:  222,

  /**
   * Gets the name of a key code.
   *
   * @param {KeyCode} keyCode - Key code.
   *
   * @return {string} Name of the key code.
   */
  toString: (keyCode) => {
    switch (keyCode) {
      case KeyCode.BACKSPACE:     return 'BACKSPACE';
      case KeyCode.TAB:           return 'TAB';
      case KeyCode.ENTER:         return 'ENTER';
      case KeyCode.SHIFT:         return 'SHIFT';
      case KeyCode.CTRL:          return 'CTRL';
      case KeyCode.ALT:           return 'ALT';
      case KeyCode.PAUSE_BREAK:   return 'PAUSE_BREAK';
      case KeyCode.CAPS_LOCK:     return 'CAPS_LOCK';
      case KeyCode.ESCAPE:        return 'ESCAPE';
      case KeyCode.PAGE_UP:       return 'PAGE_UP';
      case KeyCode.PAGE_DOWN:     return 'PAGE_DOWN';
      case KeyCode.END:           return 'END';
      case KeyCode.HOME:          return 'HOME';
      case KeyCode.LEFT_ARROW:    return 'LEFT_ARROW';
      case KeyCode.UP_ARROW:      return 'UP_ARROW';
      case KeyCode.RIGHT_ARROW:   return 'RIGHT_ARROW';
      case KeyCode.DOWN_ARROW:    return 'DOWN_ARROW';
      case KeyCode.INSERT:        return 'INSERT';
      case KeyCode.DELETE:        return 'DELETE';
      case KeyCode.ZERO:          return 'ZERO';
      case KeyCode.ONE:           return 'ONE';
      case KeyCode.TWO:           return 'TWO';
      case KeyCode.THREE:         return 'THREE';
      case KeyCode.FOUR:          return 'FOUR';
      case KeyCode.FIVE:          return 'FIVE';
      case KeyCode.SIX:           return 'SIX';
      case KeyCode.SEVEN:         return 'SEVEN';
      case KeyCode.EIGHT:         return 'EIGHT';
      case KeyCode.NINE:          return 'NINE';
      case KeyCode.A:             return 'A';
      case KeyCode.B:             return 'B';
      case KeyCode.C:             return 'C';
      case KeyCode.D:             return 'D';
      case KeyCode.E:             return 'E';
      case KeyCode.F:             return 'F';
      case KeyCode.G:             return 'G';
      case KeyCode.H:             return 'H';
      case KeyCode.I:             return 'I';
      case KeyCode.J:             return 'J';
      case KeyCode.K:             return 'K';
      case KeyCode.L:             return 'L';
      case KeyCode.M:             return 'M';
      case KeyCode.N:             return 'N';
      case KeyCode.O:             return 'O';
      case KeyCode.P:             return 'P';
      case KeyCode.Q:             return 'Q';
      case KeyCode.R:             return 'R';
      case KeyCode.S:             return 'S';
      case KeyCode.T:             return 'T';
      case KeyCode.U:             return 'U';
      case KeyCode.V:             return 'V';
      case KeyCode.W:             return 'W';
      case KeyCode.X:             return 'X';
      case KeyCode.Y:             return 'Y';
      case KeyCode.Z:             return 'Z';
      case KeyCode.LEFT_CMD:      return 'LEFT_CMD';
      case KeyCode.RIGHT_CMD:     return 'RIGHT_CMD';
      case KeyCode.SELECT:        return 'SELECT';
      case KeyCode.NUMPAD_ZERO:   return 'NUMPAD_ZERO';
      case KeyCode.NUMPAD_ONE:    return 'NUMPAD_ONE';
      case KeyCode.NUMPAD_TWO:    return 'NUMPAD_TWO';
      case KeyCode.NUMPAD_THREE:  return 'NUMPAD_THREE';
      case KeyCode.NUMPAD_FOUR:   return 'NUMPAD_FOUR';
      case KeyCode.NUMPAD_FIVE:   return 'NUMPAD_FIVE';
      case KeyCode.NUMPAD_SIX:    return 'NUMPAD_SIX';
      case KeyCode.NUMPAD_SEVEN:  return 'NUMPAD_SEVEN';
      case KeyCode.NUMPAD_EIGHT:  return 'NUMPAD_EIGHT';
      case KeyCode.NUMPAD_NINE:   return 'NUMPAD_NINE';
      case KeyCode.MULTIPLY:      return 'MULTIPLY';
      case KeyCode.ADD:           return 'ADD';
      case KeyCode.SUBTRACT:      return 'SUBTRACT';
      case KeyCode.DECIMAL:       return 'DECIMAL';
      case KeyCode.DIVIDE:        return 'DIVIDE';
      case KeyCode.F1:            return 'F1';
      case KeyCode.F2:            return 'F2';
      case KeyCode.F3:            return 'F3';
      case KeyCode.F4:            return 'F4';
      case KeyCode.F5:            return 'F5';
      case KeyCode.F6:            return 'F6';
      case KeyCode.F7:            return 'F7';
      case KeyCode.F8:            return 'F8';
      case KeyCode.F9:            return 'F9';
      case KeyCode.F10:           return 'F10';
      case KeyCode.F11:           return 'F11';
      case KeyCode.F12:           return 'F12';
      case KeyCode.NUM_LOCK:      return 'NUM_LOCK';
      case KeyCode.SCROLL_LOCK:   return 'SCROLL_LOCK';
      case KeyCode.SEMI_COLON:    return 'SEMI_COLON';
      case KeyCode.EQUAL:         return 'EQUAL';
      case KeyCode.COMMA:         return 'COMMA';
      case KeyCode.DASH:          return 'DASH';
      case KeyCode.PERIOD:        return 'PERIOD';
      case KeyCode.FORWARD_SLASH: return 'FORWARD_SLASH';
      case KeyCode.GRAVE_ACCENT:  return 'GRAVE_ACCENT';
      case KeyCode.OPEN_BRACKET:  return 'OPEN_BRACKET';
      case KeyCode.BACK_SLASH:    return 'BACK_SLASH';
      case KeyCode.CLOSE_BRACKET: return 'CLOSE_BRACKET';
      case KeyCode.SINGLE_QUOTE:  return 'SINGLE_QUOTE';
      default:                    return 'UNKNOWN';
    }
  }
};

module.exports = KeyCode;
