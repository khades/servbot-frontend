var m = require("mithril")
var PageTemplateComponent = require('../pageTemplate/PageTemplateComponent')
var component = require("./components/edit")
var model = require("./models/edit")
var routes = require("../pageTemplate/routes")
module.exports = {
    oninit: function (vnode) {
        if (!!vnode.attrs.id) {
            model.get(vnode.attrs.channel, vnode.attrs.id)
        } else {
            model.new(vnode.attrs.channel)
        }
    },
    onupdate: function (vnode) {
        if (m.route.get() != model.route) {
            if (!!vnode.attrs.id) {
                model.get(vnode.attrs.channel, vnode.attrs.id)
            } else {
                model.new(vnode.attrs.channel)
            }
        }
    },
    view: function (vnode) {
        return m(PageTemplateComponent, {
            route: routes.AUTOMESSAGES,
            title: "Создание",
            content: m(component),
            channelID: () => { return vnode.attrs.channel },
            getState: () => {
                return model.state
            }

        })

    }
}