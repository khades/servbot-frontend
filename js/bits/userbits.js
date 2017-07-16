var m = require("mithril")
var PageTemplateComponent = require('../pageTemplate/PageTemplateComponent')
var model = require("./models/userbits")
var component = require("./components/bits")
var routes = require("../pageTemplate/routes")
var channelname = require("../utils/channelName")
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
            title: `История битсов пользователя ${model.result.user} на канале ${channelname.get(vnode.attrs.channel)}`,
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