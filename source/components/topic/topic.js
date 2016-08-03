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
		const item = target.closest("li");

		switch (target.dataset.action) {
		case "showVersions" :
			this._showVersions(item);
			break;
		case "addVersion" :
			this.addVersion(item);
			break;
		default :
			return;
		}
	}

	_showVersions(item) {
		const versions = item.querySelector(".containerNewTopicQuestionAnswer__toggleEditPart");
		const indicator = item.querySelector(".containerNewTopicQuestionAnswer__dropPlus");
		versions.classList.toggle("hidden");
		indicator.innerHTML = (indicator.innerHTML === "+") ? "-" : "+";
	}

	addVersion(item) {
		const id = item.dataset.id;
		const parentNode = item.querySelector(".containerNewTopicQuestionAnswer__input-containerForm");
		const versions = parentNode.querySelectorAll(".containerNewTopicQuestionAnswer__addNewInput");
		const lastVersion = versions[versions.length - 1];
		const newVersion = lastVersion.cloneNode(true);
		newVersion.querySelector("input").value = "";

		lastVersion.parentNode.insertBefore(newVersion, lastVersion.nextSibling);

		const data = this.getData();
		data.cards[id].responses.push("");
		this.setData(data);
	}

	/**
	 * Set data
	 * @param data
	 */
	setData(data) {
		this.data = data;
	}

	getData() {
		return this.data;
	}
}
