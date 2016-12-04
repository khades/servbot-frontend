import * as m from "mithril"

import PageTemplateComponent from '../pageTemplate/PageTemplateComponent'

var MainPageComponent = {
  view: function(vnode) {
    return m(PageTemplateComponent, { 
      route: "mainPage",
      title: "Главная страница",
      content: "Hello Worlds"
    })

  }
}

export default MainPageComponent 