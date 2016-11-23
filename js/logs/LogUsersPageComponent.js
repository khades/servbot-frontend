var m = require("mithril")
var PageTemplateComponent = require('../pageTemplate/PageTemplateComponent')
var LogUsersPageModel = require("./models/LogUsersPageComponent")
var LogUsersComponent = require("./components/LogUsersComponent")
var LogUsersPageComponent = {
    oninit: function (vnode) {
        LogUsersPageModel.init(vnode.attrs.channel)
    },
    onupdate: function (vnode) {
        if (m.route.get() != LogUsersPageModel.route) {
            LogUsersPageModel.init(vnode.attrs.channel)
        }
    },
    view: function (vnode) {
        return m(PageTemplateComponent, {
            route: "logs",
            title: `Список пользователей на канале ${vnode.attrs.channel}`,
            content: m(LogUsersComponent)

        })
    }
}
module.exports = LogUsersPageComponent