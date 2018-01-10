var m = require("mithril")
var model = require("../models/list")
var listItem = require("./listItem")
require("../../../scss/modules/_automessage-list.scss")
var channelName = require("../../utils/channelName")

module.exports = {
    view(vnode) {
        return m(".automessage-list", [
            m(".automessage-list__header", `Автосообщения на канале ${channelName.get(model.channelID)}`),
            m("a.automessage-list__create", {
                oncreate: m.route.link,
                href: `/channel/${model.channelID}/autoMessages/new`
            }, "Создать новое автосообщение"),
            m(".automessage-list__items", !!model.objects ? model.objects.map(f => m(listItem, f)) : "")
        ])
    }
}