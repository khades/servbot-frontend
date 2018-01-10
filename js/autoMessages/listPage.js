var m = require("mithril")
var PageTemplateComponent = require('../pageTemplate/PageTemplateComponent')
var model = require("./models/list")
var component = require("./components/list")
var routes = require("../pageTemplate/routes")
var channelName = require("../utils/channelName")

module.exports = {
    oninit: function (vnode) {
        model.get(vnode.attrs.channel)
    },
    view: function (vnode) {
        return m(PageTemplateComponent, {
            route: routes.AUTOMESSAGES,
            title: `Список автосоообщений на канале ${channelName.get(vnode.attrs.channel)}`,
            channelID: () => { return vnode.attrs.channel },
            content: m(component),
            getState: () => {
                return model.state
            }
        })

    }
}