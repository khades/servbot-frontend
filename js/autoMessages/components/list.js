var m = require("mithril")
var model = require("../models/list")
var listItem = require("./listItem")
require("../../../scss/modules/_automessage-list.scss")
module.exports = {
    view(vnode) {
        console.log(vnode.attrs)
        return m(".automessage-list", [
            m(".automessage-list__header", `Автосообщения на канале ${vnode.attrs.object.channel}`),
            m("a.automessage-list__create", {
                oncreate: m.route.link,
                href: `/channel/${vnode.attrs.channelID}/autoMessages/new`
            }, "Создать новое автосообщение"),
            m(".automessage-list__items", !!vnode.attrs.object.autoMessages ? vnode.attrs.object.autoMessages.map(f => m(listItem, f)) : m(".nothing"))
        ])
    }
}