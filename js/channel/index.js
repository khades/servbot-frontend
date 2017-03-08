var m = require("mithril")

var PageTemplateComponent  = require('../pageTemplate/PageTemplateComponent')
var model  = require("./models/index")
var component = require("./components/index")
var states = require("../utils/states")
var LogUsersPageComponent = {
    oninit: function (vnode) {
        model.get(vnode.attrs.channel)
    },
    onupdate: function (vnode) {
        if (m.route.get() != model.route) {
            model.get(vnode.attrs.channel)
        }
    },
    view: function (vnode) {
        return m(PageTemplateComponent, {
            getState: () => {return  model.state },
            route: "logs",
            title: model.state == states.READY ? `Информация о канале ${model.channelInfo.channel}`: "",
            content: m(component, {channelID:vnode.attrs.channel } )

        })
    }
}
module.exports = LogUsersPageComponent 