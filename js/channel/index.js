var m = require("mithril")
var model = require("./models/index")
var states = require("../utils/states")
var loading = require("../basic/loading")
var routes = require("../pageTemplate/routes")
var l10n = require("../l10n/l10n")
var channelName = require("../utils/channelName")
require("../../scss/modules/_channel-index.scss")

module.exports = {
    oninit(vnode) {
        vnode.state.route = m.route.get()
        model.get(m.route.param("channel"))
    },
    onupdate(vnode) {
        if (vnode.state.route != m.route.get()) {
            vnode.state.route = m.route.get()
            model.get(m.route.param("channel"))
        }
    },
    getTitle() {
        return l10n.get("CHANNEL_TITLE",  channelName.get(m.route.param("channel")))
    },
    route: routes.CHANNEL,
    view() {
        if (model.state != states.READY) {
            return m(".channel-index", m(loading))
        }
        return m(".channel-index", [
            m("h1", l10n.get("CHANNEL_TITLE",  channelName.get(m.route.param("channel")))),
            model.channelInfo.isMod ? [
                m("div", l10n.get("YOURE_MODERATOR",  channelName.get(m.route.param("channel"))))
            ] : m("div",  l10n.get("YOURE_NOT_MODERATOR",  channelName.get(m.route.param("channel"))))
        ])
    }
}