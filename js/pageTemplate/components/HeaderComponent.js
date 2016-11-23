var m = require("mithril")
var UserNameModel = require("../models/UserNameModel")
var PageCarcassModel = require("../models/PageCarcassModel")
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

module.exports = HeaderComponent
