"use strict";

import Topic from "../topic/topic.js";
import Card from "../question_card/card.js";

const APP_EL = document.querySelector(".app");

const cardsOptions = {};

const card = new Card(cardsOptions);
const topic = new Topic({});
