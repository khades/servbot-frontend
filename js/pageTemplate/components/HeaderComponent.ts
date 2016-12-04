import * as m from "mithril"

import { UserNameModel } from "../models/UserNameModel"
import { PageCarcassModel } from "../models/PageCarcassModel"
var HeaderComponent = {
  oninit: function (vnode) {
    UserNameModel.getUsername()
  },
  view: function (vnode) {
    return m(".headerContent", [

      m("div.headerContent__menu-button-container",
        m("div.headerContent__menu-button", {
          class: PageCarcassModel.sideMenuShown == true ? "headerContent__menu-button__menu-shown" : "",
          onclick: f => {
            if (PageCarcassModel.sideMenuShown == true)
              PageCarcassModel.sideMenuShown = false
            else
              PageCarcassModel.sideMenuShown = true
          }
        })),

      m("div.headerContent__profile-info", {
        class: vnode.attrs.route == "personalInfo" ? "is-selected" : ""
      }, [
          m("b", `${UserNameModel.userName}`),
          !!UserNameModel.profileImage ? m("img.headerContent__profile-image", { src: UserNameModel.profileImage }) : m(".nothing")

        ])

    ])
  }
}

export { HeaderComponent } 
