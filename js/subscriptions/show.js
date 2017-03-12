var m = require("mithril")
var PageTemplateComponent = require('../pageTemplate/PageTemplateComponent')
var component = require("./components/show")
var model = require("./models/show")
var routes = require("../pageTemplate/routes")

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
            channelID: () => { return vnode.attrs.channel },
            channel: () => { return model.channel },
            route: routes.SUBSCRIPTIONS,
            title: `Просмотр подписок на канале ${model.channel}`,
            content: m(component),
        })
    }
}