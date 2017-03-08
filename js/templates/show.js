var m = require("mithril")
var PageTemplateComponent = require('../pageTemplate/PageTemplateComponent')
var component = require("./components/show")
var model = require("./models/show")

module.exports = {
    oninit: function (vnode) {
        model.get(vnode.attrs.channel, vnode.attrs.template)
    },
    onupdate: function (vnode) {
        if (m.route.get() != model.route) {
            model.get(vnode.attrs.channel, vnode.attrs.template)
        }
    },
    view: function (vnode) {
        return m(PageTemplateComponent, {
            getState: () => {
                return model.state
            },
            route: "",
            title: `Просмотр команды ${vnode.attrs.template} на канале${vnode.attrs.channel}`,
            content: m(component),

        })

    }
}