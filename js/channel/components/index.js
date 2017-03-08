var m = require("mithril")
var model = require("../models/index")
module.exports = {
    view(vnode) {
        return (".channel-index", model.channelInfo.isMod?[
            m("a.channel-index__logs.btn", m("button", {
                oncreate: m.route.link,
                href: "/channel/" + vnode.attrs.channelID + "/logs/"
            }, "logs")),
            m("a.channel-index__templates.btn", m("button", {
                oncreate: m.route.link,
                href: "/channel/" + vnode.attrs.channelID + "/templates/"
            }, "templates")),
               m("a.channel-index__automessages.btn",m("button", {
                oncreate: m.route.link,
                href: "/channel/" + vnode.attrs.channelID + "/autoMessages/"
            }, "autoMessages"))
        ]:m("div","You're not moderator"))
    }
}