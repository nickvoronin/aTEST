"use strict";

import template from "./card.jade";

/**
 * @class Card
 * Card with questions and answers
 */
export default class Card {
	/**
	 *
	 * @param {Object} options
	 */
	constructor(options) {
		this.el = options.el;
		this.data = options.data || {title: 'unknown', items: []};
		this._temlate = template;

		this.setData(this.data);
		this.render();
		this._initEvents();

	}

	/**
	 * Generate HTML
	 */
	render() {
		//debugger;
		this.el.innerHTML = this._temlate(this.data.title);
		console.log(`Card: ${this.data.title} rendered`);
	}

	/**
	 * Init events listening
	 * @private
	 */
	_initEvents() {
		console.log(`Card: ${this.data.title} events initialised`);
	}

	/**
	 * Set data
	 * @param data
	 */
	setData(data) {
		this.data = data;
	}

}