import template from "./card.jade";

const defaultCardResponse = {
	text: "",
	isRight: false,
};

const defaultCard = {
	id: 0,
	question: "Is this a questio?",
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
		this.el.innerHTML = this._temlate(this.getData());
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
		const card = target.closest("li");

		switch (target.dataset.action) {
			case "showVersions" :
				this._showVersions(target);
				break;
			case "addVersion" :
				this.addVersion(card);
				break;
			case "delete" :
				this._deleteVersion(card, target);
				break;
			case "toggleRightVersion" :
				this._toggleRightVersion(target);
				break;
			default :
				return;
		}
	}

	_showVersions() {
		//  тоглим класс на вариантах ответа
		const versions = this.el.querySelector(".containerNewTopicQuestionAnswer__toggleEditPart");
		versions.classList.toggle("hidden");

		// меняем индикатор: плюс - если варианты раскрыты, минус - если закрыты
		const indicator = this.el.querySelector(".containerNewTopicQuestionAnswer__dropPlus");
		indicator.innerHTML = (indicator.innerHTML === "+") ? "-" : "+";
	}


	addVersion() {
		// пересохраняю карту
		// TODO заменить на try...catch
		const data = this.getData();
		data.responses.push(defaultCardResponse);
		if (!this.setData(data)) {
			return;
		}

		// клонирую последнюю версию
		const card = this.el;
		const versions = [...card.querySelectorAll(".containerNewTopicQuestionAnswer__addNewInput")];
		const lastVersion = versions[versions.length - 1];
		const newVersion = lastVersion.cloneNode(true);


		// обнуляю все инпуты
		const inputs = newVersion.getElementsByTagName("input");
		for (const input of inputs) {
			if (input.checked) input.checked = false;
			if (input.value) input.value = "";
		}

		// прикрепляю новую версию после последней
		lastVersion.parentNode.insertBefore(newVersion, lastVersion.nextSibling);
	}

	_deleteVersion(card, target) {
		const minimumVersionsAllowed = 2;

		const form = target.parentElement;
		const id = form.dataset.id;
		const versionId = form.dataset.versionid;
		const data = this.getData();

		const t1 = data.cards[id].responses.length;

		if (t1 <= minimumVersionsAllowed) {
			// TODO сделать визуальное оповещение о том, что операцию выполнить невозможно
			return;
		}

		data.cards[id].responses.splice(versionId, 1); // в данных карточки удаляем вариант ответа
		this.setData(data); // обновляем данные

		// удаляем версию ответа из DOM
		const version = target.closest(".singleQuestionForm");
		version.remove();
	}

	_toggleRightVersion(target) {
		const data = this.getData();
		const id = target.dataset.id;
		const versionId = target.dataset.versionid;
		data.cards[id].responses[versionId].isRight = target.checked;

		this.setData(data);
	}

	/**
	 * Set topic data
	 * @param data
	 */
	setData(data) {
		this.data = data;
		return this.data
	}

	/**
	 * Get topic data
	 * @returns {*|{name: string, cards: *[]}}
	 */
	getData() {
		return this.data;
	}
}
