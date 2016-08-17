import Topic from "../topic/topic.js";
import Model from "../model/model.js";

const model = new Model();

const options = {
  el: document.querySelector(".app"),
};

model.getTopic()
	.then(response => {
		return JSON.parse(response)[0];
	})
  .then(data => options.data = data)
  .catch(e => console.log("getTopic Error" + e));

		const topic = new Topic(options);
const data = topic.getData();

model.saveTopic(data)
  .then(response => console.log(response))
  .catch(e => console.log("saveTopic Error" + e));