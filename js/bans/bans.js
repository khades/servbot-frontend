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
var l10n = require("../l10n/l10n")
module.exports = {
    oninit: function (vnode) {
        vnode.state.route = m.route.get()
        model.get(m.route.param("channel"))
    },
    onupdate: function (vnode) {
        if (vnode.state.route == m.route.get())
            return
        vnode.state.route = m.route.get()
        model.get(m.route.param("channel"))
    },
    route: routes.CHANNELBANS,
    getTitle: () => {
        return l10n.get("BANS_TITLE", channelName.get(m.route.param("channel")))
    },
    view: function (vnode) {

        return model.state == states.READY ?
            m(".channel-bans", [
                m(".channel-bans__page-header", l10n.get("BANS_TITLE", channelName.get(m.route.param("channel")))),
                m(".channel-bans__items", !!model.object.bans ? model.object.bans.map(f => {
                    return m("a.channel-bans__item", {
                        href: `/channel/${m.route.param("channel")}/logs/${f.userID}`,
                        oncreate: m.route.link
                    }, [
                        m(".channel-bans__header", [
                            m(".channel-bans__name", "@" + f.user),
                            m(".channel-bans__date", new Date(f.date).toLocaleString())

                        ]),
                        m(".channel-bans__duration", f.banLength == 0 ? l10n.get("BANS_PERMANENT") : l10n.get("TIME_SECONDS", f.banLength)),
                    ])
                }) : null)
            ]) : null
    }
}