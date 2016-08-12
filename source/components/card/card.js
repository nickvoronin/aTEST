import template from "./card.jade";

const defaultCardResponse = {
	text: "",
	isRight: false,
};

const defaultCard = {
	card_id: 0,
	question: "",
	responses: [
		{
			answer: "",
			isRight: false,
		},
		{
			answer: "",
			isRight: false,
		},
	],
	reward: 1,
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
		this.el.innerHTML = this._temlate(this.getData());
	}

	/**
	 * Init events listening
	 * @private
	 */
	_initEvents() {
		this.el.addEventListener("click", this._onClick.bind(this));
		//this.el.addEventListener("blur", this._saveCard.bind(this));
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
				this._showVersions(target);
				break;
			case "toggleVersions" :
				this._toggleVersions(target);
				break;
			case "addVersion" :
				this.addVersion(target);
				break;
			case "delete" :
				this._deleteVersion(target);
				break;
			case "toggleRightVersion" :
				this._toggleRightVersion(target);
				break;
			default :
				return;
		}
	}

	_showVersions() {
		//  убираем класс hidden на вариантах ответа
		const versions = this.el.querySelector(".card__answers");
		if (!versions.classList.remove("hidden")) return;

		// меняем индикатор: плюс - если варианты раскрыты, минус - если закрыты
		const indicator = this.el.querySelector(".card__edit_indicator");
		indicator.innerHTML = (indicator.innerHTML === "+") ? "-" : "+";
	}

	_toggleVersions() {
		//  тоглим класс на вариантах ответа
		const versions = this.el.querySelector(".card__answers");
		versions.classList.toggle("hidden");

		// меняем индикатор: плюс - если варианты раскрыты, минус - если закрыты
		const indicator = this.el.querySelector(".card__edit_indicator");
		indicator.innerHTML = (indicator.innerHTML === "+") ? "-" : "+";
	}

	addVersion() {
		// пересохраняю карту
		// TODO проверить, если операция проходит удачно
		const data = this.getData();
		data.responses.push(defaultCardResponse);
		this.setData(data);

		// клонирую последнюю версию
		const card = this.el;
		const versions = [...card.querySelectorAll(".card__response")];
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

	_deleteVersion(target, id = target.parentElement.dataset.versionid) {
		//const id = target.parentElement.dataset.versionid;
		const data = this.getData();

		// Отменяем операцию, если число версий после удаления будет меньше лимита
		const versionsAmount = data.responses.length;
		if (versionsAmount <= this._MINIMUM_VERSIONS_ALLOWED) {
			// TODO сделать визуальное оповещение о том, что операцию выполнить невозможно
			return;
		}

		// в данных карточки удаляем вариант ответа
		data.responses.splice(id, 1);

		// обновляем данные
		this.setData(data);

		// удаляем версию ответа из DOM
		const version = target.closest(".card__response");
		version.remove();
	}


	_toggleRightVersion(target) {
		const data = this.getData();
		const versionId = target.closest("[data-versionid]").dataset.versionid;

		data.responses[versionId].isRight = target.checked;

		this.setData(data);
	}

	_saveCard() {
		const form = this.el.querySelector("form");

		const data = {
			id: 0,
			question: form.elements.question.value,
			responses: Array.from(form.elements.response, response => {
				return {
					text: response.elements.text.value,
					isRight: response.elements.isRight.checked,
				};
			}),
			reward: Array.from(form.elements.radio, radio => radio.checked).indexOf(true),
		};

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
