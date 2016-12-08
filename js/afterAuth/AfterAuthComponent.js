var m = require("mithril")
var PageTemplateComponent = require('../pageTemplate/PageTemplateComponent')

var AfterAuthComponent = {
  oninit: function (vnode) {
    let route = localStorage.getItem("redirect");
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

module.exports = AfterAuthComponent