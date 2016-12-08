var m = require("mithril")
var PageTemplateComponent = require('../pageTemplate/PageTemplateComponent')

var MainPageComponent = {
  view: function(vnode) {
    return m(PageTemplateComponent, { 
      route: "mainPage",
      title: "Главная страница",
      content: "Hello Worlds"
    })

  }
}

module.exports = MainPageComponent 