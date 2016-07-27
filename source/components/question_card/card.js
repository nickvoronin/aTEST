"use strict";

import template from "./card.jade";

const defaultCard = {
	name: "Sample test",
	items: [
		{
			request: "Is this a question?",
			responses: [
				"yes",
				"no",
				"maybe"
			],
			multivariant: true,
			reward: 5, // ÐºÐ¾Ð»Ð¸Ñ‡ÐµÑÑ‚Ð²Ð¾ Ð±Ð°Ð»Ð»Ð¾Ð²
			rightAnswers: [0, 2]
		},
		{
			request: "Wanna get high?",
			responses: [
				"yes",
				"no"
			],
			multivariant: false,
			reward: 2,
			rightAnswers: [0]
		}
	]
}

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
		this.data = options.data || defaultCard;
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

		this.el.innerHTML = this._temlate(this.data);
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