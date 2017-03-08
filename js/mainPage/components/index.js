var m = require("mithril")
var model = require("../models/index")
require("../../../scss/modules/_main-page.scss")
module.exports = {
    view(vnode) {
        return m(".main-page", [
            m(".main-page__header", "Добро пожаловать в ServBot(etozhebot)"),
            m(".main-page__header", "Каналы, доступные для управления"),
            m(".main-page__mod-channels", model.object.modChannels.map(f => [
                m("a.main-page__mod-channels__channel", {
                    href: `/channel/${f.channelID}`,
                    oncreate: m.route.link
                }, f.channel)
            ]))

        ])
    }
}