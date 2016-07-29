import template from "./topic.jade";

const defaultCard = {
	name: "Sample topic",
	cards: [
		{
			request: "Is this a question?",
			responses: [
				"yes",
				"no",
				"maybe",
			],
			multivariant: true,
			reward: 5, // ÐºÐ¾Ð»Ð¸Ñ‡ÐµÑÑ‚Ð²Ð¾ Ð±Ð°Ð»Ð»Ð¾Ð²
			rightAnswers: [0, 2],
		},{
			request: "Is this a question?",
			responses: [
				"yes",
				"no",
				"maybe",
			],
			multivariant: true,
			reward: 5, // ÐºÐ¾Ð»Ð¸Ñ‡ÐµÑÑ‚Ð²Ð¾ Ð±Ð°Ð»Ð»Ð¾Ð²
			rightAnswers: [0, 2],
		},{
			request: "Is this a question?",
			responses: [
				"yes",
				"no",
				"maybe",
			],
			multivariant: true,
			reward: 5, // ÐºÐ¾Ð»Ð¸Ñ‡ÐµÑÑ‚Ð²Ð¾ Ð±Ð°Ð»Ð»Ð¾Ð²
			rightAnswers: [0, 2],
		},
		{
			request: "Wanna get high?",
			responses: [
				"yes",
				"sure",
				"why not",
			],
			multivariant: false,
			reward: 2,
			rightAnswers: [0],
		},
	],
};

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
		this.el.innerHTML = this._temlate(this.data);
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
		event.preventDefault();
		const target = event.target;
		const shouldToggle = target.closest(".containerNewTopicQuestionAnswer__title");

		if (shouldToggle) {
			const versions = shouldToggle.querySelector(".containerNewTopicQuestionAnswer__dropPlus");
			versions.classList.toggle("drop");
			console.log(versions.classList);
		}

		// console.log(target);
	}

	/**
	 * Set data
	 * @param data
	 */
	setData(data) {
		this.data = data;
	}
}
