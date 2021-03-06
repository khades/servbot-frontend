var m = require("mithril")
var PageTemplateComponent = require('../pageTemplate/PageTemplateComponent')
var component = require("./components/show")
var model = require("./models/show")
var routes = require("../pageTemplate/routes")
var channelName = require("../utils/channelName")

module.exports = {
    oninit: function (vnode) {
        model.get(vnode.attrs.channel)
    },
    onupdate: function (vnode) {
        if (m.route.get() != model.route) {
            model.get(vnode.attrs.channel)
        }
    },
    view: function (vnode) {
        return m(PageTemplateComponent, {
            getState: () => {
                return model.state
            },
            route: routes.SUBALERT,
            channelID: () => { return vnode.attrs.channel },
            title: `Сабалерт на канале ${channelName.get(vnode.attrs.channel)}`,
            content: m(component),

        })

    }
}