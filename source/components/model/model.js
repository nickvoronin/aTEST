const BASE_URL = "json.php";
/**
 * @class Model
 */
export default class Model {
	/**
	 * Model constructor
	 * @param options
	 */
	constructor(options = {}) {
		this.data = options.data || { field: "random data" };
	}

	getData() {
		return this.data;
	}

	setData(data) {
		this.data = data;
	}

	encode(data) {
		return JSON.stringify(data);
	}

	decode(data) {
		return JSON.parse(data);
	}


	getTopic(url = BASE_URL) {

		return new Promise(function(resolve, reject) {

			var xhr = new XMLHttpRequest();
			xhr.open('GET', url, true);

			xhr.onload = function() {
				if (this.status == 200) {
					resolve(this.response);
				} else {
					var error = new Error(this.statusText);
					error.code = this.status;
					reject(error);
				}
			};

			xhr.onerror = function() {
				reject(new Error("Network Error"));
			};

			xhr.send();
		});

	}


	saveTopic(data, url = BASE_URL) {
		return new Promise(function(resolve, reject) {

			var xhr = new XMLHttpRequest();
			xhr.open('GET', url, true);

			xhr.onload = function() {
				if (this.status == 200) {
					resolve(this.response);
			} else {
					var error = new Error(this.statusText);
					error.code = this.status;
					reject(error);
			}
		};

			xhr.onerror = function() {
				reject(new Error("Network Error"));
			};

			xhr.send(JSON.stringify(data));
		});
	}

	/**
	 * Generate request
	 * @param {String} - HTTP method
	 * @param {String} Add suffixURL to base url
	 * @returns {XMLHttpRequest}
	 * @private
	 */
	_makeRequest(method, suffixURL = "") {
		const xhr = new XMLHttpRequest();
		xhr.open(method, BASE_URL + suffixURL, true);
		return xhr;
	}
}
