var m = require("mithril")
require("../../../scss/modules/_headerContent.scss")
var UserNameModel = require("../models/UserNameModel")
var l10n = require("../../l10n/l10n")
var HeaderComponent = {
  oninit: function (vnode) {
    UserNameModel.getUsername()
  },
  view: function (vnode) {
    return m(".headerContent", [

      m("div.headerContent__menu-button-container",
        m("div.headerContent__menu-button", {
          class: vnode.attrs.getMenuShown() == true ? "headerContent__menu-button__menu-shown" : "",
          onclick: () => vnode.attrs.onMenuClick()
        })),
      m('.headerContent__right', [
        m("select", {
            oninput: function (e) {
              l10n.setLang(e.target.value)
            }
          }, l10n.langs.map(f => m('option', {
            value: f,

            selected: l10n.getLang() == f
          }, f))


        ),
        m("div.headerContent__profile-info", {
          class: vnode.attrs.route == "personalInfo" ? "is-selected" : ""
        }, [
          m("b", `${UserNameModel.userName}`), !!UserNameModel.profileImage ? m("img.headerContent__profile-image", {
            src: UserNameModel.profileImage
          }) : ""

        ])
      ])


    ])
  }
}

module.exports = HeaderComponent