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
		el: document.querySelector(".card")
	};
	
	var topic = new _topic2.default(topicOptions);
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
	
	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var defaultCard = {
		name: "Sample topic",
		cards: [{
			request: "Is this a questio?",
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
			multivariant: true,
			reward: 5, // ÐºÐ¾Ð»Ð¸Ñ‡ÐµÑÑ‚Ð²Ð¾ Ð±Ð°Ð»Ð»Ð¾Ð²
			rightAnswers: [0, 2]
		}, {
			request: "Wanna get high?",
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
	
			multivariant: false,
			reward: 2,
			rightAnswers: [0]
		}]
	};
	
	var defautCardResponse = {
		text: "",
		isRight: false
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
			this._temlate = _topic2.default;
	
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
				this.el.innerHTML = this._temlate(this.data);
			}
	
			/**
	   * Init events listening
	   * @private
	   */
	
		}, {
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
				var card = target.closest("li");
	
				switch (target.dataset.action) {
					case "showVersions":
						this._showVersions(card);
						break;
					case "addVersion":
						this.addVersion(card);
						break;
					case "delete":
						this._deleteVersion(card, target);
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
			value: function _showVersions(item) {
				var versions = item.querySelector(".containerNewTopicQuestionAnswer__toggleEditPart");
				var indicator = item.querySelector(".containerNewTopicQuestionAnswer__dropPlus");
				versions.classList.toggle("hidden");
				indicator.innerHTML = indicator.innerHTML === "+" ? "-" : "+";
			}
		}, {
			key: "addVersion",
			value: function addVersion(card) {
				// клонирую последнюю версию
				var versions = card.querySelectorAll(".containerNewTopicQuestionAnswer__addNewInput");
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
	
				// TODO пересохраняю карту
				var data = this.getData();
				var id = card.dataset.id;
				data.cards[id].responses.push(defautCardResponse);
			}
		}, {
			key: "_deleteVersion",
			value: function _deleteVersion(card, target) {
				var minimumVersionsAllowed = 2;
	
				var form = target.parentElement;
				var id = form.dataset.id;
				var versionId = form.dataset.versionid;
				var data = this.getData();
	
				var t1 = data.cards[id].responses.length;
	
				if (t1 <= minimumVersionsAllowed) {
					// TODO сделать визуальное оповещение о том, что операцию выполнить невозможно
					return;
				}
	
				data.cards[id].responses.splice(versionId, 1); // в данных карточки удаляем вариант ответа
				this.setData(data); // обновляем данные
	
				// удаляем версию ответа из DOM
				var version = target.closest(".singleQuestionForm");
				version.remove();
			}
		}, {
			key: "_toggleRightVersion",
			value: function _toggleRightVersion(target) {
				var data = this.getData();
				var id = target.dataset.id;
				var versionId = target.dataset.versionid;
				data.cards[id].responses[versionId].isRight = target.checked;
	
				this.setData(data);
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
	
		return Card;
	}();
	
	exports.default = Card;

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	var jade = __webpack_require__(3);
	
	module.exports = function template(locals) {
	var buf = [];
	var jade_mixins = {};
	var jade_interp;
	;var locals_for_with = (locals || {});(function (name) {
	buf.push("<!DOCTYPE html><html lang=\"en\"></html><head><meta charset=\"UTF-8\"><meta name=\"viewport\" content=\"width=device-width, initial-scale=1\"><link rel=\"stylesheet\" href=\"../temporary_files/css/normalize.css\"><link rel=\"stylesheet\" href=\"../source/components/topic/topic.css\"><!--link(rel=\"stylesheet\", href=\"../source/components/card/card.css\")--><title>Creating New Topics</title></head><body><div class=\"app\"><header class=\"headerCreatingNewTopicsPage\"><div class=\"wrapper\"><div class=\"headerCreatingNewTopicsPage__headerTitle\"><p>Создание Новой Темы</p></div></div></header><section class=\"creatingNewTopicsPageSection\"><div class=\"wrapper\"><!-- Input Редактирования / Название Темы--><div class=\"creatingNewTopicsPageSection__titleEdit\"><form method=\"post\" action=\"\" class=\"creatingNewTopicsPageSection__titleEditForm\"><input type=\"text\"" + (jade.attr("value", name, true, true)) + " placeholder=\"Название Темы\" class=\"creatingNewTopicsPageSection__titleEditInput\"></form></div><!-- Left Container New Topic Question Answer--><div class=\"containerNewTopicQuestionAnswer col-10\"><div class=\"containerNewTopicQuestionAnswer__question-answer-container toggle\"><ol><!-- ## ## ## ## ## ## ## ## ## ## ## ## CARDS WILL RENDER HERE ## ## ## ## ## ## ## ## ## ## ## ## ## ##--></ol><button class=\"addCard\">add card</button></div></div><!-- Sidebar Analytics--><div class=\"sidebarAnalytics col-2 cf\"><div class=\"sidebarAnalytics__title\"><p>Topic Info</p></div><ul><li><p>Сложность 1<span>5</span></p></li><li><p>Сложность 2<span>3</span></p></li><li><p>Сложность 3<span>7</span></p></li></ul></div></div></section></div><!-- Application--><script src=\"../../../temporary_files/scripts/app.js\"></script><!-- Dependencies--><script src=\"../../../temporary_files/scripts/main.js\"></script><!-- Style--><script src=\"../../../temporary_files/scripts/modernizr.custom.js\"></script><script src=\"../../../temporary_files/scripts/svgcheckbx.js\"></script></body>");}.call(this,"name" in locals_for_with?locals_for_with.name:typeof name!=="undefined"?name:undefined));;return buf.join("");
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
/* 5 */,
/* 6 */,
/* 7 */
/***/ function(module, exports) {

	"use strict";
	
	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	
	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol ? "symbol" : typeof obj; };
	
	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();
	
	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }
	
	var BASE_URL = "index.php";
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
				var fakeURL = "json.php";
	
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