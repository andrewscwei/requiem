// © Grubbb

import Element from './Element';
import dom from '../dom';
import DirtyType from '../enums/DirtyType';
import EventType from '../enums/EventType';
import Orientation from '../enums/Orientation';
import assertType from '../helpers/assertType';
import getRect from '../utils/getRect';
import transform from '../utils/transform';
import translate from '../utils/translate';

/**
 * @class
 *
 * Masonry grid element.
 *
 * @alias module:requiem~ui.Grid
 */
class Grid extends Element {
  /** @inheritdoc */
  static get tag() { return 'r-grid'; }

  /**
   * Uniform padding between each grid item. This padding can be defined as a
   * member or a DOM attribute, prioritized respectively.
   *
   * @type {number}
   */
  get padding() {
    let v1 = this.__private__.padding;
    let v2 = this.getData('padding');
    if (!isNaN(v1)) return v1;
    if (!isNaN(v2)) return v2;
    return 0;
  }

  set padding(value) {
    assertType(value, 'number', false, 'Padding must be a number in pixels');
    if (value === this.padding) return;
    this.__private__.padding = value;
    this.setDirty(DirtyType.LAYOUT);
  }

  /**
   * Max width of this grid. Max width can be defined as a member, a CSS style
   * rule, or a DOM attribute, prioritized respectively.
   *
   * @type {number}
   */
  get maxWidth() {
    let parentNode = this.parentNode && (this.parentNode.host || this.parentNode);
    let refPadding = parentNode ? (dom.getStyle(parentNode, 'padding-left', true, true).value + dom.getStyle(parentNode, 'padding-right', true, true).value) : 0;
    let ref = (parentNode ? getRect(parentNode).width : 0) - refPadding;
    let v1 = this.__private__.maxWidth;
    let v2 = this.getStyle('max-width', true);
    let v3 = this.getData('maxWidth');
    let v;

    if (v3 !== null && v3 !== undefined) v = v3;
    if (v2 !== null && v2 !== undefined) v = v2;
    if (v1 !== null && v1 !== undefined) v = v1;
    if (v === null || v === undefined) v = ref;

    assertType(v, ['number', 'string'], false, 'Invalid max width provided');

    if (typeof v === 'number') return v;
    if (v.indexOf('px') > -1) return Number(v.substring(0, v.length-2));
    if (v.indexOf('%') > -1) return (Number(v.substring(0, v.length-1))/100*ref);
    return ref;
  }

  set maxWidth(value) {
    assertType(value, 'number', false, 'Max width must be a number in pixels');
    if (value === this.maxWidth) return;
    this.__private__.maxWidth = value;
    this.setDirty(DirtyType.SIZE);
  }

  /**
   * Max height of this grid. Max height can be defined as a member, a CSS style
   * rule, or a DOM attribute, prioritized respectively.
   *
   * @type {number}
   */
  get maxHeight() {
    let parentNode = this.parentNode && (this.parentNode.host || this.parentNode);
    let refPadding = parentNode ? (dom.getStyle(parentNode, 'padding-top', true, true).value + dom.getStyle(parentNode, 'padding-bottom', true, true).value) : 0;
    let ref = (parentNode ? getRect(parentNode).height : 0) - refPadding;
    let v1 = this.__private__.maxHeight;
    let v2 = this.getStyle('max-height', true);
    let v3 = this.getData('maxHeight');
    let v;

    if (v3 !== null && v3 !== undefined) v = v3;
    if (v2 !== null && v2 !== undefined) v = v2;
    if (v1 !== null && v1 !== undefined) v = v1;
    if (v === null || v === undefined) v = ref;

    assertType(v, ['number', 'string'], false, 'Invalid max height provided');

    if (typeof v === 'number') return v;
    if (v.indexOf('px') > -1) return Number(v.substring(0, v.length-2));
    if (v.indexOf('%') > -1) return (Number(v.substring(0, v.length-1))/100*ref);
    return ref;
  }

  set maxHeight(value) {
    assertType(value, 'number', false, 'Max height must be a number in pixels');
    if (value === this.maxHeight) return;
    this.__private__.maxHeight = value;
    this.setDirty(DirtyType.SIZE);
  }

  /**
   * Orientation of the grid, either portrait or landscape.
   *
   * @type {Orientation}
   * @see module:requiem~enums.Orientation
   */
  get orientation() {
    let v1 = this.__private__.orientation;
    let v2 = this.getData('orientation');

    if (!isNaN(v1)) return v1;
    if (!isNaN(v2)) return v2;
    return Orientation.PORTRAIT;
  }

  set orientation(value) {
    assertType(value, 'number', false, 'Invalid orientation provided');
    if (value === this.orientation) return;
    this.__private__.orientation = value;
    this.setDirty(DirtyType.LAYOUT);
  }

  /**
   * Number of items in this grid.
   *
   * @type {number}
   * @readonly
   */
  get length() {
    let items = this.items;
    if (items) return items.length;
    return 0;
  }

  /**
   * Array of items in this grid.
   *
   * @type {Array}
   * @readonly
   */
  get items() {
    return [].concat(this.getChild('item'));
  }

  /**
   * Individual item width. This can either be specified as a member or as a
   * DOM attribute, prioritized respectively. If unspecified or set as NaN, the
   * width will be derived naturally from individual child item.
   *
   * @type {number}
   */
  get itemWidth() {
    let v1 = this.__private__.itemWidth;
    let v2 = this.getData('itemWidth');

    if (!isNaN(v1)) return v1;
    if (!isNaN(v2)) return v2;
    return NaN;
  }

  set itemWidth(value) {
    if (value === this.itemWidth) return;

    if (value === null) {
      this.__private__.itemWidth = NaN;
    }
    else {
      assertType(value, 'number', false);
      this.__private__.itemWidth = value;
    }

    this.setDirty(DirtyType.SIZE);
  }

  /**
   * Individual item height. This can either be specified as a member or as a
   * DOM attribute, prioritized respectively. If unspecified or set as NaN, the
   * height will be derived naturally from individual child item.
   *
   * @type {number}
   */
  get itemHeight() {
    let v1 = this.__private__.itemHeight;
    let v2 = this.getData('itemHeight');

    if (!isNaN(v1)) return v1;
    if (!isNaN(v2)) return v2;
    return NaN;
  }

  set itemHeight(value) {
    if (value === this.itemHeight) return;

    if (value === null) {
      this.__private__.itemHeight = NaN;
    }
    else {
      assertType(value, 'number', false);
      this.__private__.itemHeight = value;
    }

    this.setDirty(DirtyType.SIZE);
  }

  /**
   * Specifies whether this grid will auto resize itself to fit child items.
   *
   * @type {boolean}
   */
  get autoResize() {
    let v1 = this.__private__.autoResize;
    let v2 = this.getData('autoResize');
    let v;

    if (v1 !== null && v1 !== undefined) {
      v = v1;
    }
    else if (v2 !== null && v2 !== undefined) {
      v = v2;
    }
    else {
      v = false;
    }

    assertType(v, 'boolean', false);

    return v;
  }

  set autoResize(value) {
    if (value === this.autoResize) return;
    this.__private__.autoResize = value;
    this.setDirty(DirtyType.SIZE);
  }

  /** @inheritdoc */
  init() {
    this.respondsTo(10.0, EventType.OBJECT.RESIZE);
    super.init();
  }

  /** @inheritdoc */
  update() {
    if (this.isDirty(DirtyType.SIZE|DirtyType.LAYOUT)) {
      this.reposition();
    }

    super.update();
  }

  /**
   * Repositions invidual child item.
   */
  reposition() {
    let l = this.length;
    if (this.length < 2) return;

    let map = [{ x: 0, y: 0, width: this.maxWidth, height: this.maxHeight }];
    let w = 0;
    let h = 0;
    let mw = NaN;
    let mh = NaN;

    for (let i = 0; i < l; i++) {
      let item = this.getChild('item')[i];

      if (!isNaN(this.itemWidth)) transform(item, { width: this.itemWidth });
      if (!isNaN(this.itemHeight)) transform(item, { height: this.itemHeight });

      let slot = this.__computeItemPosition(item, map);

      if (!slot) continue;

      dom.setStyle(item, 'position', 'absolute');
      translate(item, { x: slot.x, y: slot.y });

      let rect = getRect(item);

      if (slot.x + rect.width > w) w = slot.x + rect.width;
      if (slot.y + rect.height > h) h = slot.y + rect.height;

      if (isNaN(mw) || (rect.width < mw)) mw = rect.width;
      if (isNaN(mh) || (rect.height < mh)) mh = rect.height;
    }

    if (!this.autoResize) {
      if (!isNaN(mw) && this.orientation === Orientation.PORTRAIT) {
        w = this.maxWidth - ((this.maxWidth - w) % (mw + this.padding));
      }
      else if (!isNaN(mh)) {
        h = this.maxHeight - ((this.maxHeight - h) % (mh + this.padding));
      }
    }

    transform(this, { width: isNaN(w) ? 0 : w, height: isNaN(h) ? 0 : h });
  }

  /**
   * Computes the position of the specified children according to a vacancy
   * map.
   * @param {Element} item      - Target item.
   * @param {Array}   vacancies - Array of open slots.
   *
   * @return {Object} Hash describing the computed position of the target item.
   *
   * @private
   */
  __computeItemPosition(item, vacancies) {
    let rect = getRect(item);
    let slot = null;
    let index = -1;
    let n = vacancies.length;

    for (let i = 0; i < n; i++) {
      let vacancy = vacancies[i];

      if (this.orientation === Orientation.PORTRAIT) {
        if (vacancy.width >= rect.width) {
          if (!slot || (vacancy.y < slot.y) || (vacancy.y === slot.y && vacancy.x < slot.x)) {
            slot = vacancy;
            index = i;
          }
        }
      }
      else {
        if (vacancy.height >= rect.height) {
          if (!slot || (vacancy.x < slot.x) || (vacancy.x === slot.x && vacancy.y < slot.y)) {
            slot = vacancy;
            index = i;
          }
        }
      }
    }

    if (slot && index > -1) {
      if (this.orientation === Orientation.PORTRAIT) {
        if ((slot.width - rect.width - this.padding) > 0) {
          vacancies[index] = {
            x: slot.x + rect.width + this.padding,
            y: slot.y,
            width: slot.width - rect.width - this.padding
          };
        }
        else {
          vacancies.splice(index, 1);
        }

        vacancies.push({
          x: slot.x,
          y: slot.y + rect.height + this.padding,
          width: rect.width
        });
      }
      else {
        if ((slot.height - rect.height - this.padding) > 0) {
          vacancies[index] = {
            x: slot.x,
            y: slot.y + rect.height + this.padding,
            height: slot.height - rect.height - this.padding
          };
        }
        else {
          vacancies.splice(index, 1);
        }

        vacancies.push({
          x: slot.x + rect.width + this.padding,
          y: slot.y,
          height: rect.height
        });
      }
    }

    return slot;
  }
}

export default Grid;
