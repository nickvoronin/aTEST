import template from "./card.jade";

const defaultCardResponse = {
	text: "",
	isRight: false,
};

const defaultCard = {
	id: 0,
	question: "",
	responses: [
		{
			text: "",
			isRight: false,
		},
		{
			text: "",
			isRight: false,
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
		this._MINIMUM_VERSIONS_ALLOWED = 2;

		this.setData(this.data);

		this.render();
		this._initEvents();
	}

	/**
	 * Generate HTML
	 */
	render() {
		const data = this.getData();
		this.el.innerHTML = this._temlate(data);
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
			case "showVersions" :
				this._showVersions();
				break;
			case "addVersion" :
				this.addVersion();
				break;
			case "delete" :
				this._deleteVersion(target);
				break;
			case "toggleRightVersion" :
				this._toggleRightVersion();
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

	_deleteVersion(target) {
		const versionId = target.closest("[data-versionid]").dataset.versionid;
		const data = this.getData();

		// Отменяем операцию, если число версий после удаления будет меньше лимита
		const versionsAmount = data.responses.length;
		if (versionsAmount <= this._MINIMUM_VERSIONS_ALLOWED) {
			// TODO сделать визуальное оповещение о том, что операцию выполнить невозможно
			return;
		}

		// в данных карточки удаляем вариант ответа
		data.responses.splice(versionId, 1);

		// обновляем данные
		this.setData(data);

		// удаляем версию ответа из DOM
		target.closest(".containerNewTopicQuestionAnswer__addNewInput").remove();
		// TODO обновить индексы у версий ответа
	}


	_toggleRightVersion(target) {
		const data = this.getData();
		const versionId = target.closest("[data-versionid]").dataset.versionid;

		data.responses[versionId].isRight = target.checked;

		this.setData(data);
	}

	/**
	 * Set card data
	 * @param {Object} Card options
	 */
	setData(data) {
		this.data = data;
		return this.data;
	}

	/**
	 * Get card data
	 * @returns {*|{name: string, cards: *[]}}
	 */
	getData() {
		return this.data;
	}
}
