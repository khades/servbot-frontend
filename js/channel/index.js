var m = require("mithril")
var model = require("./models/index")
var states = require("../utils/states")
var loading = require("../basic/loading")
var routes = require("../pageTemplate/routes")
var l10n = require("../l10n/l10n")

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
        return l10n.get("WELCOME_TITLE")
    },
    route: routes.CHANNEL,
    view() {
        if (model.state != states.READY) {
            return m(".channel-index", m(loading))
        }
        return m(".channel-index", model.channelInfo.isMod ? [
            m("div", "Вы модератор, вы можете пройти по разделам в меню слева (либо по кнопке в хедере)")
        ] : m("div", "You're not moderator"))
    }
}