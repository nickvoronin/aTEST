import Topic from "../topic/topic.js";
import Model from "../model/model.js";

const topicOptions = {
	el: document.querySelector(".card"),
};

const topic = new Topic(topicOptions);
const model = new Model();
model.fetch();