var m = require("mithril")
var PageTemplateComponent = require('../pageTemplate/PageTemplateComponent')
var model = require("./models/index")
var component = require("./components/index")
var routes = require("../pageTemplate/routes")
module.exports = {
  oninit: function (vnode) {
    model.get()
  },

  view: function (vnode) {
    return m(PageTemplateComponent, {
      route: routes.MAIN,
      title: "Главная страница",
      content: m(component)
    })

  }
}