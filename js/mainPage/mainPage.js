var m = require("mithril")
var model = require("./models/index")
var routes = require("../pageTemplate/routes")
require("../../scss/modules/_main-page.scss")

module.exports = {
    oninit: function (vnode) {
        model.get()
    },
    route: routes.MAIN,
    getTitle() {
        return "Главная страница" 
    },
    view(vnode) {
        console.log("here")
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