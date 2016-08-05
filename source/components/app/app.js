import Topic from "../topic/topic.js";
import Model from "../model/model.js";
import Card from "../card/card.js";

const topicOptions = {
	el: document.querySelector(".card"),
};

const card = new Card(topicOptions);
const model = new Model();
model.fetch();
