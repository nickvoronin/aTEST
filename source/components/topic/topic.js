import template from "./topic.jade";
import Card from "../card/card.js";

const defaultData = {
	name: "Sample topic",
	cards: [
		{
			id: 0,
			question: "Is this a question?",
			responses: [
				{
					text: "yes",
					isRight: true,
				},
				{
					text: "no",
					isRight: false,
				},
				{
					text: "maybe",
					isRight: true,
				},
			],
			reward: 5, // ÐºÐ¾Ð»Ð¸Ñ‡ÐµÑÑ‚Ð²Ð¾ Ð±Ð°Ð»Ð»Ð¾Ð²
			rightAnswers: [0, 2],
		},
		{
			id: 1,
			question: "Wanna get high?",
			responses: [
				{
					text: "yes",
					isRight: false,
				},
				{
					text: "sure",
					isRight: true,
				},
				{
					text: "why not",
					isRight: false,
				},
			],
			reward: 2,
			rightAnswers: [0],
		},
	],
};

/**
 * @class Card
 * Card with questions and answers
 */
export default class Topic {
	/**
	 *
	 * @param {Object} options
	 */
	constructor(options) {
		this.el = options.el;
		this.data = options.data || defaultData;
		this._temlate = template;
		this.cards = [];

		this.setData(this.data);
		this.render();
		this._initEvents();
	}


	/**
	 * Init events listening
	 * @private
	 */
	_initEvents() {
		this.el.addEventListener("click", this._onClick.bind(this));
	}



	/**
	 * Handle click events
	 * @param event
	 * @private
	 */
	_onClick(event) {
		const target = event.target;

		switch (target.dataset.action) {
			case "addcard" :
				this.addCard();
				break;
			default :
				return;
		}
	}



	/**
	 * Generate HTML
	 */
	render() {
		const data = this.getData();

		// render topic body
		this.el.innerHTML = this._temlate(data);

		// render question cards
		for (const card of data.cards) {
			this.renderCard(card);
		}
	}

	renderCard(data) {
		const el = document.createElement("li");
		this.el.querySelector("ol").appendChild(el);
		const card = new Card({
			el,
			data,
		});
	}

	addCard() {
		// TODO update data
		this.renderCard();
	}


	/**
	 * Set topic data
	 * @param data
	 */
	setData(data) {
		this.data = data;
	}

	/**
	 * Get topic data
	 * @returns {*|{name: string, cards: *[]}}
	 */
	getData() {
		return this.data;
	}
}
