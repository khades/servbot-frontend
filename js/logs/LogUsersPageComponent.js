var m = require("mithril")

var PageTemplateComponent = require('../pageTemplate/PageTemplateComponent')
var LogUsersPageModel = require("./models/LogUsersPageModel")
var LogUsersComponent = require("./components/LogUsersComponent")
var routes = require("../pageTemplate/routes")
var channelName = require("../utils/channelName")
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
            route: routes.LOGS,
            title: `Список пользователей на канале ${channelName.get(vnode.attrs.channel)}`,
            channelID: () => { return vnode.attrs.channel },
            getState: () => {
                return LogUsersPageModel.state
            },
            content: m(LogUsersComponent)

        })
    }
}
module.exports = LogUsersPageComponent