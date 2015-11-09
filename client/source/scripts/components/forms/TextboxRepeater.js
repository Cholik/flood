import classnames from 'classnames';
import React from 'react';

import Icon from '../icons/Icon.js';

const methodsToBind = [
  'getTextboxes',
  'handleTextboxChange'
];

export default class TextboxRepeater extends React.Component {

  constructor() {
    super();

    methodsToBind.forEach((method) => {
      this[method] = this[method].bind(this);
    });
  }

  getTextboxes() {
    let textboxes = this.props.textboxes.map((textbox, index) => {
      let addButton = (
        <button className="textbox-repeater__button textbox-repeater__add"
          onClick={this.props.handleTextboxAdd.bind(textbox, index)}>
          <Icon icon="addMini" size="mini" />
        </button>
      );
      let removeButton = null;

      if (index > 0) {
        removeButton = (
          <button className="textbox-repeater__button textbox-repeater__remove"
            onClick={this.props.handleTextboxRemove.bind(textbox, index)}>
            <Icon icon="removeMini" size="mini" />
          </button>
        );
      }

      return (
        <div className="textbox__wrapper form__row" key={index}>
          <input className="textbox"
            onChange={this.handleTextboxChange.bind(textbox, index)}
            placeholder={this.props.placeholder}
            value={textbox.value}
            type="text" />
          <div className="textbox-repeater__button-group">
            {removeButton}
            {addButton}
          </div>
        </div>
      );
    });
    return textboxes;
  }

  handleTextboxChange(index, event) {
    this.props.handleTextboxChange(index, event.target.value);
  }

  render() {
    return (
      <div className="textbox-repeater">
        {this.getTextboxes()}
      </div>
    );
  }

}
