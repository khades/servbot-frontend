var m = require("mithril")
var model = require("./models/list")
var listItem = require("./components/listItem")
require("../../scss/modules/_automessage-list.scss")
var channelName = require("../utils/channelName")
var routes = require("../pageTemplate/routes")
var l10n = require("../l10n/l10n")
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

    route: routes.AUTOMESSAGES,
    getTitle() {
        return l10n.get("AUTOMESSAGES_TITLE", channelName.get(m.route.param("channel")))

    },
    view(vnode) {
        return m(".automessage-list", [
            m(".automessage-list__header", l10n.get("AUTOMESSAGES_TITLE", channelName.get(m.route.param("channel")))),
            m(".automessage-list__buttons", [
                m("a.automessage-list__create", {
                    oncreate: m.route.link,
                    href: `/channel/${model.channelID}/autoMessages/new`
                }, l10n.get("AUTOMESSAGES_CREATE_NEW")),
                m("button", {
                    type: "button",
                    onclick: (event) => {
                        event.redraw = false
                        model.removeInactive()
                    }
                }, l10n.get("AUTOMESSAGES_DELETE_INACTIVE"))
            ]),
            m(".automessage-list__items", !!model.objects ? model.objects.map(f => m(listItem, f)) : "")
        ])
    }
}