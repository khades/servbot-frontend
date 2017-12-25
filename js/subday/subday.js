var m = require("mithril")
var states = require("../utils/states")

var PageTemplateComponent = require('../pageTemplate/PageTemplateComponent')
var model = require("./models/model")
var component = require("./components/component")
var routes = require("../pageTemplate/routes")
var channelName = require("../utils/channelName")

module.exports = {
    oninit: function (vnode) {
        model.state = states.LOADING
        model.get(vnode.attrs.channel, vnode.attrs.subdayID)
    },
    onupdate: function (vnode) {
        if (m.route.get() != model.route) {
            model.get(vnode.attrs.channel, vnode.attrs.subdayID)
        }
    },
    view: function (vnode) {
        return m(PageTemplateComponent, {
            route: routes.SUBDAY,
            title: !!model.object.name?model.object.name:"",
            channelID: () => {
                return vnode.attrs.channel
            },
            getState: () => {
                return model.state
            },
            content: m(component)
        })
    }
}