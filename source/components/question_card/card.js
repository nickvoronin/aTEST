"use strict";

import "./menu.css";
import template from "./menu.jade";

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
		this.data = options.data;
		this._temlate = template;

		this.setData(opts.data || {title: '', items: []});
		this._initEvents();

	}

	/**
	 * Generate HTML
	 */
	render() {
		this.el.innerHTML = this._temlate(this.data);
	}

	/**
	 * Init events listening
	 * @private
	 */
	_initEvents() {
		console.log("Initialising events");
	}

	/**
	 * Set data
	 * @param data
	 */
	setData(data) {
		this.data = data;
	}

}