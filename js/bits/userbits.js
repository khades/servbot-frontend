var m = require("mithril")
var PageTemplateComponent = require('../pageTemplate/PageTemplateComponent')
var model = require("./models/userbits")
var component = require("./components/userbits")
var routes = require("../pageTemplate/routes")
var channelName = require("../utils/channelName")
module.exports = {
    oninit: function (vnode) {
        model.get(vnode.attrs.channel, vnode.attrs.user)
    },
    onupdate: function (vnode) {
        model.get(vnode.attrs.channel, vnode.attrs.user)
    },
    view: function (vnode) {
        return m(PageTemplateComponent, {
            route: routes.BITS,
            title: `История битсов пользователя ${model.result.user} на канале ${channelName.get(vnode.attrs.channel)}`,
            channelID: () => {
                return vnode.attrs.channel
            },
            content: m(component),
            getState: () => {
                return model.state
            }
        })

    }
}