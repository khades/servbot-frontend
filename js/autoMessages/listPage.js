var m = require("mithril")
var PageTemplateComponent = require('../pageTemplate/PageTemplateComponent')
var model = require("./models/list")
var component = require("./components/list")
var routes = require("../pageTemplate/routes")
module.exports = {
    oninit: function (vnode) {
        model.get(vnode.attrs.channel)
    },
    view: function (vnode) {
        return m(PageTemplateComponent, {
            route: routes.AUTOMESSAGES,
            title: "Список автосоообщений",
            channelID: () => { return vnode.attrs.channel },
            content: m(component, { object: model.object, channelID: vnode.attrs.channel }),
            getState: () => {
                return model.state
            }
        })

    }
}