var m = require("mithril")
require("../../scss/layout/_index.scss")
require("../../scss/base/_index.scss")
var HeaderComponent = require('./components/HeaderComponent')
var MenuComponent = require('./components/MenuComponent')
var PageCarcassModel = require("./models/PageCarcassModel")
var states = require("../utils/states")
var loading = require("../basic/loading")
var forbidden = require("../basic/forbidden")
var notfound = require("../basic/notfound")

function renderStatedContent(content, stateFunction) {
  switch (stateFunction()) {
    case states.LOADING:
      return m(loading)
    case states.FORBIDDEN:
      return m(forbidden)
    case states.NOTAUTHORIZED:
      return m(forbidden)
    default:
      return content
  }
}
module.exports = {
  view: function (vnode) {
    document.title = vnode.attrs.title
    var content = (!!vnode.attrs.getState && typeof vnode.attrs.getState === "function") ? renderStatedContent(vnode.attrs.content, vnode.attrs.getState) : vnode.attrs.content
    return m("section#main", [
      m("#site-menu", {
        class: PageCarcassModel.sideMenuShown == true ? "shown" : "hidden"
      }, m(MenuComponent, {
        route: vnode.attrs.route,
        channelID: vnode.attrs.channelID,
        hideMenu: function () {
          PageCarcassModel.sideMenuShown = false
        },
        showMenu: function () {
          PageCarcassModel.sideMenuShown = true
        }
      })),
      m("header#siteHeader", m(HeaderComponent, {

      })),
      m("section#siteContent", m(".content", content)),
    ])
  }
}