import m from 'mithril'
import '../../scss/layout/_index.scss'
import '../../scss/base/_index.scss'
import HeaderComponent from './components/HeaderComponent'
import MenuComponent from './components/MenuComponent'
import notifications from '../notifications/notifications'

export default {
  oninit: function (vnode) {
    vnode.state.menuShown = false
  },
  view: function (vnode) {
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
          vnode.state.menuShown == true ? vnode.state.menuShown = false : vnode.state.menuShown = true
        },
        getMenuShown: () => vnode.state.menuShown
      })),
      m(notifications),
      m("section#siteContent", m(".content", m(vnode.attrs.component))),
    ])
  }
};