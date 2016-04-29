// (c) VARIANTE

'use strict';

import Element from './Element';
import Grid from './Grid';
import register from '../dom/register';

/**
 * Collection of UI related methods/classes.
 *
 * @namespace module:requiem~ui
 */
const ui = {
  Element: Element,
  Grid: Grid
};

register(Element);
register(Grid);

export default ui;
