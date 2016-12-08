var m = require("mithril")

var HeaderComponent = require('./components/HeaderComponent')
var MenuComponent = require('./components/MenuComponent')
var PageCarcassModel = require("./models/PageCarcassModel")
var PageTemplateComponent = {
  view: function (vnode) {
    document.title = vnode.attrs.title
    return m("section#main", [
      m("#site-menu", {
        class: PageCarcassModel.sideMenuShown == true ? "shown" : "hidden"
      }, m(MenuComponent, {
        route: vnode.attrs.route,
        hideMenu: function () {
          PageCarcassModel.sideMenuShown = false
        },
        showMenu: function () {
          PageCarcassModel.sideMenuShown = true
        }
      })),
      m("header#siteHeader", m(HeaderComponent, {
        route: vnode.attrs.route,
      })),
      m("section#siteContent", m(".content", vnode.attrs.content)),
    ])
  }
}

module.exports = PageTemplateComponent