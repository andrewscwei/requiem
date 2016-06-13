// (c) Andrew Wei

'use strict';

import Element from './Element';
import MasonryGrid from './MasonryGrid';
import register from '../dom/register';

/**
 * Collection of UI related methods/classes.
 *
 * @namespace module:requiem~ui
 */
const ui = {
  Element: Element,
  MasonryGrid: MasonryGrid
};

register(MasonryGrid);

export default ui;
