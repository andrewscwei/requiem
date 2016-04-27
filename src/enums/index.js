/**
 * Requiem
 * (c) VARIANTE (http://variante.io)
 *
 * This software is released under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 */

'use strict';

import Directive from './Directive';
import DirtyType from './DirtyType';
import EventType from './EventType';
import KeyCode from './KeyCode';
import NodeState from './NodeState';
import Orientation from './Orientation';
import ViewportSizeClass from './ViewportSizeClass';

/**
 * Collection of Requiem enums and types.
 *
 * @namespace module:requiem~enums
 */
const enums = {
  Directive: Directive,
  DirtyType: DirtyType,
  EventType: EventType,
  KeyCode: KeyCode,
  NodeState: NodeState,
  Orientation: Orientation,
  ViewportSizeClass: ViewportSizeClass
};

export default enums;
