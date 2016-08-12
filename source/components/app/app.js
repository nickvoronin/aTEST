import Topic from "../topic/topic.js";
import Model from "../model/model.js";

const model = new Model();
model.fetch()
	.then(response => {
		return JSON.parse(response, function(key, value) {
                    if (key === "isRight") {
                        if (value === "false") {
                            return false;
                        }
                    }
                    return value;
                })[0];
	})
	.then(data => {
		const options = {
			data: data,
			el: document.querySelector(".app"),
		};
		console.log(data);
		const topic = new Topic(options);
	});



