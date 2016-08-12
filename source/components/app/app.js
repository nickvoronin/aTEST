import Topic from "../topic/topic.js";
import Model from "../model/model.js";

const model = new Model();
model.fetch()
	.then(response => {
		return JSON.parse(response)[0];
	})
	.then(data => {
		data.cards = data.card;
		delete data.card;
		const options = {
			//data: data,
			el: document.querySelector(".app"),
		};
		console.log(data);
		const topic = new Topic(options);
	});



