var m = require("mithril")
var states = require("../utils/states")

var PageTemplateComponent = require('../pageTemplate/PageTemplateComponent')
var model = require("./models/list")
var component = require("./components/list")
var routes = require("../pageTemplate/routes")
var channelName = require("../utils/channelName")

module.exports =  {
    oninit: function (vnode) { 
        model.state = states.LOADING
        model.get(vnode.attrs.channel)
    },
    onupdate: function (vnode) {
        if (m.route.get() != model.route) {
            model.get(vnode.attrs.channel)
        }
    },
    view: function (vnode) {
        return m(PageTemplateComponent, {
            route: routes.SUBDAY,
            title: `Сабдеи на канале ${channelName.get(vnode.attrs.channel)}`,
            channelID: () => { return vnode.attrs.channel },
            getState: () => {
                return model.state
            },
            content: m(component)
        })
    }
}
