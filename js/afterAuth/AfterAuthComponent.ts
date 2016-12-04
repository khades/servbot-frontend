import * as m from "mithril"
import { PageTemplateComponent } from '../pageTemplate/PageTemplateComponent'

var AfterAuthComponent = {
  oninit: function (vnode) {
    var route = localStorage.getItem("redirect");
    console.log(route);
    if (!!route) {
      m.route.set(route);
    } else m.route.set("/")
  },
  view: function () {
    return m(PageTemplateComponent, {
      route: "redirect",
      title: "Перенаправляем обратно",
      content: "Перенаправляем обратно"
    })

  }
}

export = { AfterAuthComponent }