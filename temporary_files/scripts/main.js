'use strict';

function ToggleEditPart(options) {
  var elem = options.elem;

  elem.onclick = function(event) {
    let containerLi = event.target.closest('.containerNewTopicQuestionAnswer__title');

    if ( containerLi ) {
      let plusOrMinus = containerLi.querySelector('.containerNewTopicQuestionAnswer__dropPlus');
      let versions = containerLi.nextElementSibling;

      if ( versions.classList.toggle('open') ) {
        plusOrMinus.innerHTML = '-';
      } else {
        plusOrMinus.innerHTML = '+';
      }
    }
  };
}

var toggleEditPart = new ToggleEditPart({
  elem: document.getElementsByClassName("containerNewTopicQuestionAnswer__question-answer-container")[0]
});

