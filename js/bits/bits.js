var m = require("mithril")
var PageTemplateComponent = require('../pageTemplate/PageTemplateComponent')
var model = require("./models/bits")
var component = require("./components/bits")
var routes = require("../pageTemplate/routes")
var channelName = require("../utils/channelName")

module.exports = {
    oninit: function (vnode) {
        model.get(vnode.attrs.channel)
    },
    view: function (vnode) {
        return m(PageTemplateComponent, {
            route: routes.BITS,
            title: "Список людей, поддержавших канал",
            channelID: () => { return vnode.attrs.channel },
            content: m(component, { result: model.result, channelID: vnode.attrs.channel }),
            getState: () => {
                return model.state
            }
        })

    }
}