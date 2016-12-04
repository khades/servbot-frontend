import * as m from 'mithril'

import { HeaderComponent } from './components/HeaderComponent'
import { MenuComponent } from './components/MenuComponent'
import { PageCarcassModel } from "./models/PageCarcassModel"
var PageTemplateComponent = {
  view: function (vnode) {
    document.title = vnode.attrs.title
    return m("section#main", [
      m("#site-menu", { class: PageCarcassModel.sideMenuShown == true ? "shown" : "hidden" }, m(MenuComponent, {
        route: vnode.attrs.route,
      })),
      m("header#siteHeader", m(HeaderComponent, {
        route: vnode.attrs.route,
      })),
      m("section#siteContent", m(".content", vnode.attrs.content)),
    ])
  }
}

export { PageTemplateComponent }