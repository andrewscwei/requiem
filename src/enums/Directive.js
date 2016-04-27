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
 * @alias module:requiem~enums.Directive
 * @see {@link module:requiem~dom.sightread}
 */
const Directive = {
  /**
   * Use this directive for attaching a controller class to a DOM element.
   * Controller classes are automatically instantiated during the sightreading
   * process.
   */
  CLASS: 'data-class',

  /**
   * Use this directive for assigning an instance name to a DOM element.
   */
  INSTANCE: 'data-instance',

  /**
   * Use this directive for managing DOM element states.
   */
  STATE: 'data-state',

  /**
   * Use this directive for referencing global shared data.
   */
  REF: 'data-ref',

  /**
   * Use this directive to map any property from the DOM to the controller.
   */
  PROPERTY: 'data-'
};

export default Directive;
