var m = require("mithril")
var PageTemplateComponent = require('../pageTemplate/PageTemplateComponent')
var model = require('./models/list')
var TemplateListComponent = require("./components/TemplateListComponent")
var routes = require("../pageTemplate/routes")
var channelName = require("../utils/channelName")

module.exports =  {
    oninit: function (vnode) {
        model.init(vnode.attrs.channel)

    },
    onupdate: function (vnode) {
        if (m.route.get() != model.route) {
            model.newCommand = ""
            model.init(vnode.attrs.channel)
        }
    },
    view: function (vnode) {
        return m(PageTemplateComponent, {
            getState: () => {
                return model.state
            },
            route: routes.TEMPLATES,
            title: `Кастомные команды для канала ${channelName.get(vnode.attrs.channel)}`,
            content: m(TemplateListComponent),
            channelID: () => {
                return vnode.attrs.channel
            }
        })
    }
}

