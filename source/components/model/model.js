const BASE_URL = "";
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

	/**
	 * Fetch data
	 * @param resolve - Callback function
	 * @returns {XMLHttpRequest} - Request object
	 */
	fetch(resolve) {
		// TODO change fake url!!!
		const fakeURL = "json.php";

		const fetchURL = "";
		const req = this._makeRequest("GET", fakeURL);

		req.onreadystatechange = () => {
			if (req.readyState !== 4) return;

			if (req.status !== 200) {
				// TODO Handle Error
                                console.log(req);
                                console.error("Error: Fetching failed " + req.status + " bitch");
			} else {
				const data = this.decode(req.responseText);
				console.log(`Data fecth: ${typeof req.responseText}: ${req.responseText}`);
				console.log(`Data fecth: ${data}: ${data.user}`);
				this.setData(data);
				// resolve(this.getData());
			}
		};

		req.send();

		return req;
	}

	save(resolve) {
		const saveURL = "";
		const req = this._makeRequest("POST", saveURL);

		req.onreadystatechange = () => {
			if (req.readyState !== 4) return;

			if (req.state !== 200) {
				// TODO Handle Error
				console.error("Error: Fetching failed");
			} else {
				const data = this.decode(req.responseText);
				console.log(data);
				this.setData(data);
				resolve(this.getData());
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
	_makeRequest(method, suffixURL = "") {
		const xhr = new XMLHttpRequest();
		xhr.open(method, BASE_URL + suffixURL, true);
		return xhr;
	}
}
