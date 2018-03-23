var model = require("./models/model")
var m = require("mithril")
var input = require("../basicWidgets/components/InputComponent")
var textarea = require("../basicWidgets/textarea")
var multiinput = require("../basicWidgets/multiinput")
var check = require("../basicWidgets/components/CheckBoxComponent")
var states = require("../utils/states.js")
require("../../scss/modules/_channel-bans.scss")
var routes = require("../pageTemplate/routes")
var channelName = require("../utils/channelName")
module.exports = {
    oninit: function (vnode) {
        vnode.state.route = m.route.get()
        model.get(m.route.param("channel"))
    },
    oncreate: function (vnode) {
        if (vnode.state.route == m.route.get())
            return
        vnode.state.route = m.route.get()
        model.get(m.route.param("channel"))
    },
    route: routes.CHANNELBANS,
    getTitle: () => {
        return `Баны на канале ${channelName.get(m.route.param("channel"))}`
    },
    view: function (vnode) {

        return model.state == states.READY ?
            m(".channel-bans", [
                m("h1", `Баны на канале ${channelName.get(model.channelID)}`),
                m(".channel-bans__items", model.object.bans.map(f => {
                    return m(".channel-bans__item", [
                        m(".channel-bans__name", f.user + " - " + (f.banLength == 0 ? "Перманентно" : f.banLength + " Секунд")),

                        m(".channel-bans__date", new Date(f.date).toLocaleString())
                    ])
                }))
            ]) : ""
    }
}