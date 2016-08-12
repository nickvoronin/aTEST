import template from "./index.jade";

export default class Index {
  /**
   * @param {Object} options
    */
  constructor(options) {
    this.el = options.el;
    this.data = options.data || {};
    this._template = template;

    this.setData(this.data);

    this.render();
    this._initEvents();
  }

  render () {
    console.log("index render");
    this.el.innerHTML = this._template();
  }

  _initEvents () {
    // TODO
  }

  setData (data) {
    this.data = data;
  }
}