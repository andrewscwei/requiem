/**
 * Requiem
 * (c) VARIANTE (http://variante.io)
 *
 * This software is released under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 */

'use strict';

/**
 * Enum for custom DOM directives/attributes.
 *
 * @readonly
 * @enum {string}
 * @alias module:requiem~types.Directive
 * @see {@link module:requiem~dom.sightread}
 */
let Directive = {
  /**
   * Use this directive for attaching a controller class to a DOM element.
   * Controller classes are automatically instantiated during the sightreading
   * process.
   */
  CONTROLLER: 'r-controller',

  /**
   * Use this directive for assigning an instance name to a DOM element.
   */
  INSTANCE: 'r-instance',

  /**
   * Use this directive for managing DOM element states.
   */
  STATE: 'r-state',

  /**
   * Use this directive to map any property from the DOM to the controller.
   */
  PROPERTY: 'r'
};

module.exports = Directive;
