var m = require("mithril")
var model = require("../models/index")
module.exports = {
    view(vnode) {
        return (".channel-index", model.channelInfo.isMod ? [
            m("div", "Вы модератор, вы можете пройти по разделам в меню слева (либо по кнопке в хедере)")
        ] : m("div", "You're not moderator"))
    }
}