/**
 * Requiem
 * (c) VARIANTE (http://variante.io)
 *
 * This software is released under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 *
 * Element node states.
 *
 * @type {Object}
 */

'use strict';

/**
 * Enum for all node states.
 *
 * @readonly
 * @enum {number}
 * @alias module:requiem~types.NodeState
 */
let NodeState = {
  /**
   * Element is instantiated but not initialized yet. This state almost never
   * persists.
   */
  IDLE: 0,

  /**
   * Element is initialized, but not updated yet.
   */
  INITIALIZED: 1,

  /**
   * Element is updated at least once.
   */
  UPDATED: 2,

  /**
   * Element is destroyed.
   */
  DESTROYED: 3,

  /**
   * Gets the name of a node state.
   *
   * @param  {NodeState} nodeState - Node state.
   *
   * @return {string} Name of the node state.
   */
  toString: (nodeState) => {
    switch (nodeState) {
      case NodeState.IDLE: return 'IDLE';
      case NodeState.INITIALIZED: return 'INITIALIZED';
      case NodeState.UPDATED: return 'UPDATED';
      case NodeState.DESTROYED: return 'DESTROYED';
      default: return 'UNKNOWN';
    }
  }
};

module.exports = NodeState;
