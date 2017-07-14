var m = require("mithril")
var PageTemplateComponent = require('../pageTemplate/PageTemplateComponent')
var model = require("./models/externalServices")
var component = require("./components/externalServices")
var routes = require("../pageTemplate/routes")
module.exports = {
    oninit: function (vnode) {
        model.get(vnode.attrs.channel)
    },
    view: function (vnode) {

        return m(PageTemplateComponent, {
            route: routes.EXTERNAL_SERVICES,
            title: "Внешние сервисы",
            channelID: () => vnode.attrs.channel,
            content: m(component, { model: model}),
            getState: () => {
                return model.state
            }
        })

    }
}