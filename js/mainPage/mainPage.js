var m = require("mithril")
var model = require("./models/index")
var routes = require("../pageTemplate/routes")
require("../../scss/modules/_main-page.scss")
var l10n = require("../l10n/l10n")

module.exports = {
    oninit: function (vnode) {
        model.get()
    },
    route: routes.MAIN,
    getTitle() {
        return l10n.get("MAIN_PAGE")
    },
    view(vnode) {
        console.log("here")
        return m(".main-page", [
            m(".main-page__header", l10n.get("WELCOME_TITLE")),
            m(".main-page__header",  l10n.get("AVAILABLE_CHANNELS_TO_MOD")),
            m(".main-page__mod-channels", model.object.modChannels.map(f => [
                m("a.main-page__mod-channels__channel", {
                    href: `/channel/${f.channelID}`,
                    oncreate: m.route.link
                }, f.channel)
            ]))

        ])
    }
}