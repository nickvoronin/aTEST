/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	var _topic = __webpack_require__(1);
	
	var _topic2 = _interopRequireDefault(_topic);
	
	var _model = __webpack_require__(7);
	
	var _model2 = _interopRequireDefault(_model);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	var topicOptions = {
		el: document.querySelector(".app")
	};
	
	var card = new _topic2.default(topicOptions);
	var model = new _model2.default();
	model.fetch();

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _topic = __webpack_require__(2);
	
	var _topic2 = _interopRequireDefault(_topic);
	
	var _card = __webpack_require__(5);
	
	var _card2 = _interopRequireDefault(_card);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var defaultData = {
		name: "Sample topic",
		cards: [{
			id: 0,
			question: "Is this a question?",
			responses: [{
				text: "yes",
				isRight: true
			}, {
				text: "no",
				isRight: false
			}, {
				text: "maybe",
				isRight: true
			}],
			reward: 5, // ÐºÐ¾Ð»Ð¸Ñ‡ÐµÑÑ‚Ð²Ð¾ Ð±Ð°Ð»Ð»Ð¾Ð²
			rightAnswers: [0, 2]
		}, {
			id: 1,
			question: "Wanna get high?",
			responses: [{
				text: "yes",
				isRight: false
			}, {
				text: "sure",
				isRight: true
			}, {
				text: "why not",
				isRight: false
			}],
			reward: 2,
			rightAnswers: [0]
		}]
	};
	
	/**
	 * @class Card
	 * Card with questions and answers
	 */
	
	var Topic = function () {
		/**
	  *
	  * @param {Object} options
	  */
		function Topic(options) {
			_classCallCheck(this, Topic);
	
			this.el = options.el;
			this.data = options.data || defaultData;
			this._temlate = _topic2.default;
			this.cards = [];
	
			this.setData(this.data);
			this.render();
			this._initEvents();
		}
	
		/**
	  * Init events listening
	  * @private
	  */
	
	
		_createClass(Topic, [{
			key: "_initEvents",
			value: function _initEvents() {
				this.el.addEventListener("click", this._onClick.bind(this));
			}
	
			/**
	   * Handle click events
	   * @param event
	   * @private
	   */
	
		}, {
			key: "_onClick",
			value: function _onClick(event) {
				var target = event.target;
	
				switch (target.dataset.action) {
					case "addcard":
						this.addCard();
						break;
					default:
						return;
				}
			}
	
			/**
	   * Generate HTML
	   */
	
		}, {
			key: "render",
			value: function render() {
				var data = this.getData();
	
				// render topic body
				this.el.innerHTML = this._temlate(data);
	
				// render question cards
				var _iteratorNormalCompletion = true;
				var _didIteratorError = false;
				var _iteratorError = undefined;
	
				try {
					for (var _iterator = data.cards[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
						var card = _step.value;
	
						this.renderCard(card);
					}
				} catch (err) {
					_didIteratorError = true;
					_iteratorError = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion && _iterator.return) {
							_iterator.return();
						}
					} finally {
						if (_didIteratorError) {
							throw _iteratorError;
						}
					}
				}
			}
		}, {
			key: "renderCard",
			value: function renderCard(data) {
				var el = document.createElement("li");
				this.el.querySelector("ol").appendChild(el);
				var card = new _card2.default({
					el: el,
					data: data
				});
			}
		}, {
			key: "addCard",
			value: function addCard() {
				// TODO update data
				this.renderCard();
			}
	
			/**
	   * Set topic data
	   * @param data
	   */
	
		}, {
			key: "setData",
			value: function setData(data) {
				this.data = data;
			}
	
			/**
	   * Get topic data
	   * @returns {*|{name: string, cards: *[]}}
	   */
	
		}, {
			key: "getData",
			value: function getData() {
				return this.data;
			}
		}]);
	
		return Topic;
	}();
	
	exports.default = Topic;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var jade = __webpack_require__(3);
	
	module.exports = function template(locals) {
	var buf = [];
	var jade_mixins = {};
	var jade_interp;
	;var locals_for_with = (locals || {});(function (name) {
	buf.push("<link rel=\"stylesheet\" href=\"../source/components/topic/topic.css\"><header class=\"header\"><div class=\"header__title\"><p>Создание Новой Темы</p></div></header><section class=\"topic\"><div class=\"wrapper\"><input type=\"text\"" + (jade.attr("value", name, true, true)) + " placeholder=\"Название Темы\" class=\"topic__name\"><!-- ## ## ## ## ## ## ## ## ## ## ## ## CARDS WILL RENDER HERE ## ## ## ## ## ## ## ## ## ## ## ## ## ##--><ol class=\"topic__cards toggle col-9\"></ol><!-- sidebar will render here--><div class=\"sidebarAnalytics col-3 cf\"><div class=\"sidebarAnalytics__title\"><p>Topic Info</p></div><ul><li><p>Сложность 1<span>5</span></p></li><li><p>Сложность 2<span>3</span></p></li><li><p>Сложность 3<span>7</span></p></li></ul></div><button data-action=\"addcard\" class=\"addCard\">add card</button></div></section>");}.call(this,"name" in locals_for_with?locals_for_with.name:typeof name!=="undefined"?name:undefined));;return buf.join("");
	}

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	
	/**
	 * Merge two attribute objects giving precedence
	 * to values in object `b`. Classes are special-cased
	 * allowing for arrays and merging/joining appropriately
	 * resulting in a string.
	 *
	 * @param {Object} a
	 * @param {Object} b
	 * @return {Object} a
	 * @api private
	 */
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	exports.merge = function merge(a, b) {
	  if (arguments.length === 1) {
	    var attrs = a[0];
	    for (var i = 1; i < a.length; i++) {
	      attrs = merge(attrs, a[i]);
	    }
	    return attrs;
	  }
	  var ac = a['class'];
	  var bc = b['class'];
	
	  if (ac || bc) {
	    ac = ac || [];
	    bc = bc || [];
	    if (!Array.isArray(ac)) ac = [ac];
	    if (!Array.isArray(bc)) bc = [bc];
	    a['class'] = ac.concat(bc).filter(nulls);
	  }
	
	  for (var key in b) {
	    if (key != 'class') {
	      a[key] = b[key];
	    }
	  }
	
	  return a;
	};
	
	/**
	 * Filter null `val`s.
	 *
	 * @param {*} val
	 * @return {Boolean}
	 * @api private
	 */
	
	function nulls(val) {
	  return val != null && val !== '';
	}
	
	/**
	 * join array as classes.
	 *
	 * @param {*} val
	 * @return {String}
	 */
	exports.joinClasses = joinClasses;
	function joinClasses(val) {
	  return (Array.isArray(val) ? val.map(joinClasses) : val && (typeof val === 'undefined' ? 'undefined' : _typeof(val)) === 'object' ? Object.keys(val).filter(function (key) {
	    return val[key];
	  }) : [val]).filter(nulls).join(' ');
	}
	
	/**
	 * Render the given classes.
	 *
	 * @param {Array} classes
	 * @param {Array.<Boolean>} escaped
	 * @return {String}
	 */
	exports.cls = function cls(classes, escaped) {
	  var buf = [];
	  for (var i = 0; i < classes.length; i++) {
	    if (escaped && escaped[i]) {
	      buf.push(exports.escape(joinClasses([classes[i]])));
	    } else {
	      buf.push(joinClasses(classes[i]));
	    }
	  }
	  var text = joinClasses(buf);
	  if (text.length) {
	    return ' class="' + text + '"';
	  } else {
	    return '';
	  }
	};
	
	exports.style = function (val) {
	  if (val && (typeof val === 'undefined' ? 'undefined' : _typeof(val)) === 'object') {
	    return Object.keys(val).map(function (style) {
	      return style + ':' + val[style];
	    }).join(';');
	  } else {
	    return val;
	  }
	};
	/**
	 * Render the given attribute.
	 *
	 * @param {String} key
	 * @param {String} val
	 * @param {Boolean} escaped
	 * @param {Boolean} terse
	 * @return {String}
	 */
	exports.attr = function attr(key, val, escaped, terse) {
	  if (key === 'style') {
	    val = exports.style(val);
	  }
	  if ('boolean' == typeof val || null == val) {
	    if (val) {
	      return ' ' + (terse ? key : key + '="' + key + '"');
	    } else {
	      return '';
	    }
	  } else if (0 == key.indexOf('data') && 'string' != typeof val) {
	    if (JSON.stringify(val).indexOf('&') !== -1) {
	      console.warn('Since Jade 2.0.0, ampersands (`&`) in data attributes ' + 'will be escaped to `&amp;`');
	    };
	    if (val && typeof val.toISOString === 'function') {
	      console.warn('Jade will eliminate the double quotes around dates in ' + 'ISO form after 2.0.0');
	    }
	    return ' ' + key + "='" + JSON.stringify(val).replace(/'/g, '&apos;') + "'";
	  } else if (escaped) {
	    if (val && typeof val.toISOString === 'function') {
	      console.warn('Jade will stringify dates in ISO form after 2.0.0');
	    }
	    return ' ' + key + '="' + exports.escape(val) + '"';
	  } else {
	    if (val && typeof val.toISOString === 'function') {
	      console.warn('Jade will stringify dates in ISO form after 2.0.0');
	    }
	    return ' ' + key + '="' + val + '"';
	  }
	};
	
	/**
	 * Render the given attributes object.
	 *
	 * @param {Object} obj
	 * @param {Object} escaped
	 * @return {String}
	 */
	exports.attrs = function attrs(obj, terse) {
	  var buf = [];
	
	  var keys = Object.keys(obj);
	
	  if (keys.length) {
	    for (var i = 0; i < keys.length; ++i) {
	      var key = keys[i],
	          val = obj[key];
	
	      if ('class' == key) {
	        if (val = joinClasses(val)) {
	          buf.push(' ' + key + '="' + val + '"');
	        }
	      } else {
	        buf.push(exports.attr(key, val, false, terse));
	      }
	    }
	  }
	
	  return buf.join('');
	};
	
	/**
	 * Escape the given string of `html`.
	 *
	 * @param {String} html
	 * @return {String}
	 * @api private
	 */
	
	var jade_encode_html_rules = {
	  '&': '&amp;',
	  '<': '&lt;',
	  '>': '&gt;',
	  '"': '&quot;'
	};
	var jade_match_html = /[&<>"]/g;
	
	function jade_encode_char(c) {
	  return jade_encode_html_rules[c] || c;
	}
	
	exports.escape = jade_escape;
	function jade_escape(html) {
	  var result = String(html).replace(jade_match_html, jade_encode_char);
	  if (result === '' + html) return html;else return result;
	};
	
	/**
	 * Re-throw the given `err` in context to the
	 * the jade in `filename` at the given `lineno`.
	 *
	 * @param {Error} err
	 * @param {String} filename
	 * @param {String} lineno
	 * @api private
	 */
	
	exports.rethrow = function rethrow(err, filename, lineno, str) {
	  if (!(err instanceof Error)) throw err;
	  if ((typeof window != 'undefined' || !filename) && !str) {
	    err.message += ' on line ' + lineno;
	    throw err;
	  }
	  try {
	    str = str || __webpack_require__(4).readFileSync(filename, 'utf8');
	  } catch (ex) {
	    rethrow(err, null, lineno);
	  }
	  var context = 3,
	      lines = str.split('\n'),
	      start = Math.max(lineno - context, 0),
	      end = Math.min(lines.length, lineno + context);
	
	  // Error context
	  var context = lines.slice(start, end).map(function (line, i) {
	    var curr = i + start + 1;
	    return (curr == lineno ? '  > ' : '    ') + curr + '| ' + line;
	  }).join('\n');
	
	  // Alter exception message
	  err.path = filename;
	  err.message = (filename || 'Jade') + ':' + lineno + '\n' + context + '\n\n' + err.message;
	  throw err;
	};
	
	exports.DebugItem = function DebugItem(lineno, filename) {
	  this.lineno = lineno;
	  this.filename = filename;
	};

/***/ },
/* 4 */
/***/ function(module, exports) {

	/* (ignored) */

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	var _card = __webpack_require__(6);
	
	var _card2 = _interopRequireDefault(_card);
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var defaultCardResponse = {
		text: "",
		isRight: false
	};
	
	var defaultCard = {
		id: 0,
		question: "",
		responses: [{
			text: "",
			isRight: false
		}, {
			text: "",
			isRight: false
		}],
		reward: 1
	};
	
	/**
	 * @class Card
	 * Card with questions and answers
	 */
	
	var Card = function () {
		/**
	  *
	  * @param {Object} options
	  */
		function Card(options) {
			_classCallCheck(this, Card);
	
			this.el = options.el;
			this.data = options.data || defaultCard;
			this._temlate = _card2.default;
			this._MINIMUM_VERSIONS_ALLOWED = 2;
	
			this.setData(this.data);
	
			this.render();
			this._initEvents();
		}
	
		/**
	  * Generate HTML
	  */
	
	
		_createClass(Card, [{
			key: "render",
			value: function render() {
				this.el.innerHTML = this._temlate(this.getData());
			}
	
			/**
	   * Init events listening
	   * @private
	   */
	
		}, {
			key: "_initEvents",
			value: function _initEvents() {
				this.el.addEventListener("click", this._onClick.bind(this));
				//this.el.addEventListener("blur", this._saveCard.bind(this));
			}
	
			/**
	   * Handle click events
	   * @param event
	   * @private
	   */
	
		}, {
			key: "_onClick",
			value: function _onClick(event) {
				var target = event.target;
	
				switch (target.dataset.action) {
					case "showVersions":
						this._showVersions(target);
						break;
					case "toggleVersions":
						this._toggleVersions(target);
						break;
					case "addVersion":
						this.addVersion(target);
						break;
					case "delete":
						this._deleteVersion(target);
						break;
					case "toggleRightVersion":
						this._toggleRightVersion(target);
						break;
					default:
						return;
				}
			}
		}, {
			key: "_showVersions",
			value: function _showVersions() {
				//  убираем класс hidden на вариантах ответа
				var versions = this.el.querySelector(".card__answers");
				if (!versions.classList.remove("hidden")) return;
	
				// меняем индикатор: плюс - если варианты раскрыты, минус - если закрыты
				var indicator = this.el.querySelector(".card__edit_indicator");
				indicator.innerHTML = indicator.innerHTML === "+" ? "-" : "+";
			}
		}, {
			key: "_toggleVersions",
			value: function _toggleVersions() {
				//  тоглим класс на вариантах ответа
				var versions = this.el.querySelector(".card__answers");
				versions.classList.toggle("hidden");
	
				// меняем индикатор: плюс - если варианты раскрыты, минус - если закрыты
				var indicator = this.el.querySelector(".card__edit_indicator");
				indicator.innerHTML = indicator.innerHTML === "+" ? "-" : "+";
			}
		}, {
			key: "addVersion",
			value: function addVersion() {
				// пересохраняю карту
				// TODO проверить, если операция проходит удачно
				var data = this.getData();
				data.responses.push(defaultCardResponse);
				this.setData(data);
	
				// клонирую последнюю версию
				var card = this.el;
				var versions = [].concat(_toConsumableArray(card.querySelectorAll(".card__response")));
				var lastVersion = versions[versions.length - 1];
				var newVersion = lastVersion.cloneNode(true);
	
				// обнуляю все инпуты
				var inputs = newVersion.getElementsByTagName("input");
				var _iteratorNormalCompletion = true;
				var _didIteratorError = false;
				var _iteratorError = undefined;
	
				try {
					for (var _iterator = inputs[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
						var input = _step.value;
	
						if (input.checked) input.checked = false;
						if (input.value) input.value = "";
					}
	
					// прикрепляю новую версию после последней
				} catch (err) {
					_didIteratorError = true;
					_iteratorError = err;
				} finally {
					try {
						if (!_iteratorNormalCompletion && _iterator.return) {
							_iterator.return();
						}
					} finally {
						if (_didIteratorError) {
							throw _iteratorError;
						}
					}
				}
	
				lastVersion.parentNode.insertBefore(newVersion, lastVersion.nextSibling);
			}
		}, {
			key: "_deleteVersion",
			value: function _deleteVersion(target) {
				var id = arguments.length <= 1 || arguments[1] === undefined ? target.parentElement.dataset.versionid : arguments[1];
	
				//const id = target.parentElement.dataset.versionid;
				var data = this.getData();
	
				// Отменяем операцию, если число версий после удаления будет меньше лимита
				var versionsAmount = data.responses.length;
				if (versionsAmount <= this._MINIMUM_VERSIONS_ALLOWED) {
					// TODO сделать визуальное оповещение о том, что операцию выполнить невозможно
					return;
				}
	
				// в данных карточки удаляем вариант ответа
				data.responses.splice(id, 1);
	
				// обновляем данные
				this.setData(data);
	
				// удаляем версию ответа из DOM
				var version = target.closest(".card__response");
				version.remove();
			}
		}, {
			key: "_toggleRightVersion",
			value: function _toggleRightVersion(target) {
				var data = this.getData();
				var versionId = target.closest("[data-versionid]").dataset.versionid;
	
				data.responses[versionId].isRight = target.checked;
	
				this.setData(data);
			}
		}, {
			key: "_saveCard",
			value: function _saveCard() {
				var form = this.el.querySelector("form");
	
				var data = {
					id: 0,
					question: form.elements.question.value,
					responses: Array.from(form.elements.response, function (response) {
						return {
							text: response.elements.text.value,
							isRight: response.elements.isRight.checked
						};
					}),
					reward: Array.from(form.elements.radio, function (radio) {
						return radio.checked;
					}).indexOf(true)
				};
	
				this.setData(data);
			}
	
			/**
	   * Set card data
	   * @param {Object} Card options
	   */
	
		}, {
			key: "setData",
			value: function setData(data) {
				this.data = data;
				return this.data;
			}
	
			/**
	   * Get card data
	   * @returns {*|{name: string, cards: *[]}}
	   */
	
		}, {
			key: "getData",
			value: function getData() {
				return this.data;
			}
		}]);
	
		return Card;
	}();
	
	exports.default = Card;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	var jade = __webpack_require__(3);
	
	module.exports = function template(locals) {
	var buf = [];
	var jade_mixins = {};
	var jade_interp;
	;var locals_for_with = (locals || {});(function (id, index, question, responses, undefined) {
	buf.push("<link rel=\"stylesheet\" href=\"../source/components/card/card.css\"><form action=\"\" tabindex=\"1\" class=\"card\"><div class=\"card__header\"><span class=\"card__header_number\">" + (jade.escape(null == (jade_interp = id) ? "" : jade_interp)) + "</span><input name=\"question\" data-action=\"showVersions\" type=\"text\"" + (jade.attr("value", question, true, true)) + " placeholder=\"Введите вопрос\" class=\"card__header_question\"><button data-action=\"toggleVersions\" type=\"button\" class=\"card__header_edit\">Edit<span data-action=\"toggleVersions\" class=\"card__edit_indicator\">+</span></button></div><fieldset name=\"responses\" class=\"card__answers hidden\">");
	// iterate responses
	;(function(){
	  var $$obj = responses;
	  if ('number' == typeof $$obj.length) {
	
	    for (var versionId = 0, $$l = $$obj.length; versionId < $$l; versionId++) {
	      var response = $$obj[versionId];
	
	buf.push("<fieldset name=\"response\"" + (jade.attr("data-id", index, true, true)) + (jade.attr("data-versionId", versionId, true, true)) + " class=\"card__response col-12 cf\"><label>Правильный<input name=\"isRight\" type=\"checkbox\"" + (jade.attr("checked", response.isRight, true, true)) + " data-action=\"toggleRightVersion\" class=\"correct\"></label><input name=\"text\" type=\"text\"" + (jade.attr("data-id", versionId, true, true)) + (jade.attr("value", response.text, true, true)) + " placeholder=\"Введите вариант ответа\" class=\"inputMain\"><div data-action=\"delete\" class=\"buttonDelete\"></div></fieldset>");
	    }
	
	  } else {
	    var $$l = 0;
	    for (var versionId in $$obj) {
	      $$l++;      var response = $$obj[versionId];
	
	buf.push("<fieldset name=\"response\"" + (jade.attr("data-id", index, true, true)) + (jade.attr("data-versionId", versionId, true, true)) + " class=\"card__response col-12 cf\"><label>Правильный<input name=\"isRight\" type=\"checkbox\"" + (jade.attr("checked", response.isRight, true, true)) + " data-action=\"toggleRightVersion\" class=\"correct\"></label><input name=\"text\" type=\"text\"" + (jade.attr("data-id", versionId, true, true)) + (jade.attr("value", response.text, true, true)) + " placeholder=\"Введите вариант ответа\" class=\"inputMain\"><div data-action=\"delete\" class=\"buttonDelete\"></div></fieldset>");
	    }
	
	  }
	}).call(this);
	
	buf.push("<input type=\"button\" value=\"Добавить ответ\" data-action=\"addVersion\" class=\"card__answers_add\"><fieldset name=\"reward\" class=\"card__difficulty\">");
	// iterate [0, 1, 2]
	;(function(){
	  var $$obj = [0, 1, 2];
	  if ('number' == typeof $$obj.length) {
	
	    for (var $index = 0, $$l = $$obj.length; $index < $$l; $index++) {
	      var id = $$obj[$index];
	
	buf.push("<label class=\"card__difficulty_label\">Сложность 1<input name=\"radio\" type=\"radio\"" + (jade.attr("data-id", id, true, true)) + " class=\"card__difficulty_radio\"></label>");
	    }
	
	  } else {
	    var $$l = 0;
	    for (var $index in $$obj) {
	      $$l++;      var id = $$obj[$index];
	
	buf.push("<label class=\"card__difficulty_label\">Сложность 1<input name=\"radio\" type=\"radio\"" + (jade.attr("data-id", id, true, true)) + " class=\"card__difficulty_radio\"></label>");
	    }
	
	  }
	}).call(this);
	
	buf.push("</fieldset></fieldset><div class=\"col-1 cf\"><div class=\"filterOptions\"></div></div></form>");}.call(this,"id" in locals_for_with?locals_for_with.id:typeof id!=="undefined"?id:undefined,"index" in locals_for_with?locals_for_with.index:typeof index!=="undefined"?index:undefined,"question" in locals_for_with?locals_for_with.question:typeof question!=="undefined"?question:undefined,"responses" in locals_for_with?locals_for_with.responses:typeof responses!=="undefined"?responses:undefined,"undefined" in locals_for_with?locals_for_with.undefined: false?undefined:undefined));;return buf.join("");
	}

/***/ },
/* 7 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var BASE_URL = "json.php";
	/**
	 * @class Model
	 */
	
	var Model = function () {
		/**
	  * Model constructor
	  * @param options
	  */
		function Model() {
			var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	
			_classCallCheck(this, Model);
	
			this.data = options.data || { field: "random data" };
		}
	
		_createClass(Model, [{
			key: "getData",
			value: function getData() {
				return this.data;
			}
		}, {
			key: "setData",
			value: function setData(data) {
				this.data = data;
			}
		}, {
			key: "encode",
			value: function encode(data) {
				return JSON.stringify(data);
			}
		}, {
			key: "decode",
			value: function decode(data) {
				return JSON.parse(data);
			}
	
			/**
	   * Fetch data
	   * @param resolve - Callback function
	   * @returns {XMLHttpRequest} - Request object
	   */
	
		}, {
			key: "fetch",
			value: function fetch(resolve) {
				var _this = this;
	
				// TODO change fake url!!!
				var fakeURL = "";
	
				var fetchURL = "";
				var req = this._makeRequest("GET", fakeURL);
	
				req.onreadystatechange = function () {
					if (req.readyState !== 4) return;
	
					if (req.status !== 200) {
						// TODO Handle Error
						console.log(req);
						console.error("Error: Fetching failed " + req.status + " bitch");
					} else {
						var data = _this.decode(req.responseText);
						console.log("Data fecth: " + _typeof(req.responseText) + ": " + req.responseText);
						console.log("Data fecth: " + data + ": " + data.user);
						_this.setData(data);
						// resolve(this.getData());
					}
				};
	
				req.send();
	
				return req;
			}
		}, {
			key: "save",
			value: function save(resolve) {
				var _this2 = this;
	
				var saveURL = "";
				var req = this._makeRequest("POST", saveURL);
	
				req.onreadystatechange = function () {
					if (req.readyState !== 4) return;
	
					if (req.status !== 200) {
						// TODO Handle Error
						console.error("Error: Fetching failed  " + req.status + " bitch");
					} else {
						var data = _this2.decode(req.responseText);
						console.log(data);
						_this2.setData(data);
						resolve(_this2.getData());
					}
				};
	
				req.send();
	
				return req;
			}
	
			/**
	   * Generate request
	   * @param {String} - HTTP method
	   * @param {String} Add suffixURL to base url
	   * @returns {XMLHttpRequest}
	   * @private
	   */
	
		}, {
			key: "_makeRequest",
			value: function _makeRequest(method) {
				var suffixURL = arguments.length <= 1 || arguments[1] === undefined ? "" : arguments[1];
	
				var xhr = new XMLHttpRequest();
				xhr.open(method, BASE_URL + suffixURL, true);
				return xhr;
			}
		}]);
	
		return Model;
	}();
	
	exports.default = Model;

/***/ }
/******/ ]);
//# sourceMappingURL=main.js.map