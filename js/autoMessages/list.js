var m = require("mithril")
var model = require("./models/list")
var listItem = require("./components/listItem")
require("../../scss/modules/_automessage-list.scss")
var channelName = require("../utils/channelName")
var routes = require("../pageTemplate/routes")

module.exports ={
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

    route: routes.AUTOMESSAGES,
    geTitle() {
        return `Список автосоообщений на канале ${channelName.get(m.route.param("channel"))}`
    },
    view(vnode) {
        return m(".automessage-list", [
            m(".automessage-list__header", `Автосообщения на канале ${channelName.get(model.channelID)}`),
            m(".automessage-list__buttons", [
                m("a.automessage-list__create", {
                    oncreate: m.route.link,
                    href: `/channel/${model.channelID}/autoMessages/new`
                }, "Создать новое автосообщение"),
                m("button", {
                    type: "button",
                    onclick: (event) => {
                        event.redraw = false
                        model.removeInactive()
                    }
                }, "Удалить неактивные автосообщения")
            ]),
            m(".automessage-list__items", !!model.objects ? model.objects.map(f => m(listItem, f)) : "")
        ])
    }
}