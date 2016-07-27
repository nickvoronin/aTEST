"use strict";

import template from "./topic.jade"

export default class Topic {
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
		this.el = this._temlate(this.data.title);
		console.log(`Topic: ${this.data.title} rendered`);
	}

	/**
	 * Init events listening
	 * @private
	 */
	_initEvents() {
		console.log(`Topic: ${this.data.title} events initialised`);
	}

	/**
	 * Set data
	 * @param data
	 */
	setData(data) {
		this.data = data;
	}
}