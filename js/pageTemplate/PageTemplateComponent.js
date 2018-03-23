var m = require("mithril")
require("../../scss/layout/_index.scss")
require("../../scss/base/_index.scss")
var HeaderComponent = require('./components/HeaderComponent')
var MenuComponent = require('./components/MenuComponent')

module.exports = {
  oninit: function (vnode) {
    vnode.state.menuShown = false
  },
  view: function (vnode) {
    console.log(vnode.attrs.component)
    if (!!vnode.attrs.component.getTitle) {
      document.title = vnode.attrs.component.getTitle()
    }
    return m("section#main", [
      m("#site-menu", {
        class: vnode.state.menuShown == true ? "shown" : "hidden"
      }, m(MenuComponent, {
        route: vnode.attrs.component.route,
        hideMenu: function () {
          vnode.state.menuShown = false
        },
        showMenu: function () {
          vnode.state.menuShown = true
        },
        closeMenu() {
          vnode.state.menuShown = false
        }
      })),
      m("header#siteHeader", m(HeaderComponent, {
        onMenuClick() {
          vnode.state.menuShown == true ? vnode.state.menuShown = true : vnode.state.menuShown = false
        },
        getMenuShown: () => vnode.state.menuShown
      })),
      m("section#siteContent", m(".content", m(vnode.attrs.component))),
    ])
  }
}