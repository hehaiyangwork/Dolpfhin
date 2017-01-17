define(function(require, exports, module) {

  function constructor() {
    this.bindEvent();
  }

  function bindEvent() {
    $(document).on("click", "body", sayHello);
  }

  /**
   * [sayHello description]
   * @param  {[type]} event [description]
   * @return {[type]}       [description]
   */
  function sayHello(event){
    console.log("Hello !");
  }

  module.exports = constructor;

});
