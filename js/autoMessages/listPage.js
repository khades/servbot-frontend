var m = require("mithril")
var PageTemplateComponent = require('../pageTemplate/PageTemplateComponent')
var model = require("./models/list")
var component = require("./components/list")
module.exports = {
    oninit: function (vnode) {
        model.get(vnode.attrs.channel)
    },
    view: function (vnode) {
        return m(PageTemplateComponent, {
            route: "",
            title: "Список автосоообщений",
            content: m(component, { object: model.object, channelID: vnode.attrs.channel }),
            getState: () => {
                return model.state
            }
        })

    }
}